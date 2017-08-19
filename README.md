# Hyperapp DeepUpdate


## Usage
install :
```bash
npm install --save hyperapp-deepupdate
```

A basic complete example
```jsx harmony
import { app, h } from 'hyperapp'
import { deepUpdateMixin } from 'hyperapp-deepupdate'

app({
    state  : {
        counters: [
            {
                value: 0,
            },
            {
                value: 2,
            },
        ],
    },
    view(state, actions) {
        return <div>
            <ul>
                {
                    state.counters.map((counter, i) => <div>
                        <p>{counter.value}</p>
                        <button type="button" onclick={() => actions.increment(i)}>Add</button>
                    </div>)
                }
            </ul>
        </div>
    },
    actions: {
        increment(state, actions, index) {
            return [ 'counters', index, 'value', state => state + 1 ]
        }
    },
    mixins : [ deepUpdateMixin ]
})
```

Using with thunk :
```js
    actions: {
        increment(state, actions, index) {
            return update => update([ 'counters', index, 'value', state => state + 1 ])
        }
    },
```

Batching updates :
```js
    actions: {
        increment(state, actions, index) {
            return [
              [ 'counters', index, 'value', state => state + 1 ],
              [ 'counters', index, 'value', state => state + 1 ],
          ]
        }
    },
```