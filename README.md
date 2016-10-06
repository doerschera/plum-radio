# [Plum Radio](https://hidden-ravine-34215.herokuapp.com/)

###Background

Writers often use different exercises to help get them in the mode and gather inspiration. *Plum Radio* takes one of these exercises and moves it to a digital platform. Writers are given a few lines of poetry and a space to respond. Additionally, writers choose between two different modes: Gut mode is timed, writers only have one minutes to respond to each prompt and can choose between a five or ten minute session. Zen mode is untimed and writers choose when to move on. Writers can view there past responses to prompts though the "past lines" tab and can reference or copy/paste to a more permanent place from there.

###Technology

- jQuery timers
- JSON syntax
- HTML/css

### Process

The creation of this app began with the name *Plum Radio*, a riff off the opening line of Noelle Kocot's *Poem for the End of Time and Other Poems*. The final design for the site fell into place upon the discovery of the antique background image by photographer Hitdelight. I chose to add a background color to the headings and lines to emphasize line breaks as well as their fragmentary nature.

One challenge I faced while working on this project was pausing the timer while users were in the past lines tab and restarting that timer as they returned to the input area. I eventually found that the problem revolved a function call that was placed in the middle of another function when it needed to be called at the end.
