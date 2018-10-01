/* global DCLib */
const defineDAppLogic = (DCLib, slug) => {
  DCLib.defineDAppLogic(slug, function (payChannel) {
    const MAX_RAND_NUM = 9
    const isWInner = 1

    let history = []

    var Roll = function (userBet, userData, random_hash) {
      // if (userNum < 1 || userNum > MAX_RAND_NUM) {
      //   console.warn('Invalid usernum, min:1 , max ' + MAX_RAND_NUM + '')
      //   return
      // }let random_hashOne, random_hashTwo, random_hashThree
      console.log(userData)
      console.log((random_hash / 3).toFixed(0))
      // convert 1BET to 100000000
      userBet = DCLib.Utils.bet2dec(userBet)
      // generate random number
      console.log(random_hash, userBet, MAX_RAND_NUM)
      const randomNumOne = DCLib.numFromHash(1, 1, MAX_RAND_NUM)
      const randomNumTwo = DCLib.numFromHash(2, 1, MAX_RAND_NUM)
      const randomNumThree = DCLib.numFromHash(
        userData[1].hash,
        1,
        MAX_RAND_NUM
      )

      let profit = -userBet
      // if user win
      if (
        userData[3] === isWInner &&
        userData[0].num === randomNumOne &&
        userData[1].num === randomNumTwo &&
        userData[2].num === randomNumThree
      ) {
        profit = userBet * randomNumThree - userBet
      }
      // add result to paychannel
      payChannel.addTX(profit)

      // console log current paychannel state
      payChannel.printLog()

      // push all data to our log
      // just FOR DEBUG
      const rollItem = {
        // !IMPORTANT Time can be different on client and bankroller sides
        // not use time in your primary game logic
        timestamp: new Date().getTime(),

        user_bet: userBet,
        profit: profit,
        userData: userData,
        balance: payChannel.getBalance(),
        random_hash: random_hash,
        random_num: [randomNumThree, randomNumTwo, randomNumOne]
      }
      history.push(rollItem)

      return rollItem
    }

    return {
      Game: Roll,
      history: history
    }
  })
}
export default defineDAppLogic
