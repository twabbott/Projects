async function foo() {
    console.log("it's happening!");
}


(() => {
    console.log("before");

    (async () => {
        await foo();
    })();


    console.log("after");
})();    