---
title: 'How much of one single food do you need to eat in a day to satisfy protein demands?'
summary: 'A live protein calculator prototype for common high protein food sources.'
tags: 
  - protein
  - calories
  - protein calculator
  - fat loss
  - weight loss
  - weightlifting
  - resistance training
  - protein synthesis
  - muscle mass
  - hypertrophy
  - earth day
date: 2025-04-17T16:54:44-04:00
draft: false
cover:
  image: 'calculator-table.png'
  caption: 'A snapshot of the prototype protein calculator with the first few entries in the table.' 
  hidden: true
  hiddenInList: false
aliases: '/protein'
math: true
ShowToc: false
TocOpen: false
---

I have now celebrated one year of resistance training. One of the benefits of consistent, hard exercise is that it naturally steers you toward a healthier, more informed diet—and makes it easier to keep the undesirable effects of indulgence at bay, if you try.

Most anyone in the gym has heard the adage to eat "1g of protein per pound of (goal) bodyweight per day." Research has shown this figure isn't accurate; it's more like 60–70% of that (and that's at **peak** resistance training intensity) for ideal muscle mass gains [^1] [^2] [^3] [^4] [^5]. For example, if you weigh 175 lbs, this guideline states you should eat somewhere between

$$
\begin{aligned}
\frac{\textrm{protein}}{\textrm{day}}
 &= \left[0.35,0.75\right]
     \cdot \left( \text{g} / \text{lbs} / \text{day} \right)
     \cdot 175 \textrm{lbs}  \\\\
 &= \~ \left[60, 140\right] \textrm{g/day}
\end{aligned}
$$

where we have used the shorthand

$$
\text{g} / \text{lbs} / \text{day}
\coloneqq \frac{\text{protein (g)}}{\text{bodyweight (lbs)} \cdot \text{day}}
$$

But for nearly everyone landing on these pages, the goal is fat loss. Higher protein (and fiber) intake will help you feel fuller for longer and can help people new to fitness and diet control their cravings.

Following the guidelines is also made more tedious by the near-constant arithmetic at the grocery store. While it's good to check the labels to learn what's actually in your food, keeping a running total and hitting your target each day becomes a challenge. You wind up relying on apps, breaking meals into chunks: "10 grams here, 25g scoop there... how much protein is in a palm-sized chunk of chicken breast again??" And then there’s the protein in bread, grains, bars. It’s nearly impossible to balance all that against metabolic calories if you’re even *trying* a little.

## Compositional Thinking Strategy

*Here's my take:* **Ratio counting.** As a chef, there's a reason the imperial, fractional system works: ratio. It's easier for me to think about doubling, tripling, or halving depending on what I'm buying and who I'm cooking for. Our days are divided into twelves and therefore 2's, 3's, and 4's. Naturally, our meals are spaced that way too. The value of our `base10` system cannot be overstated, but I have a difficult time what eating or preparing 10% less of a meal or recipe means vs doing a quarter or half.

For the 175 lbs individual, the ranges of protein consumption needed are pinned by three characteristic quantities:

* $\textbf{MAX} = $ 100% efficiency in protein synthesis $\approx 1.6 \text{g} / \text{kg} / \text{day}$
* **0.75** $\coloneqq 0.75 \times \text{MAX} \approx 1.2 \text{g} / \text{kg} / \text{day}$
* $\textbf{RDA} \coloneqq 0.5 \times \text{MAX} \approx 0.8 \text{g} / \text{kg} / \text{day}$

where $\text{RDA}$ is the **Recommended Daily Allowance**, and $\text{MAX}$ is the **Maximum Efficient Intake**. The "$0.75 \times \text{MAX} \approx 1.2 \text{lbs}$" is roughly the target for most people who weigh 175 lbs (80 kg), on average. [^1]


<details> <summary><b>Tap here to see the ranges for this weight...</b></summary> 
<br/>
For reference, the ranges of protein consumption needed for the the 175 lbs individual are:

$$
\text{<65yo + RE:} \quad \left[ 0.8,\ 1.6 \right] \ \text{g} / \text{kg} / \text{day}
$$

$$
\text{⩾65yo + RE:} \quad \left[ 1.1,\ 1.4 \right] \ \text{g} / \text{kg} / \text{day}
$$

where $\text{RE}$ means "Resistance Exercise", or, in pounds:

$$
\text{<65yo + RE:} \quad \left[ 0.35,\ 0.75 \right] \ \text{g} / \text{lbs} / \text{day}
$$

$$
\text{⩾65yo + RE:} \quad \left[ 0.55,\ 0.65 \right] \ \text{g} / \text{lbs} / \text{day}.
$$
</details>


## Implementation: The Protein Efficiency Calculator

The table below answers a simple question: how much of one single food do you need to eat to hit your daily protein target? Input your weight, toggle metric or imperial, and adjust units per row—grams, ounces, scoops, each. It’ll show you the amount needed to hit benchmarks in the range of $\text{RDA}$ to the $(\text{MAX})$ intake.  Based on resistance training status and the latest research, a sliding scale in this range will allow you to estimate your required protein demands.

**Quantity:** the number of units in the **Unit/Size** column you need to eat to acheive the chosen protein target, per day, for your input weight.

Adjusting the **Protein target** slider can be thought of as a direct conversion of protein to training intensity, from sedentary/$\text{RDA}$ all the way to the $\text{MAX}$ intensity threshold.

{{< protein-table >}}

I've also included the **daily Calories** you'd likewise take on per food item.  You'll note that high carbohydrate (peas, chili) and especially high fat content (mixed nuts) greatly diminish the remaining calorie budget in the day.  Conversely, protein powders, including the vegan kind, substantially lower the overall caloric footprint.

## The Protein Efficiency Matrix

While the above tool scales protein needs to an individual's body composition, it’s also worth viewing high-protein foods in a way that’s independent of bodyweight. The protein-to-calorie efficiency of a food source is a fixed property — it doesn’t change based on who’s eating it.

With that in mind, the **Protein Efficiency Matrix** below expresses the relative caloric density of each food source. It compares the efficiency of each against the others in the table.

{{< protein-efficiency-matrix >}}

Your weight and training status don’t matter here — this table is the same for everyone, assuming equal daily protein intake. The first column shows a simple mean of each row’s relative efficiency compared to others — a rough estimate of how each food stacks up overall.
**Smaller numbers are better.**
High-fat items like salmon and nuts, and high-carb ones like peas and chili, form relative "islands of inefficiency" among high-protein sources.

You can even think of this matrix as a way to zone:
<span style="color: steelblue;">cutting</span> / 
<span style="color: seagreen;">maintaining</span> / 
<span style="color: lightcoral;">bulking</span>
cycles using
<span style="color: steelblue;">blues</span> /
<span style="color: seagreen;">greens</span> /
<span style="color: lightcoral;">reds</span>
as a visual cue for how your shopping list and pantry pars might shift depending on your current training status.

For example, Greek yogurt has over five times the protein density of tree nuts by volume. If you’re trying to control weight and meal prep, having this kind of visual measure might help you balance portions — say, between yogurt and nuts in your breakfast bowl.

Note also that the
<span style="color: lightcoral;">red, lower-in-protein efficiency</span> 
items are still quite efficient. For example, gas station treats like trollies and doritos have relative efficiency values order(s) of magnitude higher.  Compared to greek yogurt, their protein efficiencies are astonomically bad 
$\text{eff.}\left(\text{trollies}:\text{yogurt}\right)$
<span style="color: lightcoral;">
$\approx 32$
</span>
and
$\text{eff.}\left(\text{doritos}:\text{yogurt}\right)$
<span style="color: lightcoral;">
$\approx 13$.
</span>
*Abysmal.*

## Discussion

This lens is useful because it translates the quantities into **grocery store** units—like pack sizes. About a dozen eggs is one day; two pounds of beef and two pounds of chicken is about three days; a tub of cottage cheese (24oz) and a tub of Greek yogurt (1qt) is just under two days. Then 3–4 scoops of protein powder can help balance that week's diet.

There is also an upper limit to the amount of protein available on the planet. 70% of freshwater is already in use; 50% of global land space is already dedicated to agriculture. It’s a 60–40 split between plant- and animal-sourced proteins occupying this space—and both the global population and protein demand will increase by 20–25% in the next 25 years [^6].

From a purely resource standpoint, there will need to be a lab-grown protein synthesis renaissance. And it's this fact alone that makes the "$1 \text{g} \ \text{protein} / \text{lbs} / \text{day}$" myth not only overly generous, but also inconsiderate of the planet’s biological limits. One-third of that is the target if you aren’t lifting. Half to two-thirds is more realistic if you’re engaged in moderate to *heavy* resistance training.

## References

[^1]: Nunes, E. A., Colenso-Semple, L., McKellar, S. R., et al. (2022). *Systematic review and meta-analysis of protein intake to support muscle mass and function in healthy adults*. *Journal of cachexia, sarcopenia and muscle*. [https://pubmed.ncbi.nlm.nih.gov/35187864/](https://pubmed.ncbi.nlm.nih.gov/35187864/)

[^2]: Schoenfeld, B. J., & Aragon, A. A. (2021). *The effect of protein timing on muscle strength and hypertrophy: A systematic review and meta-analysis*. *Journal of the International Society of Sports Nutrition*. [https://link.springer.com/content/pdf/10.1186/1550-2783-10-53.pdf](https://link.springer.com/content/pdf/10.1186/1550-2783-10-53.pdf)

[^3]: Phillips, S. M. (2014). *A brief review of critical processes in exercise-induced muscular hypertrophy*. *Sports Medicine*. [https://link.springer.com/article/10.1007/s40279-014-0152-3](https://link.springer.com/article/10.1007/s40279-014-0152-3)

[^4]: Moore, D. R., Atherton, P. J., Rennie, M. J., & Phillips, S. M. (2011). *Resistance exercise enhances mTOR and MAPK signalling in human muscle over that seen at rest after bolus protein ingestion*. *Acta physiologica*. [https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1748-1716.2010.02187.x](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1748-1716.2010.02187.x)

[^5]: Paddon-Jones, D., & Rasmussen, B. B. (2009). *Dietary protein recommendations and the prevention of sarcopenia*. *Current opinion in clinical nutrition & metabolic care*. [https://pmc.ncbi.nlm.nih.gov/articles/PMC2760315/pdf/nihms111079.pdf](https://pmc.ncbi.nlm.nih.gov/articles/PMC2760315/pdf/nihms111079.pdf)

[^6]: Smith, K., Watson, A. W., Lonnie, M., Peeters, W. M., Oonincx, D., Tsoutsoura, N., ... & Corfe, B. M. (2024). *Meeting the global protein supply requirements of a growing and ageing population*. *European journal of nutrition*. [https://pmc.ncbi.nlm.nih.gov/articles/PMC11329409/](https://pmc.ncbi.nlm.nih.gov/articles/PMC11329409/)


