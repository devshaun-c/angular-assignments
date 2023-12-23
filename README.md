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
-   STYLING
    -   BEM
    -   Angular Material
-   DATA RETRIEVAL
    -   Example data that will be displayed on the table will be a mock list of companies that are subscribed to a company's service.
    -   The example data will be stored in a constant file which will later be used to simulate an API call to retrieve the list.
    -   A short time out will be set during the data retrieval to simulate loading time for the API call.
    -   A checkbox will be provided to simulate a failed retrieval of data to demonstrate error handling.
-   FILTERING & PAGINATION
    -   Filtering and pagination will be persisted on refresh by storing the values in the URL parameters
    -   Filter via text search will work only for data that are not filtered by other input types such as date, booleans, select, radio button

## TO DO

-   [x] Sample data
-   [x] Intertfaces
-   [x] Routing
-   [x] Listing Page UI
-   [ ] Listing Service
    -   [x] GET - Listing
    -   [ ] Search
    -   [ ] Filter
-   [ ] Listing page URL param filter persist
-   [ ] Simulate error
-   [ ] Simulate refresh
