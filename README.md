# Assignment 2

## Date Submitted: 13/10/2024

3-Step Form Wizard
[x] Display a simple header to show the current step progress
[x] Dynamic step content for each step ( Note: Required each step is different component )
[x] Able to go next or go back
[x] Final submission form data should log in the console dev-tool.
[x] Each step form field should have validation ( Note: Required use reactive form to do
validation ) .
[x] Before going to the next step, current step content must be valid, when invalid, please
show inline error message.
[ ] Bonus: Support asynchronous behavior where every time the user clicks next, it allows for an
asynchronous check to be performed with the server before the user can proceed to the next
page ( Note: When an asynchronous task is in progress, the next button should be disabled ) .
[ ] Bonus: Showcase example of using angular form asynchronous validator

---

# Assignment 3

## Primary Requirements

1. Create a listing page which has a table to show a list of row record.
2. The listing page must be able to be sorted, filtered and paginated.
3. When browser reload, previous filtering and pagination must persist (if any).

## Additional requirements:

-   Bonus: Showcase of use as much as possible RxJS operator to build the data stream.
-   Bonus: Showcase use of different kinds of filtering input like select, input, date picker, checkbox, and radio.

## Technical Notes

-   TECH PACKAGES
    -   Angular V16
    -   Angular Material
-   DATA RETRIEVAL
    -   Example data that will be displayed on the table will be a mock list of companies that are subscribed to a company's service.
    -   The example data will be stored in a JSON file which will later be used to simulate an API call to retrieve the list.
    -   A short time out will be set during the data retrieval to simulate loading time for the API call.
-   FILTERING & PAGINATION
    -   Filtering and pagination will be persisted on refresh by storing the values in the URL parameters
    -   Filter via text search will work only for selected data columns

## TO DO

-   [x] Sample data
-   [x] Intertfaces
-   [x] Routing
-   [x] Listing Page UI
-   [ ] Listing Service
    -   [x] GET - Listing
    -   [x] Search
    -   [x] Filter products and status
    -   [x] Filter date range
-   [x] Listing page URL param filter persist
-   [x] Listing page URL param pagination persist
-   [x] Simulate error
-   [x] Simulate refresh
-   [x] No data found message
