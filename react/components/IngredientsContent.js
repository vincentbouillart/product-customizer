import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'

import ToggledChoice from './Variation/Items/ToggledChoice'
import MultipleChoice from './Variation/Items/MultipleChoice'

class IngredientsContent extends Component {
  static propTypes = {
    /* Control the open state */
    isOpen: PropTypes.bool,
    /* Trigger function to close component */
    onClose: PropTypes.func,
    /* Object with indexes and ammount of selected optional variations */
    chosenAmount: PropTypes.object,
    chosenAmountBasic: PropTypes.object,
    /* Triggers function to execute on change variations */
    onVariationChange: PropTypes.func,
    /* Current required variation selected */
    currentVariation: PropTypes.object,
    /* Current optionals variations selected */
    optionalVariations: PropTypes.object,
    /* Composition of Product */
    compositionVariations: PropTypes.object,
    onVariationChangeBasic: PropTypes.func
  }

  render() {
    const {
      chosenAmount,
      chosenAmountBasic,
      currentVariation,
      onVariationChange,
      onVariationChangeBasic,
      optionalVariations,
      compositionVariations,
    } = this.props

    return (
      currentVariation && (
        <div className="vtex-product-customizer__change-ingredients pb10">
          <h3 className="b--light-gray bb bw1 pa5 ma0 b near-black">
            <FormattedMessage id="product-customizer.change-ingredients" />
          </h3>
          <div className="change-ingredients--selected-variation">
            <legend className="bg-near-white w-100 ph5 pv4">
              <FormattedMessage id="product-customizer.your-variation" />
            </legend>
            <div className="flex items-center pa5">
              <img
                src={currentVariation.variation.image}
                width="48"
                className="br3 h-100"
              />
              <div className="pa5">
                <h4 className="ma0">{currentVariation.variation.name}</h4>
              </div>
            </div>

            <legend className="bg-near-white w-100 ph5 pv4 mb4">
              <FormattedMessage id="product-customizer.select-your-ingredients" />
            </legend>
            <div className="change-ingredients--selected-ingredients ph5 mb5">
              <p className="pv3 bb b--light-gray ttu ma0 f7 b near-black">
                <FormattedMessage id="product-customizer.selected-ingredients" />
              </p>
              <ul className="ma0 pa0">
                {compositionVariations.variations.map((ingredient, key) => (
                  <li
                    key={key}
                    className="flex justify-between items-center pv4 bb b--light-gray"
                  >
                    <ToggledChoice
                      item={ingredient}
                      minTotalItems={compositionVariations.minTotalItems}
                      maxTotalItems={compositionVariations.maxTotalItems}
                      index={ingredient.name}
                      chosenAmount={chosenAmountBasic}
                      onVariationChange={onVariationChangeBasic}
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="change-ingredients--extra-ingredients ph5 mb5">
              <p className="pv3 bb b--light-gray ttu ma0 f7 b near-black">
                <FormattedMessage id="product-customizer.extra-ingredients" />
              </p>
              <ul className="ma0 pa0">
                {optionalVariations.variations.map((ingredient, key) => {
                  return (
                    <li
                      key={key}
                      className={classnames(
                        ['flex', 'justify-between', 'items-center', 'pv4'],
                        {
                          ['bb b--light-gray']:
                            key !== optionalVariations.variations.length - 1,
                        }
                      )}
                    >
                      <MultipleChoice
                        item={ingredient}
                        minTotalItems={optionalVariations.minTotalItems}
                        maxTotalItems={optionalVariations.maxTotalItems}
                        index={ingredient.name}
                        chosenAmount={chosenAmount}
                        onVariationChange={onVariationChange}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default IngredientsContent
