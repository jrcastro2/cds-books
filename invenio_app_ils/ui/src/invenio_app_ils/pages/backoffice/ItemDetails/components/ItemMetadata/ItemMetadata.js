import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment, Container, Header, Table } from 'semantic-ui-react';
import { CreateNewLoanModal } from './components/CreateNewLoanModal';
import { openRecordEditor } from '../../../../../common/urls';
import { item as itemApi } from '../../../../../common/api';
import { invenioConfig } from '../../../../../common/config';
import { EditButton } from '../../../components/buttons';

import './ItemMetadata.scss';

export default class ItemMetadata extends Component {
  render() {
    const { item } = this.props;
    const header = (
      <Grid.Row>
        <Grid.Column width={10} verticalAlign={'middle'}>
          <Header as="h1">Item - {item.metadata.barcode}</Header>
        </Grid.Column>
        <Grid.Column width={6} textAlign={'right'}>
          <CreateNewLoanModal
            itemPid={`${item.item_pid}`}
            itemBarcode={`${item.metadata.barcode}`}
            active={
              !invenioConfig.circulation.loanActiveStates.includes(
                item.metadata.circulation_status.state
              )
            }
            onLoanCreatedCallback={this.props.fetchItemDetails}
          />
          <EditButton
            clickHandler={() => openRecordEditor(itemApi.url, item.item_pid)}
          />
        </Grid.Column>
      </Grid.Row>
    );

    return (
      <Segment className="item-metadata">
        <Grid padded columns={2}>
          {header}
          <Grid.Row>
            <Grid.Column>
              <Table basic="very" definition className="metadata-table">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell width={4}>Circulation Status</Table.Cell>
                    <Table.Cell width={12}>
                      {item.metadata.circulation_status.state}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={4}>Item Status</Table.Cell>
                    <Table.Cell width={12}>{item.status}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Barcode</Table.Cell>
                    <Table.Cell>{item.metadata.barcode}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Medium</Table.Cell>
                    <Table.Cell>{item.metadata.medium}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Circulation Restriction</Table.Cell>
                    <Table.Cell>{item.circulation_restriction}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Shelf</Table.Cell>
                    <Table.Cell>{item.metadata.shelf}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Legacy ID</Table.Cell>
                    <Table.Cell>{item.metadata.legacy_id}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Document</Table.Cell>
                    <Table.Cell>{item.metadata.document_pid}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Library</Table.Cell>
                    <Table.Cell>
                      {item.metadata.internal_location.name}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Location</Table.Cell>
                    <Table.Cell>
                      {item.metadata.internal_location.location.name}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>

            <Grid.Column>
              <Container>
                <Header as="h4">Description</Header>
                <p>{item.metadata.description}</p>
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

ItemMetadata.propTypes = {
  item: PropTypes.object.isRequired,
};