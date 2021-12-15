// countdown observable
const countdown$ = timer(0, 1000)
   .pipe(scan((acc) => --acc, 20))
   .pipe(takeWhile((x) => x >= 0));


// clear timeout before new one
const configurationTimeout;
clearInterval(configurationTimeout);
this.configurationTimeout = setTimeout(() => {
   // store.dispatch(layoutActions.getConfiguration());
}, 20000)