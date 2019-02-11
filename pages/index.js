import React from 'react';
import {Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory'
import Layout from '../components/Layout';
import { Link } from '../routes';

export default class CampaignIndex extends React.Component {

    static async getInitialProps() {

        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return {campaigns};
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description:(
                  <Link route={`/campaigns/${address}`}>
                      <a>View Campaign</a>
                  </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items}/>
    }

    createCampaign() {
        //Router.pushRoute('/campaigns/new');
    }

    render() {
        return (

            <Layout>
                <div>
                    <link
                        rel="stylesheet"
                        href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                    />

                    <h3>Open Campaign</h3>


                    <Link route="/campaigns/new">
                        <a>
                            <Button
                                floated="right"
                                content="Create Campaign"
                                icon="add circle"
                                primary
                            />
                        </a>
                    </Link>


                    {this.renderCampaigns()}

                </div>

            </Layout>
        );
    }
}