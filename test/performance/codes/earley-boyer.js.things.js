(function(Σ) {
    Σ.hoist([
        [
            sc_print_debug,
            Σ
        ],
        [
            sc_alert,
            Σ
        ],
        [
            sc_typeof,
            Σ
        ],
        [
            sc_error,
            Σ
        ],
        [
            sc_raise,
            Σ
        ],
        [
            sc_withHandlerLambda,
            Σ
        ],
        [
            sc_putpropBang,
            Σ
        ],
        [
            sc_getprop,
            Σ
        ],
        [
            sc_rempropBang,
            Σ
        ],
        [
            sc_any2String,
            Σ
        ],
        [
            sc_isEqv,
            Σ
        ],
        [
            sc_isEq,
            Σ
        ],
        [
            sc_isNumber,
            Σ
        ],
        [
            sc_isComplex,
            Σ
        ],
        [
            sc_isReal,
            Σ
        ],
        [
            sc_isRational,
            Σ
        ],
        [
            sc_isInteger,
            Σ
        ],
        [
            sc_isExact,
            Σ
        ],
        [
            sc_isInexact,
            Σ
        ],
        [
            sc_equal,
            Σ
        ],
        [
            sc_less,
            Σ
        ],
        [
            sc_greater,
            Σ
        ],
        [
            sc_lessEqual,
            Σ
        ],
        [
            sc_greaterEqual,
            Σ
        ],
        [
            sc_isZero,
            Σ
        ],
        [
            sc_isPositive,
            Σ
        ],
        [
            sc_isNegative,
            Σ
        ],
        [
            sc_isOdd,
            Σ
        ],
        [
            sc_isEven,
            Σ
        ],
        [
            sc_plus,
            Σ
        ],
        [
            sc_multi,
            Σ
        ],
        [
            sc_minus,
            Σ
        ],
        [
            sc_div,
            Σ
        ],
        [
            sc_quotient,
            Σ
        ],
        [
            sc_remainder,
            Σ
        ],
        [
            sc_modulo,
            Σ
        ],
        [
            sc_euclid_gcd,
            Σ
        ],
        [
            sc_gcd,
            Σ
        ],
        [
            sc_lcm,
            Σ
        ],
        [
            sc_exact2inexact,
            Σ
        ],
        [
            sc_inexact2exact,
            Σ
        ],
        [
            sc_number2jsstring,
            Σ
        ],
        [
            sc_jsstring2number,
            Σ
        ],
        [
            sc_not,
            Σ
        ],
        [
            sc_isBoolean,
            Σ
        ],
        [
            sc_Pair,
            Σ
        ],
        [
            sc_isPair,
            Σ
        ],
        [
            sc_isPairEqual,
            Σ
        ],
        [
            sc_cons,
            Σ
        ],
        [
            sc_consStar,
            Σ
        ],
        [
            sc_car,
            Σ
        ],
        [
            sc_cdr,
            Σ
        ],
        [
            sc_setCarBang,
            Σ
        ],
        [
            sc_setCdrBang,
            Σ
        ],
        [
            sc_caar,
            Σ
        ],
        [
            sc_cadr,
            Σ
        ],
        [
            sc_cdar,
            Σ
        ],
        [
            sc_cddr,
            Σ
        ],
        [
            sc_caaar,
            Σ
        ],
        [
            sc_cadar,
            Σ
        ],
        [
            sc_caadr,
            Σ
        ],
        [
            sc_caddr,
            Σ
        ],
        [
            sc_cdaar,
            Σ
        ],
        [
            sc_cdadr,
            Σ
        ],
        [
            sc_cddar,
            Σ
        ],
        [
            sc_cdddr,
            Σ
        ],
        [
            sc_caaaar,
            Σ
        ],
        [
            sc_caadar,
            Σ
        ],
        [
            sc_caaadr,
            Σ
        ],
        [
            sc_caaddr,
            Σ
        ],
        [
            sc_cdaaar,
            Σ
        ],
        [
            sc_cdadar,
            Σ
        ],
        [
            sc_cdaadr,
            Σ
        ],
        [
            sc_cdaddr,
            Σ
        ],
        [
            sc_cadaar,
            Σ
        ],
        [
            sc_caddar,
            Σ
        ],
        [
            sc_cadadr,
            Σ
        ],
        [
            sc_cadddr,
            Σ
        ],
        [
            sc_cddaar,
            Σ
        ],
        [
            sc_cdddar,
            Σ
        ],
        [
            sc_cddadr,
            Σ
        ],
        [
            sc_cddddr,
            Σ
        ],
        [
            sc_lastPair,
            Σ
        ],
        [
            sc_isNull,
            Σ
        ],
        [
            sc_isList,
            Σ
        ],
        [
            sc_list,
            Σ
        ],
        [
            sc_iota,
            Σ
        ],
        [
            sc_makeList,
            Σ
        ],
        [
            sc_length,
            Σ
        ],
        [
            sc_remq,
            Σ
        ],
        [
            sc_remqBang,
            Σ
        ],
        [
            sc_delete,
            Σ
        ],
        [
            sc_deleteBang,
            Σ
        ],
        [
            sc_reverseAppendBang,
            Σ
        ],
        [
            sc_dualAppend,
            Σ
        ],
        [
            sc_append,
            Σ
        ],
        [
            sc_dualAppendBang,
            Σ
        ],
        [
            sc_appendBang,
            Σ
        ],
        [
            sc_reverse,
            Σ
        ],
        [
            sc_reverseBang,
            Σ
        ],
        [
            sc_listTail,
            Σ
        ],
        [
            sc_listRef,
            Σ
        ],
        [
            sc_memq,
            Σ
        ],
        [
            sc_memv,
            Σ
        ],
        [
            sc_member,
            Σ
        ],
        [
            sc_assq,
            Σ
        ],
        [
            sc_assv,
            Σ
        ],
        [
            sc_assoc,
            Σ
        ],
        [
            sc_isCharStringEqual,
            Σ
        ],
        [
            sc_isCharStringLess,
            Σ
        ],
        [
            sc_isCharStringGreater,
            Σ
        ],
        [
            sc_isCharStringLessEqual,
            Σ
        ],
        [
            sc_isCharStringGreaterEqual,
            Σ
        ],
        [
            sc_isCharStringCIEqual,
            Σ
        ],
        [
            sc_isCharStringCILess,
            Σ
        ],
        [
            sc_isCharStringCIGreater,
            Σ
        ],
        [
            sc_isCharStringCILessEqual,
            Σ
        ],
        [
            sc_isCharStringCIGreaterEqual,
            Σ
        ],
        [
            sc_Char,
            Σ
        ],
        [
            sc_isChar,
            Σ
        ],
        [
            sc_isCharOfClass,
            Σ
        ],
        [
            sc_isCharAlphabetic,
            Σ
        ],
        [
            sc_isCharNumeric,
            Σ
        ],
        [
            sc_isCharWhitespace,
            Σ
        ],
        [
            sc_isCharUpperCase,
            Σ
        ],
        [
            sc_isCharLowerCase,
            Σ
        ],
        [
            sc_char2integer,
            Σ
        ],
        [
            sc_integer2char,
            Σ
        ],
        [
            sc_charUpcase,
            Σ
        ],
        [
            sc_charDowncase,
            Σ
        ],
        [
            sc_makeJSStringOfLength,
            Σ
        ],
        [
            sc_makejsString,
            Σ
        ],
        [
            sc_jsstring2list,
            Σ
        ],
        [
            sc_list2jsstring,
            Σ
        ],
        [
            sc_isVector,
            Σ
        ],
        [
            sc_isVectorEqual,
            Σ
        ],
        [
            sc_makeVector,
            Σ
        ],
        [
            sc_vector,
            Σ
        ],
        [
            sc_vectorLength,
            Σ
        ],
        [
            sc_vectorRef,
            Σ
        ],
        [
            sc_vectorSetBang,
            Σ
        ],
        [
            sc_vector2list,
            Σ
        ],
        [
            sc_list2vector,
            Σ
        ],
        [
            sc_vectorFillBang,
            Σ
        ],
        [
            sc_copyVector,
            Σ
        ],
        [
            sc_vectorCopy,
            Σ
        ],
        [
            sc_vectorCopyBang,
            Σ
        ],
        [
            sc_isProcedure,
            Σ
        ],
        [
            sc_apply,
            Σ
        ],
        [
            sc_map,
            Σ
        ],
        [
            sc_mapBang,
            Σ
        ],
        [
            sc_forEach,
            Σ
        ],
        [
            sc_filter,
            Σ
        ],
        [
            sc_filterBang,
            Σ
        ],
        [
            sc_filterMap1,
            Σ
        ],
        [
            sc_filterMap2,
            Σ
        ],
        [
            sc_filterMap,
            Σ
        ],
        [
            sc_any,
            Σ
        ],
        [
            sc_anyPred,
            Σ
        ],
        [
            sc_every,
            Σ
        ],
        [
            sc_everyPred,
            Σ
        ],
        [
            sc_force,
            Σ
        ],
        [
            sc_makePromise,
            Σ
        ],
        [
            sc_Values,
            Σ
        ],
        [
            sc_values,
            Σ
        ],
        [
            sc_callWithValues,
            Σ
        ],
        [
            sc_dynamicWind,
            Σ
        ],
        [
            sc_Struct,
            Σ
        ],
        [
            sc_makeStruct,
            Σ
        ],
        [
            sc_isStruct,
            Σ
        ],
        [
            sc_isStructNamed,
            Σ
        ],
        [
            sc_getStructField,
            Σ
        ],
        [
            sc_setStructFieldBang,
            Σ
        ],
        [
            sc_bitNot,
            Σ
        ],
        [
            sc_bitAnd,
            Σ
        ],
        [
            sc_bitOr,
            Σ
        ],
        [
            sc_bitXor,
            Σ
        ],
        [
            sc_bitLsh,
            Σ
        ],
        [
            sc_bitRsh,
            Σ
        ],
        [
            sc_bitUrsh,
            Σ
        ],
        [
            sc_jsField,
            Σ
        ],
        [
            sc_setJsFieldBang,
            Σ
        ],
        [
            sc_deleteJsFieldBang,
            Σ
        ],
        [
            sc_jsCall,
            Σ
        ],
        [
            sc_jsMethodCall,
            Σ
        ],
        [
            sc_jsNew,
            Σ
        ],
        [
            sc_pregexp,
            Σ
        ],
        [
            sc_pregexpMatch,
            Σ
        ],
        [
            sc_pregexpReplace,
            Σ
        ],
        [
            sc_pregexpReplaceAll,
            Σ
        ],
        [
            sc_pregexpSplit,
            Σ
        ],
        [
            sc_random,
            Σ
        ],
        [
            sc_currentDate,
            Σ
        ],
        [
            sc_Hashtable,
            Σ
        ],
        [
            sc_HashtableElement,
            Σ
        ],
        [
            sc_makeHashtable,
            Σ
        ],
        [
            sc_hashtablePutBang,
            Σ
        ],
        [
            sc_hashtableGet,
            Σ
        ],
        [
            sc_hashtableForEach,
            Σ
        ],
        [
            sc_hashtableContains,
            Σ
        ],
        [
            sc_hash,
            Σ
        ],
        [
            sc_counterHash,
            Σ
        ],
        [
            sc_Trampoline,
            Σ
        ],
        [
            sc_bindExitLambda,
            Σ
        ],
        [
            sc_BindExitException,
            Σ
        ],
        [
            sc_EOF,
            Σ
        ],
        [
            sc_Port,
            Σ
        ],
        [
            sc_InputPort,
            Σ
        ],
        [
            sc_ErrorInputPort,
            Σ
        ],
        [
            sc_StringInputPort,
            Σ
        ],
        [
            sc_Token,
            Σ
        ],
        [
            sc_isCharReady,
            Σ
        ],
        [
            sc_closeInputPort,
            Σ
        ],
        [
            sc_isInputPort,
            Σ
        ],
        [
            sc_isEOFObject,
            Σ
        ],
        [
            sc_currentInputPort,
            Σ
        ],
        [
            sc_callWithInputFile,
            Σ
        ],
        [
            sc_callWithOutputFile,
            Σ
        ],
        [
            sc_withInputFromFile,
            Σ
        ],
        [
            sc_withOutputToFile,
            Σ
        ],
        [
            sc_openInputFile,
            Σ
        ],
        [
            sc_openOutputFile,
            Σ
        ],
        [
            sc_basename,
            Σ
        ],
        [
            sc_dirname,
            Σ
        ],
        [
            sc_withInputFromPort,
            Σ
        ],
        [
            sc_withInputFromString,
            Σ
        ],
        [
            sc_withOutputToPort,
            Σ
        ],
        [
            sc_withOutputToString,
            Σ
        ],
        [
            sc_withOutputToProcedure,
            Σ
        ],
        [
            sc_openOutputString,
            Σ
        ],
        [
            sc_openInputString,
            Σ
        ],
        [
            sc_OutputPort,
            Σ
        ],
        [
            sc_StringOutputPort,
            Σ
        ],
        [
            sc_getOutputString,
            Σ
        ],
        [
            sc_ErrorOutputPort,
            Σ
        ],
        [
            sc_GenericOutputPort,
            Σ
        ],
        [
            sc_isOutputPort,
            Σ
        ],
        [
            sc_closeOutputPort,
            Σ
        ],
        [
            sc_write,
            Σ
        ],
        [
            sc_toWriteString,
            Σ
        ],
        [
            sc_escapeWriteString,
            Σ
        ],
        [
            sc_display,
            Σ
        ],
        [
            sc_toDisplayString,
            Σ
        ],
        [
            sc_newline,
            Σ
        ],
        [
            sc_writeChar,
            Σ
        ],
        [
            sc_writeCircle,
            Σ
        ],
        [
            sc_toWriteCircleString,
            Σ
        ],
        [
            sc_prepWriteCircle,
            Σ
        ],
        [
            sc_genToWriteCircleString,
            Σ
        ],
        [
            sc_print,
            Σ
        ],
        [
            sc_format,
            Σ
        ],
        [
            sc_jsstring2string,
            Σ
        ],
        [
            sc_jsstring2symbol,
            Σ
        ],
        [
            sc_string2jsstring,
            Σ
        ],
        [
            sc_symbol2jsstring,
            Σ
        ],
        [
            sc_keyword2jsstring,
            Σ
        ],
        [
            sc_jsstring2keyword,
            Σ
        ],
        [
            sc_isKeyword,
            Σ
        ],
        [
            sc_isEqual,
            Σ
        ],
        [
            sc_number2symbol,
            Σ
        ],
        [
            sc_symbol2number,
            Σ
        ],
        [
            sc_string2integer,
            Σ
        ],
        [
            sc_string2real,
            Σ
        ],
        [
            sc_isSymbol,
            Σ
        ],
        [
            sc_symbol2string,
            Σ
        ],
        [
            sc_string2symbol,
            Σ
        ],
        [
            sc_symbolAppend,
            Σ
        ],
        [
            sc_char2string,
            Σ
        ],
        [
            sc_char2symbol,
            Σ
        ],
        [
            sc_isString,
            Σ
        ],
        [
            sc_string,
            Σ
        ],
        [
            sc_stringLength,
            Σ
        ],
        [
            sc_stringRef,
            Σ
        ],
        [
            sc_isStringEqual,
            Σ
        ],
        [
            sc_isStringLess,
            Σ
        ],
        [
            sc_isStringGreater,
            Σ
        ],
        [
            sc_isStringLessEqual,
            Σ
        ],
        [
            sc_isStringGreaterEqual,
            Σ
        ],
        [
            sc_isStringCIEqual,
            Σ
        ],
        [
            sc_isStringCILess,
            Σ
        ],
        [
            sc_isStringCIGreater,
            Σ
        ],
        [
            sc_isStringCILessEqual,
            Σ
        ],
        [
            sc_isStringCIGreaterEqual,
            Σ
        ],
        [
            sc_substring,
            Σ
        ],
        [
            sc_isSubstring_at,
            Σ
        ],
        [
            sc_stringAppend,
            Σ
        ],
        [
            sc_stringCopy,
            Σ
        ],
        [
            sc_keyword2string,
            Σ
        ],
        [
            sc_string2keyword,
            Σ
        ],
        [
            RunBenchmark,
            Σ
        ]
    ]);

    function sc_print_debug() {
        var Σ_0 = new Σ.Scope(this, sc_print_debug, '0', Σ, {}, []);
        Σ.refs.sc_print.apply(null, arguments);
    }
    Σ.refs.sc_JS_GLOBALS = this;
    Σ.refs.__sc_LINE = -1;
    Σ.refs.__sc_FILE = '';

    function sc_alert() {
        var Σ_1 = new Σ.Scope(this, sc_alert, '1', Σ, {}, []);
        Σ_1.refs.len = undefined;
        Σ_1.refs.s = '';
        Σ_1.refs.i = undefined;
        for (Σ_1.refs.i = 0; Σ_1.refs.i < Σ_1.refs.len; Σ_1.refs.i++) {
            Σ_1.refs.s += Σ.refs.sc_toDisplayString(arguments[i]);
        }
        return alert(Σ_1.refs.s);
    }

    function sc_typeof(x) {
        var Σ_2 = new Σ.Scope(this, sc_typeof, '2', Σ, {
            x: x
        }, []);
        return typeof Σ_2.refs.x;
    }

    function sc_error() {
        var Σ_3 = new Σ.Scope(this, sc_error, '3', Σ, {}, []);
        Σ_3.refs.a = [sc_jsstring2symbol('*error*')];
        for (Σ_3.refs.i = 0; Σ_3.refs.i < arguments.length; Σ_3.refs.i++) {
            Σ_3.refs.a[Σ_3.refs.i + 1] = arguments[i];
        }
        throw Σ_3.refs.a;
    }

    function sc_raise(obj) {
        var Σ_4 = new Σ.Scope(this, sc_raise, '4', Σ, {
            obj: obj
        }, []);
        throw Σ_4.refs.obj;
    }

    function sc_withHandlerLambda(handler, body) {
        var Σ_5 = new Σ.Scope(this, sc_withHandlerLambda, '5', Σ, {
            handler: handler,
            body: body
        }, []);
        try {
            return body();
        } catch (e) {
            if (!e._internalException)
                return handler(e);
            else
                throw e;
        }
    }
    Σ.refs.sc_properties = new Object();

    function sc_putpropBang(sym, key, val) {
        var Σ_6 = new Σ.Scope(this, sc_putpropBang, '6', Σ, {
            sym: sym,
            key: key,
            val: val
        }, []);
        Σ_6.refs.ht = Σ.refs.sc_properties[Σ_6.refs.sym];
        if (!Σ_6.refs.ht) {
            Σ_6.refs.ht = new Object();
            Σ.refs.sc_properties[Σ_6.refs.sym] = Σ_6.refs.ht;
        }
        Σ_6.refs.ht[Σ_6.refs.key] = Σ_6.refs.val;
    }

    function sc_getprop(sym, key) {
        var Σ_7 = new Σ.Scope(this, sc_getprop, '7', Σ, {
            sym: sym,
            key: key
        }, []);
        Σ_7.refs.ht = Σ.refs.sc_properties[Σ_7.refs.sym];
        if (Σ_7.refs.ht) {
            if (Σ_7.refs.key in Σ_7.refs.ht) {
                return Σ_7.refs.ht[Σ_7.refs.key];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function sc_rempropBang(sym, key) {
        var Σ_8 = new Σ.Scope(this, sc_rempropBang, '8', Σ, {
            sym: sym,
            key: key
        }, []);
        Σ_8.refs.ht = Σ.refs.sc_properties[Σ_8.refs.sym];
        if (Σ_8.refs.ht) {
            delete Σ_8.refs.ht[Σ_8.refs.key];
        }
    }

    function sc_any2String(o) {
        var Σ_9 = new Σ.Scope(this, sc_any2String, '9', Σ, {
            o: o
        }, []);
        return jsstring2string(Σ.refs.sc_toDisplayString(Σ_9.refs.o));
    }

    function sc_isEqv(o1, o2) {
        var Σ_10 = new Σ.Scope(this, sc_isEqv, '10', Σ, {
            o1: o1,
            o2: o2
        }, []);
        return Σ_10.refs.o1 === Σ_10.refs.o2;
    }

    function sc_isEq(o1, o2) {
        var Σ_11 = new Σ.Scope(this, sc_isEq, '11', Σ, {
            o1: o1,
            o2: o2
        }, []);
        return Σ_11.refs.o1 === Σ_11.refs.o2;
    }

    function sc_isNumber(n) {
        var Σ_12 = new Σ.Scope(this, sc_isNumber, '12', Σ, {
            n: n
        }, []);
        return typeof Σ_12.refs.n === 'number';
    }

    function sc_isComplex(n) {
        var Σ_13 = new Σ.Scope(this, sc_isComplex, '13', Σ, {
            n: n
        }, []);
        return Σ.refs.sc_isNumber(Σ_13.refs.n);
    }

    function sc_isReal(n) {
        var Σ_14 = new Σ.Scope(this, sc_isReal, '14', Σ, {
            n: n
        }, []);
        return Σ.refs.sc_isNumber(Σ_14.refs.n);
    }

    function sc_isRational(n) {
        var Σ_15 = new Σ.Scope(this, sc_isRational, '15', Σ, {
            n: n
        }, []);
        return Σ.refs.sc_isReal(Σ_15.refs.n);
    }

    function sc_isInteger(n) {
        var Σ_16 = new Σ.Scope(this, sc_isInteger, '16', Σ, {
            n: n
        }, []);
        return parseInt(Σ_16.refs.n) === Σ_16.refs.n;
    }

    function sc_isExact(n) {
        var Σ_17 = new Σ.Scope(this, sc_isExact, '17', Σ, {
            n: n
        }, []);
        return false;
    }

    function sc_isInexact(n) {
        var Σ_18 = new Σ.Scope(this, sc_isInexact, '18', Σ, {
            n: n
        }, []);
        return true;
    }

    function sc_equal(x) {
        var Σ_19 = new Σ.Scope(this, sc_equal, '19', Σ, {
            x: x
        }, []);
        for (Σ_19.refs.i = 1; Σ_19.refs.i < arguments.length; Σ_19.refs.i++) {
            if (Σ_19.refs.x !== arguments[i]) {
                return false;
            }
        }
        return true;
    }

    function sc_less(x) {
        var Σ_20 = new Σ.Scope(this, sc_less, '20', Σ, {
            x: x
        }, []);
        for (Σ_20.refs.i = 1; Σ_20.refs.i < arguments.length; Σ_20.refs.i++) {
            if (Σ_20.refs.x >= arguments[i]) {
                return false;
            }
            Σ_20.refs.x = arguments[i];
        }
        return true;
    }

    function sc_greater(x, y) {
        var Σ_21 = new Σ.Scope(this, sc_greater, '21', Σ, {
            x: x,
            y: y
        }, []);
        for (Σ_21.refs.i = 1; Σ_21.refs.i < arguments.length; Σ_21.refs.i++) {
            if (Σ_21.refs.x <= arguments[i]) {
                return false;
            }
            Σ_21.refs.x = arguments[i];
        }
        return true;
    }

    function sc_lessEqual(x, y) {
        var Σ_22 = new Σ.Scope(this, sc_lessEqual, '22', Σ, {
            x: x,
            y: y
        }, []);
        for (Σ_22.refs.i = 1; Σ_22.refs.i < arguments.length; Σ_22.refs.i++) {
            if (Σ_22.refs.x > arguments[i]) {
                return false;
            }
            Σ_22.refs.x = arguments[i];
        }
        return true;
    }

    function sc_greaterEqual(x, y) {
        var Σ_23 = new Σ.Scope(this, sc_greaterEqual, '23', Σ, {
            x: x,
            y: y
        }, []);
        for (Σ_23.refs.i = 1; Σ_23.refs.i < arguments.length; Σ_23.refs.i++) {
            if (Σ_23.refs.x < arguments[i]) {
                return false;
            }
            Σ_23.refs.x = arguments[i];
        }
        return true;
    }

    function sc_isZero(x) {
        var Σ_24 = new Σ.Scope(this, sc_isZero, '24', Σ, {
            x: x
        }, []);
        return Σ_24.refs.x === 0;
    }

    function sc_isPositive(x) {
        var Σ_25 = new Σ.Scope(this, sc_isPositive, '25', Σ, {
            x: x
        }, []);
        return Σ_25.refs.x > 0;
    }

    function sc_isNegative(x) {
        var Σ_26 = new Σ.Scope(this, sc_isNegative, '26', Σ, {
            x: x
        }, []);
        return Σ_26.refs.x < 0;
    }

    function sc_isOdd(x) {
        var Σ_27 = new Σ.Scope(this, sc_isOdd, '27', Σ, {
            x: x
        }, []);
        return Σ_27.refs.x % 2 === 1;
    }

    function sc_isEven(x) {
        var Σ_28 = new Σ.Scope(this, sc_isEven, '28', Σ, {
            x: x
        }, []);
        return Σ_28.refs.x % 2 === 0;
    }
    Σ.refs.sc_max = undefined;
    Σ.refs.sc_min = undefined;

    function sc_plus() {
        var Σ_29 = new Σ.Scope(this, sc_plus, '29', Σ, {}, []);
        Σ_29.refs.sum = 0;
        for (Σ_29.refs.i = 0; Σ_29.refs.i < arguments.length; Σ_29.refs.i++) {
            Σ_29.refs.sum += arguments[i];
        }
        return Σ_29.refs.sum;
    }

    function sc_multi() {
        var Σ_30 = new Σ.Scope(this, sc_multi, '30', Σ, {}, []);
        Σ_30.refs.product = 1;
        for (Σ_30.refs.i = 0; Σ_30.refs.i < arguments.length; Σ_30.refs.i++) {
            Σ_30.refs.product *= arguments[i];
        }
        return Σ_30.refs.product;
    }

    function sc_minus(x) {
        var Σ_31 = new Σ.Scope(this, sc_minus, '31', Σ, {
            x: x
        }, []);
        if (arguments.length === 1) {
            return -Σ_31.refs.x;
        } else {
            Σ_31.refs.res = Σ_31.refs.x;
            for (Σ_31.refs.i = 1; Σ_31.refs.i < arguments.length; Σ_31.refs.i++) {
                Σ_31.refs.res -= arguments[i];
            }
            return Σ_31.refs.res;
        }
    }

    function sc_div(x) {
        var Σ_32 = new Σ.Scope(this, sc_div, '32', Σ, {
            x: x
        }, []);
        if (arguments.length === 1) {
            return 1 / Σ_32.refs.x;
        } else {
            Σ_32.refs.res = Σ_32.refs.x;
            for (Σ_32.refs.i = 1; Σ_32.refs.i < arguments.length; Σ_32.refs.i++) {
                Σ_32.refs.res /= arguments[i];
            }
            return Σ_32.refs.res;
        }
    }
    Σ.refs.sc_abs = undefined;

    function sc_quotient(x, y) {
        var Σ_33 = new Σ.Scope(this, sc_quotient, '33', Σ, {
            x: x,
            y: y
        }, []);
        return parseInt(Σ_33.refs.x / Σ_33.refs.y);
    }

    function sc_remainder(x, y) {
        var Σ_34 = new Σ.Scope(this, sc_remainder, '34', Σ, {
            x: x,
            y: y
        }, []);
        return Σ_34.refs.x % Σ_34.refs.y;
    }

    function sc_modulo(x, y) {
        var Σ_35 = new Σ.Scope(this, sc_modulo, '35', Σ, {
            x: x,
            y: y
        }, []);
        Σ_35.refs.remainder = Σ_35.refs.x % Σ_35.refs.y;
        if (Σ_35.refs.remainder * Σ_35.refs.y < 0) {
            return Σ_35.refs.remainder + Σ_35.refs.y;
        } else {
            return Σ_35.refs.remainder;
        }
    }

    function sc_euclid_gcd(a, b) {
        var Σ_36 = new Σ.Scope(this, sc_euclid_gcd, '36', Σ, {
            a: a,
            b: b
        }, []);
        Σ_36.refs.temp = undefined;
        if (Σ_36.refs.a === 0) {
            return Σ_36.refs.b;
        }
        if (Σ_36.refs.b === 0) {
            return Σ_36.refs.a;
        }
        if (Σ_36.refs.a < 0) {
            Σ_36.refs.a = -Σ_36.refs.a;
        };
        if (Σ_36.refs.b < 0) {
            Σ_36.refs.b = -Σ_36.refs.b;
        };
        if (Σ_36.refs.b > Σ_36.refs.a) {
            Σ_36.refs.temp = Σ_36.refs.a;
            Σ_36.refs.a = Σ_36.refs.b;
            Σ_36.refs.b = Σ_36.refs.temp;
        };
        while (true) {
            Σ_36.refs.a %= Σ_36.refs.b;
            if (Σ_36.refs.a === 0) {
                return Σ_36.refs.b;
            };
            Σ_36.refs.b %= Σ_36.refs.a;
            if (Σ_36.refs.b === 0) {
                return Σ_36.refs.a;
            };
        };
        return Σ_36.refs.b;
    }

    function sc_gcd() {
        var Σ_37 = new Σ.Scope(this, sc_gcd, '37', Σ, {}, []);
        Σ_37.refs.gcd = 0;
        for (Σ_37.refs.i = 0; Σ_37.refs.i < arguments.length; Σ_37.refs.i++) {
            Σ_37.refs.gcd = Σ.refs.sc_euclid_gcd(Σ_37.refs.gcd, arguments[i]);
        }
        return Σ_37.refs.gcd;
    }

    function sc_lcm() {
        var Σ_38 = new Σ.Scope(this, sc_lcm, '38', Σ, {}, []);
        Σ_38.refs.lcm = 1;
        for (Σ_38.refs.i = 0; Σ_38.refs.i < arguments.length; Σ_38.refs.i++) {
            Σ_38.refs.f = Math.round(arguments[i] / Σ.refs.sc_euclid_gcd(arguments[i], Σ_38.refs.lcm));
            Σ_38.refs.lcm *= Math.abs(Σ_38.refs.f);
        }
        return Σ_38.refs.lcm;
    }
    Σ.refs.sc_floor = undefined;
    Σ.refs.sc_ceiling = undefined;
    Σ.refs.sc_truncate = undefined;
    Σ.refs.sc_round = undefined;
    Σ.refs.sc_exp = undefined;
    Σ.refs.sc_log = undefined;
    Σ.refs.sc_sin = undefined;
    Σ.refs.sc_cos = undefined;
    Σ.refs.sc_tan = undefined;
    Σ.refs.sc_asin = undefined;
    Σ.refs.sc_acos = undefined;
    Σ.refs.sc_atan = undefined;
    Σ.refs.sc_sqrt = undefined;
    Σ.refs.sc_expt = undefined;

    function sc_exact2inexact(x) {
        var Σ_39 = new Σ.Scope(this, sc_exact2inexact, '39', Σ, {
            x: x
        }, []);
        return Σ_39.refs.x;
    }

    function sc_inexact2exact(x) {
        var Σ_40 = new Σ.Scope(this, sc_inexact2exact, '40', Σ, {
            x: x
        }, []);
        return Σ_40.refs.x;
    }

    function sc_number2jsstring(x, radix) {
        var Σ_41 = new Σ.Scope(this, sc_number2jsstring, '41', Σ, {
            x: x,
            radix: radix
        }, []);
        if (Σ_41.refs.radix) {
            return Σ_41.refs.x.toString(Σ_41.refs.radix);
        } else {
            return Σ_41.refs.x.toString();
        }
    }

    function sc_jsstring2number(s, radix) {
        var Σ_42 = new Σ.Scope(this, sc_jsstring2number, '42', Σ, {
            s: s,
            radix: radix
        }, []);
        if (Σ_42.refs.s === '') {
            return false;
        }
        if (Σ_42.refs.radix) {
            Σ_42.refs.t = parseInt(Σ_42.refs.s, Σ_42.refs.radix);
            if (!Σ_42.refs.t && Σ_42.refs.t !== 0) {
                return false;
            }
            Σ_42.refs.allowedChars = '01234567890abcdefghijklmnopqrstuvwxyz'.substring(0, Σ_42.refs.radix + 1);
            if (new RegExp('^[' + Σ_42.refs.allowedChars + ']*$', 'i').test(Σ_42.refs.s)) {
                return Σ_42.refs.t;
            } else {
                return false;
            }
        } else {
            Σ_42.refs.t = +Σ_42.refs.s;
            if (!Σ_42.refs.t && Σ_42.refs.t !== 0) {
                return false;
            }
            Σ_42.refs.c = Σ_42.refs.s.charAt(0);
            if (+Σ_42.refs.c === 0 && Σ_42.refs.c !== '0') {
                return false;
            }
            return Σ_42.refs.t;
        }
    }

    function sc_not(b) {
        var Σ_43 = new Σ.Scope(this, sc_not, '43', Σ, {
            b: b
        }, []);
        return Σ_43.refs.b === false;
    }

    function sc_isBoolean(b) {
        var Σ_44 = new Σ.Scope(this, sc_isBoolean, '44', Σ, {
            b: b
        }, []);
        return Σ_44.refs.b === true || Σ_44.refs.b === false;
    }

    function sc_Pair(car, cdr) {
        var Σ_45 = new Σ.Scope(this, sc_Pair, '45', Σ, {
            car: car,
            cdr: cdr
        }, []);
        this.car = Σ_45.refs.car;
        this.cdr = Σ_45.refs.cdr;
    }
    Σ.refs.sc_Pair.prototype.toString = Σ.addFunction(function α0Q0t() {
        var Σ_46 = new Σ.Scope(this, α0Q0t, '46', Σ, {}, []);
        return Σ.refs.sc_toDisplayString(this);
    }, Σ);
    Σ.refs.sc_Pair.prototype.sc_toWriteOrDisplayString = Σ.addFunction(function αH0eB(writeOrDisplay) {
        var Σ_47 = new Σ.Scope(this, αH0eB, '47', Σ, {
            writeOrDisplay: writeOrDisplay
        }, []);
        Σ_47.refs.current = this;
        Σ_47.refs.res = '(';
        while (true) {
            Σ_47.refs.res += Σ_47.refs.writeOrDisplay(Σ_47.refs.current.car);
            if (Σ.refs.sc_isPair(Σ_47.refs.current.cdr)) {
                Σ_47.refs.res += ' ';
                Σ_47.refs.current = Σ_47.refs.current.cdr;
            } else if (Σ_47.refs.current.cdr !== null) {
                Σ_47.refs.res += ' . ' + Σ_47.refs.writeOrDisplay(Σ_47.refs.current.cdr);
                break;
            } else {
                break;
            }
        }
        Σ_47.refs.res += ')';
        return Σ_47.refs.res;
    }, Σ);
    Σ.refs.sc_Pair.prototype.sc_toDisplayString = Σ.addFunction(function αqULd() {
        var Σ_48 = new Σ.Scope(this, αqULd, '48', Σ, {}, []);
        return this.sc_toWriteOrDisplayString(Σ.refs.sc_toDisplayString);
    }, Σ);
    Σ.refs.sc_Pair.prototype.sc_toWriteString = Σ.addFunction(function αfl9d() {
        var Σ_49 = new Σ.Scope(this, αfl9d, '49', Σ, {}, []);
        return this.sc_toWriteOrDisplayString(Σ.refs.sc_toWriteString);
    }, Σ);

    function sc_isPair(p) {
        var Σ_50 = new Σ.Scope(this, sc_isPair, '50', Σ, {
            p: p
        }, []);
        return Σ_50.refs.p instanceof Σ.refs.sc_Pair;
    }

    function sc_isPairEqual(p1, p2, comp) {
        var Σ_51 = new Σ.Scope(this, sc_isPairEqual, '51', Σ, {
            p1: p1,
            p2: p2,
            comp: comp
        }, []);
        return Σ_51.refs.comp(Σ_51.refs.p1.car, Σ_51.refs.p2.car) && Σ_51.refs.comp(Σ_51.refs.p1.cdr, Σ_51.refs.p2.cdr);
    }

    function sc_cons(car, cdr) {
        var Σ_52 = new Σ.Scope(this, sc_cons, '52', Σ, {
            car: car,
            cdr: cdr
        }, []);
        return new Σ.refs.sc_Pair(Σ_52.refs.car, Σ_52.refs.cdr);
    }

    function sc_consStar() {
        var Σ_53 = new Σ.Scope(this, sc_consStar, '53', Σ, {}, []);
        Σ_53.refs.res = undefined;
        for (Σ_53.refs.i = arguments.length - 2; Σ_53.refs.i >= 0; Σ_53.refs.i--) {
            Σ_53.refs.res = new Σ.refs.sc_Pair(arguments[i], Σ_53.refs.res);
        }
        return Σ_53.refs.res;
    }

    function sc_car(p) {
        var Σ_54 = new Σ.Scope(this, sc_car, '54', Σ, {
            p: p
        }, []);
        return Σ_54.refs.p.car;
    }

    function sc_cdr(p) {
        var Σ_55 = new Σ.Scope(this, sc_cdr, '55', Σ, {
            p: p
        }, []);
        return Σ_55.refs.p.cdr;
    }

    function sc_setCarBang(p, val) {
        var Σ_56 = new Σ.Scope(this, sc_setCarBang, '56', Σ, {
            p: p,
            val: val
        }, []);
        Σ_56.refs.p.car = Σ_56.refs.val;
    }

    function sc_setCdrBang(p, val) {
        var Σ_57 = new Σ.Scope(this, sc_setCdrBang, '57', Σ, {
            p: p,
            val: val
        }, []);
        Σ_57.refs.p.cdr = Σ_57.refs.val;
    }

    function sc_caar(p) {
        var Σ_58 = new Σ.Scope(this, sc_caar, '58', Σ, {
            p: p
        }, []);
        return Σ_58.refs.p.car.car;
    }

    function sc_cadr(p) {
        var Σ_59 = new Σ.Scope(this, sc_cadr, '59', Σ, {
            p: p
        }, []);
        return Σ_59.refs.p.cdr.car;
    }

    function sc_cdar(p) {
        var Σ_60 = new Σ.Scope(this, sc_cdar, '60', Σ, {
            p: p
        }, []);
        return Σ_60.refs.p.car.cdr;
    }

    function sc_cddr(p) {
        var Σ_61 = new Σ.Scope(this, sc_cddr, '61', Σ, {
            p: p
        }, []);
        return Σ_61.refs.p.cdr.cdr;
    }

    function sc_caaar(p) {
        var Σ_62 = new Σ.Scope(this, sc_caaar, '62', Σ, {
            p: p
        }, []);
        return Σ_62.refs.p.car.car.car;
    }

    function sc_cadar(p) {
        var Σ_63 = new Σ.Scope(this, sc_cadar, '63', Σ, {
            p: p
        }, []);
        return Σ_63.refs.p.car.cdr.car;
    }

    function sc_caadr(p) {
        var Σ_64 = new Σ.Scope(this, sc_caadr, '64', Σ, {
            p: p
        }, []);
        return Σ_64.refs.p.cdr.car.car;
    }

    function sc_caddr(p) {
        var Σ_65 = new Σ.Scope(this, sc_caddr, '65', Σ, {
            p: p
        }, []);
        return Σ_65.refs.p.cdr.cdr.car;
    }

    function sc_cdaar(p) {
        var Σ_66 = new Σ.Scope(this, sc_cdaar, '66', Σ, {
            p: p
        }, []);
        return Σ_66.refs.p.car.car.cdr;
    }

    function sc_cdadr(p) {
        var Σ_67 = new Σ.Scope(this, sc_cdadr, '67', Σ, {
            p: p
        }, []);
        return Σ_67.refs.p.cdr.car.cdr;
    }

    function sc_cddar(p) {
        var Σ_68 = new Σ.Scope(this, sc_cddar, '68', Σ, {
            p: p
        }, []);
        return Σ_68.refs.p.car.cdr.cdr;
    }

    function sc_cdddr(p) {
        var Σ_69 = new Σ.Scope(this, sc_cdddr, '69', Σ, {
            p: p
        }, []);
        return Σ_69.refs.p.cdr.cdr.cdr;
    }

    function sc_caaaar(p) {
        var Σ_70 = new Σ.Scope(this, sc_caaaar, '70', Σ, {
            p: p
        }, []);
        return Σ_70.refs.p.car.car.car.car;
    }

    function sc_caadar(p) {
        var Σ_71 = new Σ.Scope(this, sc_caadar, '71', Σ, {
            p: p
        }, []);
        return Σ_71.refs.p.car.cdr.car.car;
    }

    function sc_caaadr(p) {
        var Σ_72 = new Σ.Scope(this, sc_caaadr, '72', Σ, {
            p: p
        }, []);
        return Σ_72.refs.p.cdr.car.car.car;
    }

    function sc_caaddr(p) {
        var Σ_73 = new Σ.Scope(this, sc_caaddr, '73', Σ, {
            p: p
        }, []);
        return Σ_73.refs.p.cdr.cdr.car.car;
    }

    function sc_cdaaar(p) {
        var Σ_74 = new Σ.Scope(this, sc_cdaaar, '74', Σ, {
            p: p
        }, []);
        return Σ_74.refs.p.car.car.car.cdr;
    }

    function sc_cdadar(p) {
        var Σ_75 = new Σ.Scope(this, sc_cdadar, '75', Σ, {
            p: p
        }, []);
        return Σ_75.refs.p.car.cdr.car.cdr;
    }

    function sc_cdaadr(p) {
        var Σ_76 = new Σ.Scope(this, sc_cdaadr, '76', Σ, {
            p: p
        }, []);
        return Σ_76.refs.p.cdr.car.car.cdr;
    }

    function sc_cdaddr(p) {
        var Σ_77 = new Σ.Scope(this, sc_cdaddr, '77', Σ, {
            p: p
        }, []);
        return Σ_77.refs.p.cdr.cdr.car.cdr;
    }

    function sc_cadaar(p) {
        var Σ_78 = new Σ.Scope(this, sc_cadaar, '78', Σ, {
            p: p
        }, []);
        return Σ_78.refs.p.car.car.cdr.car;
    }

    function sc_caddar(p) {
        var Σ_79 = new Σ.Scope(this, sc_caddar, '79', Σ, {
            p: p
        }, []);
        return Σ_79.refs.p.car.cdr.cdr.car;
    }

    function sc_cadadr(p) {
        var Σ_80 = new Σ.Scope(this, sc_cadadr, '80', Σ, {
            p: p
        }, []);
        return Σ_80.refs.p.cdr.car.cdr.car;
    }

    function sc_cadddr(p) {
        var Σ_81 = new Σ.Scope(this, sc_cadddr, '81', Σ, {
            p: p
        }, []);
        return Σ_81.refs.p.cdr.cdr.cdr.car;
    }

    function sc_cddaar(p) {
        var Σ_82 = new Σ.Scope(this, sc_cddaar, '82', Σ, {
            p: p
        }, []);
        return Σ_82.refs.p.car.car.cdr.cdr;
    }

    function sc_cdddar(p) {
        var Σ_83 = new Σ.Scope(this, sc_cdddar, '83', Σ, {
            p: p
        }, []);
        return Σ_83.refs.p.car.cdr.cdr.cdr;
    }

    function sc_cddadr(p) {
        var Σ_84 = new Σ.Scope(this, sc_cddadr, '84', Σ, {
            p: p
        }, []);
        return Σ_84.refs.p.cdr.car.cdr.cdr;
    }

    function sc_cddddr(p) {
        var Σ_85 = new Σ.Scope(this, sc_cddddr, '85', Σ, {
            p: p
        }, []);
        return Σ_85.refs.p.cdr.cdr.cdr.cdr;
    }

    function sc_lastPair(l) {
        var Σ_86 = new Σ.Scope(this, sc_lastPair, '86', Σ, {
            l: l
        }, []);
        if (!Σ.refs.sc_isPair(Σ_86.refs.l)) {
            Σ.refs.sc_error('sc_lastPair: pair expected');
        }
        Σ_86.refs.res = Σ_86.refs.l;
        Σ_86.refs.cdr = Σ_86.refs.l.cdr;
        while (Σ.refs.sc_isPair(Σ_86.refs.cdr)) {
            Σ_86.refs.res = Σ_86.refs.cdr;
            Σ_86.refs.cdr = Σ_86.refs.res.cdr;
        }
        return Σ_86.refs.res;
    }

    function sc_isNull(o) {
        var Σ_87 = new Σ.Scope(this, sc_isNull, '87', Σ, {
            o: o
        }, []);
        return Σ_87.refs.o === null;
    }

    function sc_isList(o) {
        var Σ_88 = new Σ.Scope(this, sc_isList, '88', Σ, {
            o: o
        }, []);
        Σ_88.refs.rabbit = undefined;
        Σ_88.refs.turtle = undefined;
        Σ_88.refs.rabbit = Σ_88.refs.o;
        Σ_88.refs.turtle = Σ_88.refs.o;
        while (true) {
            if (Σ_88.refs.rabbit === null || Σ_88.refs.rabbit instanceof Σ.refs.sc_Pair && Σ_88.refs.rabbit.cdr === null) {
                return true;
            } else if (Σ_88.refs.rabbit instanceof Σ.refs.sc_Pair && Σ_88.refs.rabbit.cdr instanceof Σ.refs.sc_Pair) {
                Σ_88.refs.rabbit = Σ_88.refs.rabbit.cdr.cdr;
                Σ_88.refs.turtle = Σ_88.refs.turtle.cdr;
                if (Σ_88.refs.rabbit === Σ_88.refs.turtle) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    function sc_list() {
        var Σ_89 = new Σ.Scope(this, sc_list, '89', Σ, {}, []);
        Σ_89.refs.res = null;
        Σ_89.refs.a = undefined;
        for (Σ_89.refs.i = Σ_89.refs.a.length - 1; Σ_89.refs.i >= 0; Σ_89.refs.i--) {
            Σ_89.refs.res = new Σ.refs.sc_Pair(Σ_89.refs.a[Σ_89.refs.i], Σ_89.refs.res);
        }
        return Σ_89.refs.res;
    }

    function sc_iota(num, init) {
        var Σ_90 = new Σ.Scope(this, sc_iota, '90', Σ, {
            num: num,
            init: init
        }, []);
        Σ_90.refs.res = null;
        if (!Σ_90.refs.init) {
            Σ_90.refs.init = 0;
        }
        for (Σ_90.refs.i = Σ_90.refs.num - 1; Σ_90.refs.i >= 0; Σ_90.refs.i--) {
            Σ_90.refs.res = new Σ.refs.sc_Pair(Σ_90.refs.i + Σ_90.refs.init, Σ_90.refs.res);
        }
        return Σ_90.refs.res;
    }

    function sc_makeList(nbEls, fill) {
        var Σ_91 = new Σ.Scope(this, sc_makeList, '91', Σ, {
            nbEls: nbEls,
            fill: fill
        }, []);
        Σ_91.refs.res = null;
        for (Σ_91.refs.i = 0; Σ_91.refs.i < Σ_91.refs.nbEls; Σ_91.refs.i++) {
            Σ_91.refs.res = new Σ.refs.sc_Pair(Σ_91.refs.fill, Σ_91.refs.res);
        }
        return Σ_91.refs.res;
    }

    function sc_length(l) {
        var Σ_92 = new Σ.Scope(this, sc_length, '92', Σ, {
            l: l
        }, []);
        Σ_92.refs.res = 0;
        while (Σ_92.refs.l !== null) {
            Σ_92.refs.res++;
            Σ_92.refs.l = Σ_92.refs.l.cdr;
        }
        return Σ_92.refs.res;
    }

    function sc_remq(o, l) {
        var Σ_93 = new Σ.Scope(this, sc_remq, '93', Σ, {
            o: o,
            l: l
        }, []);
        Σ_93.refs.dummy = {
            cdr: null
        };
        Σ_93.refs.tail = Σ_93.refs.dummy;
        while (Σ_93.refs.l !== null) {
            if (Σ_93.refs.l.car !== Σ_93.refs.o) {
                Σ_93.refs.tail.cdr = Σ.refs.sc_cons(Σ_93.refs.l.car, null);
                Σ_93.refs.tail = Σ_93.refs.tail.cdr;
            }
            Σ_93.refs.l = Σ_93.refs.l.cdr;
        }
        return Σ_93.refs.dummy.cdr;
    }

    function sc_remqBang(o, l) {
        var Σ_94 = new Σ.Scope(this, sc_remqBang, '94', Σ, {
            o: o,
            l: l
        }, []);
        Σ_94.refs.dummy = {
            cdr: null
        };
        Σ_94.refs.tail = Σ_94.refs.dummy;
        Σ_94.refs.needsAssig = true;
        while (Σ_94.refs.l !== null) {
            if (Σ_94.refs.l.car === Σ_94.refs.o) {
                Σ_94.refs.needsAssig = true;
            } else {
                if (Σ_94.refs.needsAssig) {
                    Σ_94.refs.tail.cdr = Σ_94.refs.l;
                    Σ_94.refs.needsAssig = false;
                }
                Σ_94.refs.tail = Σ_94.refs.l;
            }
            Σ_94.refs.l = Σ_94.refs.l.cdr;
        }
        Σ_94.refs.tail.cdr = null;
        return Σ_94.refs.dummy.cdr;
    }

    function sc_delete(o, l) {
        var Σ_95 = new Σ.Scope(this, sc_delete, '95', Σ, {
            o: o,
            l: l
        }, []);
        Σ_95.refs.dummy = {
            cdr: null
        };
        Σ_95.refs.tail = Σ_95.refs.dummy;
        while (Σ_95.refs.l !== null) {
            if (!Σ.refs.sc_isEqual(Σ_95.refs.l.car, Σ_95.refs.o)) {
                Σ_95.refs.tail.cdr = Σ.refs.sc_cons(Σ_95.refs.l.car, null);
                Σ_95.refs.tail = Σ_95.refs.tail.cdr;
            }
            Σ_95.refs.l = Σ_95.refs.l.cdr;
        }
        return Σ_95.refs.dummy.cdr;
    }

    function sc_deleteBang(o, l) {
        var Σ_96 = new Σ.Scope(this, sc_deleteBang, '96', Σ, {
            o: o,
            l: l
        }, []);
        Σ_96.refs.dummy = {
            cdr: null
        };
        Σ_96.refs.tail = Σ_96.refs.dummy;
        Σ_96.refs.needsAssig = true;
        while (Σ_96.refs.l !== null) {
            if (Σ.refs.sc_isEqual(Σ_96.refs.l.car, Σ_96.refs.o)) {
                Σ_96.refs.needsAssig = true;
            } else {
                if (Σ_96.refs.needsAssig) {
                    Σ_96.refs.tail.cdr = Σ_96.refs.l;
                    Σ_96.refs.needsAssig = false;
                }
                Σ_96.refs.tail = Σ_96.refs.l;
            }
            Σ_96.refs.l = Σ_96.refs.l.cdr;
        }
        Σ_96.refs.tail.cdr = null;
        return Σ_96.refs.dummy.cdr;
    }

    function sc_reverseAppendBang(l1, l2) {
        var Σ_97 = new Σ.Scope(this, sc_reverseAppendBang, '97', Σ, {
            l1: l1,
            l2: l2
        }, []);
        Σ_97.refs.res = Σ_97.refs.l2;
        while (Σ_97.refs.l1 !== null) {
            Σ_97.refs.tmp = Σ_97.refs.res;
            Σ_97.refs.res = Σ_97.refs.l1;
            Σ_97.refs.l1 = Σ_97.refs.l1.cdr;
            Σ_97.refs.res.cdr = Σ_97.refs.tmp;
        }
        return Σ_97.refs.res;
    }

    function sc_dualAppend(l1, l2) {
        var Σ_98 = new Σ.Scope(this, sc_dualAppend, '98', Σ, {
            l1: l1,
            l2: l2
        }, []);
        if (Σ_98.refs.l1 === null) {
            return Σ_98.refs.l2;
        }
        if (Σ_98.refs.l2 === null) {
            return Σ_98.refs.l1;
        }
        Σ_98.refs.rev = Σ.refs.sc_reverse(Σ_98.refs.l1);
        return Σ.refs.sc_reverseAppendBang(Σ_98.refs.rev, Σ_98.refs.l2);
    }

    function sc_append() {
        var Σ_99 = new Σ.Scope(this, sc_append, '99', Σ, {}, []);
        if (arguments.length === 0) {
            return null;
        }
        Σ_99.refs.res = undefined;
        for (Σ_99.refs.i = arguments.length - 2; Σ_99.refs.i >= 0; Σ_99.refs.i--) {
            Σ_99.refs.res = Σ.refs.sc_dualAppend(arguments[i], Σ_99.refs.res);
        }
        return Σ_99.refs.res;
    }

    function sc_dualAppendBang(l1, l2) {
        var Σ_100 = new Σ.Scope(this, sc_dualAppendBang, '100', Σ, {
            l1: l1,
            l2: l2
        }, []);
        if (Σ_100.refs.l1 === null) {
            return Σ_100.refs.l2;
        }
        if (Σ_100.refs.l2 === null) {
            return Σ_100.refs.l1;
        }
        Σ_100.refs.tmp = Σ_100.refs.l1;
        while (Σ_100.refs.tmp.cdr !== null) {
            Σ_100.refs.tmp = Σ_100.refs.tmp.cdr;
        }
        Σ_100.refs.tmp.cdr = Σ_100.refs.l2;
        return Σ_100.refs.l1;
    }

    function sc_appendBang() {
        var Σ_101 = new Σ.Scope(this, sc_appendBang, '101', Σ, {}, []);
        Σ_101.refs.res = null;
        for (Σ_101.refs.i = 0; Σ_101.refs.i < arguments.length; Σ_101.refs.i++) {
            Σ_101.refs.res = Σ.refs.sc_dualAppendBang(Σ_101.refs.res, arguments[i]);
        }
        return Σ_101.refs.res;
    }

    function sc_reverse(l1) {
        var Σ_102 = new Σ.Scope(this, sc_reverse, '102', Σ, {
            l1: l1
        }, []);
        Σ_102.refs.res = null;
        while (Σ_102.refs.l1 !== null) {
            Σ_102.refs.res = Σ.refs.sc_cons(Σ_102.refs.l1.car, Σ_102.refs.res);
            Σ_102.refs.l1 = Σ_102.refs.l1.cdr;
        }
        return Σ_102.refs.res;
    }

    function sc_reverseBang(l) {
        var Σ_103 = new Σ.Scope(this, sc_reverseBang, '103', Σ, {
            l: l
        }, []);
        return Σ.refs.sc_reverseAppendBang(Σ_103.refs.l, null);
    }

    function sc_listTail(l, k) {
        var Σ_104 = new Σ.Scope(this, sc_listTail, '104', Σ, {
            l: l,
            k: k
        }, []);
        Σ_104.refs.res = Σ_104.refs.l;
        for (Σ_104.refs.i = 0; Σ_104.refs.i < Σ_104.refs.k; Σ_104.refs.i++) {
            Σ_104.refs.res = Σ_104.refs.res.cdr;
        }
        return Σ_104.refs.res;
    }

    function sc_listRef(l, k) {
        var Σ_105 = new Σ.Scope(this, sc_listRef, '105', Σ, {
            l: l,
            k: k
        }, []);
        return Σ.refs.sc_listTail(Σ_105.refs.l, Σ_105.refs.k).car;
    }

    function sc_memq(o, l) {
        var Σ_106 = new Σ.Scope(this, sc_memq, '106', Σ, {
            o: o,
            l: l
        }, []);
        while (Σ_106.refs.l !== null) {
            if (Σ_106.refs.l.car === Σ_106.refs.o) {
                return Σ_106.refs.l;
            }
            Σ_106.refs.l = Σ_106.refs.l.cdr;
        }
        return false;
    }

    function sc_memv(o, l) {
        var Σ_107 = new Σ.Scope(this, sc_memv, '107', Σ, {
            o: o,
            l: l
        }, []);
        while (Σ_107.refs.l !== null) {
            if (Σ_107.refs.l.car === Σ_107.refs.o) {
                return Σ_107.refs.l;
            }
            Σ_107.refs.l = Σ_107.refs.l.cdr;
        }
        return false;
    }

    function sc_member(o, l) {
        var Σ_108 = new Σ.Scope(this, sc_member, '108', Σ, {
            o: o,
            l: l
        }, []);
        while (Σ_108.refs.l !== null) {
            if (Σ.refs.sc_isEqual(Σ_108.refs.l.car, Σ_108.refs.o)) {
                return Σ_108.refs.l;
            }
            Σ_108.refs.l = Σ_108.refs.l.cdr;
        }
        return false;
    }

    function sc_assq(o, al) {
        var Σ_109 = new Σ.Scope(this, sc_assq, '109', Σ, {
            o: o,
            al: al
        }, []);
        while (Σ_109.refs.al !== null) {
            if (Σ_109.refs.al.car.car === Σ_109.refs.o) {
                return Σ_109.refs.al.car;
            }
            Σ_109.refs.al = Σ_109.refs.al.cdr;
        }
        return false;
    }

    function sc_assv(o, al) {
        var Σ_110 = new Σ.Scope(this, sc_assv, '110', Σ, {
            o: o,
            al: al
        }, []);
        while (Σ_110.refs.al !== null) {
            if (Σ_110.refs.al.car.car === Σ_110.refs.o) {
                return Σ_110.refs.al.car;
            }
            Σ_110.refs.al = Σ_110.refs.al.cdr;
        }
        return false;
    }

    function sc_assoc(o, al) {
        var Σ_111 = new Σ.Scope(this, sc_assoc, '111', Σ, {
            o: o,
            al: al
        }, []);
        while (Σ_111.refs.al !== null) {
            if (Σ.refs.sc_isEqual(Σ_111.refs.al.car.car, Σ_111.refs.o)) {
                return Σ_111.refs.al.car;
            }
            Σ_111.refs.al = Σ_111.refs.al.cdr;
        }
        return false;
    }

    function sc_isCharStringEqual(cs1, cs2) {
        var Σ_112 = new Σ.Scope(this, sc_isCharStringEqual, '112', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_112.refs.cs1.val === Σ_112.refs.cs2.val;
    }

    function sc_isCharStringLess(cs1, cs2) {
        var Σ_113 = new Σ.Scope(this, sc_isCharStringLess, '113', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_113.refs.cs1.val < Σ_113.refs.cs2.val;
    }

    function sc_isCharStringGreater(cs1, cs2) {
        var Σ_114 = new Σ.Scope(this, sc_isCharStringGreater, '114', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_114.refs.cs1.val > Σ_114.refs.cs2.val;
    }

    function sc_isCharStringLessEqual(cs1, cs2) {
        var Σ_115 = new Σ.Scope(this, sc_isCharStringLessEqual, '115', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_115.refs.cs1.val <= Σ_115.refs.cs2.val;
    }

    function sc_isCharStringGreaterEqual(cs1, cs2) {
        var Σ_116 = new Σ.Scope(this, sc_isCharStringGreaterEqual, '116', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_116.refs.cs1.val >= Σ_116.refs.cs2.val;
    }

    function sc_isCharStringCIEqual(cs1, cs2) {
        var Σ_117 = new Σ.Scope(this, sc_isCharStringCIEqual, '117', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_117.refs.cs1.val.toLowerCase() === Σ_117.refs.cs2.val.toLowerCase();
    }

    function sc_isCharStringCILess(cs1, cs2) {
        var Σ_118 = new Σ.Scope(this, sc_isCharStringCILess, '118', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_118.refs.cs1.val.toLowerCase() < Σ_118.refs.cs2.val.toLowerCase();
    }

    function sc_isCharStringCIGreater(cs1, cs2) {
        var Σ_119 = new Σ.Scope(this, sc_isCharStringCIGreater, '119', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_119.refs.cs1.val.toLowerCase() > Σ_119.refs.cs2.val.toLowerCase();
    }

    function sc_isCharStringCILessEqual(cs1, cs2) {
        var Σ_120 = new Σ.Scope(this, sc_isCharStringCILessEqual, '120', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_120.refs.cs1.val.toLowerCase() <= Σ_120.refs.cs2.val.toLowerCase();
    }

    function sc_isCharStringCIGreaterEqual(cs1, cs2) {
        var Σ_121 = new Σ.Scope(this, sc_isCharStringCIGreaterEqual, '121', Σ, {
            cs1: cs1,
            cs2: cs2
        }, []);
        return Σ_121.refs.cs1.val.toLowerCase() >= Σ_121.refs.cs2.val.toLowerCase();
    }

    function sc_Char(c) {
        var Σ_122 = new Σ.Scope(this, sc_Char, '122', Σ, {
            c: c
        }, []);
        Σ_122.refs.cached = Σ.refs.sc_Char.lazy[Σ_122.refs.c];
        if (Σ_122.refs.cached) {
            return Σ_122.refs.cached;
        }
        this.val = Σ_122.refs.c;
        Σ.refs.sc_Char.lazy[Σ_122.refs.c] = this;
        return undefined;
    }
    Σ.refs.sc_Char.lazy = new Object();
    Σ.refs.sc_Char.char2readable = {
        '\0': '#\\null',
        '\x07': '#\\bell',
        '\b': '#\\backspace',
        '\t': '#\\tab',
        '\n': '#\\newline',
        '\f': '#\\page',
        '\r': '#\\return',
        '\x1B': '#\\escape',
        ' ': '#\\space',
        '\x7F': '#\\delete',
        '\x01': '#\\soh',
        '\x02': '#\\stx',
        '\x03': '#\\etx',
        '\x04': '#\\eot',
        '\x05': '#\\enq',
        '\x06': '#\\ack',
        '\x0B': '#\\vt',
        '\x0E': '#\\so',
        '\x0F': '#\\si',
        '\x10': '#\\dle',
        '\x11': '#\\dc1',
        '\x12': '#\\dc2',
        '\x13': '#\\dc3',
        '\x14': '#\\dc4',
        '\x15': '#\\nak',
        '\x16': '#\\syn',
        '\x17': '#\\etb',
        '\x18': '#\\can',
        '\x19': '#\\em',
        '\x1A': '#\\sub',
        '\x1B': '#\\esc',
        '\x1C': '#\\fs',
        '\x1D': '#\\gs',
        '\x1E': '#\\rs',
        '\x1F': '#\\us'
    };
    Σ.refs.sc_Char.readable2char = {
        'null': '\0',
        'bell': '\x07',
        'backspace': '\b',
        'tab': '\t',
        'newline': '\n',
        'page': '\f',
        'return': '\r',
        'escape': '\x1B',
        'space': ' ',
        'delete': '\0',
        'soh': '\x01',
        'stx': '\x02',
        'etx': '\x03',
        'eot': '\x04',
        'enq': '\x05',
        'ack': '\x06',
        'bel': '\x07',
        'bs': '\b',
        'ht': '\t',
        'nl': '\n',
        'vt': '\x0B',
        'np': '\f',
        'cr': '\r',
        'so': '\x0E',
        'si': '\x0F',
        'dle': '\x10',
        'dc1': '\x11',
        'dc2': '\x12',
        'dc3': '\x13',
        'dc4': '\x14',
        'nak': '\x15',
        'syn': '\x16',
        'etb': '\x17',
        'can': '\x18',
        'em': '\x19',
        'sub': '\x1A',
        'esc': '\x1B',
        'fs': '\x1C',
        'gs': '\x1D',
        'rs': '\x1E',
        'us': '\x1F',
        'sp': ' ',
        'del': '\x7F'
    };
    Σ.refs.sc_Char.prototype.toString = Σ.addFunction(function αYxuf() {
        var Σ_123 = new Σ.Scope(this, αYxuf, '123', Σ, {}, []);
        return this.val;
    }, Σ);
    Σ.refs.sc_Char.prototype.sc_toWriteString = Σ.addFunction(function αuLSY() {
        var Σ_124 = new Σ.Scope(this, αuLSY, '124', Σ, {}, []);
        Σ_124.refs.entry = Σ.refs.sc_Char.char2readable[this.val];
        if (Σ_124.refs.entry) {
            return Σ_124.refs.entry;
        } else {
            return '#\\' + this.val;
        }
    }, Σ);

    function sc_isChar(c) {
        var Σ_125 = new Σ.Scope(this, sc_isChar, '125', Σ, {
            c: c
        }, []);
        return Σ_125.refs.c instanceof Σ.refs.sc_Char;
    }
    Σ.refs.sc_isCharEqual = Σ.refs.sc_isCharStringEqual;
    Σ.refs.sc_isCharLess = Σ.refs.sc_isCharStringLess;
    Σ.refs.sc_isCharGreater = Σ.refs.sc_isCharStringGreater;
    Σ.refs.sc_isCharLessEqual = Σ.refs.sc_isCharStringLessEqual;
    Σ.refs.sc_isCharGreaterEqual = Σ.refs.sc_isCharStringGreaterEqual;
    Σ.refs.sc_isCharCIEqual = Σ.refs.sc_isCharStringCIEqual;
    Σ.refs.sc_isCharCILess = Σ.refs.sc_isCharStringCILess;
    Σ.refs.sc_isCharCIGreater = Σ.refs.sc_isCharStringCIGreater;
    Σ.refs.sc_isCharCILessEqual = Σ.refs.sc_isCharStringCILessEqual;
    Σ.refs.sc_isCharCIGreaterEqual = Σ.refs.sc_isCharStringCIGreaterEqual;
    Σ.refs.SC_NUMBER_CLASS = '0123456789';
    Σ.refs.SC_WHITESPACE_CLASS = ' \r\n\t\f';
    Σ.refs.SC_LOWER_CLASS = 'abcdefghijklmnopqrstuvwxyz';
    Σ.refs.SC_UPPER_CLASS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function sc_isCharOfClass(c, cl) {
        var Σ_126 = new Σ.Scope(this, sc_isCharOfClass, '126', Σ, {
            c: c,
            cl: cl
        }, []);
        return Σ_126.refs.cl.indexOf(Σ_126.refs.c) != -1;
    }

    function sc_isCharAlphabetic(c) {
        var Σ_127 = new Σ.Scope(this, sc_isCharAlphabetic, '127', Σ, {
            c: c
        }, []);
        return Σ.refs.sc_isCharOfClass(Σ_127.refs.c.val, Σ.refs.SC_LOWER_CLASS) || Σ.refs.sc_isCharOfClass(Σ_127.refs.c.val, Σ.refs.SC_UPPER_CLASS);
    }

    function sc_isCharNumeric(c) {
        var Σ_128 = new Σ.Scope(this, sc_isCharNumeric, '128', Σ, {
            c: c
        }, []);
        return Σ.refs.sc_isCharOfClass(Σ_128.refs.c.val, Σ.refs.SC_NUMBER_CLASS);
    }

    function sc_isCharWhitespace(c) {
        var Σ_129 = new Σ.Scope(this, sc_isCharWhitespace, '129', Σ, {
            c: c
        }, []);
        Σ_129.refs.tmp = Σ_129.refs.c.val;
        return Σ_129.refs.tmp === ' ' || Σ_129.refs.tmp === '\r' || Σ_129.refs.tmp === '\n' || Σ_129.refs.tmp === '\t' || Σ_129.refs.tmp === '\f';
    }

    function sc_isCharUpperCase(c) {
        var Σ_130 = new Σ.Scope(this, sc_isCharUpperCase, '130', Σ, {
            c: c
        }, []);
        return Σ.refs.sc_isCharOfClass(Σ_130.refs.c.val, Σ.refs.SC_UPPER_CLASS);
    }

    function sc_isCharLowerCase(c) {
        var Σ_131 = new Σ.Scope(this, sc_isCharLowerCase, '131', Σ, {
            c: c
        }, []);
        return Σ.refs.sc_isCharOfClass(Σ_131.refs.c.val, Σ.refs.SC_LOWER_CLASS);
    }

    function sc_char2integer(c) {
        var Σ_132 = new Σ.Scope(this, sc_char2integer, '132', Σ, {
            c: c
        }, []);
        return Σ_132.refs.c.val.charCodeAt(0);
    }

    function sc_integer2char(n) {
        var Σ_133 = new Σ.Scope(this, sc_integer2char, '133', Σ, {
            n: n
        }, []);
        return new Σ.refs.sc_Char(String.fromCharCode(Σ_133.refs.n));
    }

    function sc_charUpcase(c) {
        var Σ_134 = new Σ.Scope(this, sc_charUpcase, '134', Σ, {
            c: c
        }, []);
        return new Σ.refs.sc_Char(Σ_134.refs.c.val.toUpperCase());
    }

    function sc_charDowncase(c) {
        var Σ_135 = new Σ.Scope(this, sc_charDowncase, '135', Σ, {
            c: c
        }, []);
        return new Σ.refs.sc_Char(Σ_135.refs.c.val.toLowerCase());
    }

    function sc_makeJSStringOfLength(k, c) {
        var Σ_136 = new Σ.Scope(this, sc_makeJSStringOfLength, '136', Σ, {
            k: k,
            c: c
        }, []);
        Σ_136.refs.fill = undefined;
        if (Σ_136.refs.c === undefined) {
            Σ_136.refs.fill = ' ';
        } else {
            Σ_136.refs.fill = Σ_136.refs.c;
        }
        Σ_136.refs.res = '';
        Σ_136.refs.len = 1;
        while (Σ_136.refs.k >= Σ_136.refs.len) {
            if (Σ_136.refs.k & Σ_136.refs.len) {
                Σ_136.refs.res = Σ_136.refs.res.concat(Σ_136.refs.fill);
            }
            Σ_136.refs.fill = Σ_136.refs.fill.concat(Σ_136.refs.fill);
            Σ_136.refs.len *= 2;
        }
        return Σ_136.refs.res;
    }

    function sc_makejsString(k, c) {
        var Σ_137 = new Σ.Scope(this, sc_makejsString, '137', Σ, {
            k: k,
            c: c
        }, []);
        Σ_137.refs.fill = undefined;
        if (Σ_137.refs.c) {
            Σ_137.refs.fill = Σ_137.refs.c.val;
        } else {
            Σ_137.refs.fill = ' ';
        }
        return Σ.refs.sc_makeJSStringOfLength(Σ_137.refs.k, Σ_137.refs.fill);
    }

    function sc_jsstring2list(s) {
        var Σ_138 = new Σ.Scope(this, sc_jsstring2list, '138', Σ, {
            s: s
        }, []);
        Σ_138.refs.res = null;
        for (Σ_138.refs.i = Σ_138.refs.s.length - 1; Σ_138.refs.i >= 0; Σ_138.refs.i--) {
            Σ_138.refs.res = Σ.refs.sc_cons(new Σ.refs.sc_Char(Σ_138.refs.s.charAt(Σ_138.refs.i)), Σ_138.refs.res);
        }
        return Σ_138.refs.res;
    }

    function sc_list2jsstring(l) {
        var Σ_139 = new Σ.Scope(this, sc_list2jsstring, '139', Σ, {
            l: l
        }, []);
        Σ_139.refs.a = new Array();
        while (Σ_139.refs.l !== null) {
            Σ_139.refs.a.push(Σ_139.refs.l.car.val);
            Σ_139.refs.l = Σ_139.refs.l.cdr;
        }
        return ''.concat.apply('', Σ_139.refs.a);
    }
    Σ.refs.sc_Vector = undefined;
    Σ.refs.sc_Vector.prototype.sc_toWriteOrDisplayString = Σ.addFunction(function αgR2x(writeOrDisplay) {
        var Σ_140 = new Σ.Scope(this, αgR2x, '140', Σ, {
            writeOrDisplay: writeOrDisplay
        }, []);
        if (this.length === 0) {
            return '#()';
        }
        Σ_140.refs.res = '#(' + Σ_140.refs.writeOrDisplay(this[0]);
        for (Σ_140.refs.i = 1; Σ_140.refs.i < this.length; Σ_140.refs.i++) {
            Σ_140.refs.res += ' ' + Σ_140.refs.writeOrDisplay(this[Σ_140.refs.i]);
        }
        Σ_140.refs.res += ')';
        return Σ_140.refs.res;
    }, Σ);
    Σ.refs.sc_Vector.prototype.sc_toDisplayString = Σ.addFunction(function αCyDW() {
        var Σ_141 = new Σ.Scope(this, αCyDW, '141', Σ, {}, []);
        return this.sc_toWriteOrDisplayString(Σ.refs.sc_toDisplayString);
    }, Σ);
    Σ.refs.sc_Vector.prototype.sc_toWriteString = Σ.addFunction(function αn5kP() {
        var Σ_142 = new Σ.Scope(this, αn5kP, '142', Σ, {}, []);
        return this.sc_toWriteOrDisplayString(Σ.refs.sc_toWriteString);
    }, Σ);

    function sc_isVector(v) {
        var Σ_143 = new Σ.Scope(this, sc_isVector, '143', Σ, {
            v: v
        }, []);
        return Σ_143.refs.v instanceof Σ.refs.sc_Vector;
    }

    function sc_isVectorEqual(v1, v2, comp) {
        var Σ_144 = new Σ.Scope(this, sc_isVectorEqual, '144', Σ, {
            v1: v1,
            v2: v2,
            comp: comp
        }, []);
        if (Σ_144.refs.v1.length !== Σ_144.refs.v2.length) {
            return false;
        }
        for (Σ_144.refs.i = 0; Σ_144.refs.i < Σ_144.refs.v1.length; Σ_144.refs.i++) {
            if (!Σ_144.refs.comp(Σ_144.refs.v1[Σ_144.refs.i], Σ_144.refs.v2[Σ_144.refs.i])) {
                return false;
            }
        }
        return true;
    }

    function sc_makeVector(size, fill) {
        var Σ_145 = new Σ.Scope(this, sc_makeVector, '145', Σ, {
            size: size,
            fill: fill
        }, []);
        Σ_145.refs.a = new Σ.refs.sc_Vector(Σ_145.refs.size);
        if (Σ_145.refs.fill !== undefined) {
            Σ.refs.sc_vectorFillBang(Σ_145.refs.a, Σ_145.refs.fill);
        }
        return Σ_145.refs.a;
    }

    function sc_vector() {
        var Σ_146 = new Σ.Scope(this, sc_vector, '146', Σ, {}, []);
        Σ_146.refs.a = new Σ.refs.sc_Vector();
        for (Σ_146.refs.i = 0; Σ_146.refs.i < arguments.length; Σ_146.refs.i++) {
            Σ_146.refs.a.push(arguments[i]);
        }
        return Σ_146.refs.a;
    }

    function sc_vectorLength(v) {
        var Σ_147 = new Σ.Scope(this, sc_vectorLength, '147', Σ, {
            v: v
        }, []);
        return Σ_147.refs.v.length;
    }

    function sc_vectorRef(v, pos) {
        var Σ_148 = new Σ.Scope(this, sc_vectorRef, '148', Σ, {
            v: v,
            pos: pos
        }, []);
        return Σ_148.refs.v[Σ_148.refs.pos];
    }

    function sc_vectorSetBang(v, pos, val) {
        var Σ_149 = new Σ.Scope(this, sc_vectorSetBang, '149', Σ, {
            v: v,
            pos: pos,
            val: val
        }, []);
        Σ_149.refs.v[Σ_149.refs.pos] = Σ_149.refs.val;
    }

    function sc_vector2list(a) {
        var Σ_150 = new Σ.Scope(this, sc_vector2list, '150', Σ, {
            a: a
        }, []);
        Σ_150.refs.res = null;
        for (Σ_150.refs.i = Σ_150.refs.a.length - 1; Σ_150.refs.i >= 0; Σ_150.refs.i--) {
            Σ_150.refs.res = Σ.refs.sc_cons(Σ_150.refs.a[Σ_150.refs.i], Σ_150.refs.res);
        }
        return Σ_150.refs.res;
    }

    function sc_list2vector(l) {
        var Σ_151 = new Σ.Scope(this, sc_list2vector, '151', Σ, {
            l: l
        }, []);
        Σ_151.refs.a = new Σ.refs.sc_Vector();
        while (Σ_151.refs.l !== null) {
            Σ_151.refs.a.push(Σ_151.refs.l.car);
            Σ_151.refs.l = Σ_151.refs.l.cdr;
        }
        return Σ_151.refs.a;
    }

    function sc_vectorFillBang(a, fill) {
        var Σ_152 = new Σ.Scope(this, sc_vectorFillBang, '152', Σ, {
            a: a,
            fill: fill
        }, []);
        for (Σ_152.refs.i = 0; Σ_152.refs.i < Σ_152.refs.a.length; Σ_152.refs.i++) {
            Σ_152.refs.a[Σ_152.refs.i] = Σ_152.refs.fill;
        }
    }

    function sc_copyVector(a, len) {
        var Σ_153 = new Σ.Scope(this, sc_copyVector, '153', Σ, {
            a: a,
            len: len
        }, []);
        if (Σ_153.refs.len <= Σ_153.refs.a.length) {
            return Σ_153.refs.a.slice(0, Σ_153.refs.len);
        } else {
            Σ_153.refs.tmp = Σ_153.refs.a.concat();
            Σ_153.refs.tmp.length = Σ_153.refs.len;
            return Σ_153.refs.tmp;
        }
    }

    function sc_vectorCopy(a, start, end) {
        var Σ_154 = new Σ.Scope(this, sc_vectorCopy, '154', Σ, {
            a: a,
            start: start,
            end: end
        }, []);
        return Σ_154.refs.a.slice(Σ_154.refs.start, Σ_154.refs.end);
    }

    function sc_vectorCopyBang(target, tstart, source, sstart, send) {
        var Σ_155 = new Σ.Scope(this, sc_vectorCopyBang, '155', Σ, {
            target: target,
            tstart: tstart,
            source: source,
            sstart: sstart,
            send: send
        }, []);
        if (!Σ_155.refs.sstart) {
            Σ_155.refs.sstart = 0;
        }
        if (!Σ_155.refs.send) {
            Σ_155.refs.send = Σ_155.refs.source.length;
        }
        if (Σ_155.refs.tstart <= Σ_155.refs.sstart) {
            for (Σ_155.refs.i = Σ_155.refs.tstart, Σ_155.refs.j = Σ_155.refs.sstart; Σ_155.refs.j < Σ_155.refs.send; Σ_155.refs.i++, Σ_155.refs.j++) {
                Σ_155.refs.target[Σ_155.refs.i] = Σ_155.refs.source[Σ_155.refs.j];
            }
        } else {
            Σ_155.refs.diff = Σ_155.refs.send - Σ_155.refs.sstart;
            for (Σ_155.refs.i = Σ_155.refs.tstart + Σ_155.refs.diff - 1, Σ_155.refs.j = Σ_155.refs.send - 1; Σ_155.refs.j >= Σ_155.refs.sstart; Σ_155.refs.i--, Σ_155.refs.j--) {
                Σ_155.refs.target[Σ_155.refs.i] = Σ_155.refs.source[Σ_155.refs.j];
            }
        }
        return Σ_155.refs.target;
    }

    function sc_isProcedure(o) {
        var Σ_156 = new Σ.Scope(this, sc_isProcedure, '156', Σ, {
            o: o
        }, []);
        return typeof Σ_156.refs.o === 'function';
    }

    function sc_apply(proc) {
        var Σ_157 = new Σ.Scope(this, sc_apply, '157', Σ, {
            proc: proc
        }, []);
        Σ_157.refs.args = new Array();
        for (Σ_157.refs.i = 1; Σ_157.refs.i < arguments.length - 1; Σ_157.refs.i++) {
            Σ_157.refs.args.push(arguments[i]);
        }
        Σ_157.refs.l = undefined;
        while (Σ_157.refs.l !== null) {
            Σ_157.refs.args.push(Σ_157.refs.l.car);
            Σ_157.refs.l = Σ_157.refs.l.cdr;
        }
        return Σ_157.refs.proc.apply(null, Σ_157.refs.args);
    }

    function sc_map(proc, l1) {
        var Σ_158 = new Σ.Scope(this, sc_map, '158', Σ, {
            proc: proc,
            l1: l1
        }, []);
        if (Σ_158.refs.l1 === undefined) {
            return null;
        }
        Σ_158.refs.nbApplyArgs = arguments.length - 1;
        Σ_158.refs.applyArgs = new Array(Σ_158.refs.nbApplyArgs);
        Σ_158.refs.revres = null;
        while (Σ_158.refs.l1 !== null) {
            for (Σ_158.refs.i = 0; Σ_158.refs.i < Σ_158.refs.nbApplyArgs; Σ_158.refs.i++) {
                Σ_158.refs.applyArgs[Σ_158.refs.i] = arguments[i + 1].car;
                arguments[i + 1] = arguments[i + 1].cdr;
            }
            Σ_158.refs.revres = Σ.refs.sc_cons(Σ_158.refs.proc.apply(null, Σ_158.refs.applyArgs), Σ_158.refs.revres);
        }
        return Σ.refs.sc_reverseAppendBang(Σ_158.refs.revres, null);
    }

    function sc_mapBang(proc, l1) {
        var Σ_159 = new Σ.Scope(this, sc_mapBang, '159', Σ, {
            proc: proc,
            l1: l1
        }, []);
        if (Σ_159.refs.l1 === undefined) {
            return null;
        }
        Σ_159.refs.l1_orig = Σ_159.refs.l1;
        Σ_159.refs.nbApplyArgs = arguments.length - 1;
        Σ_159.refs.applyArgs = new Array(Σ_159.refs.nbApplyArgs);
        while (Σ_159.refs.l1 !== null) {
            Σ_159.refs.tmp = Σ_159.refs.l1;
            for (Σ_159.refs.i = 0; Σ_159.refs.i < Σ_159.refs.nbApplyArgs; Σ_159.refs.i++) {
                Σ_159.refs.applyArgs[Σ_159.refs.i] = arguments[i + 1].car;
                arguments[i + 1] = arguments[i + 1].cdr;
            }
            Σ_159.refs.tmp.car = Σ_159.refs.proc.apply(null, Σ_159.refs.applyArgs);
        }
        return Σ_159.refs.l1_orig;
    }

    function sc_forEach(proc, l1) {
        var Σ_160 = new Σ.Scope(this, sc_forEach, '160', Σ, {
            proc: proc,
            l1: l1
        }, []);
        if (Σ_160.refs.l1 === undefined) {
            return undefined;
        }
        Σ_160.refs.nbApplyArgs = arguments.length - 1;
        Σ_160.refs.applyArgs = new Array(Σ_160.refs.nbApplyArgs);
        while (Σ_160.refs.l1 !== null) {
            for (Σ_160.refs.i = 0; Σ_160.refs.i < Σ_160.refs.nbApplyArgs; Σ_160.refs.i++) {
                Σ_160.refs.applyArgs[Σ_160.refs.i] = arguments[i + 1].car;
                arguments[i + 1] = arguments[i + 1].cdr;
            }
            Σ_160.refs.proc.apply(null, Σ_160.refs.applyArgs);
        }
        return undefined;
    }

    function sc_filter(proc, l1) {
        var Σ_161 = new Σ.Scope(this, sc_filter, '161', Σ, {
            proc: proc,
            l1: l1
        }, []);
        Σ_161.refs.dummy = {
            cdr: null
        };
        Σ_161.refs.tail = Σ_161.refs.dummy;
        while (Σ_161.refs.l1 !== null) {
            if (Σ_161.refs.proc(Σ_161.refs.l1.car) !== false) {
                Σ_161.refs.tail.cdr = Σ.refs.sc_cons(Σ_161.refs.l1.car, null);
                Σ_161.refs.tail = Σ_161.refs.tail.cdr;
            }
            Σ_161.refs.l1 = Σ_161.refs.l1.cdr;
        }
        return Σ_161.refs.dummy.cdr;
    }

    function sc_filterBang(proc, l1) {
        var Σ_162 = new Σ.Scope(this, sc_filterBang, '162', Σ, {
            proc: proc,
            l1: l1
        }, []);
        Σ_162.refs.head = Σ.refs.sc_cons('dummy', Σ_162.refs.l1);
        Σ_162.refs.it = Σ_162.refs.head;
        Σ_162.refs.next = Σ_162.refs.l1;
        while (Σ_162.refs.next !== null) {
            if (Σ_162.refs.proc(Σ_162.refs.next.car) !== false) {
                Σ_162.refs.it.cdr = Σ_162.refs.next;
                Σ_162.refs.it = Σ_162.refs.next;
            }
            Σ_162.refs.next = Σ_162.refs.next.cdr;
        }
        Σ_162.refs.it.cdr = null;
        return Σ_162.refs.head.cdr;
    }

    function sc_filterMap1(proc, l1) {
        var Σ_163 = new Σ.Scope(this, sc_filterMap1, '163', Σ, {
            proc: proc,
            l1: l1
        }, []);
        Σ_163.refs.revres = null;
        while (Σ_163.refs.l1 !== null) {
            Σ_163.refs.tmp = Σ_163.refs.proc(Σ_163.refs.l1.car);
            if (Σ_163.refs.tmp !== false) {
                Σ_163.refs.revres = Σ.refs.sc_cons(Σ_163.refs.tmp, Σ_163.refs.revres);
            }
            Σ_163.refs.l1 = Σ_163.refs.l1.cdr;
        }
        return Σ.refs.sc_reverseAppendBang(Σ_163.refs.revres, null);
    }

    function sc_filterMap2(proc, l1, l2) {
        var Σ_164 = new Σ.Scope(this, sc_filterMap2, '164', Σ, {
            proc: proc,
            l1: l1,
            l2: l2
        }, []);
        Σ_164.refs.revres = null;
        while (Σ_164.refs.l1 !== null) {
            Σ_164.refs.tmp = Σ_164.refs.proc(Σ_164.refs.l1.car, Σ_164.refs.l2.car);
            if (Σ_164.refs.tmp !== false) {
                Σ_164.refs.revres = Σ.refs.sc_cons(Σ_164.refs.tmp, Σ_164.refs.revres);
            }
            Σ_164.refs.l1 = Σ_164.refs.l1.cdr;
            Σ_164.refs.l2 = Σ_164.refs.l2.cdr;
        }
        return Σ.refs.sc_reverseAppendBang(Σ_164.refs.revres, null);
    }

    function sc_filterMap(proc, l1, l2, l3) {
        var Σ_165 = new Σ.Scope(this, sc_filterMap, '165', Σ, {
            proc: proc,
            l1: l1,
            l2: l2,
            l3: l3
        }, []);
        if (Σ_165.refs.l2 === undefined) {
            return Σ.refs.sc_filterMap1(Σ_165.refs.proc, Σ_165.refs.l1);
        } else if (Σ_165.refs.l3 === undefined) {
            return Σ.refs.sc_filterMap2(Σ_165.refs.proc, Σ_165.refs.l1, Σ_165.refs.l2);
        }
        Σ_165.refs.nbApplyArgs = arguments.length - 1;
        Σ_165.refs.applyArgs = new Array(Σ_165.refs.nbApplyArgs);
        Σ_165.refs.revres = null;
        while (Σ_165.refs.l1 !== null) {
            for (Σ_165.refs.i = 0; Σ_165.refs.i < Σ_165.refs.nbApplyArgs; Σ_165.refs.i++) {
                Σ_165.refs.applyArgs[Σ_165.refs.i] = arguments[i + 1].car;
                arguments[i + 1] = arguments[i + 1].cdr;
            }
            Σ_165.refs.tmp = Σ_165.refs.proc.apply(null, Σ_165.refs.applyArgs);
            if (Σ_165.refs.tmp !== false) {
                Σ_165.refs.revres = Σ.refs.sc_cons(Σ_165.refs.tmp, Σ_165.refs.revres);
            }
        }
        return Σ.refs.sc_reverseAppendBang(Σ_165.refs.revres, null);
    }

    function sc_any(proc, l) {
        var Σ_166 = new Σ.Scope(this, sc_any, '166', Σ, {
            proc: proc,
            l: l
        }, []);
        Σ_166.refs.revres = null;
        while (Σ_166.refs.l !== null) {
            Σ_166.refs.tmp = Σ_166.refs.proc(Σ_166.refs.l.car);
            if (Σ_166.refs.tmp !== false) {
                return Σ_166.refs.tmp;
            }
            Σ_166.refs.l = Σ_166.refs.l.cdr;
        }
        return false;
    }

    function sc_anyPred(proc, l) {
        var Σ_167 = new Σ.Scope(this, sc_anyPred, '167', Σ, {
            proc: proc,
            l: l
        }, []);
        return Σ.refs.sc_any(Σ_167.refs.proc, Σ_167.refs.l) !== false;
    }

    function sc_every(proc, l) {
        var Σ_168 = new Σ.Scope(this, sc_every, '168', Σ, {
            proc: proc,
            l: l
        }, []);
        Σ_168.refs.revres = null;
        Σ_168.refs.tmp = true;
        while (Σ_168.refs.l !== null) {
            Σ_168.refs.tmp = Σ_168.refs.proc(Σ_168.refs.l.car);
            if (Σ_168.refs.tmp === false) {
                return false;
            }
            Σ_168.refs.l = Σ_168.refs.l.cdr;
        }
        return Σ_168.refs.tmp;
    }

    function sc_everyPred(proc, l) {
        var Σ_169 = new Σ.Scope(this, sc_everyPred, '169', Σ, {
            proc: proc,
            l: l
        }, []);
        Σ_169.refs.tmp = Σ.refs.sc_every(Σ_169.refs.proc, Σ_169.refs.l);
        if (Σ_169.refs.tmp !== false) {
            return true;
        }
        return false;
    }

    function sc_force(o) {
        var Σ_170 = new Σ.Scope(this, sc_force, '170', Σ, {
            o: o
        }, []);
        return Σ_170.refs.o();
    }

    function sc_makePromise(proc) {
        var Σ_171 = new Σ.Scope(this, sc_makePromise, '171', Σ, {
            proc: proc
        }, []);
        Σ_171.refs.isResultReady = false;
        Σ_171.refs.result = undefined;
        return Σ_171.addFunction(function αriCp() {
            var Σ_171_0 = new Σ.Scope(this, αriCp, '0', Σ_171, {}, []);
            if (!Σ_171.refs.isResultReady) {
                Σ_171_0.refs.tmp = Σ_171.refs.proc();
                if (!Σ_171.refs.isResultReady) {
                    Σ_171.refs.isResultReady = true;
                    Σ_171.refs.result = Σ_171_0.refs.tmp;
                }
            }
            return Σ_171.refs.result;
        }, Σ_171);
    }

    function sc_Values(values) {
        var Σ_172 = new Σ.Scope(this, sc_Values, '172', Σ, {
            values: values
        }, []);
        this.values = Σ_172.refs.values;
    }

    function sc_values() {
        var Σ_173 = new Σ.Scope(this, sc_values, '173', Σ, {}, []);
        if (arguments.length === 1) {
            return arguments[0];
        } else {
            return new Σ.refs.sc_Values(arguments);
        }
    }

    function sc_callWithValues(producer, consumer) {
        var Σ_174 = new Σ.Scope(this, sc_callWithValues, '174', Σ, {
            producer: producer,
            consumer: consumer
        }, []);
        Σ_174.refs.produced = Σ_174.refs.producer();
        if (Σ_174.refs.produced instanceof Σ.refs.sc_Values) {
            return Σ_174.refs.consumer.apply(null, Σ_174.refs.produced.values);
        } else {
            return Σ_174.refs.consumer(Σ_174.refs.produced);
        }
    }

    function sc_dynamicWind(before, thunk, after) {
        var Σ_175 = new Σ.Scope(this, sc_dynamicWind, '175', Σ, {
            before: before,
            thunk: thunk,
            after: after
        }, []);
        Σ_175.refs.before();
        try {
            var res = thunk();
            return res;
        } finally {
            after();
        }
    }

    function sc_Struct(name) {
        var Σ_176 = new Σ.Scope(this, sc_Struct, '176', Σ, {
            name: name
        }, []);
        this.name = Σ_176.refs.name;
    }
    Σ.refs.sc_Struct.prototype.sc_toDisplayString = Σ.addFunction(function αuHoN() {
        var Σ_177 = new Σ.Scope(this, αuHoN, '177', Σ, {}, []);
        return '#<struct' + Σ.refs.sc_hash(this) + '>';
    }, Σ);
    Σ.refs.sc_Struct.prototype.sc_toWriteString = Σ.refs.sc_Struct.prototype.sc_toDisplayString;

    function sc_makeStruct(name) {
        var Σ_178 = new Σ.Scope(this, sc_makeStruct, '178', Σ, {
            name: name
        }, []);
        return new Σ.refs.sc_Struct(Σ_178.refs.name);
    }

    function sc_isStruct(o) {
        var Σ_179 = new Σ.Scope(this, sc_isStruct, '179', Σ, {
            o: o
        }, []);
        return Σ_179.refs.o instanceof Σ.refs.sc_Struct;
    }

    function sc_isStructNamed(name, s) {
        var Σ_180 = new Σ.Scope(this, sc_isStructNamed, '180', Σ, {
            name: name,
            s: s
        }, []);
        return Σ_180.refs.s instanceof Σ.refs.sc_Struct && Σ_180.refs.s.name === Σ_180.refs.name;
    }

    function sc_getStructField(s, name, field) {
        var Σ_181 = new Σ.Scope(this, sc_getStructField, '181', Σ, {
            s: s,
            name: name,
            field: field
        }, []);
        return Σ_181.refs.s[Σ_181.refs.field];
    }

    function sc_setStructFieldBang(s, name, field, val) {
        var Σ_182 = new Σ.Scope(this, sc_setStructFieldBang, '182', Σ, {
            s: s,
            name: name,
            field: field,
            val: val
        }, []);
        Σ_182.refs.s[Σ_182.refs.field] = Σ_182.refs.val;
    }

    function sc_bitNot(x) {
        var Σ_183 = new Σ.Scope(this, sc_bitNot, '183', Σ, {
            x: x
        }, []);
        return ~Σ_183.refs.x;
    }

    function sc_bitAnd(x, y) {
        var Σ_184 = new Σ.Scope(this, sc_bitAnd, '184', Σ, {
            x: x,
            y: y
        }, []);
        return Σ_184.refs.x & Σ_184.refs.y;
    }

    function sc_bitOr(x, y) {
        var Σ_185 = new Σ.Scope(this, sc_bitOr, '185', Σ, {
            x: x,
            y: y
        }, []);
        return Σ_185.refs.x | Σ_185.refs.y;
    }

    function sc_bitXor(x, y) {
        var Σ_186 = new Σ.Scope(this, sc_bitXor, '186', Σ, {
            x: x,
            y: y
        }, []);
        return Σ_186.refs.x ^ Σ_186.refs.y;
    }

    function sc_bitLsh(x, y) {
        var Σ_187 = new Σ.Scope(this, sc_bitLsh, '187', Σ, {
            x: x,
            y: y
        }, []);
        return Σ_187.refs.x << Σ_187.refs.y;
    }

    function sc_bitRsh(x, y) {
        var Σ_188 = new Σ.Scope(this, sc_bitRsh, '188', Σ, {
            x: x,
            y: y
        }, []);
        return Σ_188.refs.x >> Σ_188.refs.y;
    }

    function sc_bitUrsh(x, y) {
        var Σ_189 = new Σ.Scope(this, sc_bitUrsh, '189', Σ, {
            x: x,
            y: y
        }, []);
        return Σ_189.refs.x >>> Σ_189.refs.y;
    }

    function sc_jsField(o, field) {
        var Σ_190 = new Σ.Scope(this, sc_jsField, '190', Σ, {
            o: o,
            field: field
        }, []);
        return Σ_190.refs.o[Σ_190.refs.field];
    }

    function sc_setJsFieldBang(o, field, val) {
        var Σ_191 = new Σ.Scope(this, sc_setJsFieldBang, '191', Σ, {
            o: o,
            field: field,
            val: val
        }, []);
        return Σ_191.refs.o[Σ_191.refs.field] = Σ_191.refs.val;
    }

    function sc_deleteJsFieldBang(o, field) {
        var Σ_192 = new Σ.Scope(this, sc_deleteJsFieldBang, '192', Σ, {
            o: o,
            field: field
        }, []);
        delete Σ_192.refs.o[Σ_192.refs.field];
    }

    function sc_jsCall(o, fun) {
        var Σ_193 = new Σ.Scope(this, sc_jsCall, '193', Σ, {
            o: o,
            fun: fun
        }, []);
        Σ_193.refs.args = new Array();
        for (Σ_193.refs.i = 2; Σ_193.refs.i < arguments.length; Σ_193.refs.i++) {
            Σ_193.refs.args[Σ_193.refs.i - 2] = arguments[i];
        }
        return Σ_193.refs.fun.apply(Σ_193.refs.o, Σ_193.refs.args);
    }

    function sc_jsMethodCall(o, field) {
        var Σ_194 = new Σ.Scope(this, sc_jsMethodCall, '194', Σ, {
            o: o,
            field: field
        }, []);
        Σ_194.refs.args = new Array();
        for (Σ_194.refs.i = 2; Σ_194.refs.i < arguments.length; Σ_194.refs.i++) {
            Σ_194.refs.args[Σ_194.refs.i - 2] = arguments[i];
        }
        return Σ_194.refs.o[Σ_194.refs.field].apply(Σ_194.refs.o, Σ_194.refs.args);
    }

    function sc_jsNew(c) {
        var Σ_195 = new Σ.Scope(this, sc_jsNew, '195', Σ, {
            c: c
        }, []);
        Σ_195.refs.evalStr = 'new c(';
        Σ_195.refs.evalStr += arguments.length > 1 ? 'arguments[1]' : '';
        for (Σ_195.refs.i = 2; Σ_195.refs.i < arguments.length; Σ_195.refs.i++) {
            Σ_195.refs.evalStr += ', arguments[' + Σ_195.refs.i + ']';
        }
        Σ_195.refs.evalStr += ')';
        return eval(Σ_195.refs.evalStr);
    }

    function sc_pregexp(re) {
        var Σ_196 = new Σ.Scope(this, sc_pregexp, '196', Σ, {
            re: re
        }, []);
        return new RegExp(Σ.refs.sc_string2jsstring(Σ_196.refs.re));
    }

    function sc_pregexpMatch(re, s) {
        var Σ_197 = new Σ.Scope(this, sc_pregexpMatch, '197', Σ, {
            re: re,
            s: s
        }, []);
        Σ_197.refs.reg = Σ_197.refs.re instanceof RegExp ? Σ_197.refs.re : Σ.refs.sc_pregexp(Σ_197.refs.re);
        Σ_197.refs.tmp = Σ_197.refs.reg.exec(Σ.refs.sc_string2jsstring(Σ_197.refs.s));
        if (Σ_197.refs.tmp == null) {
            return false;
        }
        Σ_197.refs.res = null;
        for (Σ_197.refs.i = Σ_197.refs.tmp.length - 1; Σ_197.refs.i >= 0; Σ_197.refs.i--) {
            if (Σ_197.refs.tmp[Σ_197.refs.i] !== null) {
                Σ_197.refs.res = Σ.refs.sc_cons(Σ.refs.sc_jsstring2string(Σ_197.refs.tmp[Σ_197.refs.i]), Σ_197.refs.res);
            } else {
                Σ_197.refs.res = Σ.refs.sc_cons(false, Σ_197.refs.res);
            }
        }
        return Σ_197.refs.res;
    }

    function sc_pregexpReplace(re, s1, s2) {
        var Σ_198 = new Σ.Scope(this, sc_pregexpReplace, '198', Σ, {
            re: re,
            s1: s1,
            s2: s2
        }, []);
        Σ_198.refs.reg = undefined;
        Σ_198.refs.jss1 = Σ.refs.sc_string2jsstring(Σ_198.refs.s1);
        Σ_198.refs.jss2 = Σ.refs.sc_string2jsstring(Σ_198.refs.s2);
        if (Σ_198.refs.re instanceof RegExp) {
            if (Σ_198.refs.re.global) {
                Σ_198.refs.reg = Σ_198.refs.re;
            } else {
                Σ_198.refs.reg = new RegExp(Σ_198.refs.re.source);
            }
        } else {
            Σ_198.refs.reg = new RegExp(Σ.refs.sc_string2jsstring(Σ_198.refs.re));
        }
        return Σ_198.refs.jss1.replace(Σ_198.refs.reg, Σ_198.refs.jss2);
    }

    function sc_pregexpReplaceAll(re, s1, s2) {
        var Σ_199 = new Σ.Scope(this, sc_pregexpReplaceAll, '199', Σ, {
            re: re,
            s1: s1,
            s2: s2
        }, []);
        Σ_199.refs.reg = undefined;
        Σ_199.refs.jss1 = Σ.refs.sc_string2jsstring(Σ_199.refs.s1);
        Σ_199.refs.jss2 = Σ.refs.sc_string2jsstring(Σ_199.refs.s2);
        if (Σ_199.refs.re instanceof RegExp) {
            if (Σ_199.refs.re.global) {
                Σ_199.refs.reg = Σ_199.refs.re;
            } else {
                Σ_199.refs.reg = new RegExp(Σ_199.refs.re.source, 'g');
            }
        } else {
            Σ_199.refs.reg = new RegExp(Σ.refs.sc_string2jsstring(Σ_199.refs.re), 'g');
        }
        return Σ_199.refs.jss1.replace(Σ_199.refs.reg, Σ_199.refs.jss2);
    }

    function sc_pregexpSplit(re, s) {
        var Σ_200 = new Σ.Scope(this, sc_pregexpSplit, '200', Σ, {
            re: re,
            s: s
        }, []);
        Σ_200.refs.reg = Σ_200.refs.re instanceof RegExp ? Σ_200.refs.re : new RegExp(Σ.refs.sc_string2jsstring(Σ_200.refs.re));
        Σ_200.refs.jss = Σ.refs.sc_string2jsstring(Σ_200.refs.s);
        Σ_200.refs.tmp = Σ_200.refs.jss.split(Σ_200.refs.reg);
        if (Σ_200.refs.tmp == null) {
            return false;
        }
        return Σ.refs.sc_vector2list(Σ_200.refs.tmp);
    }

    function sc_random(n) {
        var Σ_201 = new Σ.Scope(this, sc_random, '201', Σ, {
            n: n
        }, []);
        return Math.floor(Math.random() * Σ_201.refs.n);
    }

    function sc_currentDate() {
        var Σ_202 = new Σ.Scope(this, sc_currentDate, '202', Σ, {}, []);
        return new Date();
    }

    function sc_Hashtable() {
        var Σ_203 = new Σ.Scope(this, sc_Hashtable, '203', Σ, {}, []);
    }
    Σ.refs.sc_Hashtable.prototype.toString = Σ.addFunction(function αvSbS() {
        var Σ_204 = new Σ.Scope(this, αvSbS, '204', Σ, {}, []);
        return '#{%hashtable}';
    }, Σ);

    function sc_HashtableElement(key, val) {
        var Σ_205 = new Σ.Scope(this, sc_HashtableElement, '205', Σ, {
            key: key,
            val: val
        }, []);
        this.key = Σ_205.refs.key;
        this.val = Σ_205.refs.val;
    }

    function sc_makeHashtable() {
        var Σ_206 = new Σ.Scope(this, sc_makeHashtable, '206', Σ, {}, []);
        return new Σ.refs.sc_Hashtable();
    }

    function sc_hashtablePutBang(ht, key, val) {
        var Σ_207 = new Σ.Scope(this, sc_hashtablePutBang, '207', Σ, {
            ht: ht,
            key: key,
            val: val
        }, []);
        Σ_207.refs.hash = Σ.refs.sc_hash(Σ_207.refs.key);
        Σ_207.refs.ht[Σ_207.refs.hash] = new Σ.refs.sc_HashtableElement(Σ_207.refs.key, Σ_207.refs.val);
    }

    function sc_hashtableGet(ht, key) {
        var Σ_208 = new Σ.Scope(this, sc_hashtableGet, '208', Σ, {
            ht: ht,
            key: key
        }, []);
        Σ_208.refs.hash = Σ.refs.sc_hash(Σ_208.refs.key);
        if (Σ_208.refs.hash in Σ_208.refs.ht) {
            return Σ_208.refs.ht[Σ_208.refs.hash].val;
        } else {
            return false;
        }
    }

    function sc_hashtableForEach(ht, f) {
        var Σ_209 = new Σ.Scope(this, sc_hashtableForEach, '209', Σ, {
            ht: ht,
            f: f
        }, []);
        for (var v in ht) {
            if (ht[v] instanceof sc_HashtableElement)
                f(ht[v].key, ht[v].val);
        }
    }

    function sc_hashtableContains(ht, key) {
        var Σ_210 = new Σ.Scope(this, sc_hashtableContains, '210', Σ, {
            ht: ht,
            key: key
        }, []);
        Σ_210.refs.hash = Σ.refs.sc_hash(Σ_210.refs.key);
        if (Σ_210.refs.hash in Σ_210.refs.ht) {
            return true;
        } else {
            return false;
        }
    }
    Σ.refs.SC_HASH_COUNTER = 0;

    function sc_hash(o) {
        var Σ_211 = new Σ.Scope(this, sc_hash, '211', Σ, {
            o: o
        }, []);
        if (Σ_211.refs.o === null) {
            return 'null';
        } else if (Σ_211.refs.o === undefined) {
            return 'undefined';
        } else if (Σ_211.refs.o === true) {
            return 'true';
        } else if (Σ_211.refs.o === false) {
            return 'false';
        } else if (typeof Σ_211.refs.o === 'number') {
            return 'num-' + Σ_211.refs.o;
        } else if (typeof Σ_211.refs.o === 'string') {
            return 'jsstr-' + Σ_211.refs.o;
        } else if (Σ_211.refs.o.sc_getHash) {
            return Σ_211.refs.o.sc_getHash();
        } else {
            return Σ.refs.sc_counterHash.call(Σ_211.refs.o);
        }
    }

    function sc_counterHash() {
        var Σ_212 = new Σ.Scope(this, sc_counterHash, '212', Σ, {}, []);
        if (!this.sc_hash) {
            this.sc_hash = 'hash-' + Σ.refs.SC_HASH_COUNTER;
            Σ.refs.SC_HASH_COUNTER++;
        }
        return this.sc_hash;
    }

    function sc_Trampoline(args, maxTailCalls) {
        var Σ_213 = new Σ.Scope(this, sc_Trampoline, '213', Σ, {
            args: args,
            maxTailCalls: maxTailCalls
        }, []);
        this['__trampoline return__'] = true;
        this.args = Σ_213.refs.args;
        this.MAX_TAIL_CALLs = Σ_213.refs.maxTailCalls;
    }
    Σ.refs.sc_Trampoline.prototype.restart = Σ.addFunction(function αvSSA() {
        var Σ_214 = new Σ.Scope(this, αvSSA, '214', Σ, {}, []);
        Σ_214.refs.o = this;
        while (true) {
            Σ.refs.SC_TAIL_OBJECT.calls = Σ_214.refs.o.MAX_TAIL_CALLs - 1;
            Σ_214.refs.fun = Σ_214.refs.o.args.callee;
            Σ_214.refs.res = Σ_214.refs.fun.apply(Σ.refs.SC_TAIL_OBJECT, Σ_214.refs.o.args);
            if (Σ_214.refs.res instanceof Σ.refs.sc_Trampoline) {
                Σ_214.refs.o = Σ_214.refs.res;
            } else {
                return Σ_214.refs.res;
            }
        }
    }, Σ);

    function sc_bindExitLambda(proc) {
        var Σ_215 = new Σ.Scope(this, sc_bindExitLambda, '215', Σ, {
            proc: proc
        }, []);
        Σ_215.refs.escape_obj = new Σ.refs.sc_BindExitException();
        Σ_215.refs.escape = Σ_215.addFunction(function α2BHi(res) {
            var Σ_215_0 = new Σ.Scope(this, α2BHi, '0', Σ_215, {
                res: res
            }, []);
            Σ_215.refs.escape_obj.res = Σ_215_0.refs.res;
            throw Σ_215.refs.escape_obj;
        }, Σ_215);
        try {
            return proc(escape);
        } catch (e) {
            if (e === escape_obj) {
                return e.res;
            }
            throw e;
        }
    }

    function sc_BindExitException() {
        var Σ_216 = new Σ.Scope(this, sc_BindExitException, '216', Σ, {}, []);
        this._internalException = true;
    }
    Σ.refs.SC_SCM2JS_GLOBALS = new Object();
    Σ.refs.SC_TAIL_OBJECT = new Object();
    Σ.refs.SC_SCM2JS_GLOBALS.TAIL_OBJECT = Σ.refs.SC_TAIL_OBJECT;

    function sc_EOF() {
        var Σ_217 = new Σ.Scope(this, sc_EOF, '217', Σ, {}, []);
    }
    Σ.refs.SC_EOF_OBJECT = new Σ.refs.sc_EOF();

    function sc_Port() {
        var Σ_218 = new Σ.Scope(this, sc_Port, '218', Σ, {}, []);
    }

    function sc_InputPort() {
        var Σ_219 = new Σ.Scope(this, sc_InputPort, '219', Σ, {}, []);
    }
    Σ.refs.sc_InputPort.prototype = new Σ.refs.sc_Port();
    Σ.refs.sc_InputPort.prototype.peekChar = Σ.addFunction(function αUETs() {
        var Σ_220 = new Σ.Scope(this, αUETs, '220', Σ, {}, []);
        if (!('peeked' in this)) {
            this.peeked = this.getNextChar();
        }
        return this.peeked;
    }, Σ);
    Σ.refs.sc_InputPort.prototype.readChar = Σ.addFunction(function αEaIi() {
        var Σ_221 = new Σ.Scope(this, αEaIi, '221', Σ, {}, []);
        Σ_221.refs.tmp = this.peekChar();
        delete this.peeked;
        return Σ_221.refs.tmp;
    }, Σ);
    Σ.refs.sc_InputPort.prototype.isCharReady = Σ.addFunction(function αZvhX() {
        var Σ_222 = new Σ.Scope(this, αZvhX, '222', Σ, {}, []);
        return true;
    }, Σ);
    Σ.refs.sc_InputPort.prototype.close = Σ.addFunction(function αm2es() {
        var Σ_223 = new Σ.Scope(this, αm2es, '223', Σ, {}, []);
    }, Σ);

    function sc_ErrorInputPort() {
        var Σ_224 = new Σ.Scope(this, sc_ErrorInputPort, '224', Σ, {}, []);
    };
    Σ.refs.sc_ErrorInputPort.prototype = new Σ.refs.sc_InputPort();
    Σ.refs.sc_ErrorInputPort.prototype.getNextChar = Σ.addFunction(function αS9MR() {
        var Σ_225 = new Σ.Scope(this, αS9MR, '225', Σ, {}, []);
        throw 'can\'t read from error-port.';
    }, Σ);
    Σ.refs.sc_ErrorInputPort.prototype.isCharReady = Σ.addFunction(function αipdY() {
        var Σ_226 = new Σ.Scope(this, αipdY, '226', Σ, {}, []);
        return false;
    }, Σ);

    function sc_StringInputPort(jsStr) {
        var Σ_227 = new Σ.Scope(this, sc_StringInputPort, '227', Σ, {
            jsStr: jsStr
        }, []);
        this.str = new String(Σ_227.refs.jsStr);
        this.pos = 0;
    }
    Σ.refs.sc_StringInputPort.prototype = new Σ.refs.sc_InputPort();
    Σ.refs.sc_StringInputPort.prototype.getNextChar = Σ.addFunction(function α0qG7() {
        var Σ_228 = new Σ.Scope(this, α0qG7, '228', Σ, {}, []);
        if (this.pos >= this.str.length) {
            return Σ.refs.SC_EOF_OBJECT;
        }
        return this.str.charAt(this.pos++);
    }, Σ);

    function sc_Token(type, val, pos) {
        var Σ_229 = new Σ.Scope(this, sc_Token, '229', Σ, {
            type: type,
            val: val,
            pos: pos
        }, []);
        this.type = Σ_229.refs.type;
        this.val = Σ_229.refs.val;
        this.pos = Σ_229.refs.pos;
    }
    Σ.refs.sc_Token.EOF = 0;

    function sc_isCharReady(port) {
        var Σ_230 = new Σ.Scope(this, sc_isCharReady, '230', Σ, {
            port: port
        }, []);
        if (Σ_230.refs.port === undefined) {
            Σ_230.refs.port = Σ.refs.SC_DEFAULT_IN;
        }
        return Σ_230.refs.port.isCharReady();
    }

    function sc_closeInputPort(p) {
        var Σ_231 = new Σ.Scope(this, sc_closeInputPort, '231', Σ, {
            p: p
        }, []);
        return Σ_231.refs.p.close();
    }

    function sc_isInputPort(o) {
        var Σ_232 = new Σ.Scope(this, sc_isInputPort, '232', Σ, {
            o: o
        }, []);
        return Σ_232.refs.o instanceof Σ.refs.sc_InputPort;
    }

    function sc_isEOFObject(o) {
        var Σ_233 = new Σ.Scope(this, sc_isEOFObject, '233', Σ, {
            o: o
        }, []);
        return Σ_233.refs.o === Σ.refs.SC_EOF_OBJECT;
    }

    function sc_currentInputPort() {
        var Σ_234 = new Σ.Scope(this, sc_currentInputPort, '234', Σ, {}, []);
        return Σ.refs.SC_DEFAULT_IN;
    }

    function sc_callWithInputFile(s, proc) {
        var Σ_235 = new Σ.Scope(this, sc_callWithInputFile, '235', Σ, {
            s: s,
            proc: proc
        }, []);
        throw 'can\'t open ' + Σ_235.refs.s;
    }

    function sc_callWithOutputFile(s, proc) {
        var Σ_236 = new Σ.Scope(this, sc_callWithOutputFile, '236', Σ, {
            s: s,
            proc: proc
        }, []);
        throw 'can\'t open ' + Σ_236.refs.s;
    }

    function sc_withInputFromFile(s, thunk) {
        var Σ_237 = new Σ.Scope(this, sc_withInputFromFile, '237', Σ, {
            s: s,
            thunk: thunk
        }, []);
        throw 'can\'t open ' + Σ_237.refs.s;
    }

    function sc_withOutputToFile(s, thunk) {
        var Σ_238 = new Σ.Scope(this, sc_withOutputToFile, '238', Σ, {
            s: s,
            thunk: thunk
        }, []);
        throw 'can\'t open ' + Σ_238.refs.s;
    }

    function sc_openInputFile(s) {
        var Σ_239 = new Σ.Scope(this, sc_openInputFile, '239', Σ, {
            s: s
        }, []);
        throw 'can\'t open ' + Σ_239.refs.s;
    }

    function sc_openOutputFile(s) {
        var Σ_240 = new Σ.Scope(this, sc_openOutputFile, '240', Σ, {
            s: s
        }, []);
        throw 'can\'t open ' + Σ_240.refs.s;
    }

    function sc_basename(p) {
        var Σ_241 = new Σ.Scope(this, sc_basename, '241', Σ, {
            p: p
        }, []);
        Σ_241.refs.i = Σ_241.refs.p.lastIndexOf('/');
        if (Σ_241.refs.i >= 0) {
            return Σ_241.refs.p.substring(Σ_241.refs.i + 1, Σ_241.refs.p.length);
        } else {
            return '';
        }
    }

    function sc_dirname(p) {
        var Σ_242 = new Σ.Scope(this, sc_dirname, '242', Σ, {
            p: p
        }, []);
        Σ_242.refs.i = Σ_242.refs.p.lastIndexOf('/');
        if (Σ_242.refs.i >= 0) {
            return Σ_242.refs.p.substring(0, Σ_242.refs.i);
        } else {
            return '';
        }
    }

    function sc_withInputFromPort(p, thunk) {
        var Σ_243 = new Σ.Scope(this, sc_withInputFromPort, '243', Σ, {
            p: p,
            thunk: thunk
        }, []);
        try {
            var tmp = SC_DEFAULT_IN;
            SC_DEFAULT_IN = p;
            return thunk();
        } finally {
            SC_DEFAULT_IN = tmp;
        }
    }

    function sc_withInputFromString(s, thunk) {
        var Σ_244 = new Σ.Scope(this, sc_withInputFromString, '244', Σ, {
            s: s,
            thunk: thunk
        }, []);
        return Σ.refs.sc_withInputFromPort(new Σ.refs.sc_StringInputPort(Σ.refs.sc_string2jsstring(Σ_244.refs.s)), Σ_244.refs.thunk);
    }

    function sc_withOutputToPort(p, thunk) {
        var Σ_245 = new Σ.Scope(this, sc_withOutputToPort, '245', Σ, {
            p: p,
            thunk: thunk
        }, []);
        try {
            var tmp = SC_DEFAULT_OUT;
            SC_DEFAULT_OUT = p;
            return thunk();
        } finally {
            SC_DEFAULT_OUT = tmp;
        }
    }

    function sc_withOutputToString(thunk) {
        var Σ_246 = new Σ.Scope(this, sc_withOutputToString, '246', Σ, {
            thunk: thunk
        }, []);
        Σ_246.refs.p = new Σ.refs.sc_StringOutputPort();
        Σ.refs.sc_withOutputToPort(Σ_246.refs.p, Σ_246.refs.thunk);
        return Σ_246.refs.p.close();
    }

    function sc_withOutputToProcedure(proc, thunk) {
        var Σ_247 = new Σ.Scope(this, sc_withOutputToProcedure, '247', Σ, {
            proc: proc,
            thunk: thunk
        }, []);
        Σ_247.refs.t = Σ_247.addFunction(function αaH29(s) {
            var Σ_247_0 = new Σ.Scope(this, αaH29, '0', Σ_247, {
                s: s
            }, []);
            Σ_247.refs.proc(Σ.refs.sc_jsstring2string(Σ_247_0.refs.s));
        }, Σ_247);
        return Σ.refs.sc_withOutputToPort(new Σ.refs.sc_GenericOutputPort(Σ_247.refs.t), Σ_247.refs.thunk);
    }

    function sc_openOutputString() {
        var Σ_248 = new Σ.Scope(this, sc_openOutputString, '248', Σ, {}, []);
        return new Σ.refs.sc_StringOutputPort();
    }

    function sc_openInputString(str) {
        var Σ_249 = new Σ.Scope(this, sc_openInputString, '249', Σ, {
            str: str
        }, []);
        return new Σ.refs.sc_StringInputPort(Σ.refs.sc_string2jsstring(Σ_249.refs.str));
    }

    function sc_OutputPort() {
        var Σ_250 = new Σ.Scope(this, sc_OutputPort, '250', Σ, {}, []);
    }
    Σ.refs.sc_OutputPort.prototype = new Σ.refs.sc_Port();
    Σ.refs.sc_OutputPort.prototype.appendJSString = Σ.addFunction(function αt4pT(obj) {
        var Σ_251 = new Σ.Scope(this, αt4pT, '251', Σ, {
            obj: obj
        }, []);
    }, Σ);
    Σ.refs.sc_OutputPort.prototype.close = Σ.addFunction(function αgpVh() {
        var Σ_252 = new Σ.Scope(this, αgpVh, '252', Σ, {}, []);
    }, Σ);

    function sc_StringOutputPort() {
        var Σ_253 = new Σ.Scope(this, sc_StringOutputPort, '253', Σ, {}, []);
        this.res = '';
    }
    Σ.refs.sc_StringOutputPort.prototype = new Σ.refs.sc_OutputPort();
    Σ.refs.sc_StringOutputPort.prototype.appendJSString = Σ.addFunction(function α3QrA(s) {
        var Σ_254 = new Σ.Scope(this, α3QrA, '254', Σ, {
            s: s
        }, []);
        this.res += Σ_254.refs.s;
    }, Σ);
    Σ.refs.sc_StringOutputPort.prototype.close = Σ.addFunction(function αEuiS() {
        var Σ_255 = new Σ.Scope(this, αEuiS, '255', Σ, {}, []);
        return Σ.refs.sc_jsstring2string(this.res);
    }, Σ);

    function sc_getOutputString(sp) {
        var Σ_256 = new Σ.Scope(this, sc_getOutputString, '256', Σ, {
            sp: sp
        }, []);
        return Σ.refs.sc_jsstring2string(Σ_256.refs.sp.res);
    }

    function sc_ErrorOutputPort() {
        var Σ_257 = new Σ.Scope(this, sc_ErrorOutputPort, '257', Σ, {}, []);
    }
    Σ.refs.sc_ErrorOutputPort.prototype = new Σ.refs.sc_OutputPort();
    Σ.refs.sc_ErrorOutputPort.prototype.appendJSString = Σ.addFunction(function αt4x7(s) {
        var Σ_258 = new Σ.Scope(this, αt4x7, '258', Σ, {
            s: s
        }, []);
        throw 'don\'t write on ErrorPort!';
    }, Σ);
    Σ.refs.sc_ErrorOutputPort.prototype.close = Σ.addFunction(function αd83g() {
        var Σ_259 = new Σ.Scope(this, αd83g, '259', Σ, {}, []);
    }, Σ);

    function sc_GenericOutputPort(appendJSString, close) {
        var Σ_260 = new Σ.Scope(this, sc_GenericOutputPort, '260', Σ, {
            appendJSString: appendJSString,
            close: close
        }, []);
        this.appendJSString = Σ_260.refs.appendJSString;
        if (Σ_260.refs.close) {
            this.close = Σ_260.refs.close;
        }
    }
    Σ.refs.sc_GenericOutputPort.prototype = new Σ.refs.sc_OutputPort();

    function sc_isOutputPort(o) {
        var Σ_261 = new Σ.Scope(this, sc_isOutputPort, '261', Σ, {
            o: o
        }, []);
        return Σ_261.refs.o instanceof Σ.refs.sc_OutputPort;
    }

    function sc_closeOutputPort(p) {
        var Σ_262 = new Σ.Scope(this, sc_closeOutputPort, '262', Σ, {
            p: p
        }, []);
        return Σ_262.refs.p.close();
    }

    function sc_write(o, p) {
        var Σ_263 = new Σ.Scope(this, sc_write, '263', Σ, {
            o: o,
            p: p
        }, []);
        if (Σ_263.refs.p === undefined) {
            Σ_263.refs.p = Σ.refs.SC_DEFAULT_OUT;
        }
        Σ_263.refs.p.appendJSString(Σ.refs.sc_toWriteString(Σ_263.refs.o));
    }

    function sc_toWriteString(o) {
        var Σ_264 = new Σ.Scope(this, sc_toWriteString, '264', Σ, {
            o: o
        }, []);
        if (Σ_264.refs.o === null) {
            return '()';
        } else if (Σ_264.refs.o === true) {
            return '#t';
        } else if (Σ_264.refs.o === false) {
            return '#f';
        } else if (Σ_264.refs.o === undefined) {
            return '#unspecified';
        } else if (typeof Σ_264.refs.o === 'function') {
            return '#<procedure ' + Σ.refs.sc_hash(Σ_264.refs.o) + '>';
        } else if (Σ_264.refs.o.sc_toWriteString) {
            return Σ_264.refs.o.sc_toWriteString();
        } else {
            return Σ_264.refs.o.toString();
        }
    }

    function sc_escapeWriteString(s) {
        var Σ_265 = new Σ.Scope(this, sc_escapeWriteString, '265', Σ, {
            s: s
        }, []);
        Σ_265.refs.res = '';
        Σ_265.refs.j = 0;
        for (i = 0; i < Σ_265.refs.s.length; i++) {
            switch (s.charAt(i)) {
                case '\0':
                    res += s.substring(j, i) + '\\0';
                    j = i + 1;
                    break;
                case '\b':
                    res += s.substring(j, i) + '\\b';
                    j = i + 1;
                    break;
                case '\f':
                    res += s.substring(j, i) + '\\f';
                    j = i + 1;
                    break;
                case '\n':
                    res += s.substring(j, i) + '\\n';
                    j = i + 1;
                    break;
                case '\r':
                    res += s.substring(j, i) + '\\r';
                    j = i + 1;
                    break;
                case '\t':
                    res += s.substring(j, i) + '\\t';
                    j = i + 1;
                    break;
                case '\x0B':
                    res += s.substring(j, i) + '\\v';
                    j = i + 1;
                    break;
                case '"':
                    res += s.substring(j, i) + '\\"';
                    j = i + 1;
                    break;
                case '\\':
                    res += s.substring(j, i) + '\\\\';
                    j = i + 1;
                    break;
                default:
                    var c = s.charAt(i);
                    if ('a' !== 'a' && c == 'a') {
                        res += s.substring(j, i) + '\\a';
                        j = i + 1;
                        continue;
                    }
                    if ('\x0B' !== 'v' && c == '\x0B') {
                        res += s.substring(j, i) + '\\v';
                        j = i + 1;
                        continue;
                    }
                    if (s.charAt(i) < ' ') {
                        res += s.substring(j, i) + '\\x' + s.charCodeAt(i).toString(16);
                        j = i + 1;
                    }
            }
        }
        Σ_265.refs.res += Σ_265.refs.s.substring(Σ_265.refs.j, i);
        return Σ_265.refs.res;
    }

    function sc_display(o, p) {
        var Σ_266 = new Σ.Scope(this, sc_display, '266', Σ, {
            o: o,
            p: p
        }, []);
        if (Σ_266.refs.p === undefined) {
            Σ_266.refs.p = Σ.refs.SC_DEFAULT_OUT;
        }
        Σ_266.refs.p.appendJSString(Σ.refs.sc_toDisplayString(Σ_266.refs.o));
    }

    function sc_toDisplayString(o) {
        var Σ_267 = new Σ.Scope(this, sc_toDisplayString, '267', Σ, {
            o: o
        }, []);
        if (Σ_267.refs.o === null) {
            return '()';
        } else if (Σ_267.refs.o === true) {
            return '#t';
        } else if (Σ_267.refs.o === false) {
            return '#f';
        } else if (Σ_267.refs.o === undefined) {
            return '#unspecified';
        } else if (typeof Σ_267.refs.o === 'function') {
            return '#<procedure ' + Σ.refs.sc_hash(Σ_267.refs.o) + '>';
        } else if (Σ_267.refs.o.sc_toDisplayString) {
            return Σ_267.refs.o.sc_toDisplayString();
        } else {
            return Σ_267.refs.o.toString();
        }
    }

    function sc_newline(p) {
        var Σ_268 = new Σ.Scope(this, sc_newline, '268', Σ, {
            p: p
        }, []);
        if (Σ_268.refs.p === undefined) {
            Σ_268.refs.p = Σ.refs.SC_DEFAULT_OUT;
        }
        Σ_268.refs.p.appendJSString('\n');
    }

    function sc_writeChar(c, p) {
        var Σ_269 = new Σ.Scope(this, sc_writeChar, '269', Σ, {
            c: c,
            p: p
        }, []);
        if (Σ_269.refs.p === undefined) {
            Σ_269.refs.p = Σ.refs.SC_DEFAULT_OUT;
        }
        Σ_269.refs.p.appendJSString(Σ_269.refs.c.val);
    }

    function sc_writeCircle(o, p) {
        var Σ_270 = new Σ.Scope(this, sc_writeCircle, '270', Σ, {
            o: o,
            p: p
        }, []);
        if (Σ_270.refs.p === undefined) {
            Σ_270.refs.p = Σ.refs.SC_DEFAULT_OUT;
        }
        Σ_270.refs.p.appendJSString(Σ.refs.sc_toWriteCircleString(Σ_270.refs.o));
    }

    function sc_toWriteCircleString(o) {
        var Σ_271 = new Σ.Scope(this, sc_toWriteCircleString, '271', Σ, {
            o: o
        }, []);
        Σ_271.refs.symb = Σ.refs.sc_gensym('writeCircle');
        Σ_271.refs.nbPointer = new Object();
        Σ_271.refs.nbPointer.nb = 0;
        Σ.refs.sc_prepWriteCircle(Σ_271.refs.o, Σ_271.refs.symb, Σ_271.refs.nbPointer);
        return Σ.refs.sc_genToWriteCircleString(Σ_271.refs.o, Σ_271.refs.symb);
    }

    function sc_prepWriteCircle(o, symb, nbPointer) {
        var Σ_272 = new Σ.Scope(this, sc_prepWriteCircle, '272', Σ, {
            o: o,
            symb: symb,
            nbPointer: nbPointer
        }, []);
        if (Σ_272.refs.o instanceof Σ.refs.sc_Pair || Σ_272.refs.o instanceof Σ.refs.sc_Vector) {
            if (Σ_272.refs.o[Σ_272.refs.symb] !== undefined) {
                Σ_272.refs.o[Σ_272.refs.symb]++;
                if (!Σ_272.refs.o[Σ_272.refs.symb + 'nb']) {
                    Σ_272.refs.o[Σ_272.refs.symb + 'nb'] = Σ_272.refs.nbPointer.nb++;
                }
                return;
            }
            Σ_272.refs.o[Σ_272.refs.symb] = 0;
            if (Σ_272.refs.o instanceof Σ.refs.sc_Pair) {
                Σ.refs.sc_prepWriteCircle(Σ_272.refs.o.car, Σ_272.refs.symb, Σ_272.refs.nbPointer);
                Σ.refs.sc_prepWriteCircle(Σ_272.refs.o.cdr, Σ_272.refs.symb, Σ_272.refs.nbPointer);
            } else {
                for (Σ_272.refs.i = 0; Σ_272.refs.i < Σ_272.refs.o.length; Σ_272.refs.i++) {
                    Σ.refs.sc_prepWriteCircle(Σ_272.refs.o[Σ_272.refs.i], Σ_272.refs.symb, Σ_272.refs.nbPointer);
                }
            }
        }
    }

    function sc_genToWriteCircleString(o, symb) {
        var Σ_273 = new Σ.Scope(this, sc_genToWriteCircleString, '273', Σ, {
            o: o,
            symb: symb
        }, []);
        if (!(Σ_273.refs.o instanceof Σ.refs.sc_Pair || Σ_273.refs.o instanceof Σ.refs.sc_Vector)) {
            return Σ.refs.sc_toWriteString(Σ_273.refs.o);
        }
        return Σ_273.refs.o.sc_toWriteCircleString(Σ_273.refs.symb);
    }
    Σ.refs.sc_Pair.prototype.sc_toWriteCircleString = Σ.addFunction(function αGsXr(symb, inList) {
        var Σ_274 = new Σ.Scope(this, αGsXr, '274', Σ, {
            symb: symb,
            inList: inList
        }, []);
        if (this[Σ_274.refs.symb + 'use']) {
            Σ_274.refs.nb = this[Σ_274.refs.symb + 'nb'];
            if (this[Σ_274.refs.symb]-- === 0) {
                delete this[Σ_274.refs.symb];
                delete this[Σ_274.refs.symb + 'nb'];
                delete this[Σ_274.refs.symb + 'use'];
            }
            if (Σ_274.refs.inList) {
                return '. #' + Σ_274.refs.nb + '#';
            } else {
                return '#' + Σ_274.refs.nb + '#';
            }
        }
        if (this[Σ_274.refs.symb]-- === 0) {
            delete this[Σ_274.refs.symb];
            delete this[Σ_274.refs.symb + 'nb'];
            delete this[Σ_274.refs.symb + 'use'];
        }
        Σ_274.refs.res = '';
        if (this[Σ_274.refs.symb] !== undefined) {
            this[Σ_274.refs.symb + 'use'] = true;
            if (Σ_274.refs.inList) {
                Σ_274.refs.res += '. #' + this[Σ_274.refs.symb + 'nb'] + '=';
            } else {
                Σ_274.refs.res += '#' + this[Σ_274.refs.symb + 'nb'] + '=';
            }
            Σ_274.refs.inList = false;
        }
        if (!Σ_274.refs.inList) {
            Σ_274.refs.res += '(';
        }
        Σ_274.refs.res += Σ.refs.sc_genToWriteCircleString(this.car, Σ_274.refs.symb);
        if (Σ.refs.sc_isPair(this.cdr)) {
            Σ_274.refs.res += ' ' + this.cdr.sc_toWriteCircleString(Σ_274.refs.symb, true);
        } else if (this.cdr !== null) {
            Σ_274.refs.res += ' . ' + Σ.refs.sc_genToWriteCircleString(this.cdr, Σ_274.refs.symb);
        }
        if (!Σ_274.refs.inList) {
            Σ_274.refs.res += ')';
        }
        return Σ_274.refs.res;
    }, Σ);
    Σ.refs.sc_Vector.prototype.sc_toWriteCircleString = Σ.addFunction(function αPOSs(symb) {
        var Σ_275 = new Σ.Scope(this, αPOSs, '275', Σ, {
            symb: symb
        }, []);
        if (this[Σ_275.refs.symb + 'use']) {
            Σ_275.refs.nb = this[Σ_275.refs.symb + 'nb'];
            if (this[Σ_275.refs.symb]-- === 0) {
                delete this[Σ_275.refs.symb];
                delete this[Σ_275.refs.symb + 'nb'];
                delete this[Σ_275.refs.symb + 'use'];
            }
            return '#' + Σ_275.refs.nb + '#';
        }
        if (this[Σ_275.refs.symb]-- === 0) {
            delete this[Σ_275.refs.symb];
            delete this[Σ_275.refs.symb + 'nb'];
            delete this[Σ_275.refs.symb + 'use'];
        }
        Σ_275.refs.res = '';
        if (this[Σ_275.refs.symb] !== undefined) {
            this[Σ_275.refs.symb + 'use'] = true;
            Σ_275.refs.res += '#' + this[Σ_275.refs.symb + 'nb'] + '=';
        }
        Σ_275.refs.res += '#(';
        for (Σ_275.refs.i = 0; Σ_275.refs.i < this.length; Σ_275.refs.i++) {
            Σ_275.refs.res += Σ.refs.sc_genToWriteCircleString(this[Σ_275.refs.i], Σ_275.refs.symb);
            if (Σ_275.refs.i < this.length - 1) {
                Σ_275.refs.res += ' ';
            }
        }
        Σ_275.refs.res += ')';
        return Σ_275.refs.res;
    }, Σ);

    function sc_print(s) {
        var Σ_276 = new Σ.Scope(this, sc_print, '276', Σ, {
            s: s
        }, []);
        if (arguments.length === 1) {
            Σ.refs.sc_display(Σ_276.refs.s);
            Σ.refs.sc_newline();
        } else {
            for (Σ_276.refs.i = 0; Σ_276.refs.i < arguments.length; Σ_276.refs.i++) {
                Σ.refs.sc_display(arguments[i]);
            }
            Σ.refs.sc_newline();
        }
    }

    function sc_format(s, args) {
        var Σ_277 = new Σ.Scope(this, sc_format, '277', Σ, {
            s: s,
            args: args
        }, []);
        Σ_277.refs.len = Σ_277.refs.s.length;
        Σ_277.refs.p = new Σ.refs.sc_StringOutputPort();
        Σ_277.refs.i = 0, Σ_277.refs.j = 1;
        while (Σ_277.refs.i < Σ_277.refs.len) {
            Σ_277.refs.i2 = Σ_277.refs.s.indexOf('~', Σ_277.refs.i);
            if (Σ_277.refs.i2 == -1) {
                Σ_277.refs.p.appendJSString(Σ_277.refs.s.substring(Σ_277.refs.i, Σ_277.refs.len));
                return Σ_277.refs.p.close();
            } else {
                if (Σ_277.refs.i2 > Σ_277.refs.i) {
                    if (Σ_277.refs.i2 == Σ_277.refs.len - 1) {
                        Σ_277.refs.p.appendJSString(Σ_277.refs.s.substring(Σ_277.refs.i, Σ_277.refs.len));
                        return Σ_277.refs.p.close();
                    } else {
                        Σ_277.refs.p.appendJSString(Σ_277.refs.s.substring(Σ_277.refs.i, Σ_277.refs.i2));
                        Σ_277.refs.i = Σ_277.refs.i2;
                    }
                }
                switch (s.charCodeAt(i2 + 1)) {
                    case 65:
                    case 97:
                        sc_display(arguments[j], p);
                        i += 2;
                        j++;
                        break;
                    case 83:
                    case 115:
                        sc_write(arguments[j], p);
                        i += 2;
                        j++;
                        break;
                    case 86:
                    case 118:
                        sc_display(arguments[j], p);
                        p.appendJSString('\n');
                        i += 2;
                        j++;
                        break;
                    case 67:
                    case 99:
                        p.appendJSString(String.fromCharCode(arguments[j]));
                        i += 2;
                        j++;
                        break;
                    case 88:
                    case 120:
                        p.appendJSString(arguments[j].toString(6));
                        i += 2;
                        j++;
                        break;
                    case 79:
                    case 111:
                        p.appendJSString(arguments[j].toString(8));
                        i += 2;
                        j++;
                        break;
                    case 66:
                    case 98:
                        p.appendJSString(arguments[j].toString(2));
                        i += 2;
                        j++;
                        break;
                    case 37:
                    case 110:
                        p.appendJSString('\n');
                        i += 2;
                        break;
                    case 114:
                        p.appendJSString('\r');
                        i += 2;
                        break;
                    case 126:
                        p.appendJSString('~');
                        i += 2;
                        break;
                    default:
                        sc_error('format: illegal ~' + String.fromCharCode(s.charCodeAt(i2 + 1)) + ' sequence');
                        return '';
                }
            }
        }
        return Σ_277.refs.p.close();
    }
    Σ.refs.SC_DEFAULT_IN = new Σ.refs.sc_ErrorInputPort();
    Σ.refs.SC_DEFAULT_OUT = new Σ.refs.sc_ErrorOutputPort();
    Σ.refs.SC_ERROR_OUT = new Σ.refs.sc_ErrorOutputPort();
    Σ.refs.sc_SYMBOL_PREFIX = 'ẜ';
    Σ.refs.sc_KEYWORD_PREFIX = 'ẝ';

    function sc_jsstring2string(s) {
        var Σ_278 = new Σ.Scope(this, sc_jsstring2string, '278', Σ, {
            s: s
        }, []);
        return Σ_278.refs.s;
    }

    function sc_jsstring2symbol(s) {
        var Σ_279 = new Σ.Scope(this, sc_jsstring2symbol, '279', Σ, {
            s: s
        }, []);
        return Σ.refs.sc_SYMBOL_PREFIX + Σ_279.refs.s;
    }

    function sc_string2jsstring(s) {
        var Σ_280 = new Σ.Scope(this, sc_string2jsstring, '280', Σ, {
            s: s
        }, []);
        return Σ_280.refs.s;
    }

    function sc_symbol2jsstring(s) {
        var Σ_281 = new Σ.Scope(this, sc_symbol2jsstring, '281', Σ, {
            s: s
        }, []);
        return Σ_281.refs.s.slice(1);
    }

    function sc_keyword2jsstring(k) {
        var Σ_282 = new Σ.Scope(this, sc_keyword2jsstring, '282', Σ, {
            k: k
        }, []);
        return Σ_282.refs.k.slice(1);
    }

    function sc_jsstring2keyword(s) {
        var Σ_283 = new Σ.Scope(this, sc_jsstring2keyword, '283', Σ, {
            s: s
        }, []);
        return Σ.refs.sc_KEYWORD_PREFIX + Σ_283.refs.s;
    }

    function sc_isKeyword(s) {
        var Σ_284 = new Σ.Scope(this, sc_isKeyword, '284', Σ, {
            s: s
        }, []);
        return typeof Σ_284.refs.s === 'string' && Σ_284.refs.s.charAt(0) === Σ.refs.sc_KEYWORD_PREFIX;
    }
    Σ.refs.sc_gensym = function αFKtt() {
        var Σ_285 = new Σ.Scope(this, αFKtt, '285', Σ, {}, []);
        Σ_285.refs.counter = 1000;
        return Σ_285.addFunction(function αDYoA(sym) {
            var Σ_285_0 = new Σ.Scope(this, αDYoA, '0', Σ_285, {
                sym: sym
            }, []);
            Σ_285.refs.counter++;
            if (!Σ_285_0.refs.sym) {
                Σ_285_0.refs.sym = Σ.refs.sc_SYMBOL_PREFIX;
            }
            return Σ_285_0.refs.sym + 's' + Σ_285.refs.counter + '~' + '^sC-GeNsYm ';
        }, Σ_285);
    }();

    function sc_isEqual(o1, o2) {
        var Σ_286 = new Σ.Scope(this, sc_isEqual, '286', Σ, {
            o1: o1,
            o2: o2
        }, []);
        return Σ_286.refs.o1 === Σ_286.refs.o2 || Σ.refs.sc_isPair(Σ_286.refs.o1) && Σ.refs.sc_isPair(Σ_286.refs.o2) && Σ.refs.sc_isPairEqual(Σ_286.refs.o1, Σ_286.refs.o2, Σ.refs.sc_isEqual) || Σ.refs.sc_isVector(Σ_286.refs.o1) && Σ.refs.sc_isVector(Σ_286.refs.o2) && Σ.refs.sc_isVectorEqual(Σ_286.refs.o1, Σ_286.refs.o2, Σ.refs.sc_isEqual);
    }

    function sc_number2symbol(x, radix) {
        var Σ_287 = new Σ.Scope(this, sc_number2symbol, '287', Σ, {
            x: x,
            radix: radix
        }, []);
        return Σ.refs.sc_SYMBOL_PREFIX + Σ.refs.sc_number2jsstring(Σ_287.refs.x, Σ_287.refs.radix);
    }
    Σ.refs.sc_number2string = Σ.refs.sc_number2jsstring;

    function sc_symbol2number(s, radix) {
        var Σ_288 = new Σ.Scope(this, sc_symbol2number, '288', Σ, {
            s: s,
            radix: radix
        }, []);
        return Σ.refs.sc_jsstring2number(Σ_288.refs.s.slice(1), Σ_288.refs.radix);
    }
    Σ.refs.sc_string2number = Σ.refs.sc_jsstring2number;

    function sc_string2integer(s, radix) {
        var Σ_289 = new Σ.Scope(this, sc_string2integer, '289', Σ, {
            s: s,
            radix: radix
        }, []);
        if (!Σ_289.refs.radix) {
            return +Σ_289.refs.s;
        }
        return parseInt(Σ_289.refs.s, Σ_289.refs.radix);
    }

    function sc_string2real(s) {
        var Σ_290 = new Σ.Scope(this, sc_string2real, '290', Σ, {
            s: s
        }, []);
        return +Σ_290.refs.s;
    }

    function sc_isSymbol(s) {
        var Σ_291 = new Σ.Scope(this, sc_isSymbol, '291', Σ, {
            s: s
        }, []);
        return typeof Σ_291.refs.s === 'string' && Σ_291.refs.s.charAt(0) === Σ.refs.sc_SYMBOL_PREFIX;
    }

    function sc_symbol2string(s) {
        var Σ_292 = new Σ.Scope(this, sc_symbol2string, '292', Σ, {
            s: s
        }, []);
        return Σ_292.refs.s.slice(1);
    }

    function sc_string2symbol(s) {
        var Σ_293 = new Σ.Scope(this, sc_string2symbol, '293', Σ, {
            s: s
        }, []);
        return Σ.refs.sc_SYMBOL_PREFIX + Σ_293.refs.s;
    }

    function sc_symbolAppend() {
        var Σ_294 = new Σ.Scope(this, sc_symbolAppend, '294', Σ, {}, []);
        Σ_294.refs.res = Σ.refs.sc_SYMBOL_PREFIX;
        for (Σ_294.refs.i = 0; Σ_294.refs.i < arguments.length; Σ_294.refs.i++) {
            Σ_294.refs.res += arguments[i].slice(1);
        }
        return Σ_294.refs.res;
    }

    function sc_char2string(c) {
        var Σ_295 = new Σ.Scope(this, sc_char2string, '295', Σ, {
            c: c
        }, []);
        return Σ_295.refs.c.val;
    }

    function sc_char2symbol(c) {
        var Σ_296 = new Σ.Scope(this, sc_char2symbol, '296', Σ, {
            c: c
        }, []);
        return Σ.refs.sc_SYMBOL_PREFIX + Σ_296.refs.c.val;
    }

    function sc_isString(s) {
        var Σ_297 = new Σ.Scope(this, sc_isString, '297', Σ, {
            s: s
        }, []);
        return typeof Σ_297.refs.s === 'string' && Σ_297.refs.s.charAt(0) !== Σ.refs.sc_SYMBOL_PREFIX;
    }
    Σ.refs.sc_makeString = Σ.refs.sc_makejsString;

    function sc_string() {
        var Σ_298 = new Σ.Scope(this, sc_string, '298', Σ, {}, []);
        for (Σ_298.refs.i = 0; Σ_298.refs.i < arguments.length; Σ_298.refs.i++) {
            arguments[i] = arguments[i].val;
        }
        return ''.concat.apply('', arguments);
    }

    function sc_stringLength(s) {
        var Σ_299 = new Σ.Scope(this, sc_stringLength, '299', Σ, {
            s: s
        }, []);
        return Σ_299.refs.s.length;
    }

    function sc_stringRef(s, k) {
        var Σ_300 = new Σ.Scope(this, sc_stringRef, '300', Σ, {
            s: s,
            k: k
        }, []);
        return new Σ.refs.sc_Char(Σ_300.refs.s.charAt(Σ_300.refs.k));
    }

    function sc_isStringEqual(s1, s2) {
        var Σ_301 = new Σ.Scope(this, sc_isStringEqual, '301', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_301.refs.s1 === Σ_301.refs.s2;
    }

    function sc_isStringLess(s1, s2) {
        var Σ_302 = new Σ.Scope(this, sc_isStringLess, '302', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_302.refs.s1 < Σ_302.refs.s2;
    }

    function sc_isStringGreater(s1, s2) {
        var Σ_303 = new Σ.Scope(this, sc_isStringGreater, '303', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_303.refs.s1 > Σ_303.refs.s2;
    }

    function sc_isStringLessEqual(s1, s2) {
        var Σ_304 = new Σ.Scope(this, sc_isStringLessEqual, '304', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_304.refs.s1 <= Σ_304.refs.s2;
    }

    function sc_isStringGreaterEqual(s1, s2) {
        var Σ_305 = new Σ.Scope(this, sc_isStringGreaterEqual, '305', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_305.refs.s1 >= Σ_305.refs.s2;
    }

    function sc_isStringCIEqual(s1, s2) {
        var Σ_306 = new Σ.Scope(this, sc_isStringCIEqual, '306', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_306.refs.s1.toLowerCase() === Σ_306.refs.s2.toLowerCase();
    }

    function sc_isStringCILess(s1, s2) {
        var Σ_307 = new Σ.Scope(this, sc_isStringCILess, '307', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_307.refs.s1.toLowerCase() < Σ_307.refs.s2.toLowerCase();
    }

    function sc_isStringCIGreater(s1, s2) {
        var Σ_308 = new Σ.Scope(this, sc_isStringCIGreater, '308', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_308.refs.s1.toLowerCase() > Σ_308.refs.s2.toLowerCase();
    }

    function sc_isStringCILessEqual(s1, s2) {
        var Σ_309 = new Σ.Scope(this, sc_isStringCILessEqual, '309', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_309.refs.s1.toLowerCase() <= Σ_309.refs.s2.toLowerCase();
    }

    function sc_isStringCIGreaterEqual(s1, s2) {
        var Σ_310 = new Σ.Scope(this, sc_isStringCIGreaterEqual, '310', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_310.refs.s1.toLowerCase() >= Σ_310.refs.s2.toLowerCase();
    }

    function sc_substring(s, start, end) {
        var Σ_311 = new Σ.Scope(this, sc_substring, '311', Σ, {
            s: s,
            start: start,
            end: end
        }, []);
        return Σ_311.refs.s.substring(Σ_311.refs.start, Σ_311.refs.end);
    }

    function sc_isSubstring_at(s1, s2, i) {
        var Σ_312 = new Σ.Scope(this, sc_isSubstring_at, '312', Σ, {
            s1: s1,
            s2: s2,
            i: i
        }, []);
        return Σ_312.refs.s2 == Σ_312.refs.s1.substring(Σ_312.refs.i, Σ_312.refs.i + Σ_312.refs.s2.length);
    }

    function sc_stringAppend() {
        var Σ_313 = new Σ.Scope(this, sc_stringAppend, '313', Σ, {}, []);
        return ''.concat.apply('', arguments);
    }
    Σ.refs.sc_string2list = Σ.refs.sc_jsstring2list;
    Σ.refs.sc_list2string = Σ.refs.sc_list2jsstring;

    function sc_stringCopy(s) {
        var Σ_314 = new Σ.Scope(this, sc_stringCopy, '314', Σ, {
            s: s
        }, []);
        return Σ_314.refs.s;
    }

    function sc_keyword2string(o) {
        var Σ_315 = new Σ.Scope(this, sc_keyword2string, '315', Σ, {
            o: o
        }, []);
        return Σ_315.refs.o.slice(1);
    }

    function sc_string2keyword(o) {
        var Σ_316 = new Σ.Scope(this, sc_string2keyword, '316', Σ, {
            o: o
        }, []);
        return Σ.refs.sc_KEYWORD_PREFIX + Σ_316.refs.o;
    }
    String.prototype.sc_toDisplayString = Σ.addFunction(function αktRt() {
        var Σ_317 = new Σ.Scope(this, αktRt, '317', Σ, {}, []);
        if (this.charAt(0) === Σ.refs.sc_SYMBOL_PREFIX) {
            return this.slice(1);
        } else if (this.charAt(0) === Σ.refs.sc_KEYWORD_PREFIX) {
            return ':' + this.slice(1);
        } else {
            return this.toString();
        }
    }, Σ);
    String.prototype.sc_toWriteString = Σ.addFunction(function αeXeN() {
        var Σ_318 = new Σ.Scope(this, αeXeN, '318', Σ, {}, []);
        if (this.charAt(0) === Σ.refs.sc_SYMBOL_PREFIX) {
            return this.slice(1);
        } else if (this.charAt(0) === Σ.refs.sc_KEYWORD_PREFIX) {
            return ':' + this.slice(1);
        } else {
            return '"' + Σ.refs.sc_escapeWriteString(this) + '"';
        }
    }, Σ);
    Σ.refs.BgL_testzd2boyerzd2 = undefined;
    Σ.refs.BgL_nboyerzd2benchmarkzd2 = undefined;
    Σ.refs.BgL_setupzd2boyerzd2 = undefined;
    Σ.refs.translate_term_nboyer = undefined;
    Σ.refs.translate_args_nboyer = undefined;
    Σ.refs.untranslate_term_nboyer = undefined;
    Σ.refs.BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer = undefined;
    Σ.refs.BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = undefined;
    Σ.refs.translate_alist_nboyer = undefined;
    Σ.refs.apply_subst_nboyer = undefined;
    Σ.refs.apply_subst_lst_nboyer = undefined;
    Σ.refs.tautologyp_nboyer = undefined;
    Σ.refs.if_constructor_nboyer = undefined;
    Σ.refs.rewrite_count_nboyer = undefined;
    Σ.refs.rewrite_nboyer = undefined;
    Σ.refs.rewrite_args_nboyer = undefined;
    Σ.refs.unify_subst_nboyer = undefined;
    Σ.refs.one_way_unify1_nboyer = undefined;
    Σ.refs.false_term_nboyer = undefined;
    Σ.refs.true_term_nboyer = undefined;
    Σ.refs.trans_of_implies1_nboyer = undefined;
    Σ.refs.is_term_equal_nboyer = undefined;
    Σ.refs.is_term_member_nboyer = undefined;
    Σ.refs.const_nboyer = undefined;
    Σ.refs.sc_const_3_nboyer = undefined;
    Σ.refs.sc_const_4_nboyer = undefined; {
        sc_const_4_nboyer = new sc_Pair('ẜimplies', new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜimplies', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜimplies', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜimplies', new sc_Pair('ẜz', new sc_Pair('ẜu', null))), new sc_Pair(new sc_Pair('ẜimplies', new sc_Pair('ẜu', new sc_Pair('ẜw', null))), null))), null))), null))), new sc_Pair(new sc_Pair('ẜimplies', new sc_Pair('ẜx', new sc_Pair('ẜw', null))), null)));
        sc_const_3_nboyer = sc_list(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜcompile', new sc_Pair('ẜform', null)), new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair(new sc_Pair('ẜcodegen', new sc_Pair(new sc_Pair('ẜoptimize', new sc_Pair('ẜform', null)), new sc_Pair(new sc_Pair('ẜnil', null), null))), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜeqp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜy', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜgreaterp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlesseqp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜgreatereqp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜboolean', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜt', null), null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜf', null), null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜiff', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜimplies', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜimplies', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜeven1', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜt', null), new sc_Pair(new sc_Pair('ẜodd', new sc_Pair(new sc_Pair('ẜsub1', new sc_Pair('ẜx', null)), null)), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜcountps-', new sc_Pair('ẜl', new sc_Pair('ẜpred', null))), new sc_Pair(new sc_Pair('ẜcountps-loop', new sc_Pair('ẜl', new sc_Pair('ẜpred', new sc_Pair(new sc_Pair('ẜzero', null), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜfact-', new sc_Pair('ẜi', null)), new sc_Pair(new sc_Pair('ẜfact-loop', new sc_Pair('ẜi', new sc_Pair(1, null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜreverse-', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜreverse-loop', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜnil', null), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdivides', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜassume-true', new sc_Pair('ẜvar', new sc_Pair('ẜalist', null))), new sc_Pair(new sc_Pair('ẜcons', new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜvar', new sc_Pair(new sc_Pair('ẜt', null), null))), new sc_Pair('ẜalist', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜassume-false', new sc_Pair('ẜvar', new sc_Pair('ẜalist', null))), new sc_Pair(new sc_Pair('ẜcons', new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜvar', new sc_Pair(new sc_Pair('ẜf', null), null))), new sc_Pair('ẜalist', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜtautology-checker', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜtautologyp', new sc_Pair(new sc_Pair('ẜnormalize', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜnil', null), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜfalsify', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜfalsify1', new sc_Pair(new sc_Pair('ẜnormalize', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜnil', null), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜprime', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜx', null)), null)), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair(new sc_Pair('ẜzero', null), null)), null))), null)), new sc_Pair(new sc_Pair('ẜprime1', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜsub1', new sc_Pair('ẜx', null)), null))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜand', new sc_Pair('ẜp', new sc_Pair('ẜq', null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜp', new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜq', new sc_Pair(new sc_Pair('ẜt', null), new sc_Pair(new sc_Pair('ẜf', null), null)))), new sc_Pair(new sc_Pair('ẜf', null), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜor', new sc_Pair('ẜp', new sc_Pair('ẜq', null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜp', new sc_Pair(new sc_Pair('ẜt', null), new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜq', new sc_Pair(new sc_Pair('ẜt', null), new sc_Pair(new sc_Pair('ẜf', null), null)))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜnot', new sc_Pair('ẜp', null)), new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜp', new sc_Pair(new sc_Pair('ẜf', null), new sc_Pair(new sc_Pair('ẜt', null), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜimplies', new sc_Pair('ẜp', new sc_Pair('ẜq', null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜp', new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜq', new sc_Pair(new sc_Pair('ẜt', null), new sc_Pair(new sc_Pair('ẜf', null), null)))), new sc_Pair(new sc_Pair('ẜt', null), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair('ẜx', null)), new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜzero', null), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜa', new sc_Pair('ẜb', new sc_Pair('ẜc', null)))), new sc_Pair('ẜd', new sc_Pair('ẜe', null)))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜa', new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜb', new sc_Pair('ẜd', new sc_Pair('ẜe', null)))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair('ẜc', new sc_Pair('ẜd', new sc_Pair('ẜe', null)))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair('ẜx', null)), null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜa', null)), new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜb', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜx', new sc_Pair('ẜx', null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜa', new sc_Pair('ẜc', null))), null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜb', null)), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜc', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜzero', null), new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜy', null)), null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair(new sc_Pair('ẜplus-tree', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair(new sc_Pair('ẜplus-tree', new sc_Pair('ẜx', null)), new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair(new sc_Pair('ẜplus-tree', new sc_Pair('ẜy', null)), new sc_Pair('ẜa', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair(new sc_Pair('ẜplus-tree', new sc_Pair(new sc_Pair('ẜplus-fringe', new sc_Pair('ẜx', null)), null)), new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair('ẜx', new sc_Pair('ẜa', null))), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), null)), new sc_Pair(new sc_Pair('ẜappend', new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair('ẜb', null)), new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair('ẜa', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜz', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜy', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜexec', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair('ẜpds', new sc_Pair('ẜenvrn', null)))), new sc_Pair(new sc_Pair('ẜexec', new sc_Pair('ẜy', new sc_Pair(new sc_Pair('ẜexec', new sc_Pair('ẜx', new sc_Pair('ẜpds', new sc_Pair('ẜenvrn', null)))), new sc_Pair('ẜenvrn', null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜmc-flatten', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜappend', new sc_Pair(new sc_Pair('ẜflatten', new sc_Pair('ẜx', null)), new sc_Pair('ẜy', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), null))), new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜx', new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜx', new sc_Pair('ẜb', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair('ẜy', null)), null))), new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlength', new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair('ẜx', null)), null)), new sc_Pair(new sc_Pair('ẜlength', new sc_Pair('ẜx', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜa', new sc_Pair(new sc_Pair('ẜintersect', new sc_Pair('ẜb', new sc_Pair('ẜc', null))), null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜa', new sc_Pair('ẜc', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜnth', new sc_Pair(new sc_Pair('ẜzero', null), new sc_Pair('ẜi', null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜexp', new sc_Pair('ẜi', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜj', new sc_Pair('ẜk', null))), null))), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair(new sc_Pair('ẜexp', new sc_Pair('ẜi', new sc_Pair('ẜj', null))), new sc_Pair(new sc_Pair('ẜexp', new sc_Pair('ẜi', new sc_Pair('ẜk', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜexp', new sc_Pair('ẜi', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜj', new sc_Pair('ẜk', null))), null))), new sc_Pair(new sc_Pair('ẜexp', new sc_Pair(new sc_Pair('ẜexp', new sc_Pair('ẜi', new sc_Pair('ẜj', null))), new sc_Pair('ẜk', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜreverse-loop', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜappend', new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair('ẜx', null)), new sc_Pair('ẜy', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜreverse-loop', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜnil', null), null))), new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair('ẜx', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜcount-list', new sc_Pair('ẜz', new sc_Pair(new sc_Pair('ẜsort-lp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(new sc_Pair('ẜcount-list', new sc_Pair('ẜz', new sc_Pair('ẜx', null))), new sc_Pair(new sc_Pair('ẜcount-list', new sc_Pair('ẜz', new sc_Pair('ẜy', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜa', new sc_Pair('ẜc', null))), null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜb', new sc_Pair('ẜc', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜy', new sc_Pair(new sc_Pair('ẜquotient', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), null))), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜx', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜpower-eval', new sc_Pair(new sc_Pair('ẜbig-plus1', new sc_Pair('ẜl', new sc_Pair('ẜi', new sc_Pair('ẜbase', null)))), new sc_Pair('ẜbase', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(new sc_Pair('ẜpower-eval', new sc_Pair('ẜl', new sc_Pair('ẜbase', null))), new sc_Pair('ẜi', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜpower-eval', new sc_Pair(new sc_Pair('ẜbig-plus', new sc_Pair('ẜx', new sc_Pair('ẜy', new sc_Pair('ẜi', new sc_Pair('ẜbase', null))))), new sc_Pair('ẜbase', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜi', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(new sc_Pair('ẜpower-eval', new sc_Pair('ẜx', new sc_Pair('ẜbase', null))), new sc_Pair(new sc_Pair('ẜpower-eval', new sc_Pair('ẜy', new sc_Pair('ẜbase', null))), null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair('ẜy', new sc_Pair(1, null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜy', null)), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair('ẜx', new sc_Pair('ẜx', null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair(new sc_Pair('ẜquotient', new sc_Pair('ẜi', new sc_Pair('ẜj', null))), new sc_Pair('ẜi', null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜi', null)), null)), new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜj', null)), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜj', new sc_Pair(1, null))), null)), null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair('ẜx', null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜy', null)), null)), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜx', null)), null)), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜpower-eval', new sc_Pair(new sc_Pair('ẜpower-rep', new sc_Pair('ẜi', new sc_Pair('ẜbase', null))), new sc_Pair('ẜbase', null))), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜi', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜpower-eval', new sc_Pair(new sc_Pair('ẜbig-plus', new sc_Pair(new sc_Pair('ẜpower-rep', new sc_Pair('ẜi', new sc_Pair('ẜbase', null))), new sc_Pair(new sc_Pair('ẜpower-rep', new sc_Pair('ẜj', new sc_Pair('ẜbase', null))), new sc_Pair(new sc_Pair('ẜzero', null), new sc_Pair('ẜbase', null))))), new sc_Pair('ẜbase', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜi', new sc_Pair('ẜj', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜgcd', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜgcd', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜnth', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair('ẜi', null))), new sc_Pair(new sc_Pair('ẜappend', new sc_Pair(new sc_Pair('ẜnth', new sc_Pair('ẜa', new sc_Pair('ẜi', null))), new sc_Pair(new sc_Pair('ẜnth', new sc_Pair('ẜb', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜi', new sc_Pair(new sc_Pair('ẜlength', new sc_Pair('ẜa', null)), null))), null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair('ẜx', null))), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜy', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), new sc_Pair('ẜx', null))), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜy', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜz', null))), null))), new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜc', new sc_Pair('ẜw', null))), null))), new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜc', new sc_Pair('ẜx', null))), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜw', new sc_Pair('ẜx', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜz', null))), new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜb', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜa', new sc_Pair('ẜc', null))), null))), new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜb', new sc_Pair('ẜc', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null)), new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair('ẜy', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜz', null))), null))), new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜz', null)), null)), new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜy', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜx', null)), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜgcd', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null))), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜz', new sc_Pair(new sc_Pair('ẜgcd', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜvalue', new sc_Pair(new sc_Pair('ẜnormalize', new sc_Pair('ẜx', null)), new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜvalue', new sc_Pair('ẜx', new sc_Pair('ẜa', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜflatten', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜy', new sc_Pair(new sc_Pair('ẜnil', null), null))), null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜnlistp', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlistp', new sc_Pair(new sc_Pair('ẜgopher', new sc_Pair('ẜx', null)), null)), new sc_Pair(new sc_Pair('ẜlistp', new sc_Pair('ẜx', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜsamefringe', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜflatten', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜflatten', new sc_Pair('ẜy', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜgreatest-factor', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜy', null)), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜy', new sc_Pair(1, null))), null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜzero', null), null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜgreatest-factor', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(1, null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(1, null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair(new sc_Pair('ẜgreatest-factor', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜy', null)), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜy', new sc_Pair(1, null))), null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair('ẜx', null)), null)), null))), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜtimes-list', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair(new sc_Pair('ẜtimes-list', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜtimes-list', new sc_Pair('ẜy', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜprime-list', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜprime-list', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜprime-list', new sc_Pair('ẜy', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜz', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜw', new sc_Pair('ẜz', null))), null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair('ẜz', null)), new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜz', new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜw', new sc_Pair(1, null))), null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜgreatereqp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), new sc_Pair(new sc_Pair('ẜor', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair(new sc_Pair('ẜand', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜy', new sc_Pair(1, null))), null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(1, null))), new sc_Pair(sc_list('ẜand', new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜa', new sc_Pair(new sc_Pair('ẜzero', null), null))), null)), new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair('ẜb', new sc_Pair(new sc_Pair('ẜzero', null), null))), null)), new sc_Pair('ẜnumberp', new sc_Pair('ẜa', null)), new sc_Pair('ẜnumberp', new sc_Pair('ẜb', null)), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜsub1', new sc_Pair('ẜa', null)), new sc_Pair(new sc_Pair('ẜzero', null), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜsub1', new sc_Pair('ẜb', null)), new sc_Pair(new sc_Pair('ẜzero', null), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair(new sc_Pair('ẜlength', new sc_Pair(new sc_Pair('ẜdelete', new sc_Pair('ẜx', new sc_Pair('ẜl', null))), null)), new sc_Pair(new sc_Pair('ẜlength', new sc_Pair('ẜl', null)), null))), new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜx', new sc_Pair('ẜl', null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜsort2', new sc_Pair(new sc_Pair('ẜdelete', new sc_Pair('ẜx', new sc_Pair('ẜl', null))), null)), new sc_Pair(new sc_Pair('ẜdelete', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜsort2', new sc_Pair('ẜl', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdsort', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜsort2', new sc_Pair('ẜx', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlength', new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜx1', new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜx2', new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜx3', new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜx4', new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜx5', new sc_Pair(new sc_Pair('ẜcons', new sc_Pair('ẜx6', new sc_Pair('ẜx7', null))), null))), null))), null))), null))), null))), null)), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(6, new sc_Pair(new sc_Pair('ẜlength', new sc_Pair('ẜx7', null)), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair('ẜx', null)), null)), new sc_Pair(2, null))), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜx', null)), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜquotient', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), new sc_Pair(2, null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜquotient', new sc_Pair('ẜy', new sc_Pair(2, null))), null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜsigma', new sc_Pair(new sc_Pair('ẜzero', null), new sc_Pair('ẜi', null))), new sc_Pair(new sc_Pair('ẜquotient', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜi', new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair('ẜi', null)), null))), new sc_Pair(2, null))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair('ẜy', null)), null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair('ẜy', null)), new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair('ẜx', null)), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜz', new sc_Pair('ẜy', null))), null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜy', new sc_Pair('ẜz', null))), null)), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜz', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜnot', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), null)), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜz', null)), null))), null)))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair(new sc_Pair('ẜplus-tree', new sc_Pair(new sc_Pair('ẜdelete', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)), new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair(new sc_Pair('ẜplus-tree', new sc_Pair('ẜy', null)), new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair('ẜx', new sc_Pair('ẜa', null))), null))), new sc_Pair(new sc_Pair('ẜmeaning', new sc_Pair(new sc_Pair('ẜplus-tree', new sc_Pair('ẜy', null)), new sc_Pair('ẜa', null))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜadd1', new sc_Pair('ẜy', null)), null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜnumberp', new sc_Pair('ẜy', null)), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null))), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜx', null)), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜnth', new sc_Pair(new sc_Pair('ẜnil', null), new sc_Pair('ẜi', null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜi', null)), new sc_Pair(new sc_Pair('ẜnil', null), new sc_Pair(new sc_Pair('ẜzero', null), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlast', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), null)), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜlistp', new sc_Pair('ẜb', null)), new sc_Pair(new sc_Pair('ẜlast', new sc_Pair('ẜb', null)), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜlistp', new sc_Pair('ẜa', null)), new sc_Pair(new sc_Pair('ẜcons', new sc_Pair(new sc_Pair('ẜcar', new sc_Pair(new sc_Pair('ẜlast', new sc_Pair('ẜa', null)), null)), new sc_Pair('ẜb', null))), new sc_Pair('ẜb', null)))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜlessp', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜt', null), new sc_Pair('ẜz', null))), new sc_Pair(new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜf', null), new sc_Pair('ẜz', null))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜassignment', new sc_Pair('ẜx', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜassignedp', new sc_Pair('ẜx', new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜassignment', new sc_Pair('ẜx', new sc_Pair('ẜa', null))), new sc_Pair(new sc_Pair('ẜassignment', new sc_Pair('ẜx', new sc_Pair('ẜb', null))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜcar', new sc_Pair(new sc_Pair('ẜgopher', new sc_Pair('ẜx', null)), null)), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜlistp', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜcar', new sc_Pair(new sc_Pair('ẜflatten', new sc_Pair('ẜx', null)), null)), new sc_Pair(new sc_Pair('ẜzero', null), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜflatten', new sc_Pair(new sc_Pair('ẜcdr', new sc_Pair(new sc_Pair('ẜgopher', new sc_Pair('ẜx', null)), null)), null)), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜlistp', new sc_Pair('ẜx', null)), new sc_Pair(new sc_Pair('ẜcdr', new sc_Pair(new sc_Pair('ẜflatten', new sc_Pair('ẜx', null)), null)), new sc_Pair(new sc_Pair('ẜcons', new sc_Pair(new sc_Pair('ẜzero', null), new sc_Pair(new sc_Pair('ẜnil', null), null))), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜquotient', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜy', new sc_Pair('ẜx', null))), new sc_Pair('ẜy', null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜzerop', new sc_Pair('ẜy', null)), new sc_Pair(new sc_Pair('ẜzero', null), new sc_Pair(new sc_Pair('ẜfix', new sc_Pair('ẜx', null)), null)))), null))), new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜget', new sc_Pair('ẜj', new sc_Pair(new sc_Pair('ẜset', new sc_Pair('ẜi', new sc_Pair('ẜval', new sc_Pair('ẜmem', null)))), null))), new sc_Pair(new sc_Pair('ẜif', new sc_Pair(new sc_Pair('ẜeqp', new sc_Pair('ẜj', new sc_Pair('ẜi', null))), new sc_Pair('ẜval', new sc_Pair(new sc_Pair('ẜget', new sc_Pair('ẜj', new sc_Pair('ẜmem', null))), null)))), null))));
        const_nboyer = new sc_Pair(new sc_Pair('ẜx', new sc_Pair('ẜf', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜc', new sc_Pair(new sc_Pair('ẜzero', null), null))), null))), null))), new sc_Pair(new sc_Pair('ẜy', new sc_Pair('ẜf', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair(new sc_Pair('ẜtimes', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜc', new sc_Pair('ẜd', null))), null))), null))), new sc_Pair(new sc_Pair('ẜz', new sc_Pair('ẜf', new sc_Pair(new sc_Pair('ẜreverse', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair(new sc_Pair('ẜappend', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜnil', null), null))), null)), null))), new sc_Pair(new sc_Pair('ẜu', new sc_Pair('ẜequal', new sc_Pair(new sc_Pair('ẜplus', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜdifference', new sc_Pair('ẜx', new sc_Pair('ẜy', null))), null)))), new sc_Pair(new sc_Pair('ẜw', new sc_Pair('ẜlessp', new sc_Pair(new sc_Pair('ẜremainder', new sc_Pair('ẜa', new sc_Pair('ẜb', null))), new sc_Pair(new sc_Pair('ẜmember', new sc_Pair('ẜa', new sc_Pair(new sc_Pair('ẜlength', new sc_Pair('ẜb', null)), null))), null)))), null)))));
        BgL_nboyerzd2benchmarkzd2 = function() {
            var args = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; sc_tmp--) {
                args = sc_cons(arguments[sc_tmp], args);
            }
            var n;
            return n = args === null ? 0 : args.car, BgL_setupzd2boyerzd2(), BgL_runzd2benchmarkzd2('nboyer' + sc_number2string(n), 1, function() {
                return BgL_testzd2boyerzd2(n);
            }, function(rewrites) {
                if (sc_isNumber(rewrites))
                    switch (n) {
                        case 0:
                            return rewrites === 95024;
                            break;
                        case 1:
                            return rewrites === 591777;
                            break;
                        case 2:
                            return rewrites === 1813975;
                            break;
                        case 3:
                            return rewrites === 5375678;
                            break;
                        case 4:
                            return rewrites === 16445406;
                            break;
                        case 5:
                            return rewrites === 51507739;
                            break;
                        default:
                            return true;
                            break;
                    }
                else
                    return false;
            });
        };
        BgL_setupzd2boyerzd2 = function() {
            return true;
        };
        BgL_testzd2boyerzd2 = function() {
            return true;
        };
        translate_term_nboyer = function(term) {
            var lst;
            return !(term instanceof sc_Pair) ? term : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(term.car), (lst = term.cdr, lst === null ? null : new sc_Pair(translate_term_nboyer(lst.car), translate_args_nboyer(lst.cdr))));
        };
        translate_args_nboyer = function(lst) {
            var sc_lst_5;
            var term;
            return lst === null ? null : new sc_Pair((term = lst.car, !(term instanceof sc_Pair) ? term : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(term.car), translate_args_nboyer(term.cdr))), (sc_lst_5 = lst.cdr, sc_lst_5 === null ? null : new sc_Pair(translate_term_nboyer(sc_lst_5.car), translate_args_nboyer(sc_lst_5.cdr))));
        };
        untranslate_term_nboyer = function(term) {
            var optrOpnd;
            var tail1131;
            var L1127;
            var falseHead1130;
            var symbol_record;
            if (!(term instanceof sc_Pair))
                return term;
            else {
                falseHead1130 = new sc_Pair(null, null);
                L1127 = term.cdr;
                tail1131 = falseHead1130;
                while (!(L1127 === null)) {
                    {
                        tail1131.cdr = new sc_Pair(untranslate_term_nboyer(L1127.car), null);
                        tail1131 = tail1131.cdr;
                        L1127 = L1127.cdr;
                    }
                }
                optrOpnd = falseHead1130.cdr;
                return new sc_Pair((symbol_record = term.car, symbol_record[0]), optrOpnd);
            }
        };
        BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer = function(sym) {
            var r;
            var x;
            return x = sc_assq(sym, BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer), x !== false ? x.cdr : (r = [
                sym,
                null
            ], BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = new sc_Pair(new sc_Pair(sym, r), BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer), r);
        };
        BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = null;
        translate_alist_nboyer = function(alist) {
            var sc_alist_6;
            var term;
            return alist === null ? null : new sc_Pair(new sc_Pair(alist.car.car, (term = alist.car.cdr, !(term instanceof sc_Pair) ? term : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(term.car), translate_args_nboyer(term.cdr)))), (sc_alist_6 = alist.cdr, sc_alist_6 === null ? null : new sc_Pair(new sc_Pair(sc_alist_6.car.car, translate_term_nboyer(sc_alist_6.car.cdr)), translate_alist_nboyer(sc_alist_6.cdr))));
        };
        apply_subst_nboyer = function(alist, term) {
            var lst;
            var temp_temp;
            return !(term instanceof sc_Pair) ? (temp_temp = sc_assq(term, alist), temp_temp !== false ? temp_temp.cdr : term) : new sc_Pair(term.car, (lst = term.cdr, lst === null ? null : new sc_Pair(apply_subst_nboyer(alist, lst.car), apply_subst_lst_nboyer(alist, lst.cdr))));
        };
        apply_subst_lst_nboyer = function(alist, lst) {
            var sc_lst_7;
            return lst === null ? null : new sc_Pair(apply_subst_nboyer(alist, lst.car), (sc_lst_7 = lst.cdr, sc_lst_7 === null ? null : new sc_Pair(apply_subst_nboyer(alist, sc_lst_7.car), apply_subst_lst_nboyer(alist, sc_lst_7.cdr))));
        };
        tautologyp_nboyer = function(sc_x_11, true_lst, false_lst) {
            var tmp1125;
            var x;
            var tmp1126;
            var sc_x_8;
            var sc_tmp1125_9;
            var sc_tmp1126_10;
            var sc_x_11;
            var true_lst;
            var false_lst;
            while (true) {
                if ((sc_tmp1126_10 = is_term_equal_nboyer(sc_x_11, true_term_nboyer), sc_tmp1126_10 !== false ? sc_tmp1126_10 : is_term_member_nboyer(sc_x_11, true_lst)) !== false)
                    return true;
                else if ((sc_tmp1125_9 = is_term_equal_nboyer(sc_x_11, false_term_nboyer), sc_tmp1125_9 !== false ? sc_tmp1125_9 : is_term_member_nboyer(sc_x_11, false_lst)) !== false)
                    return false;
                else if (!(sc_x_11 instanceof sc_Pair))
                    return false;
                else if (sc_x_11.car === if_constructor_nboyer)
                    if ((sc_x_8 = sc_x_11.cdr.car, tmp1126 = is_term_equal_nboyer(sc_x_8, true_term_nboyer), tmp1126 !== false ? tmp1126 : is_term_member_nboyer(sc_x_8, true_lst)) !== false)
                        sc_x_11 = sc_x_11.cdr.cdr.car;
                    else if ((x = sc_x_11.cdr.car, tmp1125 = is_term_equal_nboyer(x, false_term_nboyer), tmp1125 !== false ? tmp1125 : is_term_member_nboyer(x, false_lst)) !== false)
                    sc_x_11 = sc_x_11.cdr.cdr.cdr.car;
                else if (tautologyp_nboyer(sc_x_11.cdr.cdr.car, new sc_Pair(sc_x_11.cdr.car, true_lst), false_lst) !== false) {
                    false_lst = new sc_Pair(sc_x_11.cdr.car, false_lst);
                    sc_x_11 = sc_x_11.cdr.cdr.cdr.car;
                } else
                    return false;
                else
                    return false;
            }
        };
        if_constructor_nboyer = 'ẜ*';
        rewrite_count_nboyer = 0;
        rewrite_nboyer = function(term) {
            var term2;
            var sc_term_12;
            var lst;
            var symbol_record;
            var sc_lst_13; {
                ++rewrite_count_nboyer;
                if (!(term instanceof sc_Pair))
                    return term;
                else {
                    sc_term_12 = new sc_Pair(term.car, (sc_lst_13 = term.cdr, sc_lst_13 === null ? null : new sc_Pair(rewrite_nboyer(sc_lst_13.car), rewrite_args_nboyer(sc_lst_13.cdr))));
                    lst = (symbol_record = term.car, symbol_record[1]);
                    while (true) {
                        if (lst === null)
                            return sc_term_12;
                        else if ((term2 = lst.car.cdr.car, unify_subst_nboyer = null, one_way_unify1_nboyer(sc_term_12, term2)) !== false)
                            return rewrite_nboyer(apply_subst_nboyer(unify_subst_nboyer, lst.car.cdr.cdr.car));
                        else
                            lst = lst.cdr;
                    }
                }
            }
        };
        rewrite_args_nboyer = function(lst) {
            var sc_lst_14;
            return lst === null ? null : new sc_Pair(rewrite_nboyer(lst.car), (sc_lst_14 = lst.cdr, sc_lst_14 === null ? null : new sc_Pair(rewrite_nboyer(sc_lst_14.car), rewrite_args_nboyer(sc_lst_14.cdr))));
        };
        unify_subst_nboyer = 'ẜ*';
        one_way_unify1_nboyer = function(term1, term2) {
            var lst1;
            var lst2;
            var temp_temp;
            if (!(term2 instanceof sc_Pair)) {
                temp_temp = sc_assq(term2, unify_subst_nboyer);
                if (temp_temp !== false)
                    return is_term_equal_nboyer(term1, temp_temp.cdr);
                else if (sc_isNumber(term2))
                    return sc_isEqual(term1, term2);
                else {
                    unify_subst_nboyer = new sc_Pair(new sc_Pair(term2, term1), unify_subst_nboyer);
                    return true;
                }
            } else if (!(term1 instanceof sc_Pair))
                return false;
            else if (term1.car === term2.car) {
                lst1 = term1.cdr;
                lst2 = term2.cdr;
                while (true) {
                    if (lst1 === null)
                        return lst2 === null;
                    else if (lst2 === null)
                        return false;
                    else if (one_way_unify1_nboyer(lst1.car, lst2.car) !== false) {
                        lst1 = lst1.cdr;
                        lst2 = lst2.cdr;
                    } else
                        return false;
                }
            } else
                return false;
        };
        false_term_nboyer = 'ẜ*';
        true_term_nboyer = 'ẜ*';
        trans_of_implies1_nboyer = function(n) {
            var sc_n_15;
            return sc_isEqual(n, 1) ? sc_list('ẜimplies', 0, 1) : sc_list('ẜand', sc_list('ẜimplies', n - 1, n), (sc_n_15 = n - 1, sc_isEqual(sc_n_15, 1) ? sc_list('ẜimplies', 0, 1) : sc_list('ẜand', sc_list('ẜimplies', sc_n_15 - 1, sc_n_15), trans_of_implies1_nboyer(sc_n_15 - 1))));
        };
        is_term_equal_nboyer = function(x, y) {
            var lst1;
            var lst2;
            var r2;
            var r1;
            if (x instanceof sc_Pair)
                if (y instanceof sc_Pair)
                    if ((r1 = x.car, r2 = y.car, r1 === r2) !== false) {
                        lst1 = x.cdr;
                        lst2 = y.cdr;
                        while (true) {
                            if (lst1 === null)
                                return lst2 === null;
                            else if (lst2 === null)
                                return false;
                            else if (is_term_equal_nboyer(lst1.car, lst2.car) !== false) {
                                lst1 = lst1.cdr;
                                lst2 = lst2.cdr;
                            } else
                                return false;
                        }
                    } else
                        return false;
            else
                return false;
            else
                return sc_isEqual(x, y);
        };
        is_term_member_nboyer = function(x, lst) {
            var x;
            var lst;
            while (true) {
                if (lst === null)
                    return false;
                else if (is_term_equal_nboyer(x, lst.car) !== false)
                    return true;
                else
                    lst = lst.cdr;
            }
        };
        BgL_setupzd2boyerzd2 = function() {
            var symbol_record;
            var value;
            var BgL_sc_symbolzd2record_16zd2;
            var sym;
            var sc_sym_17;
            var term;
            var lst;
            var sc_term_18;
            var sc_term_19; {
                BgL_sc_za2symbolzd2recordszd2alistza2_2z00_nboyer = null;
                if_constructor_nboyer = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer('ẜif');
                false_term_nboyer = (sc_term_19 = new sc_Pair('ẜf', null), !(sc_term_19 instanceof sc_Pair) ? sc_term_19 : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(sc_term_19.car), translate_args_nboyer(sc_term_19.cdr)));
                true_term_nboyer = (sc_term_18 = new sc_Pair('ẜt', null), !(sc_term_18 instanceof sc_Pair) ? sc_term_18 : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(sc_term_18.car), translate_args_nboyer(sc_term_18.cdr)));
                lst = sc_const_3_nboyer;
                while (!(lst === null)) {
                    {
                        term = lst.car;
                        if (term instanceof sc_Pair && (term.car === 'ẜequal' && term.cdr.car instanceof sc_Pair)) {
                            sc_sym_17 = term.cdr.car.car;
                            value = new sc_Pair(!(term instanceof sc_Pair) ? term : new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(term.car), translate_args_nboyer(term.cdr)), (sym = term.cdr.car.car, BgL_sc_symbolzd2record_16zd2 = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(sym), BgL_sc_symbolzd2record_16zd2[1]));
                            symbol_record = BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(sc_sym_17);
                            symbol_record[1] = value;
                        } else
                            sc_error('ADD-LEMMA did not like term:  ', term);
                        lst = lst.cdr;
                    }
                }
                return true;
            }
        };
        BgL_testzd2boyerzd2 = function(n) {
            var optrOpnd;
            var term;
            var sc_n_20;
            var answer;
            var sc_term_21;
            var sc_term_22; {
                rewrite_count_nboyer = 0;
                term = sc_const_4_nboyer;
                sc_n_20 = n;
                while (!(sc_n_20 === 0)) {
                    {
                        term = sc_list('ẜor', term, new sc_Pair('ẜf', null));
                        --sc_n_20;
                    }
                }
                sc_term_22 = term;
                if (!(sc_term_22 instanceof sc_Pair))
                    optrOpnd = sc_term_22;
                else
                    optrOpnd = new sc_Pair(BgL_sc_symbolzd2ze3symbolzd2record_1ze3_nboyer(sc_term_22.car), translate_args_nboyer(sc_term_22.cdr));
                sc_term_21 = apply_subst_nboyer(const_nboyer === null ? null : new sc_Pair(new sc_Pair(const_nboyer.car.car, translate_term_nboyer(const_nboyer.car.cdr)), translate_alist_nboyer(const_nboyer.cdr)), optrOpnd);
                answer = tautologyp_nboyer(rewrite_nboyer(sc_term_21), null, null);
                sc_write(rewrite_count_nboyer);
                sc_display(' rewrites');
                sc_newline();
                if (answer !== false)
                    return rewrite_count_nboyer;
                else
                    return false;
            }
        };
    }
    Σ.refs.BgL_parsezd2ze3nbzd2treesze3 = undefined;
    Σ.refs.BgL_earleyzd2benchmarkzd2 = undefined;
    Σ.refs.BgL_parsezd2ze3parsedzf3zc2 = undefined;
    Σ.refs.test = undefined;
    Σ.refs.BgL_parsezd2ze3treesz31 = undefined;
    Σ.refs.BgL_makezd2parserzd2 = undefined;
    Σ.refs.const_earley = undefined; {
        const_earley = new sc_Pair(new sc_Pair('ẜs', new sc_Pair(new sc_Pair('ẜa', null), new sc_Pair(new sc_Pair('ẜs', new sc_Pair('ẜs', null)), null))), null);
        BgL_makezd2parserzd2 = function(grammar, lexer) {
            var i;
            var parser_descr;
            var def_loop;
            var nb_nts;
            var names;
            var steps;
            var predictors;
            var enders;
            var starters;
            var nts;
            var sc_names_1;
            var sc_steps_2;
            var sc_predictors_3;
            var sc_enders_4;
            var sc_starters_5;
            var nb_confs;
            var BgL_sc_defzd2loop_6zd2;
            var BgL_sc_nbzd2nts_7zd2;
            var sc_nts_8;
            var BgL_sc_defzd2loop_9zd2;
            var ind; {
                ind = function(nt, sc_nts_10) {
                    var i; {
                        i = sc_nts_10.length - 1;
                        while (true) {
                            if (i >= 0)
                                if (sc_isEqual(sc_nts_10[i], nt))
                                    return i;
                                else
                                    --i;
                            else
                                return false;
                        }
                    }
                };
                sc_nts_8 = (BgL_sc_defzd2loop_9zd2 = function(defs, sc_nts_11) {
                    var rule_loop;
                    var head;
                    var def;
                    return defs instanceof sc_Pair ? (def = defs.car, head = def.car, rule_loop = function(rules, sc_nts_12) {
                        var nt;
                        var l;
                        var sc_nts_13;
                        var rule;
                        if (rules instanceof sc_Pair) {
                            rule = rules.car;
                            l = rule;
                            sc_nts_13 = sc_nts_12;
                            while (l instanceof sc_Pair) {
                                {
                                    nt = l.car;
                                    l = l.cdr;
                                    sc_nts_13 = sc_member(nt, sc_nts_13) !== false ? sc_nts_13 : new sc_Pair(nt, sc_nts_13);
                                }
                            }
                            return rule_loop(rules.cdr, sc_nts_13);
                        } else
                            return BgL_sc_defzd2loop_9zd2(defs.cdr, sc_nts_12);
                    }, rule_loop(def.cdr, sc_member(head, sc_nts_11) !== false ? sc_nts_11 : new sc_Pair(head, sc_nts_11))) : sc_list2vector(sc_reverse(sc_nts_11));
                }, BgL_sc_defzd2loop_9zd2(grammar, null));
                BgL_sc_nbzd2nts_7zd2 = sc_nts_8.length;
                nb_confs = (BgL_sc_defzd2loop_6zd2 = function(defs, BgL_sc_nbzd2confs_14zd2) {
                    var rule_loop;
                    var def;
                    return defs instanceof sc_Pair ? (def = defs.car, rule_loop = function(rules, BgL_sc_nbzd2confs_15zd2) {
                        var l;
                        var BgL_sc_nbzd2confs_16zd2;
                        var rule;
                        if (rules instanceof sc_Pair) {
                            rule = rules.car;
                            l = rule;
                            BgL_sc_nbzd2confs_16zd2 = BgL_sc_nbzd2confs_15zd2;
                            while (l instanceof sc_Pair) {
                                {
                                    l = l.cdr;
                                    ++BgL_sc_nbzd2confs_16zd2;
                                }
                            }
                            return rule_loop(rules.cdr, BgL_sc_nbzd2confs_16zd2 + 1);
                        } else
                            return BgL_sc_defzd2loop_6zd2(defs.cdr, BgL_sc_nbzd2confs_15zd2);
                    }, rule_loop(def.cdr, BgL_sc_nbzd2confs_14zd2)) : BgL_sc_nbzd2confs_14zd2;
                }, BgL_sc_defzd2loop_6zd2(grammar, 0)) + BgL_sc_nbzd2nts_7zd2;
                sc_starters_5 = sc_makeVector(BgL_sc_nbzd2nts_7zd2, null);
                sc_enders_4 = sc_makeVector(BgL_sc_nbzd2nts_7zd2, null);
                sc_predictors_3 = sc_makeVector(BgL_sc_nbzd2nts_7zd2, null);
                sc_steps_2 = sc_makeVector(nb_confs, false);
                sc_names_1 = sc_makeVector(nb_confs, false);
                nts = sc_nts_8;
                starters = sc_starters_5;
                enders = sc_enders_4;
                predictors = sc_predictors_3;
                steps = sc_steps_2;
                names = sc_names_1;
                nb_nts = sc_nts_8.length;
                i = nb_nts - 1;
                while (i >= 0) {
                    {
                        sc_steps_2[i] = i - nb_nts;
                        sc_names_1[i] = sc_list(sc_nts_8[i], 0);
                        sc_enders_4[i] = sc_list(i);
                        --i;
                    }
                }
                def_loop = function(defs, conf) {
                    var rule_loop;
                    var head;
                    var def;
                    return defs instanceof sc_Pair ? (def = defs.car, head = def.car, rule_loop = function(rules, conf, rule_num) {
                        var i;
                        var sc_i_17;
                        var nt;
                        var l;
                        var sc_conf_18;
                        var sc_i_19;
                        var rule;
                        if (rules instanceof sc_Pair) {
                            rule = rules.car;
                            names[conf] = sc_list(head, rule_num);
                            sc_i_19 = ind(head, nts);
                            starters[sc_i_19] = new sc_Pair(conf, starters[sc_i_19]);
                            l = rule;
                            sc_conf_18 = conf;
                            while (l instanceof sc_Pair) {
                                {
                                    nt = l.car;
                                    steps[sc_conf_18] = ind(nt, nts);
                                    sc_i_17 = ind(nt, nts);
                                    predictors[sc_i_17] = new sc_Pair(sc_conf_18, predictors[sc_i_17]);
                                    l = l.cdr;
                                    ++sc_conf_18;
                                }
                            }
                            steps[sc_conf_18] = ind(head, nts) - nb_nts;
                            i = ind(head, nts);
                            enders[i] = new sc_Pair(sc_conf_18, enders[i]);
                            return rule_loop(rules.cdr, sc_conf_18 + 1, rule_num + 1);
                        } else
                            return def_loop(defs.cdr, conf);
                    }, rule_loop(def.cdr, conf, 1)) : undefined;
                };
                def_loop(grammar, sc_nts_8.length);
                parser_descr = [
                    lexer,
                    sc_nts_8,
                    sc_starters_5,
                    sc_enders_4,
                    sc_predictors_3,
                    sc_steps_2,
                    sc_names_1
                ];
                return function(input) {
                    var optrOpnd;
                    var sc_optrOpnd_20;
                    var sc_optrOpnd_21;
                    var sc_optrOpnd_22;
                    var loop1;
                    var BgL_sc_stateza2_23za2;
                    var toks;
                    var BgL_sc_nbzd2nts_24zd2;
                    var sc_steps_25;
                    var sc_enders_26;
                    var state_num;
                    var BgL_sc_statesza2_27za2;
                    var states;
                    var i;
                    var conf;
                    var l;
                    var tok_nts;
                    var sc_i_28;
                    var sc_i_29;
                    var l1;
                    var l2;
                    var tok;
                    var tail1129;
                    var L1125;
                    var goal_enders;
                    var BgL_sc_statesza2_30za2;
                    var BgL_sc_nbzd2nts_31zd2;
                    var BgL_sc_nbzd2confs_32zd2;
                    var nb_toks;
                    var goal_starters;
                    var sc_states_33;
                    var BgL_sc_nbzd2confs_34zd2;
                    var BgL_sc_nbzd2toks_35zd2;
                    var sc_toks_36;
                    var falseHead1128;
                    var sc_names_37;
                    var sc_steps_38;
                    var sc_predictors_39;
                    var sc_enders_40;
                    var sc_starters_41;
                    var sc_nts_42;
                    var lexer;
                    var sc_ind_43;
                    var make_states;
                    var BgL_sc_confzd2setzd2getza2_44za2;
                    var conf_set_merge_new_bang;
                    var conf_set_adjoin;
                    var BgL_sc_confzd2setzd2adjoinza2_45za2;
                    var BgL_sc_confzd2setzd2adjoinza2za2_46z00;
                    var conf_set_union;
                    var forw;
                    var is_parsed;
                    var deriv_trees;
                    var BgL_sc_derivzd2treesza2_47z70;
                    var nb_deriv_trees;
                    var BgL_sc_nbzd2derivzd2treesza2_48za2; {
                        sc_ind_43 = function(nt, sc_nts_49) {
                            var i; {
                                i = sc_nts_49.length - 1;
                                while (true) {
                                    if (i >= 0)
                                        if (sc_isEqual(sc_nts_49[i], nt))
                                            return i;
                                        else
                                            --i;
                                    else
                                        return false;
                                }
                            }
                        };
                        make_states = function(BgL_sc_nbzd2toks_50zd2, BgL_sc_nbzd2confs_51zd2) {
                            var v;
                            var i;
                            var sc_states_52; {
                                sc_states_52 = sc_makeVector(BgL_sc_nbzd2toks_50zd2 + 1, false);
                                i = BgL_sc_nbzd2toks_50zd2;
                                while (i >= 0) {
                                    {
                                        v = sc_makeVector(BgL_sc_nbzd2confs_51zd2 + 1, false);
                                        v[0] = -1;
                                        sc_states_52[i] = v;
                                        --i;
                                    }
                                }
                                return sc_states_52;
                            }
                        };
                        BgL_sc_confzd2setzd2getza2_44za2 = function(state, BgL_sc_statezd2num_53zd2, sc_conf_54) {
                            var conf_set;
                            var BgL_sc_confzd2set_55zd2;
                            return BgL_sc_confzd2set_55zd2 = state[sc_conf_54 + 1], BgL_sc_confzd2set_55zd2 !== false ? BgL_sc_confzd2set_55zd2 : (conf_set = sc_makeVector(BgL_sc_statezd2num_53zd2 + 6, false), conf_set[1] = -3, conf_set[2] = -1, conf_set[3] = -1, conf_set[4] = -1, state[sc_conf_54 + 1] = conf_set, conf_set);
                        };
                        conf_set_merge_new_bang = function(conf_set) {
                            return conf_set[conf_set[1] + 5] = conf_set[4], conf_set[1] = conf_set[3], conf_set[3] = -1, conf_set[4] = -1;
                        };
                        conf_set_adjoin = function(state, conf_set, sc_conf_56, i) {
                            var tail;
                            return tail = conf_set[3], conf_set[i + 5] = -1, conf_set[tail + 5] = i, conf_set[3] = i, tail < 0 ? (conf_set[0] = state[0], state[0] = sc_conf_56) : undefined;
                        };
                        BgL_sc_confzd2setzd2adjoinza2_45za2 = function(sc_states_57, BgL_sc_statezd2num_58zd2, l, i) {
                            var conf_set;
                            var sc_conf_59;
                            var l1;
                            var state; {
                                state = sc_states_57[BgL_sc_statezd2num_58zd2];
                                l1 = l;
                                while (l1 instanceof sc_Pair) {
                                    {
                                        sc_conf_59 = l1.car;
                                        conf_set = BgL_sc_confzd2setzd2getza2_44za2(state, BgL_sc_statezd2num_58zd2, sc_conf_59);
                                        if (conf_set[i + 5] === false) {
                                            conf_set_adjoin(state, conf_set, sc_conf_59, i);
                                            l1 = l1.cdr;
                                        } else
                                            l1 = l1.cdr;
                                    }
                                }
                                return undefined;
                            }
                        };
                        BgL_sc_confzd2setzd2adjoinza2za2_46z00 = function(sc_states_60, BgL_sc_statesza2_61za2, BgL_sc_statezd2num_62zd2, sc_conf_63, i) {
                            var BgL_sc_confzd2setza2_64z70;
                            var BgL_sc_stateza2_65za2;
                            var conf_set;
                            var state;
                            return state = sc_states_60[BgL_sc_statezd2num_62zd2], (conf_set = state[sc_conf_63 + 1], conf_set !== false ? conf_set[i + 5] : false) !== false ? (BgL_sc_stateza2_65za2 = BgL_sc_statesza2_61za2[BgL_sc_statezd2num_62zd2], BgL_sc_confzd2setza2_64z70 = BgL_sc_confzd2setzd2getza2_44za2(BgL_sc_stateza2_65za2, BgL_sc_statezd2num_62zd2, sc_conf_63), BgL_sc_confzd2setza2_64z70[i + 5] === false ? conf_set_adjoin(BgL_sc_stateza2_65za2, BgL_sc_confzd2setza2_64z70, sc_conf_63, i) : undefined, true) : false;
                        };
                        conf_set_union = function(state, conf_set, sc_conf_66, other_set) {
                            var i; {
                                i = other_set[2];
                                while (i >= 0) {
                                    if (conf_set[i + 5] === false) {
                                        conf_set_adjoin(state, conf_set, sc_conf_66, i);
                                        i = other_set[i + 5];
                                    } else
                                        i = other_set[i + 5];
                                }
                                return undefined;
                            }
                        };
                        forw = function(sc_states_67, BgL_sc_statezd2num_68zd2, sc_starters_69, sc_enders_70, sc_predictors_71, sc_steps_72, sc_nts_73) {
                            var next_set;
                            var next;
                            var conf_set;
                            var ender;
                            var l;
                            var starter_set;
                            var starter;
                            var sc_l_74;
                            var sc_loop1_75;
                            var head;
                            var BgL_sc_confzd2set_76zd2;
                            var BgL_sc_statezd2num_77zd2;
                            var state;
                            var sc_states_78;
                            var preds;
                            var BgL_sc_confzd2set_79zd2;
                            var step;
                            var sc_conf_80;
                            var BgL_sc_nbzd2nts_81zd2;
                            var sc_state_82; {
                                sc_state_82 = sc_states_67[BgL_sc_statezd2num_68zd2];
                                BgL_sc_nbzd2nts_81zd2 = sc_nts_73.length;
                                while (true) {
                                    {
                                        sc_conf_80 = sc_state_82[0];
                                        if (sc_conf_80 >= 0) {
                                            step = sc_steps_72[sc_conf_80];
                                            BgL_sc_confzd2set_79zd2 = sc_state_82[sc_conf_80 + 1];
                                            head = BgL_sc_confzd2set_79zd2[4];
                                            sc_state_82[0] = BgL_sc_confzd2set_79zd2[0];
                                            conf_set_merge_new_bang(BgL_sc_confzd2set_79zd2);
                                            if (step >= 0) {
                                                sc_l_74 = sc_starters_69[step];
                                                while (sc_l_74 instanceof sc_Pair) {
                                                    {
                                                        starter = sc_l_74.car;
                                                        starter_set = BgL_sc_confzd2setzd2getza2_44za2(sc_state_82, BgL_sc_statezd2num_68zd2, starter);
                                                        if (starter_set[BgL_sc_statezd2num_68zd2 + 5] === false) {
                                                            conf_set_adjoin(sc_state_82, starter_set, starter, BgL_sc_statezd2num_68zd2);
                                                            sc_l_74 = sc_l_74.cdr;
                                                        } else
                                                            sc_l_74 = sc_l_74.cdr;
                                                    }
                                                }
                                                l = sc_enders_70[step];
                                                while (l instanceof sc_Pair) {
                                                    {
                                                        ender = l.car;
                                                        if ((conf_set = sc_state_82[ender + 1], conf_set !== false ? conf_set[BgL_sc_statezd2num_68zd2 + 5] : false) !== false) {
                                                            next = sc_conf_80 + 1;
                                                            next_set = BgL_sc_confzd2setzd2getza2_44za2(sc_state_82, BgL_sc_statezd2num_68zd2, next);
                                                            conf_set_union(sc_state_82, next_set, next, BgL_sc_confzd2set_79zd2);
                                                            l = l.cdr;
                                                        } else
                                                            l = l.cdr;
                                                    }
                                                }
                                            } else {
                                                preds = sc_predictors_71[step + BgL_sc_nbzd2nts_81zd2];
                                                sc_states_78 = sc_states_67;
                                                state = sc_state_82;
                                                BgL_sc_statezd2num_77zd2 = BgL_sc_statezd2num_68zd2;
                                                BgL_sc_confzd2set_76zd2 = BgL_sc_confzd2set_79zd2;
                                                sc_loop1_75 = function(l) {
                                                    var sc_state_83;
                                                    var BgL_sc_nextzd2set_84zd2;
                                                    var sc_next_85;
                                                    var pred_set;
                                                    var i;
                                                    var pred;
                                                    if (l instanceof sc_Pair) {
                                                        pred = l.car;
                                                        i = head;
                                                        while (i >= 0) {
                                                            {
                                                                pred_set = (sc_state_83 = sc_states_78[i], sc_state_83[pred + 1]);
                                                                if (pred_set !== false) {
                                                                    sc_next_85 = pred + 1;
                                                                    BgL_sc_nextzd2set_84zd2 = BgL_sc_confzd2setzd2getza2_44za2(state, BgL_sc_statezd2num_77zd2, sc_next_85);
                                                                    conf_set_union(state, BgL_sc_nextzd2set_84zd2, sc_next_85, pred_set);
                                                                }
                                                                i = BgL_sc_confzd2set_76zd2[i + 5];
                                                            }
                                                        }
                                                        return sc_loop1_75(l.cdr);
                                                    } else
                                                        return undefined;
                                                };
                                                sc_loop1_75(preds);
                                            }
                                        } else
                                            return undefined;
                                    }
                                }
                            }
                        };
                        is_parsed = function(nt, i, j, sc_nts_86, sc_enders_87, sc_states_88) {
                            var conf_set;
                            var state;
                            var sc_conf_89;
                            var l;
                            var BgL_sc_ntza2_90za2; {
                                BgL_sc_ntza2_90za2 = sc_ind_43(nt, sc_nts_86);
                                if (BgL_sc_ntza2_90za2 !== false) {
                                    sc_nts_86.length;
                                    l = sc_enders_87[BgL_sc_ntza2_90za2];
                                    while (true) {
                                        if (l instanceof sc_Pair) {
                                            sc_conf_89 = l.car;
                                            if ((state = sc_states_88[j], conf_set = state[sc_conf_89 + 1], conf_set !== false ? conf_set[i + 5] : false) !== false)
                                                return true;
                                            else
                                                l = l.cdr;
                                        } else
                                            return false;
                                    }
                                } else
                                    return false;
                            }
                        };
                        deriv_trees = function(sc_conf_91, i, j, sc_enders_92, sc_steps_93, sc_names_94, sc_toks_95, sc_states_96, BgL_sc_nbzd2nts_97zd2) {
                            var sc_loop1_98;
                            var prev;
                            var name;
                            return name = sc_names_94[sc_conf_91], name !== false ? sc_conf_91 < BgL_sc_nbzd2nts_97zd2 ? sc_list(sc_list(name, sc_toks_95[i].car)) : sc_list(sc_list(name)) : (prev = sc_conf_91 - 1, sc_loop1_98 = function(l1, l2) {
                                var loop2;
                                var ender_set;
                                var state;
                                var ender;
                                var l1;
                                var l2;
                                while (true) {
                                    if (l1 instanceof sc_Pair) {
                                        ender = l1.car;
                                        ender_set = (state = sc_states_96[j], state[ender + 1]);
                                        if (ender_set !== false) {
                                            loop2 = function(k, l2) {
                                                var loop3;
                                                var ender_trees;
                                                var prev_trees;
                                                var conf_set;
                                                var sc_state_99;
                                                var k;
                                                var l2;
                                                while (true) {
                                                    if (k >= 0)
                                                        if (k >= i && (sc_state_99 = sc_states_96[k], conf_set = sc_state_99[prev + 1], conf_set !== false ? conf_set[i + 5] : false) !== false) {
                                                            prev_trees = deriv_trees(prev, i, k, sc_enders_92, sc_steps_93, sc_names_94, sc_toks_95, sc_states_96, BgL_sc_nbzd2nts_97zd2);
                                                            ender_trees = deriv_trees(ender, k, j, sc_enders_92, sc_steps_93, sc_names_94, sc_toks_95, sc_states_96, BgL_sc_nbzd2nts_97zd2);
                                                            loop3 = function(l3, l2) {
                                                                var l4;
                                                                var sc_l2_100;
                                                                var ender_tree;
                                                                if (l3 instanceof sc_Pair) {
                                                                    ender_tree = sc_list(l3.car);
                                                                    l4 = prev_trees;
                                                                    sc_l2_100 = l2;
                                                                    while (l4 instanceof sc_Pair) {
                                                                        {
                                                                            sc_l2_100 = new sc_Pair(sc_append(l4.car, ender_tree), sc_l2_100);
                                                                            l4 = l4.cdr;
                                                                        }
                                                                    }
                                                                    return loop3(l3.cdr, sc_l2_100);
                                                                } else
                                                                    return loop2(ender_set[k + 5], l2);
                                                            };
                                                            return loop3(ender_trees, l2);
                                                        } else
                                                            k = ender_set[k + 5];
                                                    else
                                                        return sc_loop1_98(l1.cdr, l2);
                                                }
                                            };
                                            return loop2(ender_set[2], l2);
                                        } else
                                            l1 = l1.cdr;
                                    } else
                                        return l2;
                                }
                            }, sc_loop1_98(sc_enders_92[sc_steps_93[prev]], null));
                        };
                        BgL_sc_derivzd2treesza2_47z70 = function(nt, i, j, sc_nts_101, sc_enders_102, sc_steps_103, sc_names_104, sc_toks_105, sc_states_106) {
                            var conf_set;
                            var state;
                            var sc_conf_107;
                            var l;
                            var trees;
                            var BgL_sc_nbzd2nts_108zd2;
                            var BgL_sc_ntza2_109za2; {
                                BgL_sc_ntza2_109za2 = sc_ind_43(nt, sc_nts_101);
                                if (BgL_sc_ntza2_109za2 !== false) {
                                    BgL_sc_nbzd2nts_108zd2 = sc_nts_101.length;
                                    l = sc_enders_102[BgL_sc_ntza2_109za2];
                                    trees = null;
                                    while (l instanceof sc_Pair) {
                                        {
                                            sc_conf_107 = l.car;
                                            if ((state = sc_states_106[j], conf_set = state[sc_conf_107 + 1], conf_set !== false ? conf_set[i + 5] : false) !== false) {
                                                l = l.cdr;
                                                trees = sc_append(deriv_trees(sc_conf_107, i, j, sc_enders_102, sc_steps_103, sc_names_104, sc_toks_105, sc_states_106, BgL_sc_nbzd2nts_108zd2), trees);
                                            } else
                                                l = l.cdr;
                                        }
                                    }
                                    return trees;
                                } else
                                    return false;
                            }
                        };
                        nb_deriv_trees = function(sc_conf_110, i, j, sc_enders_111, sc_steps_112, sc_toks_113, sc_states_114, BgL_sc_nbzd2nts_115zd2) {
                            var sc_loop1_116;
                            var tmp1124;
                            var prev;
                            return prev = sc_conf_110 - 1, (tmp1124 = sc_conf_110 < BgL_sc_nbzd2nts_115zd2, tmp1124 !== false ? tmp1124 : sc_steps_112[prev] < 0) !== false ? 1 : (sc_loop1_116 = function(l, sc_n_118) {
                                var nb_ender_trees;
                                var nb_prev_trees;
                                var conf_set;
                                var state;
                                var k;
                                var n;
                                var ender_set;
                                var sc_state_117;
                                var ender;
                                var l;
                                var sc_n_118;
                                while (true) {
                                    if (l instanceof sc_Pair) {
                                        ender = l.car;
                                        ender_set = (sc_state_117 = sc_states_114[j], sc_state_117[ender + 1]);
                                        if (ender_set !== false) {
                                            k = ender_set[2];
                                            n = sc_n_118;
                                            while (k >= 0) {
                                                if (k >= i && (state = sc_states_114[k], conf_set = state[prev + 1], conf_set !== false ? conf_set[i + 5] : false) !== false) {
                                                    nb_prev_trees = nb_deriv_trees(prev, i, k, sc_enders_111, sc_steps_112, sc_toks_113, sc_states_114, BgL_sc_nbzd2nts_115zd2);
                                                    nb_ender_trees = nb_deriv_trees(ender, k, j, sc_enders_111, sc_steps_112, sc_toks_113, sc_states_114, BgL_sc_nbzd2nts_115zd2);
                                                    k = ender_set[k + 5];
                                                    n += nb_prev_trees * nb_ender_trees;
                                                } else
                                                    k = ender_set[k + 5];
                                            }
                                            return sc_loop1_116(l.cdr, n);
                                        } else
                                            l = l.cdr;
                                    } else
                                        return sc_n_118;
                                }
                            }, sc_loop1_116(sc_enders_111[sc_steps_112[prev]], 0));
                        };
                        BgL_sc_nbzd2derivzd2treesza2_48za2 = function(nt, i, j, sc_nts_119, sc_enders_120, sc_steps_121, sc_toks_122, sc_states_123) {
                            var conf_set;
                            var state;
                            var sc_conf_124;
                            var l;
                            var nb_trees;
                            var BgL_sc_nbzd2nts_125zd2;
                            var BgL_sc_ntza2_126za2; {
                                BgL_sc_ntza2_126za2 = sc_ind_43(nt, sc_nts_119);
                                if (BgL_sc_ntza2_126za2 !== false) {
                                    BgL_sc_nbzd2nts_125zd2 = sc_nts_119.length;
                                    l = sc_enders_120[BgL_sc_ntza2_126za2];
                                    nb_trees = 0;
                                    while (l instanceof sc_Pair) {
                                        {
                                            sc_conf_124 = l.car;
                                            if ((state = sc_states_123[j], conf_set = state[sc_conf_124 + 1], conf_set !== false ? conf_set[i + 5] : false) !== false) {
                                                l = l.cdr;
                                                nb_trees = nb_deriv_trees(sc_conf_124, i, j, sc_enders_120, sc_steps_121, sc_toks_122, sc_states_123, BgL_sc_nbzd2nts_125zd2) + nb_trees;
                                            } else
                                                l = l.cdr;
                                        }
                                    }
                                    return nb_trees;
                                } else
                                    return false;
                            }
                        };
                        lexer = parser_descr[0];
                        sc_nts_42 = parser_descr[1];
                        sc_starters_41 = parser_descr[2];
                        sc_enders_40 = parser_descr[3];
                        sc_predictors_39 = parser_descr[4];
                        sc_steps_38 = parser_descr[5];
                        sc_names_37 = parser_descr[6];
                        falseHead1128 = new sc_Pair(null, null);
                        L1125 = lexer(input);
                        tail1129 = falseHead1128;
                        while (!(L1125 === null)) {
                            {
                                tok = L1125.car;
                                l1 = tok.cdr;
                                l2 = null;
                                while (l1 instanceof sc_Pair) {
                                    {
                                        sc_i_29 = sc_ind_43(l1.car, sc_nts_42);
                                        if (sc_i_29 !== false) {
                                            l1 = l1.cdr;
                                            l2 = new sc_Pair(sc_i_29, l2);
                                        } else
                                            l1 = l1.cdr;
                                    }
                                }
                                sc_optrOpnd_22 = new sc_Pair(tok.car, sc_reverse(l2));
                                sc_optrOpnd_21 = new sc_Pair(sc_optrOpnd_22, null);
                                tail1129.cdr = sc_optrOpnd_21;
                                tail1129 = tail1129.cdr;
                                L1125 = L1125.cdr;
                            }
                        }
                        sc_optrOpnd_20 = falseHead1128.cdr;
                        sc_toks_36 = sc_list2vector(sc_optrOpnd_20);
                        BgL_sc_nbzd2toks_35zd2 = sc_toks_36.length;
                        BgL_sc_nbzd2confs_34zd2 = sc_steps_38.length;
                        sc_states_33 = make_states(BgL_sc_nbzd2toks_35zd2, BgL_sc_nbzd2confs_34zd2);
                        goal_starters = sc_starters_41[0];
                        BgL_sc_confzd2setzd2adjoinza2_45za2(sc_states_33, 0, goal_starters, 0);
                        forw(sc_states_33, 0, sc_starters_41, sc_enders_40, sc_predictors_39, sc_steps_38, sc_nts_42);
                        sc_i_28 = 0;
                        while (sc_i_28 < BgL_sc_nbzd2toks_35zd2) {
                            {
                                tok_nts = sc_toks_36[sc_i_28].cdr;
                                BgL_sc_confzd2setzd2adjoinza2_45za2(sc_states_33, sc_i_28 + 1, tok_nts, sc_i_28);
                                forw(sc_states_33, sc_i_28 + 1, sc_starters_41, sc_enders_40, sc_predictors_39, sc_steps_38, sc_nts_42);
                                ++sc_i_28;
                            }
                        }
                        nb_toks = sc_toks_36.length;
                        BgL_sc_nbzd2confs_32zd2 = sc_steps_38.length;
                        BgL_sc_nbzd2nts_31zd2 = sc_nts_42.length;
                        BgL_sc_statesza2_30za2 = make_states(nb_toks, BgL_sc_nbzd2confs_32zd2);
                        goal_enders = sc_enders_40[0];
                        l = goal_enders;
                        while (l instanceof sc_Pair) {
                            {
                                conf = l.car;
                                BgL_sc_confzd2setzd2adjoinza2za2_46z00(sc_states_33, BgL_sc_statesza2_30za2, nb_toks, conf, 0);
                                l = l.cdr;
                            }
                        }
                        i = nb_toks;
                        while (i >= 0) {
                            {
                                states = sc_states_33;
                                BgL_sc_statesza2_27za2 = BgL_sc_statesza2_30za2;
                                state_num = i;
                                sc_enders_26 = sc_enders_40;
                                sc_steps_25 = sc_steps_38;
                                BgL_sc_nbzd2nts_24zd2 = BgL_sc_nbzd2nts_31zd2;
                                toks = sc_toks_36;
                                BgL_sc_stateza2_23za2 = BgL_sc_statesza2_30za2[i];
                                loop1 = function() {
                                    var sc_loop1_127;
                                    var prev;
                                    var BgL_sc_statesza2_128za2;
                                    var sc_states_129;
                                    var j;
                                    var i;
                                    var sc_i_130;
                                    var head;
                                    var conf_set;
                                    var sc_conf_131; {
                                        sc_conf_131 = BgL_sc_stateza2_23za2[0];
                                        if (sc_conf_131 >= 0) {
                                            conf_set = BgL_sc_stateza2_23za2[sc_conf_131 + 1];
                                            head = conf_set[4];
                                            BgL_sc_stateza2_23za2[0] = conf_set[0];
                                            conf_set_merge_new_bang(conf_set);
                                            sc_i_130 = head;
                                            while (sc_i_130 >= 0) {
                                                {
                                                    i = sc_i_130;
                                                    j = state_num;
                                                    sc_states_129 = states;
                                                    BgL_sc_statesza2_128za2 = BgL_sc_statesza2_27za2;
                                                    prev = sc_conf_131 - 1;
                                                    if (sc_conf_131 >= BgL_sc_nbzd2nts_24zd2 && sc_steps_25[prev] >= 0) {
                                                        sc_loop1_127 = function(l) {
                                                            var k;
                                                            var ender_set;
                                                            var state;
                                                            var ender;
                                                            var l;
                                                            while (true) {
                                                                if (l instanceof sc_Pair) {
                                                                    ender = l.car;
                                                                    ender_set = (state = sc_states_129[j], state[ender + 1]);
                                                                    if (ender_set !== false) {
                                                                        k = ender_set[2];
                                                                        while (k >= 0) {
                                                                            {
                                                                                if (k >= i)
                                                                                    if (BgL_sc_confzd2setzd2adjoinza2za2_46z00(sc_states_129, BgL_sc_statesza2_128za2, k, prev, i) !== false)
                                                                                        BgL_sc_confzd2setzd2adjoinza2za2_46z00(sc_states_129, BgL_sc_statesza2_128za2, j, ender, k);
                                                                                k = ender_set[k + 5];
                                                                            }
                                                                        }
                                                                        return sc_loop1_127(l.cdr);
                                                                    } else
                                                                        l = l.cdr;
                                                                } else
                                                                    return undefined;
                                                            }
                                                        };
                                                        sc_loop1_127(sc_enders_26[sc_steps_25[prev]]);
                                                    }
                                                    sc_i_130 = conf_set[sc_i_130 + 5];
                                                }
                                            }
                                            return loop1();
                                        } else
                                            return undefined;
                                    }
                                };
                                loop1();
                                --i;
                            }
                        }
                        optrOpnd = BgL_sc_statesza2_30za2;
                        return [
                            sc_nts_42,
                            sc_starters_41,
                            sc_enders_40,
                            sc_predictors_39,
                            sc_steps_38,
                            sc_names_37,
                            sc_toks_36,
                            optrOpnd,
                            is_parsed,
                            BgL_sc_derivzd2treesza2_47z70,
                            BgL_sc_nbzd2derivzd2treesza2_48za2
                        ];
                    }
                };
            }
        };
        BgL_parsezd2ze3parsedzf3zc2 = function(parse, nt, i, j) {
            var is_parsed;
            var states;
            var enders;
            var nts;
            return nts = parse[0], enders = parse[2], states = parse[7], is_parsed = parse[8], is_parsed(nt, i, j, nts, enders, states);
        };
        BgL_parsezd2ze3treesz31 = function(parse, nt, i, j) {
            var BgL_sc_derivzd2treesza2_132z70;
            var states;
            var toks;
            var names;
            var steps;
            var enders;
            var nts;
            return nts = parse[0], enders = parse[2], steps = parse[4], names = parse[5], toks = parse[6], states = parse[7], BgL_sc_derivzd2treesza2_132z70 = parse[9], BgL_sc_derivzd2treesza2_132z70(nt, i, j, nts, enders, steps, names, toks, states);
        };
        BgL_parsezd2ze3nbzd2treesze3 = function(parse, nt, i, j) {
            var BgL_sc_nbzd2derivzd2treesza2_133za2;
            var states;
            var toks;
            var steps;
            var enders;
            var nts;
            return nts = parse[0], enders = parse[2], steps = parse[4], toks = parse[6], states = parse[7], BgL_sc_nbzd2derivzd2treesza2_133za2 = parse[10], BgL_sc_nbzd2derivzd2treesza2_133za2(nt, i, j, nts, enders, steps, toks, states);
        };
        test = function(k) {
            var x;
            var p;
            return p = BgL_makezd2parserzd2(const_earley, function(l) {
                var sc_x_134;
                var tail1134;
                var L1130;
                var falseHead1133; {
                    falseHead1133 = new sc_Pair(null, null);
                    tail1134 = falseHead1133;
                    L1130 = l;
                    while (!(L1130 === null)) {
                        {
                            tail1134.cdr = new sc_Pair((sc_x_134 = L1130.car, sc_list(sc_x_134, sc_x_134)), null);
                            tail1134 = tail1134.cdr;
                            L1130 = L1130.cdr;
                        }
                    }
                    return falseHead1133.cdr;
                }
            }), x = p(sc_vector2list(sc_makeVector(k, 'ẜa'))), sc_length(BgL_parsezd2ze3treesz31(x, 'ẜs', 0, k));
        };
        BgL_earleyzd2benchmarkzd2 = function() {
            var args = null;
            for (var sc_tmp = arguments.length - 1; sc_tmp >= 0; sc_tmp--) {
                args = sc_cons(arguments[sc_tmp], args);
            }
            var k;
            return k = args === null ? 7 : args.car, BgL_runzd2benchmarkzd2('earley', 1, function() {
                return test(k);
            }, function(result) {
                return sc_display(result), sc_newline(), result == 132;
            });
        };
    }
    Σ.refs.SC_DEFAULT_OUT = new Σ.refs.sc_GenericOutputPort(Σ.addFunction(function αwX9x(s) {
        var Σ_319 = new Σ.Scope(this, αwX9x, '319', Σ, {
            s: s
        }, []);
    }, Σ));
    Σ.refs.SC_ERROR_OUT = Σ.refs.SC_DEFAULT_OUT;

    function RunBenchmark(name, count, run, warn) {
        var Σ_320 = new Σ.Scope(this, RunBenchmark, '320', Σ, {
            name: name,
            count: count,
            run: run,
            warn: warn
        }, []);
        for (Σ_320.refs.n = 0; Σ_320.refs.n < Σ_320.refs.count; ++Σ_320.refs.n) {
            result = Σ_320.refs.run();
            if (!Σ_320.refs.warn(result)) {
                throw new Error('Earley or Boyer did incorrect number of rewrites');
            }
        }
    }
    Σ.refs.BgL_runzd2benchmarkzd2 = Σ.refs.RunBenchmark;
}(require('things-js').bootstrap('mqtt://localhost', 'earley-boyer.js')));