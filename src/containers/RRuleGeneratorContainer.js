import React from 'react'

import GeneratorProvider from '../providers/GeneratorContext'
import { ReactRRuleGenerator } from '../components/generator/RRuleGenerator'

const RRuleGeneratorContainer = props => {
  return (
    <GeneratorProvider componentProps={props}>
      <ReactRRuleGenerator />
    </GeneratorProvider>
  )
}

export default RRuleGeneratorContainer
