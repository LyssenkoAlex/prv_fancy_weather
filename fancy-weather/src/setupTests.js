function f() {
        return f;
}

var wildguess = new f() instanceof f;
console.log(wildguess)
