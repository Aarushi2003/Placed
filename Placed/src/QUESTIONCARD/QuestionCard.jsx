import React from 'react'
import "./questioncard.css"
function QuestionCard(props) {
    
    return (
    <div className="question-card-container">
        <div className="op">
            {/* {props.op} */}
            <div className="tab">
                <div className="tab-image-container">
                    <img className='tab-image' src="https://raiagroup.org/wp-content/uploads/2019/12/Narendra-Modi.png"/>
                </div>
                <div className="tab-title">
                User X
                </div>
            </div>
        </div>
        <div className="content">
            {props.content}
        </div>
    </div>
    )
}

export default QuestionCard