function test() {
    console.log(a);
    console.log(foo());

    var a = 10;

    function foo() {
        return a;
    }
    function foo() {
        return 20;
    }

    // var foo = () => 20;

    console.log(foo());
}

test()

// undefined
// undefined
// 20