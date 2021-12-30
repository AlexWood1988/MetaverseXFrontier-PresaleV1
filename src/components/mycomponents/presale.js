import React from 'react';
import PresaleWeb3 from './Web3/presaleWeb3';

const communities = {
    OFFICIAL:{
        address:'0x2cc64f8EbCe111D97F7Fa18468B8ACA46Dc46Cf7',
        price:0.09
    }
}

class Presale extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bnbprice: 0,
            bnbAmount: 0,
            price: 0.1,
            buytoken: 0,
            discount: false,
            discountName: '',
            bnbAmount2: 0,
            price2: 0.1,
            buytoken2: 0
        }
    }

    componentDidMount=()=>{
        PresaleWeb3.init().then(re => {
            PresaleWeb3.getBNBPrice().then(re => {
                this.setState({bnbprice: re});
            })
        })
    }

    amountOnChange=(event)=>{
        this.setState({bnbAmount:Number(event.target.value)});
        this.setState({buytoken: Math.floor(Number(event.target.value)*this.state.bnbprice / this.state.price)});

    }

    amountOnChange2=(event)=>{
        this.setState({bnbAmount2:Number(event.target.value)});
        this.setState({buytoken2: Math.floor(Number(event.target.value)*this.state.bnbprice / this.state.price2)});
    }

    inviteOnChange=(event)=>{
        let _price = 0.1;
        if (communities.hasOwnProperty(event.target.value)) {
            _price = communities[event.target.value].price;
            this.setState({price:0.09, discount: true, discountName:event.target.value});
        } else {
            _price = 0.1;
            this.setState({price:0.1, discount: false, discountName:''});
        }
        this.setState({buytoken: Math.floor(this.state.bnbAmount*this.state.bnbprice / _price)});
    }

    buyTokenDiscount=()=>{
        PresaleWeb3.buyTokenDiscount(''+this.state.bnbAmount, communities[this.state.discountName].address).then(re=>{});
    }

    buyToken=()=>{
        PresaleWeb3.buyToken(''+this.state.bnbAmount2).then(re=>{});
    }

    render(){
        return(
            <section className='container no-top no-bottom'>
                <div className='row'>
                <div className="spacer-double"></div>
                <div className='col-lg-12 mb-2'>
                    <h2>Presale</h2>
                </div>
                </div> 

                <div className='row'>
                <div className="col-lg-4 offset-lg-2 m-auto col-md-6 mb-3">
                    <div className="box-login">

                    <h3 className="mb10">Whitelist Pre-order</h3>
                    <p>Get special discount from whitelisted organizations.</p>

                        <div className="field-set">
                            <input type='number' name='BNB' id='BNB' className="form-control" placeholder="BNB Amount" onChange={this.amountOnChange}/>
                        </div>

                        <div className="field-set">
                            <input type='text' name='invite' id='invite' className="form-control" placeholder="invite code" onChange={this.inviteOnChange}/>
                        </div>

                        <div className="p_list">
                            <div className="p_list_pp">
                                <span>
                                    <img className="lazy" src="./img/myicons/btc.png" alt=""/>
                                </span>
                            </div>                                    
                            <div className="p_list_info">
                                Exchange For <b>{this.state.buytoken} MXC</b>
                                <span>BNB Price: ${this.state.bnbprice}</span>
                            </div>
                        </div>


                        <div className="p_list">
                            <div className="p_list_pp">
                                <span>
                                    <img className="lazy" src="./img/myicons/discount.png" alt=""/>
                                </span>
                            </div>
                            {
                                this.state.discount
                                ?
                                <div className="p_list_info">
                                    Price: <b>{this.state.price}U / MXC</b>
                                    <span>{this.state.discountName} Discount</span>
                                </div>
                                :
                                <div className="p_list_info">
                                    Please enter the invitation code
                                    <span>No Discount</span>
                                </div>
                            }                                 
                        </div>
                        
                        <div className="field-set">
                        <input type='submit' onClick={this.buyTokenDiscount} id='send_message' value='Buy' className="btn btn-main btn-fullwidth color-2" disabled={this.state.discount ? false : true}/>
                        </div>
                        
                    </div>
                </div>

                <div className="col-lg-4 offset-lg-2 m-auto col-md-6 mb-3">
                    <div className="box-login">
                    <h3 className="mb10">Public Presale</h3>
                    <p>Public pre-sale, purchase MXC tokens in advance to gain investment advantage.</p>

                    <div className="field-set">
                            <input type='number' name='BNB' id='BNB' className="form-control" placeholder="BNB Amount" onChange={this.amountOnChange2}/>
                        </div>

                        <div className="field-set">
                            <input type='email' name='email' id='email' className="form-control" placeholder="(optional) Your email"/>
                        </div>

                        <div className="p_list">
                            <div className="p_list_pp">
                                <span>
                                    <img className="lazy" src="./img/myicons/btc.png" alt=""/>
                                </span>
                            </div>                                    
                            <div className="p_list_info">
                                Exchange For <b>{this.state.buytoken2} MXC</b>
                                <span>BNB Price: ${this.state.bnbprice}</span>
                            </div>
                        </div>


                        <div className="p_list">
                            <div className="p_list_pp">
                                <span>
                                    <img className="lazy" src="./img/myicons/token.png" alt=""/>
                                </span>
                            </div>                                    
                            <div className="p_list_info">
                                Price: <b>{this.state.price2}U / MXC</b>
                                <span>No Discount</span>
                            </div>
                        </div>

                        <div className="field-set">
                        <input type='submit' onClick={this.buyToken} id='send_message' value='Buy' className="btn btn-main btn-fullwidth color-2"/>
                        </div>
                        
                    </div>
                </div>
                </div>
            </section>
        );
    }
}

export default Presale;