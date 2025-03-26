---
title: 'Non-linear Weightlifting Progression Scheme'
tags: ['weightlifting', 'regression', 'nonlinear']
date: '2025-03-25'
summary: 'Using the Epley formula for estimating a pathway through plateaus'
draft: false
aliases: ['epley']
cover:
  image: '' 
  caption: ''  
math: true
ShowToc: false
TocOpen: false
---

Consider the Epley formula for estimating one-rep max weight:

$$
W_\textrm{1RM} = W * \left(1 + \frac{R}{30}\right)
$$

where to compute your one-rep max weight for a given lift, $W_{1RM}$, you simply input the weight lifted, $W$, and the number of reps performed before failure, $R$.

This formula has been empirically validated [^1] and is a useful tool not just for estimating your max weight for a given weight-rep pair $\left(W, R\right)$, but also to compute the amount of predictable reps you can do for any other given weight, in the limit of your one-rep max.

This is quite useful for plateaus.  For example, if you get stuck progressing the Overhead Press from 115 lbs for 5 reps after succesfully performing the OHP for 110 lbs for 5 reps, you may need to strategize.  Using the Epley formula, to go from $\left( 110\textrm{lb} , 5 \textrm{reps} \right)  \rightarrow \left(115 \textrm{lb}, 5 \textrm{reps}\right)  $, you are effectively increasing your one-rep max: $W_\textrm{1RM}: 128 \textrm{lbs} \rightarrow 134 \textrm{lbs}$.  Our goal here is to effectively increment your $W_\textrm{1RM}$ in smaller steps. 

Because the formula is nonlinear, this requires an iterative approach.  I've made a calculator that will help you find this path over different $\left(W, R\right)$ pairs.  It defaults to using a range of reps roughly half the total initial reps, $ R_0 $, used.

{{< epley-calculator >}}

### My Progression Scheme

This makes it straightforward for me to also compute the warmup sets needed for my leading barbell exercise.  Recently, I've found good success in pyramiding warmups using my calculated $\left(30, 20, 10\right)\textrm{RM}$'s for $\left( 12, 8, 4 \right) \textrm{reps}$, respectively.  

In addition, another scheme I've been using for strength focused exercises has been, after 3-6 reps of heavy weight for three sets, dropset into $\left(10,20\right)\textrm{RM}$ for $\left(8, 12..\textrm{amrap}\right)$, respectively, to increase my work volume without chewing up my joints, leaving $2+ \textrm{rir}$.  Here, $\textrm{amrap} = $ "as many reps as possible" and $\textrm{rir} =$ "reps in reserve".  My thoughts here reflect the want to cover warmup (3), strength (3-4), and hypertrophy (2), in a single leading compound exercise.

{{< progression-chart weight=135 
                      reps=5 
                      caption="<b>Progression Chart Example: Set Breakdown for Leading Barbell Lift.</b> The width of the bins represents the number of reps, $R$, denoted inside the bins. The weigths, $W_{N\textrm{RM}}$ are in lbs, represented as the height of the bins.  From left to right, the weights in my scheme are: 10RM, 20RM, 30RM, 5RM  (3x's), 10RM, 20RM.  This provides a visual sense of volume in each zone of the exercise. <i> If you change the weights in the calculator, this plot will update.  Because this is a hybrid model for strength training and hypertrophy, it will bind the rep-ranges between 3-6 reps.</i>"
>}}

### Possible Improvements

* Create a similar pathway table for the goal of adding a rep, instead of adding $5 \textrm{lbs}$ to the bar.

* Implement a pyramid scheme with broader rep ranges. I haven't thought much about this yet, but when I can hit 7 reps on heavy compound lifts, I feel like I'm entering a moderately safe 7-12 rep range. At that point, the effort level shifts to something different.

* The Epley model is just one of many. I haven't explored the others yet because I could solve this with fractional arithmetic in my head while "ape-brained" in the gym. However, adding a dropdown toggle to choose different models, and referring to recent literature on advancements in curve fitting, would make this tool more robust. Similar to how the Opus audio codec performs at different fidelities with various bitrates, I'm sure that the pathway from 1RM to 30RM follows a more complex, multi-fitted approach.

### References

[^1]: https://opensiuc.lib.siu.edu/cgi/viewcontent.cgi?article=1744&context=gs_rp
