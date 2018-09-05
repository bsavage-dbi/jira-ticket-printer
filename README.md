# ticket_printer

Chrome extension that generates pdf from a provided JQL query that can be printed out and used for physical (Kanban/Scrum) boards

# Usage 

In options, set the base url for your jira instance, username and password to authenticate and click save. 

In the extension popup provide a JQL query that will be used for filtering out jira issues. The resulting issues will be used to generate a pdf containing short
descriptions of these issues. The description includes key, summary and priority of each issue as well as a specific color tag based on the priority. 
This can be printed out and cut in four to be used as post it notes on a physical board.

