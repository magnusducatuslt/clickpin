import React, { Component } from 'react'
import ReactDOM from 'react-dom'
const Button = ({ name, onClick, classId }) => {
  return (
    <div>
      <button className={classId} onClick={onClick} type="button" value={name}>
        {name}
      </button>
    </div>
  )
}
const Input = ({ value }) => {
  return (
    <div
      className="display__number"
      style={{ borderRight: '2px outset black' }}
    >
      <span>{value}</span>
    </div>
  )
}
export default class Bomb extends Component {
  constructor (props) {
    super()
    this.state = {
      bomb: {
        timer: {
          secondsRest: '05'
        },
        oneDisplay: 3,
        twoDisplay: 2,
        threeDisplay: 1
      }
    }
  }
  inputValueToBombDisplay = val => {
    console.log(val)
    const { bomb } = this.state
    if (bomb.oneDisplay === 0) bomb.oneDisplay = val.target.value
    else if (bomb.twoDisplay === 0) bomb.twoDisplay = val.target.value
    else if (bomb.threeDisplay === 0) bomb.threeDisplay = val.target.value
    this.setState({ bomb })
  }
  resetValuesOnDisplay = () => {
    console.log('reset')
    const { bomb } = this.state
    bomb.oneDisplay = 0
    bomb.twoDisplay = 0
    bomb.threeDisplay = 0
    this.setState({ bomb })
  }
  render () {
    const { isRoll, howMuch } = this.props
    const { bomb } = this.state
    let array = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    const buttons = array.map(row => {
      let elems = row.map(elem => (
        <Button
          key={elem}
          onClick={this.inputValueToBombDisplay}
          classId={'inputNums'}
          name={elem}
        />
      ))
      return <div>{elems}</div>
    })
    console.log(array)
    // for (let element = 1; element < 10; element++) {
    //   element === 3 || element === 6 || element === 9
    //     ? buttons.push(
    //       <Button
    //         key={element}
    //         onClick={this.inputValueToBombDisplay}
    //         name={element}
    //       />
    //     )
    //     : buttons.push(
    //       <Button
    //         key={element}
    //         onClick={this.inputValueToBombDisplay}
    //         name={element}
    //       />
    //     )
    // }
    return (
      <div className="bomb__jacket">
        <div className="bomb__header">
          <div className="bomb__header__hour">00:</div>
          <div className="bomb__header__seconds">{bomb.secondsRest}</div>
        </div>
        <div className="bomb__body">
          <br />
          <div className="bomb__body__display">
            <Input name={`one`} value={bomb.oneDisplay} />
            <Input name={`two`} value={bomb.twoDisplay} />
            <Input name={`three`} value={bomb.threeDisplay} />
          </div>
          <br />
          <div className="bomb__body__buttons">{buttons}</div>
          <div className="bomb__body__controll">
            <button type="button" onClick={this.resetValuesOnDisplay}>
              reset
            </button>
            {isRoll ? (
              <button
                type="button"
                onClick={() =>
                  this.props.makeRoll(howMuch, 1, [
                    +bomb.oneDisplay,
                    +bomb.twoDisplay,
                    +bomb.threeDisplay
                  ])
                }
              >
                Uncharge
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  }
}
