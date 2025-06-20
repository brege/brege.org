---
title: 'Non-linear Weightlifting Progression Calculator'
tags:
  - weightlifting
  - regression
  - nonlinear
  - epley formula
  - progression
  - strength training
  - plateaus
  - one-rep max
  - 1rm
  - reps in reserve
  - rir
  - amrap
  - volume pyramid
date: '2025-03-25'
summary: 'Using the Epley formula, and others, for estimating an effective pathway through plateaus'
draft: false
aliases: '/epley'
cover:
  image: 'tool-collage.png' 
  hidden: true
  hiddenInList: false
math: true
ShowToc: false
TocOpen: false
---

Consider the Epley formula for estimating one-rep max weight:

$$
W_\text{1RM} = W \cdot \left(1 + \frac{R}{30}\right)
$$

To compute your one-rep max weight for a given lift, $W_{1\text{RM}}$, you simply input the weight lifted, $W$, and the number of reps performed before failure, $R$.

This formula has been empirically validated [^1] and is a useful tool not just for estimating your max weight for a given weight-rep pair $\left(W, R\right)$, but also to compute the number of predictable reps you can do at any other given weight, relative to your one-rep max.

This is quite useful for plateaus. For example, if you get stuck progressing the Overhead Press to 115 lbs for 5 reps after successfully performing the OHP for 110 lbs for 5 reps, you may need to strategize. Using the Epley formula, to go from 
$$
\left( 110\text{lb}, 5 \text{reps} \right) \rightarrow \left(115 \text{lb}, 5 \text{reps}\right),
$$
you are effectively increasing your one-rep max: $W_\text{1RM}: 128 \text{lbs} \rightarrow 134 \text{lbs}$. Our goal here is to effectively increment your $W_\text{1RM}$ in smaller steps:
$$
\small
\left( 110\text{lb}, 5 \text{reps} \right) 
    \rightarrow \left(115 \text{lb}, 4 \text{reps}\right)
    \rightarrow \left(110 \text{lb}, 6 \text{reps}\right)
    \rightarrow \left(105 \text{lb}, 8 \text{reps}\right)
    \rightarrow \left(115 \text{lb}, 5 \text{reps}\right)
$$
because this is the same as
$$
W_{1\text{RM}}: 128.33 \text{lb}
    \rightarrow 130.33 \text{lb} 
    \rightarrow 132.00 \text{lb}
    \rightarrow 133.00 \text{lb}
    \rightarrow 134.17 \text{lb} \\\\
W_{5\text{RM}}: 110.00 \text{lb} 
    \rightarrow 111.71 \text{lb}
    \rightarrow 113.14 \text{lb}
    \rightarrow 114.00 \text{lb}
    \rightarrow 115.00 \text{lb}
$$
I refer to this as the **Epley pathway**.

Because the Epley formula is nonlinear, this requires an iterative approach. I've made a calculator that will help you find this path over different $\left(W, R\right)$ pairs. It defaults to using a range of reps roughly half that of your initial number, $R_0$, and a few "sweet spot" rep values.

{{< epley-calculator method="weight" >}}
<details open=true> 
<summary> Show/Hide extra notes </summary>

You'll note that I've generalized this calculator to also include different formulas that different apps use:

$$
W_{\text{1RM}} = f(W, R)
$$

Try changing the dropdown to see how different curves generate slightly different effective rep ranges.  To read more on the survey of different calculations, check out the [One-repetition maximum article on Wikipedia](https://en.wikipedia.org/wiki/One-repetition_maximum).

</details>
{{< /epley-calculator >}}

*More details of different, specific formulae for Epley [^6] Brzycki [^2], Lombardi [^3] and O'Connor [^4], and several complimentary research articles [^1] and [^5], are available.*

<hr />

### My Progression Scheme

This makes it straightforward for me to also compute the warmup sets needed for my leading barbell exercise. Recently, I've found good success in pyramiding warmups using my calculated $\left(30, 20, 10\right)\text{RM}$'s for $\left(12, 8, 4\right) \text{reps}$, respectively.

In addition, another scheme I've been using for strength-focused exercises has been, after 3–6 reps of heavy weight for three sets, to drop set into $\left(10, 20\right)\text{RM}$ for $\left(8, 12\ldots\text{amrap}\right)$, respectively, to increase my work volume without chewing up my joints, leaving $\sim \text{2}$ $\text{rir}$. Here, $\text{amrap} = $ "as many reps as possible" and $\text{rir} =$ "reps in reserve". My thoughts here reflect the goal to cover warmup (3), strength (3–4), and hypertrophy (2), in a single leading compound exercise.

{{< progression-chart weight=135 
                      reps=5 
                      caption="<b>Progression Chart Example: Set Breakdown for Leading Barbell Lift.</b> The width of the bins represents the number of reps, $R$, denoted inside the bins. The weights, $W_{N\text{RM}}$, are in lbs, represented as the height of the bins. From left to right, the weights in my scheme are: 30RM, 20RM, 10RM, 5RM (3x's), 10RM, 20RM. This provides a visual sense of volume in each zone of the exercise. <i>If you change the weights in the calculator, this plot will update. Because this is a hybrid model for strength training and hypertrophy, it will bind the rep ranges between 3–6 reps. The $y$-axis is truncated at ⅔ $W_{\text{30RM}}$.</i>"
>}}

### Possible Improvements

* Create a similar pathway table for the goal of adding a rep, instead of adding $5 \text{lbs}$ to the bar.  Will take a good amount of effort.

* Implement a pyramid scheme with broader rep ranges in the progression chart histogram. I haven't thought much about this yet, but when I can hit 7 reps on heavy compound lifts, I feel like I'm entering a moderately safe 7–12 rep range. At that point, the effort level shifts to something different.

* ~~The Epley model is just one of many. I haven't explored the others yet because I could solve this with fractional arithmetic in my head while "ape-brained" in the gym. However, adding a dropdown toggle to choose different models, and referring to recent literature on advancements in curve fitting, would make this tool more robust.~~ Similar to how the Opus audio codec performs at different fidelities with various bitrates, I'm sure that the pathway from 1RM to 30RM follows a more complex, multi-fitted approach.

### References

[^1]: https://opensiuc.lib.siu.edu/cgi/viewcontent.cgi?article=1744&context=gs_rp

[^2]: https://scholar.google.com/scholar?hl=en&as_sdt=0%2C23&q=+Brzycki%2C+Matt+%281998%29.+A+Practical+Approach+To+Strength+Training.+McGraw-Hill.+ISBN+978-1-57028-018-4.+&btnG=

[^3]: https://www.unm.edu/~rrobergs/478RMStrengthPrediction.pdf

[^4]: https://www.medicalalgorithms.com/equation-of-oconnor-et-al-for-predicting-the-one-repetition-maximum-1-rm

[^5]: https://www.researchgate.net/profile/Marcelo-Silva-12/post/Prediction_of_1RM_in_muscular_strength_what_is_the_better_7-10_rep_or_5-7_rep/attachment/59d6235b79197b8077981b20/AS%3A306915098202113%401450185669112/download/478RMStrengthPrediction.pdf

[^6]: https://scholar.google.com/scholar?hl=en&as_sdt=0%2C23&q=+Epley%2C+Boyd+%281985%29.+%22Poundage+Chart%22.+Boyd+Epley+Workout.+Lincoln%2C+NE%3A+Body+Enterprises.+p.+86.+&btnG=
