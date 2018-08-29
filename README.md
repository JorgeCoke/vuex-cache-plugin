# Vuex Cache Plugin

🔋 Simplest Cache Plugin for Vuex

## Install

```
npm install --save vuex-cache-plugin
```

## Usage

```
import Vue from 'vue';
import Vuex from 'vuex';
import VuexCachePlugin from 'vuex-cache-plugin'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...
  },
  plugins: [VuexCachePlugin(TIME_EXPIRATION_CONFIG)],
});
```

Now you can pass an extra parameter to any dispatch action (be sure to pass OPTIONS as the latest parameter):

```
this.$store.dispatch('user/FETCH_USERS', OPTIONS);
```

#### TIME_EXPIRATION_CONFIG
```
  TIME_EXPIRATION_CONFIG: default duration (in millis) for the cache before get expired [Type: number, optional - Default: 30000]
```

#### OPTIONS

```
  {
    enableVuexDispatchCache: set to TRUE to enable the cache plugin for the current dispatch [Type: boolean, optional - Default: FALSE]
    clearAllCache: set to TRUE to clear all cache before the current dispatch [Type: boolean, optional - Default: FALSE]
    forceRefreshCache: set to TRUE to refresh the current cache for the current dispatch [Type: boolean, optional - Default: FALSE]
    timeExpiration: custom TIME_EXPIRATION for the current dispatch (in millis) [Type: boolean, optional - Default: TIME_EXPIRATION_CONFIG]
  }
```

## Example

* Import vuex-cache-plugin
```
import Vue from 'vue';
import Vuex from 'vuex';
import VuexCachePlugin from 'vuex-cache-plugin'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...
  },
  plugins: [VuexCachePlugin()],
});
```

* Dispatch actions in your Vue components
```
this.$store.dispatch('user/FETCH_USERS'); // This dispatch won't be saved in cache

...

this.$store.dispatch('user/FETCH_USERS', {
  enableVuexDispatchCache: true,
}); // This dispatch will be saved in cache for 30000 millis

...

this.$store.dispatch('user/FETCH_USERS', {
  enableVuexDispatchCache: true,
  timeExpiration: 60000
}); // This dispatch will be saved in cache for 60000 millis

...

this.$store.dispatch('user/FETCH_USERS', {
  enableVuexDispatchCache: true,
  forceRefreshCache: true
}); // This dispatch will be executed despite been saved in cache recently (the new result will override the current cache)
```


