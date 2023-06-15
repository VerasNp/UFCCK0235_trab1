import React, {Component} from 'react'
import './index.css'

export class Button extends Component{
    render(){
        return(
            <button className='btn'>{this.props.children}</button>
        )
    }
}
