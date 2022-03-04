import React from 'react'
import { Doughnut } from 'react-chartjs-2'

const CashFlow = (props) => {
  return (
    <div>
        <Doughnut data={props.dataChart} options={props.optionsChart}/>
    </div>
  )
}

export default CashFlow