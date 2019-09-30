import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { FrontSiteRoutes } from '../../urls';
import {
  Footer,
  Header,
  Home,
  ProfileContainer,
} from '../../../pages/frontsite';
import { Container } from 'semantic-ui-react';
import './FrontSite.scss';
import { Notifications } from '../../../common/components/Notifications';

import {
  DocumentsDetailsContainer,
  DocumentsSearch,
} from '../../../pages/frontsite/Documents';

import { DocumentRequestForm } from '../../../pages/frontsite/DocumentRequests';

export class FrontSite extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Notifications />
        <Container fluid className="app-content">
          {/* home */}
          <Route exact path={FrontSiteRoutes.home} component={Home} />
          {/* documents */}
          <Route
            exact
            path={FrontSiteRoutes.documentDetails}
            component={DocumentsDetailsContainer}
          />
          {/* documents */}
          <Route
            exact
            path={FrontSiteRoutes.documentsList}
            component={DocumentsSearch}
          />
          <Route
            exact
            path={FrontSiteRoutes.patronProfile}
            component={ProfileContainer}
          />
          <Route
            exact
            path={FrontSiteRoutes.documentRequestForm}
            component={DocumentRequestForm}
          />
        </Container>
        <Footer />
      </div>
    );
  }
}