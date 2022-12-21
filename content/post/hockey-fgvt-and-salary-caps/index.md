+++
title = "Hockey Catch-all Statistics versus Salary Cap"
date = 2017-11-07T11:11:52-08:00
math = true
tags = ["D3","NHL","Hockey","Data"
]
draft = false

[header]
image = ""
caption = ""

[image]
caption = ""
focal_point = ""
preview_only = true
+++

This project [^1] is motivated by the "[WAR](https://en.wikipedia.org/wiki/Wins_Above_Replacement)" stat in baseball, where I have adopted the "Goals vs. Threshold" (GVT) statistic from [Tom Awad](https://web.archive.org/web/20130407214751/http://hockeyprospectus.com/article.php?articleid=236).  Here, I only consider the Offensive GVT for forward skaters and defensemen (OGVT).  
<!--more-->
I take as input the spreadsheet provided by [Robert Vollman](http://www.hockeyabstract.com/testimonials/nhl2016-17playerdata), which has not been updated with GVT data yet.  I made minor modifications to his spreadsheet in LibreOffice Calc to make it export to the CSV file format well.   The code calculates OGVT by player, which is weighted against his own team's Threshold Offensive Contribution by forwards ($TOC\_F$), or defensemen ($TOC\_D$), per minute, rather than league wide.  


To get an estimate of how good a goal is compared to an assist, we estimate that a goal scored contributes 1.5 times as much as an assist contributes to a goal.  Therefore, the calculated goal value (or assist) scored by an entity $x$ is 
$$
\begin{align}
  GV\_x \&= \frac{1.5 G\_x}{A\_x + 1.5 G\_x}, \\\\\\ 
  AV\_x \&= \frac{GV\_x}{1.5}
\end{align}
$$
where $G\_x$ is goals scored by either an individual, $x=i$, team, $x=T$, or the league as a whole, $x=L$, and $A\_x$ are the assists scored by those subcategories.

The total offensive contribution of all forwards, $TOC_F$, is determined by 

$$ TOC\_F = \frac{\sum\_{f \in T} G\_f \times GV\_T + A\_f \times AV\_T}{\sum\_{f \in T} MP\_f} \times OTV$$
where $MP\_f$ is the minutes by forward, and the offensive threshold value is $OTV = 0.75$ via Tom Awad or $0.58$ via Alan Ryder (I chose the former).  I chose an uppercase $F$ so that one may distinguish this value, which applies to *all* forwards on the team, from an individual forward, $f$.

The final formula to calculate $OGVT$ for each forward $f$ is, according to Awad, then
$$
OGVT = G\_f \\times GV\_f + A\_f \\times AV\_f - MP\_f \\times TOC\_F
$$

Additionally, I wanted to get a sense for one player's value to the team  in relation to his salary cap hit.  Here, I show from the 2016-17 NHL regular season $OGVT$ versus Salary Cap for the Stanley Cup Champion Pittsburgh Penguins, the cap-troubled Detroit Red Wings, and the young Edmonton Oilers with generational talent Connor McDavid (only forward skaters).

{{< scatterplot >}}

However, in debugging my code, something seemed strange to me.  This first term in the $OGVT$ expression, with some math, reduces to the number of goals by that individual:
$$
\\begin{align}
G\_f \\times GV\_f + A\_f \\times AV\_f 
  \&= G\_f \\times GV\_f + A\_f \\times \frac{GV\_f}{1.5} \\\\\\
  \&= \\left( G\_f  + \\frac{A\_f}{1.5}\\right ) 
      \\times GV\_f \\\\\\
  \&= \\left( G\_f  + \\frac{A\_f}{1.5}\\right ) 
      \\times \\left( \frac{1.5 G\_f}{A\_f + 1.5 G\_f} \\right)\\\\\\
  \&= \\left( 1.5 G\_f  + A\_f \\right) 
      \\times \\left( \frac{G\_f}{A\_f + 1.5 G\_f} \\right) \\\\\\
  \&= G\_f.
\\end{align}
$$ 
So, unless I'm misunderstanding Tom Awad's definition of terms here:

    A player's OGVT is therefore:
    
    OGVT = (G x GV) + (A x AV) - (MP x TOC)

    Where G is the player's goals, A his assists, MP his minutes played, GV his goal value, AV his assist value, and TOC the Threshold offensive contribution value for his position.

I don't quite understand how this first set of terms is relevant, as it essentially removes the direct value of a skater's assists in the calculation of this catch-all offensive statistic.

[^1]: Actually, I mostly wanted to get some experience with [D3](https://d3js.org/) and using publically accesible data.  I'm still investigating why the axes titles aren't showing on my plot.
