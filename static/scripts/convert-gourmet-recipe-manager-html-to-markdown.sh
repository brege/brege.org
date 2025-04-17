#!/bin/bash

# Usage:
#   ./convert_gourmet.sh [--no-hugo] [-i|--input-dir /path/to/html] [-o|--output-dir /path/to/output]
# Default output:
#   Hugo:     ./recipes.hugo/
#   No-Hugo:  ./recipes.markdown/

set -euo pipefail

# --- Configurable defaults ---
DEFAULT_HUGO_OUTPUT_DIR="$HOME/Build/brege.org/content/recipes" # "./recipes.hugo"
echo "Default Hugo output directory: $DEFAULT_HUGO_OUTPUT_DIR"
DEFAULT_NOHUGO_OUTPUT_DIR="./recipes.markdown"
DEFAULT_INPUT_DIR="./recipes.html"

AUTHOR="Wyatt Brege"
DATE="$(date +%F)"  # ISO format YYYY-MM-DD

# Optional override via env or command line
: "${OUTPUT_DIR:=""}"
INPUT_DIR="$DEFAULT_INPUT_DIR"
output_dir=""
no_hugo=false

# --- Parse args ---
while [[ $# -gt 0 ]]; do
    case "$1" in
        --no-hugo)
            no_hugo=true
            shift
            ;;
        -i|--input-dir)
            INPUT_DIR="$2"
            shift 2
            ;;
        -o|--output-dir)
            output_dir="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--no-hugo] [-i|--input-dir DIR] [-o|--output-dir DIR]"
            exit 1
            ;;
    esac
done

# --- Final output directory ---
if [[ -n "$output_dir" ]]; then
    final_output_dir="$output_dir"
elif [[ -n "$OUTPUT_DIR" ]]; then
    final_output_dir="$OUTPUT_DIR"
elif $no_hugo; then
    final_output_dir="$DEFAULT_NOHUGO_OUTPUT_DIR"
else
    final_output_dir="$DEFAULT_HUGO_OUTPUT_DIR"
fi

mkdir -p "$final_output_dir"

# --- Convert recipes ---
shopt -s nullglob
files=( "$INPUT_DIR"/*.htm "$INPUT_DIR"/*.html )
echo "Found ${#files[@]} recipe files in '$INPUT_DIR'."

if [[ ${#files[@]} -eq 0 ]]; then
    echo "❌ No recipe files found."
    exit 1
fi

for file in "${files[@]}"; do
    filename=$(basename "$file" .htm)
    [[ "$filename" == "index" ]] && continue

    # Normalize filename → slug
    slug=$(echo "$filename" | sed 's/[0-9]*$//' | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

    # Extract metadata
    title=$(grep -oPm1 '(?<=<title>).*?(?=</title>)' "$file")
    yield=$(grep -oPm1 '(?<=<span itemprop="recipeYield">).*?(?=</span>)' "$file" || echo "")

    # Determine output file path
    if $no_hugo; then
        output_file="$final_output_dir/$slug.md"
    else
        recipe_dir="$final_output_dir/$slug"
        mkdir -p "$recipe_dir"
        output_file="$recipe_dir/index.md"
    fi

    # --- Write header ---
    {
        if $no_hugo; then
            echo "# $title"
            echo
        else
            echo "---"
            echo "title: \"$title\""
            echo "tags: []"
            echo "date: 2018-01-01" # "$DATE"
            echo "draft: false"
            #echo "type: recipe"
            echo "ShowTOC: false"
            echo "---"
            echo
            echo "{{% recipe %}}"
            echo
            echo "### $title"
            echo
        fi

        echo "**Author:** *$AUTHOR*"
        echo
        [[ -n "$yield" ]] && echo "**Yield:** $yield"
        echo
    } > "$output_file"

    # --- Convert body with pandoc ---
    if ! body=$(pandoc -f html -t markdown "$file" 2>/dev/null); then
        echo "❌ pandoc failed for $file — skipping"
        continue
    fi

    # --- Clean up markdown ---
    clean_body=$(echo "$body" \
      | sed '/^:::/d' \
      | sed -E 's/\\$//' \
      | sed -E 's/\[.*?\]//g' \
      | sed -E 's/\{[^}]+\}//g' \
      | sed -E 's/^### Instructions/#### Directions:/I' \
      | sed -E 's/^### Notes/#### Notes:/I' \
      | sed -E 's/^### Ingredients/#### Ingredients:/I' \
      | sed '/^\s*$/N;/^\s*\n\s*$/D' \
      | awk 'BEGIN {skip=1} /^\s*#/ && skip {next} {skip=0} 1')

    echo "$clean_body" >> "$output_file"
    if ! $no_hugo; then 
      echo "{{% /recipe %}}" >> "$output_file"
    fi
    #echo "✅ Converted $file to $output_file"
done

