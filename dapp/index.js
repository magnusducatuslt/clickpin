import 'config/dclib'

import SW from 'ServiceWorker/SW'

// import MyDApp from 'app'
import 'babel-polyfill'
import 'view/main'
import DCLib from './DCCore/index.js'
import dappLogicInit from './dapp.logic.js'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style/app.css'

import Bomb from './components/Bomb.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      game: {
        status: '',
        result: '',
        time: '',
        methodes: {},
        clickedPlace: {
          clicked: false
        }
      },
      bomb: {
        oneDisplay: 0,
        twoDisplay: 0,
        threeDisplay: 0
      },
      participants: {
        player: {
          account: '',
          bet: '',
          eth: '',
          isRoll: false
        },
        bankroller: {
          isFound: false,
          address: '',
          account: ''
        }
      },
      inputValue: {
        numValue: 0,
        betValue: 0,
        depositeValue: 0
      }
    }
  }
  componentDidMount () {
    const that = this
    const { participants } = this.state

    DCLib.on('ready', function () {
      dappLogicInit(DCLib, 'DCGame_FTE_v1')
      DCLib.Account.initAccount(function () {
        participants.player.account = DCLib.Account
        // $('#user_address').html(
        //   '<a target="_blank" href="https://ropsten.etherscan.io/address/' +
        //     DCLib.Account.get().openkey +
        //     '">' +
        //     DCLib.Account.get().openkey +
        //     '</a>'
        // )
        // $('#faucet').attr(
        //   'href',
        //   'https://platform.dao.casino/faucet?to=' + DCLib.Account.get().openkey
        // )
        window.Dice = new DCLib.DApp({
          slug: 'DCGame_FTE_v1',
          contract: {
            address: '0xaB444c38096FfC7793D2f4a19d3BB8BAfD6853EE',
            abi: [
              {
                constant: true,
                inputs: [{ name: '', type: 'bytes32' }],
                name: 'disputes',
                outputs: [
                  { name: 'disputeSeed', type: 'bytes32' },
                  { name: 'disputeBet', type: 'uint256' },
                  { name: 'initiator', type: 'address' }
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: false,
                inputs: [
                  { name: '_id', type: 'bytes32' },
                  { name: '_session', type: 'uint256' },
                  { name: '_disputeBet', type: 'uint256' },
                  { name: '_gameData', type: 'uint256[]' },
                  { name: '_disputeSeed', type: 'bytes32' },
                  { name: '_sign', type: 'bytes' }
                ],
                name: 'openDispute',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function'
              },
              {
                constant: true,
                inputs: [],
                name: 'playerWL',
                outputs: [{ name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: false,
                inputs: [
                  { name: '_id', type: 'bytes32' },
                  { name: '_N', type: 'bytes' },
                  { name: '_E', type: 'bytes' },
                  { name: '_rsaSign', type: 'bytes' }
                ],
                name: 'resolveDispute',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function'
              },
              {
                constant: false,
                inputs: [
                  { name: '_id', type: 'bytes32' },
                  { name: '_playerBalance', type: 'uint256' },
                  { name: '_bankrollerBalance', type: 'uint256' },
                  { name: '_totalBet', type: 'uint256' },
                  { name: '_session', type: 'uint256' },
                  { name: '_sign', type: 'bytes' }
                ],
                name: 'updateChannel',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function'
              },
              {
                constant: true,
                inputs: [],
                name: 'config',
                outputs: [
                  { name: 'maxBet', type: 'uint256' },
                  { name: 'minBet', type: 'uint256' },
                  { name: 'gameDevReward', type: 'uint8' },
                  { name: 'bankrollReward', type: 'uint8' },
                  { name: 'platformReward', type: 'uint8' },
                  { name: 'refererReward', type: 'uint8' }
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: true,
                inputs: [{ name: '', type: 'bytes32' }],
                name: 'channels',
                outputs: [
                  { name: 'state', type: 'uint8' },
                  { name: 'player', type: 'address' },
                  { name: 'bankroller', type: 'address' },
                  { name: 'playerBalance', type: 'uint256' },
                  { name: 'bankrollerBalance', type: 'uint256' },
                  { name: 'totalBet', type: 'uint256' },
                  { name: 'session', type: 'uint256' },
                  { name: 'endBlock', type: 'uint256' },
                  { name: 'RSAHash', type: 'bytes32' }
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: true,
                inputs: [],
                name: 'rsa',
                outputs: [{ name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: true,
                inputs: [
                  { name: '_hash', type: 'bytes32' },
                  { name: 'signature', type: 'bytes' }
                ],
                name: 'recoverSigner',
                outputs: [{ name: '', type: 'address' }],
                payable: false,
                stateMutability: 'pure',
                type: 'function'
              },
              {
                constant: false,
                inputs: [
                  { name: '_id', type: 'bytes32' },
                  { name: '_playerBalance', type: 'uint256' },
                  { name: '_bankrollerBalance', type: 'uint256' },
                  { name: '_totalBet', type: 'uint256' },
                  { name: '_session', type: 'uint256' },
                  { name: '_close', type: 'bool' },
                  { name: '_sign', type: 'bytes' }
                ],
                name: 'closeByConsent',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function'
              },
              {
                constant: true,
                inputs: [],
                name: 'developer',
                outputs: [{ name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: true,
                inputs: [],
                name: 'safeTime',
                outputs: [{ name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: true,
                inputs: [],
                name: 'refContract',
                outputs: [{ name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: false,
                inputs: [
                  { name: '_id', type: 'bytes32' },
                  { name: '_player', type: 'address' },
                  { name: '_bankroller', type: 'address' },
                  { name: '_playerBalance', type: 'uint256' },
                  { name: '_bankrollerBalance', type: 'uint256' },
                  { name: '_openingBlock', type: 'uint256' },
                  { name: '_gameData', type: 'uint256[]' },
                  { name: '_N', type: 'bytes' },
                  { name: '_E', type: 'bytes' },
                  { name: '_sign', type: 'bytes' }
                ],
                name: 'openChannel',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function'
              },
              {
                constant: true,
                inputs: [],
                name: 'gameWL',
                outputs: [{ name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: false,
                inputs: [{ name: '_id', type: 'bytes32' }],
                name: 'closeByTime',
                outputs: [],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function'
              },
              {
                constant: true,
                inputs: [],
                name: 'token',
                outputs: [{ name: '', type: 'address' }],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                inputs: [
                  { name: '_token', type: 'address' },
                  { name: '_ref', type: 'address' },
                  { name: '_gameWL', type: 'address' },
                  { name: '_playerWL', type: 'address' },
                  { name: '_rsa', type: 'address' }
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'constructor'
              },
              {
                anonymous: false,
                inputs: [
                  { indexed: false, name: 'action', type: 'string' },
                  { indexed: false, name: 'id', type: 'bytes32' },
                  { indexed: false, name: 'playerBalance', type: 'uint256' },
                  {
                    indexed: false,
                    name: 'bankrollerBalance',
                    type: 'uint256'
                  },
                  { indexed: false, name: 'session', type: 'uint256' }
                ],
                name: 'logChannel',
                type: 'event'
              },
              {
                anonymous: false,
                inputs: [
                  { indexed: false, name: 'action', type: 'string' },
                  { indexed: false, name: 'initiator', type: 'address' },
                  { indexed: false, name: 'id', type: 'bytes32' },
                  { indexed: false, name: 'session', type: 'uint256' },
                  { indexed: false, name: 'seed', type: 'bytes32' }
                ],
                name: 'logDispute',
                type: 'event'
              },
              {
                constant: true,
                inputs: [
                  { name: '_gameData', type: 'uint256[]' },
                  { name: '_bet', type: 'uint256' }
                ],
                name: 'checkGameData',
                outputs: [{ name: '', type: 'bool' }],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: true,
                inputs: [
                  { name: '_gameData', type: 'uint256[]' },
                  { name: '_bet', type: 'uint256' },
                  { name: '_sigseed', type: 'bytes' }
                ],
                name: 'game',
                outputs: [
                  { name: '_win', type: 'bool' },
                  { name: '_amount', type: 'uint256' }
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function'
              },
              {
                constant: true,
                inputs: [
                  { name: '_gameData', type: 'uint256[]' },
                  { name: '_bet', type: 'uint256' }
                ],
                name: 'getProfit',
                outputs: [{ name: '_profit', type: 'uint256' }],
                payable: false,
                stateMutability: 'pure',
                type: 'function'
              },
              {
                constant: true,
                inputs: [
                  { name: '_sigseed', type: 'bytes' },
                  { name: '_min', type: 'uint256' },
                  { name: '_max', type: 'uint256' }
                ],
                name: 'generateRnd',
                outputs: [{ name: '', type: 'uint256' }],
                payable: false,
                stateMutability: 'pure',
                type: 'function'
              }
            ]
          },
          rules: {
            depositX: 2
          }
        })

        // Init interface
        that.initControllInterface()
        that.setState({ participants: participants })
      })
    })
  }
  initControllInterface = eventHandlers => {
    const that = this
    const { participants } = this.state
    let deposit_set = false
    const updateBalanceState = function () {
      DCLib.Account.info(function (info) {
        participants.player.bet = info.balance.bet
        participants.player.eth = info.balance.eth

        setTimeout(updateBalanceState, 30000)

        if (info.balance.bet > 0) {
          if (!deposit_set) {
            deposit_set = true
            var d = (info.balance.bet * 0.5).toFixed(2)
            if (d > 1) {
              d = 1
            }
          }
        }
        that.setState({ participants: participants })
      })
    }
    updateBalanceState()
  }
  startGame = deposit => {
    const that = this
    const { participants } = this.state
    window.Dice.connect(
      {
        bankroller: 'auto',
        paychannel: { deposit: deposit },
        gamedata: { type: 'uint', value: [1, 2, 3] }
      },
      function (connected, info) {
        console.log('connect result:', connected)
        console.log('connect info:', info)
        participants.bankroller.isFound = true
        console.log(participants)
        that.setState({ participants })
        if (!connected) return

        // let maxbet = DCLib.Utils.dec2bet(info.channel.player_deposit)

        // $('#user_bet')[0].max = Math.ceil(maxbet)
        // $('#user_bet').val((maxbet * 0.1).toFixed(2))

        // $('body').addClass('cur-step-2').addClass('cur-step-3')
      }
    )
  }
  makeRoll = (user_bet, clicked, args) => {
    console.log(user_bet)
    const that = this
    const { participants } = this.state
    if (user_bet !== 0) {
      let random_hashOne
      random_hashOne = DCLib.randomHash({
        bet: user_bet,
        gamedata: [args[0], args[1], args[2], clicked]
      })
      window.Dice.Game(
        user_bet,
        [args[0], args[1], args[2], clicked],
        random_hashOne
      ).then(function (result) {
        console.log('result', result)
        participants.player.isRoll = false
        that.setState({ participants })
        // this.renderGames()
        // var ubets = window.Dice.Game.payChannel.getBalance()
        // $('#user_bet').max = ubets
      })
    } else {
      return
    }
  }
  endGame = () => {
    window.Dice.disconnect(function (res) {
      console.log('disconnect result', res)
    })
  }
  renderGames = history => {
    if (typeof Game === 'undefined') {
      window.Game = window.Dice.logic
    }
    history = history || window.Dice.Game.history
  }
  handleSubmitDeposite = () => {
    console.log('deposite', this.state.inputValue.depositeValue)
    const { depositeValue } = this.state.inputValue
    console.log('deposite value', depositeValue)
    this.startGame(depositeValue)
  }
  handleSubmitBet = e => {
    const { participants } = this.state
    participants.player.isRoll = true
    this.setState({ participants })
  }
  handleChangeInputDeposite = e => {
    console.log(e.target.value)
    const { inputValue } = this.state
    inputValue.depositeValue = e.target.value
    this.setState({ inputValue })
  }
  handleChangeInputBet = e => {
    const { inputValue } = this.state
    inputValue.betValue = e.target.value
    this.setState({ inputValue })
  }
  handleChangeInputNumberByPlayer = e => {
    const { inputValue } = this.state
    inputValue.numValue = e.target.value
    this.setState({ inputValue })
  }
  // for setClicked
  // setClickedPoints = ({ x, y, clicked }) => {
  //   const { game } = this.state

  //   game.clickedPlace.x = x
  //   game.clickedPlace.y = y
  //   game.clickedPlace.clicked = clicked
  //   game.clickedPlace.isOpen = true
  //   this.makeRoll(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  //   this.setState({ game: game })
  // }

  render () {
    const that = this
    const { participants, inputValue, bomb } = this.state
    return (
      <div>
        <div>
          <Status status={'Status'} />
          <Account account={participants.player} />
        </div>
        <br />
        <br />
        <br />
        {!participants.bankroller.isFound ? (
          <div className="confirm__pane">
            <Input
              onChange={that.handleChangeInputDeposite}
              context={that}
              name={'Deposite'}
              value={inputValue.depositeValue}
            />
            <br />
            <Button
              onSubmit={that.handleSubmitDeposite}
              context={that}
              name={'Set'}
            />
          </div>
        ) : (
          <div className="confirm__pane">
            <Input
              onChange={that.handleChangeInputBet}
              context={that}
              name={'Bet'}
              value={inputValue.bet}
            />
            <br />
            <Button
              onSubmit={that.handleSubmitBet}
              context={that}
              name={'Roll'}
            />
          </div>
        )}
        <br />
        {
          <Bomb
            isFound={participants.bankroller.isFound}
            makeRoll={this.makeRoll}
            isRoll={participants.player.isRoll}
            howMuch={inputValue.betValue}
          />
        }
      </div>
    )
  }
}
const Account = ({ account, context }) => {
  const componentData = {}
  if (account.account !== '') {
    componentData.address = account.account.get().openkey
    componentData.bet = account.bet
    componentData.eth = account.eth
  } else {
    componentData.address = 'wait for auth'
    componentData.bet = ''
    componentData.eth = ''
  }
  return (
    <div>
      <div className="address">
        Your address:{' '}
        <strong style={{ color: '#fa00a0' }}>{componentData.address}</strong>
      </div>
      <div className="balance">
        <div className="balance__bet">
          bet: <strong style={{ color: '#fa00a0' }}>{componentData.bet}</strong>
        </div>
        <div className="balance_eth">
          eth: <strong style={{ color: '#fa00a0' }}>{componentData.eth}</strong>
        </div>
      </div>
    </div>
  )
}
const Button = ({ name, context, onSubmit }) => {
  return (
    <div>
      <button
        className="button_money"
        onClick={onSubmit}
        ref={node => (context[`nodeButton${name}`] = node)}
        type="button"
        style={{ width: '50%' }}
      >
        {name}
      </button>
    </div>
  )
}
const Input = ({ onChange, name, context, value }) => {
  return (
    <div>
      <input
        className="inputSetRoll"
        ref={node => (context[`nodeInput${name}`] = node)}
        type="number"
        placeholder={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
const Status = ({ status }) => {
  return (
    <div>
      <h1>{status}</h1>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

console.groupCollapsed('⚙︎ ENV Settings')
console.table(process.env)
console.groupEnd()

// Register Service Worker
if (process.env.DAPP_SW_ACTIVE) SW.register()
