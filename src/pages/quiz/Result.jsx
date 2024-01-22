import { useSearchParams } from 'react-router-dom'
import { Layout, Card, Typography, Image, Tag, Button, Flex } from 'antd'
import { useTranslation } from 'react-i18next'
import ValueCard from '../../components/ValueCard'
import IDEOLOGIES from '../../data/ideologies'
import POLITICAL_PARTIES from '../../data/politicalparties'

import Balance from '../../assets/values/Balance.svg'
import DollarSign from '../../assets/values/DollarSign.svg'
import RecyclingSymbol from '../../assets/values/RecyclingSymbol.svg'
import Factory from '../../assets/values/Factory.svg'
import Liberty from '../../assets/values/Liberty.svg'
import Crown from '../../assets/values/Crown.svg'
import RainbowFlag from '../../assets/values/RainbowFlag.svg'
import Family from '../../assets/values/Family.svg'
import FlagOfTWIndependence from '../../assets/values/FlagOfTWIndependence.svg'
import ChinaTerritory from '../../assets/values/ChinaTerritory.svg'
import FlagOfUSA from '../../assets/values/FlagOfUSA.svg'
import FlagOfPRC from '../../assets/values/FlagOfPRC.svg'

const { Text } = Typography

const getIdeologyMatchScores = (weights) => {
  const ideologyScores = IDEOLOGIES.map((value) => {
    let distance = 0.0
    distance += Math.pow(Math.abs(value.weight.economic - weights.economic), 2)
    distance += Math.pow(Math.abs(value.weight.civil - weights.civil), 2)
    distance += Math.pow(Math.abs(value.weight.societal - (0.25 * weights.environmental + 0.75 * weights.societal)), 2)
    distance += Math.pow(Math.abs(value.weight.diplomatic - weights.diplomatic), 2)
    return {
      id: value.id,
      distance: distance,
    }
  }).sort((lhs, rhs) => lhs.distance < rhs.distance ? -1 : lhs.distance > rhs.distance ? 1 : 0)

  return ideologyScores
}

export const getPoliticalPartyMatchScores = (weights) => {
  const politicalScores = POLITICAL_PARTIES.map((value) => {
    let distance = 0.0
    distance += Math.pow(Math.abs(value.weight.economic - weights.economic), 2)
    distance += Math.pow(Math.abs(value.weight.environmental - weights.environmental), 2)
    distance += Math.pow(Math.abs(value.weight.civil - weights.civil), 2)
    distance += Math.pow(Math.abs(value.weight.societal - weights.societal), 2)
    distance += Math.pow(Math.abs(value.weight.sovereignty - weights.sovereignty), 2)
    distance += Math.pow(Math.abs(value.weight.us_china_relation - weights.us_china_relation), 2)
    const threshold = 6 * 50 * 50
    let rate = Math.pow(Math.max(0, threshold - distance) / threshold, 2)
    return {
      ...value,
      distance: distance,
      rate: rate,
    }
  }).sort((lhs, rhs) => lhs.distance < rhs.distance ? -1 : lhs.distance > rhs.distance ? 1 : 0)

  return politicalScores
}

const Result = () => {

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams()
  const [t, i18n] = useTranslation()

  const isLanguage = (lang) => {
    return i18n.language == lang
  }

  const weights = {
    economic: searchParams.get('economic'),
    environmental: searchParams.get('environmental'),
    civil: searchParams.get('civil'),
    societal: searchParams.get('societal'),
    diplomatic: searchParams.get('diplomatic'),
    sovereignty: searchParams.get('sovereignty'),
    us_china_relation: searchParams.get('us_china_relation'),
  }

  const getBestMatchIdeologies = (ideologyScores) => {
    const top3 = ideologyScores
      .filter((value) => value.distance <= 20 * 20 * 4)
      .slice(0, 3)

    return top3.length > 0 ? top3 : ideologyScores.slice(0, 1)
  }

  const getCategory = (percent) => {
    if (percent <= 10) {
      return 6
    }
    if (percent <= 25) {
      return 5
    }
    if (percent <= 40) {
      return 4
    }
    if (percent >= 90) {
      return 0
    }
    if (percent >= 75) {
      return 1
    }
    if (percent >= 60) {
      return 2
    }

    return 3
  }

  const getSizeWithStep = (initial, stepSize, maxSteps, index) => {
    return initial + stepSize * Math.min(Math.max(1, maxSteps) - 1, index)
  }

  return (
    <Layout style={{
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
    }}>
      <Card
        title={t('quiz.result.ideologies.name')}
        headStyle={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: 'x-large',
          textAlign: 'center',
        }}
        style={{
          backgroundColor: 'white',
          width: '100%',
          fontSize: 'large',
          margin: '5px 10px 5px 10px',
        }}>
        {getBestMatchIdeologies(getIdeologyMatchScores(weights)).map((value, index) => {
          const linkRC = `quiz.result.ideologies.data.${value.id}.link`
          const link = i18n.exists(linkRC) ? t(linkRC) : null
          const inner = () => (
            <Layout
              style={{
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Text
                style={{
                  margin: '10px',
                  fontSize: isLanguage('en') ?
                    `${getSizeWithStep(140, -16, 3, index)}%` :
                    `${getSizeWithStep(180, -24, 3, index)}%`,
                  fontWeight: 'bold',
                  color: 'black',
                  textAlign: 'center',
                }}>
                {t(`quiz.result.ideologies.data.${value.id}.name`)}
              </Text>
            </Layout>
          )
          return link && link.length > 0 ?
            <a
              key={`ideology.${value.id}`}
              href={link}
              target='_blank'
            >
              {inner()}
            </a> :
            <div key={`ideology.${value.id}`}>
              {inner()}
            </div>
        })}
      </Card>
      <Card
        title={t('quiz.result.political_parties.name')}
        headStyle={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: 'x-large',
          textAlign: 'center',
        }}
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          fontSize: 'large',
          margin: '5px 10px 5px 10px',
        }}>
        {getPoliticalPartyMatchScores(weights)
          .map((value, index) => (
            <a
              key={`party.${value.id}`}
              href={t(`quiz.result.political_parties.data.${value.id}.link`)}
              target='_blank'
            >
              <Flex
                justify='center'
                align='center'
              >
                <Image
                  width={getSizeWithStep(24, -3, 4, index)}
                  src={value.icon}
                  preview={false}
                />
                <Text
                  style={{
                    margin: '10px',
                    fontSize: isLanguage('en') ?
                      `${getSizeWithStep(100, -8, 4, index)}%` :
                      `${getSizeWithStep(140, -16, 4, index)}%`,
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  {t(`quiz.result.political_parties.data.${value.id}.name`)}
                </Text>
                <Text
                  style={{
                    color: 'crimson',
                    fontSize: isLanguage('en') ?
                      `${getSizeWithStep(100, -8, 4, index)}%` :
                      `${getSizeWithStep(100, -8, 4, index)}%`,
                    textAlign: 'center',
                  }}>
                  {`${Math.round(value.rate * 100)}%`}
                </Text>
              </Flex>
            </a>
          ))}
      </Card>
      <Card
        title={t('quiz.result.tags.name')}
        headStyle={{
          backgroundColor: 'white',
          color: 'black',
          fontSize: 'x-large',
          textAlign: 'center',
        }}
        style={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          margin: '5px 10px 5px 10px',
        }}>
        {searchParams.get('tags').split(',').map((value) => {
          const name = t(`quiz.result.tags.data.${value}.name`)
          const description = t(`quiz.result.tags.data.${value}.description`)
          const link = t(`quiz.result.tags.data.${value}.link`)
          return (
            <Flex
              key={`tags.${value}`}
              justify='start'
              align='center'
              style={{ marginTop: '10px', marginBottom: '10px' }}>
              <Button
                size='small'
                type='default'
                href={link ? link : null}
                target='_blank'
                style={{
                  margin: '4px',
                  color: 'dodgerblue',
                  fontWeight: 'bold',
                }}>
                {name}
              </Button>
              <Text style={{ margin: '4px' }}>{description}</Text>
            </Flex>
          )
        })}
      </Card>
      <ValueCard
        title={t('quiz.result.axes.economic.title')}
        leftTitle={t('quiz.result.axes.economic.equality')}
        rightTitle={t('quiz.result.axes.economic.market')}
        leftImage={Balance}
        rightImage={DollarSign}
        leftColor='crimson'
        rightColor='turquoise'
        percent={weights.economic}
        leaningsTitle={t(`quiz.result.axes.economic.categories.${getCategory(weights.economic)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.environmental.title')}
        leftTitle={t('quiz.result.axes.environmental.ecology')}
        rightTitle={t('quiz.result.axes.environmental.production')}
        leftImage={RecyclingSymbol}
        rightImage={Factory}
        leftColor='forestgreen'
        rightColor='dodgerblue'
        percent={weights.environmental}
        leaningsTitle={t(`quiz.result.axes.environmental.categories.${getCategory(weights.environmental)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.civil.title')}
        leftTitle={t('quiz.result.axes.civil.liberty')}
        rightTitle={t('quiz.result.axes.civil.authority')}
        leftImage={Liberty}
        rightImage={Crown}
        leftColor='gold'
        rightColor='red'
        percent={weights.civil}
        leaningsTitle={t(`quiz.result.axes.civil.categories.${getCategory(weights.civil)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.societal.title')}
        leftTitle={t('quiz.result.axes.societal.progress')}
        rightTitle={t('quiz.result.axes.societal.tradition')}
        leftImage={RainbowFlag}
        rightImage={Family}
        leftColor='magenta'
        rightColor='brown'
        percent={weights.societal}
        leaningsTitle={t(`quiz.result.axes.societal.categories.${getCategory(weights.societal)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.sovereignty.title')}
        leftTitle={t('quiz.result.axes.sovereignty.independence')}
        rightTitle={t('quiz.result.axes.sovereignty.unification')}
        leftImage={FlagOfTWIndependence}
        rightImage={ChinaTerritory}
        leftColor='green'
        rightColor='black'
        percent={weights.sovereignty}
        leaningsTitle={t(`quiz.result.axes.sovereignty.categories.${getCategory(weights.sovereignty)}`)}
      />
      <ValueCard
        title={t('quiz.result.axes.us_china_relation.title')}
        leftTitle={t('quiz.result.axes.us_china_relation.pro_american')}
        rightTitle={t('quiz.result.axes.us_china_relation.pro_chinese')}
        leftImage={FlagOfUSA}
        rightImage={FlagOfPRC}
        leftColor='navy'
        rightColor='red'
        percent={weights.us_china_relation}
        leaningsTitle={t(`quiz.result.axes.us_china_relation.categories.${getCategory(weights.us_china_relation)}`)}
      />
    </Layout>
  )
}

export default Result
