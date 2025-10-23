# Extraction Prompt

Generate separate html files for the nodes in the document provided. The  `example-nodes` markdown file serves as an example, but the explicit guidelines are:
* Keep to 80 character width where possible.
* Replace non-ascii characters with their ascii equivalents, e.g., substitute “...” with "..." and ‘...’ with '...'
* The node number should be in an h2 element
* A node should be contained in an article element with the class 'content'
* The main text of a node should be in a p tag
* 'Test you Luck' should be in italics
* 'SKILL', 'STAMINA' and 'LUCK' should be in bold, except when referenced in combat stats. If they appear partially capitalised, capitalise the entire word.
* Combat stats should be in an unordered list of class 'battle'
* When there are more than 2 node choices in a given node, they should be in list items inside a menu element
* Correct any obvious spelling errors 
* Remove unnecessary dashes that were used to indicate a word breaking lines which have been left over from scanning.
* Passages with quote text like poems or letters should use the blockquote and br elements
Render markdown tables as html tables, with the appropriate semantic elements like tbody or tfoot if applicable