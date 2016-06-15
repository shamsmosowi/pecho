# pecho
<<<<<<< HEAD
a p5js sketchpad app
# Pecho
Pecho is a P5js based pattern sketchpad application targeting children between ages 7 and 14. It aims to introduce them to the power of computational procedure automation.

#Brief
Pecho is a tool that can be used to create generative patterns for iphone and ipad covers

#Research
The main tool researched was Adobe illustrator.  Research was primarily done by watching tutorials like the following to observe how a current state of the art tool is used to create patterns
[tutorials](https://www.youtube.com/playlist?list=PLECh3TzKZ9K1iR5TRyOEX4XTA-EsG_s37)

While Illustrator can be used to generate engaging patterns, the user experience is very repetitive and lacks automation.

#Visibility
Keeping the user informed within reasonable time and their actions more visible when using the product. The feedback provided by Pecho is through animations message alerts. Message alerts come in four different colours, red to inform user of an error, green to indicate completion of the current task, and yellow to show unsuccessful attempts.

Messages bars are implemented in the app to keeps users informed of the actions on the app performed, they are shown at the bottom of the screen. Keeping the users informed of their actions helps prevent misinformation reducing their number of errors.The messages are expressed in plain language to precisely indicate the state of the app.

Animations used in buttons give the user instant feedback of the action being processed by the computer. This improves the overall heuristics of the app by pulling the user’s attention to the current task. Usability is also improved by dimming the area behind the mouse and main menu.

Users can hover over a button that they don't understand and get text description underneath it.
These prevent cluttering the app interface.

The mouse menu was created with Fitts’s law in mind, it predicts that the time required to rapidly move to a target area is a function of the ratio between the distance to target and the width of the target. The mouse menu is instantly created around the mouse cursor to reduce the distance required for the cursor to travel. The mouse menu can be closed and the menu implements the rule of the thumb that right click brings up the menu.

#Trial by error method
Iterative design is built into Pecho by providing undo and redo functionality, as well as letting users clear the canvas and restart just by clicking the trash can icon in the top left corner menu. It also provides instant feedback of users actions. Action such as clearing the canvas are irreversible, the app doesn't use dialog box to confirm the task, it hides it in the main menu prevent accidental trigger.

#Consistency and standards

While providing undo, redo, cut, copy, and paste buttons in the top left corner for novice users, pecho also implements the windows and OSX Hotkey conventions of Ctrl+x (cut), Ctrl+c (copy), Ctrl+v (paste), it also works for the command convention as well. Conventions such as select all and arrow keys to move selected elements are also included to increase the user control and freedom. The app implements zoom functionality that allows the user to focus on a certain area of the canvas.

#External libraries
Pecho uses the P5.js and Tween.js libraries
=======
a p5js generative sketchpad app
