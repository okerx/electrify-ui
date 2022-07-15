import { ChargingLocation } from '@/api/types';

describe('Home Page (Charging Locations)', function () {
  before(function () {
    cy.request({
      method: 'POST',
      url: Cypress.env('CLEAR_DB_URL'),
      headers: {
        'X-Api-Key': Cypress.env('CLEAR_DB_API_KEY'),
      },
    });
  });

  beforeEach(function () {
    cy.fixture<ChargingLocation>('chargingLocations.json').then(function (
      chargingLocations,
    ) {
      this.chargingLocations = chargingLocations;
    });
  });

  it('should navigate to the home page and find 0 rows', function () {
    cy.visit('http://localhost:3000/');

    cy.get('[data-test-id="locations-table"] > tbody > tr').should(
      'have.length',
      0,
    );
  });

  it('should open and close add location modal', function () {
    cy.get('[data-test-id="modal"]').should('not.exist');
    cy.wait(300).get('[data-test-id="add-location-modal-btn"]').click();
    cy.get('[data-test-id="modal"]').should('be.exist');
    cy.get('[data-test-id="modal-close-btn"]').click();
    cy.wait(300).get('[data-test-id="modal"]').should('not.exist');
  });

  it('should raise validation errors', function () {
    cy.get('[data-test-id="add-location-modal-btn"]').click();
    cy.wait(300).get('[data-test-id="add-location-submit-btn"]').click();
    cy.get('[data-test-id="modal"]').should('contain.text', 'Name is required');
    cy.get('[data-test-id="modal"]').should(
      'contain.text',
      'Postal Code is required',
    );
    cy.get('[data-test-id="modal-close-btn"]').click();
  });

  it('should add one location', function () {
    cy.get('[data-test-id="add-location-modal-btn"]').click();
    cy.get('[data-test-id="add-location-name-field"]').type(
      this.chargingLocations.default[0].name,
    );
    cy.get('[data-test-id="add-location-postalcode-field"]').type(
      this.chargingLocations.default[0].postalCode,
    );
    cy.get('[data-test-id="add-location-location-field"]').type(
      String(this.chargingLocations.default[0].location),
    );
    cy.get('[data-test-id="add-location-country-select"]').select(
      this.chargingLocations.default[0].country,
    );
    cy.get('[data-test-id="add-location-submit-btn"]').click();

    cy.get('[data-test-id="locations-table"] > tbody > tr').should(
      'have.length',
      1,
    );

    cy.get('[data-test-id="locations-table"] > tbody > tr')
      .should('contain.text', this.chargingLocations.default[0].name)
      .and('contain.text', this.chargingLocations.default[0].location)
      .and('contain.text', this.chargingLocations.default[0].country)
      .and('contain.text', this.chargingLocations.default[0].postalCode);
  });

  it('should add 49 new locations', function () {
    this.chargingLocations.default
      .slice(1)
      .forEach((chargingLocation: ChargingLocation) => {
        cy.get('[data-test-id="add-location-modal-btn"]').wait(300).click({});

        cy.get('[data-test-id="add-location-name-field"]').type(
          chargingLocation.name as string,
        );
        cy.get('[data-test-id="add-location-postalcode-field"]').type(
          chargingLocation.postalCode as string,
        );
        cy.get('[data-test-id="add-location-location-field"]').type(
          String(chargingLocation.location),
        );
        cy.get('[data-test-id="add-location-country-select"]').select(
          chargingLocation.country as string,
        );
        cy.get('[data-test-id="add-location-submit-btn"]').click();
      });

    cy.get('[data-test-id="locations-table"] > tbody > tr').should(
      'have.length',
      10,
    );

    cy.get('[data-test-id="table-page-start"]').should('contain.text', '1');
    cy.get('[data-test-id="table-page-end"]').should('contain.text', '10');
    cy.get('[data-test-id="table-page-total"]').should('contain.text', '50');

    cy.get('[data-test-id="table-per-page-select"]').select('30');

    cy.get('[data-test-id="table-page-start"]').should('contain.text', '1');
    cy.get('[data-test-id="table-page-end"]').should('contain.text', '30');
    cy.get('[data-test-id="table-page-total"]').should('contain.text', '50');

    cy.get('[data-test-id="table-per-page-select"]').select('50');

    cy.get('[data-test-id="table-page-start"]').should('contain.text', '1');
    cy.get('[data-test-id="table-page-end"]').should('contain.text', '50');
    cy.get('[data-test-id="table-page-total"]').should('contain.text', '50');
  });

  it('should sort table by name in ascending order', function () {
    cy.get('[data-test-id="table-sort-name"]').click();
    cy.wait(1000);
    cy.get('[data-test-id="locations-table"] > tbody > tr').each(
      ($row, index) => {
        const { name, location, country, postalCode } =
          this.chargingLocations['page=1,perPage=50,by=name,type=asc'][index];
        cy.wrap($row).find('td:nth-of-type(2)').should('contain.text', name);
        cy.wrap($row)
          .find('td:nth-of-type(3)')
          .should('contain.text', location);
        cy.wrap($row)
          .find('td:nth-of-type(5)')
          .should('contain.text', postalCode);
        cy.wrap($row).find('td:nth-of-type(7)').should('contain.text', country);
      },
    );
  });

  it('should sort table by name in descending order', function () {
    cy.get('[data-test-id="table-sort-name"]').click();
    cy.wait(1000);
    cy.get('[data-test-id="locations-table"] > tbody > tr').each(
      ($row, index) => {
        const { name, location, country, postalCode } =
          this.chargingLocations['page=1,perPage=50,by=name,type=desc'][index];
        cy.wrap($row).find('td:nth-of-type(2)').should('contain.text', name);
        cy.wrap($row)
          .find('td:nth-of-type(3)')
          .should('contain.text', location);
        cy.wrap($row)
          .find('td:nth-of-type(5)')
          .should('contain.text', postalCode);
        cy.wrap($row).find('td:nth-of-type(7)').should('contain.text', country);
      },
    );
  });

  it('should reset sorting to default', function () {
    cy.get('[data-test-id="table-sort-name"]').click();
    cy.wait(1000);
    cy.get('[data-test-id="locations-table"] > tbody > tr').each(
      ($row, index) => {
        const { name, location, country, postalCode } =
          this.chargingLocations['page=1,perPage=50,by=,type='][index];
        cy.wrap($row).find('td:nth-of-type(2)').should('contain.text', name);
        cy.wrap($row)
          .find('td:nth-of-type(3)')
          .should('contain.text', location);
        cy.wrap($row)
          .find('td:nth-of-type(5)')
          .should('contain.text', postalCode);
        cy.wrap($row).find('td:nth-of-type(7)').should('contain.text', country);
      },
    );
  });

  // TODO: Add pagination tests
});
