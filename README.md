# PAD Issue Tracker Mail Sender

This is the process for automating the collection and management of service desk issues. It uses robotic process automation (RPA) to automate web data extraction, validate collected cases, interact with language models for categorization, and send emails.

---

## Features

1. **Data Extraction:**
   - Automates the collection of service desk cases from a target URL.
   - Extracts case information (e.g., case number, customer name, email, category, description, etc.) from an HTML table iteratively using a web automation tool.

2. **Case Filtering:**
   - Filters cases where the status is set to "New."
   - Adds additional metadata columns, such as timestamps, RPA case status, error messages, subcategories, and additional data requests.

3. **Case Validation:**
   - Validates critical fields like email addresses, customer names, and issue descriptions.
   - Flags cases with errors as "Business Exceptions" and logs appropriate error messages.

4. **Language Model (LLM) Integration:**
   - Sends issue descriptions to an API for categorization and subcategory explanation.
   - Determines if additional customer information is needed to resolve the issue.

5. **Email Notifications:**
   - Automatically generates and sends emails to customers with incident details and additional data requests when applicable.
   - Logs completed cases as "Email Sent" and retains metadata for reporting.

6. **Error Handling:**
   - Handles system and business exceptions gracefully, ensuring minimal disruption to the workflow.
   - Logs error details for each failed case for future auditing.

7. **Report Generation:**
   - Outputs consolidated case data, including errors and processed cases, into a CSV report.
   - Closes the browser and wraps up the automation after the process is complete.

---

## Configuration

### Files

- **`issueTrackerMailSenderLLMConfig.json`:** Contains configuration properties such as API keys, URLs, log file paths, and email settings.
- **Required Fields in JSON:**
  ```json
  {
    "IssueTrackerTargetUrl": "<URL of the Service Desk>",
    "LogFileLocation": "<Path to log each processed case>",
    "ReportFileLocation": "<Path to store the final report>",
    "GroqApiURL": "<URL for LLM API>",
    "GroqApiKey": "<LLM API Authorization Key>",
    "SendGridSmtpServer": "<SMTP server for email>",
    "SendGridSmtpServerPort": "<SMTP port>",
    "SendGridUsername": "<SMTP username>",
    "SendGridPassword": "<SMTP password>",
    "FromSenderEmail": "<Sender email address>",
    "FromSenderDisplayName": "<Sender name>",
    "TestRecipientEmailAddress": "<Recipient email address for testing>"
  }
  ```

---

## How It Works

1. **Launch Browser & Collect Data:**
   - Opens the service desk webpage and extracts all cases into a data table.
   - Iterates through pages until there are no more cases left (pagination).

2. **Filter and Validate Data:**
   - Selects cases with a "New" status.
   - Adds metadata columns and validates mandatory fields like email, customer name, and issue description.

3. **Interact with LLM for Categorization:**
   - For valid cases, the issue description is sent to the LLM API for categorization and explanation.
   - Requests the LLM to suggest additional data required, if necessary.

4. **Send Emails:**
   - Sends personalized email notifications to customers, providing incident details and requesting additional information if needed.

5. **Log and Close:**
   - Logs details of each case (processed successfully or with errors).
   - Generates a CSV report summarizing the process.

---

## Error Scenarios

- **Empty Fields:**
  - Customer Name, Email, or Description is empty.
  - Case flagged as a "Business Exception."

- **Invalid Email Format:**
  - Emails that do not conform to standard email validation regex are flagged.

- **LLM/Email Issues:**
  - Errors from LLM API or email-sending failures are logged with timestamps.

---

## Requirements

- **Tools:**
  - RPA tool (e.g., Power Automate Desktop) for automation.
  - Access to APIs (e.g., LLM categorization and SendGrid SMTP for emails).

- **Pre-requisites:**
  - Configuration file with correct API credentials and URLs.
  - A service desk webpage with structured HTML tables.

---

## How to Run

1. **Setup:**
   - Place the `issueTrackerMailSenderLLMConfig.json` in the appropriate directory.
   - Update configuration parameters with correct details.

2. **Start Automation:**
   - Load the RPA process in the automation tool.
   - Run the process to start extracting and processing cases.

3. **Outputs:**
   - Processed case logs saved at the specified log file location.
   - A CSV report generated at the report file location.

---

## Output Files

- **Log File:**
  Tracks the status and details of each case processed.

- **Report File:**
  Consolidates all cases with additional metadata, statuses, and error details.

---

## Contact

For maintenance or support, contact the Bettson Group - Service Desk Team! 🚀
