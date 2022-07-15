import { Charger, ChargingLocation } from '@/api/types';
import { StatusVariants } from '@/containers/LocationDetails/constants';

describe('Location Details Page', function () {
  beforeEach(function () {
    cy.fixture<ChargingLocation>('chargingLocation.json').then(function (
      chargingLocation,
    ) {
      this.chargingLocation = chargingLocation;
    });
  });

  it('create location with one charger', function () {
    cy.visit('http://localhost:3000/');

    cy.get('[data-test-id="add-location-modal-btn"]').click();
    cy.get('[data-test-id="add-location-name-field"]').type(
      this.chargingLocation.default.name,
    );
    cy.get('[data-test-id="add-location-postalcode-field"]').type(
      this.chargingLocation.default.postalCode,
    );
    cy.get('[data-test-id="add-location-location-field"]').type(
      String(this.chargingLocation.default.location),
    );
    cy.get('[data-test-id="add-location-country-select"]').select(
      this.chargingLocation.default.country,
    );

    cy.get('[data-test-id="add-location-add-charger-btn"]').click();
    cy.get('[data-test-id="add-location-type-select-0"]').select(
      this.chargingLocation.default.chargers[0].type,
    );
    cy.get('[data-test-id="add-location-status-select-0"]').select(
      this.chargingLocation.default.chargers[0].status,
    );
    cy.get('[data-test-id="add-location-serialnumber-field-0"]').type(
      this.chargingLocation.default.chargers[0].serialNumber,
    );
    cy.get('[data-test-id="add-location-submit-btn"]').click();
  });

  it('should navigate to location details page', function () {
    cy.wait(200);
    cy.get(
      '[data-test-id="locations-table"] > tbody > tr:first-of-type',
    ).click();

    cy.get('[data-test-id="location-details-name"]').should(
      'contain.text',
      this.chargingLocation.default.name,
    );
    cy.get('[data-test-id="location-details-location"]').should(
      'contain.text',
      this.chargingLocation.default.location,
    );
    cy.get('[data-test-id="location-details-postalcode"]').should(
      'contain.text',
      this.chargingLocation.default.postalCode,
    );
    cy.get('[data-test-id="location-details-country"]').should(
      'contain.text',
      this.chargingLocation.default.country,
    );

    cy.get('[data-test-id="chargers-table"] > tbody > tr').should(
      'have.length',
      1,
    );
    cy.get(
      '[data-test-id="chargers-table"] > tbody > tr > td:nth-of-type(2)',
    ).should('contain.text', this.chargingLocation.default.chargers[0].type);
    cy.get(
      '[data-test-id="chargers-table"] > tbody > tr > td:nth-of-type(3)',
    ).should(
      'contain.text',
      StatusVariants[this.chargingLocation.default.chargers[0].status].text,
    );
    cy.get(
      '[data-test-id="chargers-table"] > tbody > tr > td:nth-of-type(4)',
    ).should(
      'contain.text',
      this.chargingLocation.default.chargers[0].serialNumber,
    );
  });

  it('should update the location info', function () {
    cy.get('[data-test-id="location-details-edit-btn"]').click();

    cy.get('[data-test-id="edit-location-name-field"]')
      .clear()
      .type(this.chargingLocation.edit.name);
    cy.get('[data-test-id="edit-location-location-field"]')
      .clear()
      .type(this.chargingLocation.edit.location);
    cy.get('[data-test-id="edit-location-postalcode-field"]')
      .clear()
      .type(this.chargingLocation.edit.postalCode);
    cy.get('[data-test-id="edit-location-country-select"]').select(
      this.chargingLocation.edit.country,
    );

    cy.get('[data-test-id="edit-location-submit-btn"]').click();

    cy.wait(1000);

    cy.get('[data-test-id="location-details-name"]').should(
      'contain.text',
      this.chargingLocation.edit.name,
    );
    cy.get('[data-test-id="location-details-location"]').should(
      'contain.text',
      this.chargingLocation.edit.location,
    );
    cy.get('[data-test-id="location-details-postalcode"]').should(
      'contain.text',
      this.chargingLocation.edit.postalCode,
    );
    cy.get('[data-test-id="location-details-country"]').should(
      'contain.text',
      this.chargingLocation.edit.country,
    );
  });

  it('should create new chargers', function () {
    this.chargingLocation.newChargers.forEach((newCharger: Charger) => {
      cy.get('[data-test-id="add-charger-btn"]').click();

      cy.get('[data-test-id="add-edit-charger-type-select"]').select(
        newCharger.type as string,
      );
      cy.get('[data-test-id="add-edit-charger-status-select"]').select(
        newCharger.status as string,
      );
      cy.get('[data-test-id="add-edit-charger-serialnumber-field"]').type(
        newCharger.serialNumber as string,
      );

      cy.get('[data-test-id="add-edit-charger-submit-btn"]').click();

      cy.wait(600);
    });

    cy.get('[data-test-id="chargers-table"] > tbody > tr').each(
      ($row, index) => {
        const { type, status, serialNumber } =
          this.chargingLocation.chargersAfterCreate[index];
        cy.wrap($row).find('td:nth-of-type(2)').should('contain.text', type);
        cy.wrap($row)
          .find('td:nth-of-type(3)')
          .should('contain.text', StatusVariants[status].text);
        cy.wrap($row)
          .find('td:nth-of-type(4)')
          .should('contain.text', serialNumber);
      },
    );
  });
});
