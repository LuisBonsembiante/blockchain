import React, {Component} from 'react';
import Layout from '../../components/Layout'
import Campaign from '../../ethereum/campaign';
import {Button, Card, Grid} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import {Link, Router} from '../../routes';

export default class CampaignShow extends Component {

    static async getInitialProps(props) {

        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();


        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            aproversCount: summary[3],
            manager: summary[4],
            address: props.query.address
        };
    }


    renderCards() {

        const {balance, manager, minimumContribution, requestsCount, aproversCount} = this.props;

        const items = [
            {
                header: manager,
                meta: 'Addres of Manager',
                description: 'The manager created this campaign and can create request to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: requestsCount,
                meta: 'Number of Request',
                description: 'Request must aprove for approvers',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: aproversCount,
                meta: 'Number of Approvers',
                description: 'number of peoples already donated to this campaig',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money has left de campaig',
                style: {overflowWrap: 'break-word'}
            }

        ];

        return <Card.Group items={items}/>
    }

    render() {
        return (
            <Layout>
                <h3>Campaign show</h3>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCards()}


                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary> View Request</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>

            </Layout>
        );
    }
}