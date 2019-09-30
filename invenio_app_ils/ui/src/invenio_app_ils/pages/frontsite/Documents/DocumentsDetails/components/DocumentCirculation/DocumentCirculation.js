import React, { Component } from 'react';
import { Divider, Header, Label, List, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../../DocumentsDetails.scss';
import { LoginRedirectButton } from '../../../../../../authentication/components';
import { LoanRequestForm } from '../LoanRequestForm';
import { AuthenticationGuard } from '../../../../../../authentication/components/AuthenticationGuard';
import { Link } from 'react-router-dom';

export default class DocumentCirculation extends Component {
  constructor(props) {
    super(props);
    this.document = props.documentsDetails;
  }

  loginToLoan = () => {
    return <LoginRedirectButton content={'Login to loan'} />;
  };

  renderBookAvailability = () => {
    const circulationData = this.document.metadata.circulation;
    if (circulationData.has_items_for_loan > 0) {
      return (
        <List.Item>
          <List.Icon name={'info'} />
          <List.Content
            className={
              circulationData.has_items_for_loan > 0
                ? 'text-success'
                : 'text-danger'
            }
          >
            Available for loan: now
          </List.Content>
        </List.Item>
      );
    } else {
      return null;
    }
  };

  renderNextAvailableDate = () => {
    const circulationData = this.document.metadata.circulation;
    return circulationData.next_available_date ? (
      <List.Item>
        <List.Icon name={'info'} />
        <List.Content>
          Available for loan from:
          <b>{circulationData.next_available_date}</b>
        </List.Content>
      </List.Item>
    ) : null;
  };

  renderLoanRequestForm = () => {
    return <LoanRequestForm document={this.document} />;
  };

  renderEItems = () => {
    const eitems = this.document.metadata.eitems.hits.map(eitem => {
      return (
        <List.Item>
          <List.Icon name={'linkify'} />
          <List.Content>
            Read <a href="#TODO">online(e-book)</a>
          </List.Content>
        </List.Item>
      );
    });
    return eitems;
  };

  render() {
    return (
      <Segment className={'#TODO'} color="orange">
        <Header as="h3">Access online</Header>
        <List>{this.renderEItems()}</List>
        <br />
        <Divider horizontal>Or</Divider>
        <Header as="h3" content="Request loan" />
        <List>
          {this.renderBookAvailability()}
          {this.renderNextAvailableDate()}
        </List>
        <AuthenticationGuard
          authorizedComponent={this.renderLoanRequestForm}
          loginComponent={this.loginToLoan}
        />
      </Segment>
    );
  }
}

DocumentCirculation.propTypes = {
  documentsDetails: PropTypes.object.isRequired,
};