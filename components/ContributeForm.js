import React from 'react';
import {Form, Input, Message, Button,} from 'semantic-ui-react';
import {Link, Router} from '../routes';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';


export default class ContributeForm extends React.Component {

    state = {
        value: '',
        errorMessage: '',
        loading: false
    }

     onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });

        const campaign = Campaign(this.props.address);

        try{
            const  accounts = await  web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
        }catch (err) {
            this.setState({ errorMessage: err.message });
        }

         this.setState({ loading: false });

         Router.replaceRoute(`/campaigns/${this.props.address}`);


    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading}  primary>
                    Contribute!
                </Button>
            </Form>
        );
    }
}
