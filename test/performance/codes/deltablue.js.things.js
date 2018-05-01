(function(Σ) {
    Σ.hoist([
        [
            OrderedCollection,
            Σ
        ],
        [
            Strength,
            Σ
        ],
        [
            Constraint,
            Σ
        ],
        [
            UnaryConstraint,
            Σ
        ],
        [
            StayConstraint,
            Σ
        ],
        [
            UnaryConstraintInheriter,
            Σ
        ],
        [
            EditConstraint,
            Σ
        ],
        [
            BinaryConstraint,
            Σ
        ],
        [
            ScaleConstraint,
            Σ
        ],
        [
            BinaryConstraintInheriter,
            Σ
        ],
        [
            EqualityConstraint,
            Σ
        ],
        [
            Variable,
            Σ
        ],
        [
            Planner,
            Σ
        ],
        [
            Plan,
            Σ
        ],
        [
            chainTest,
            Σ
        ],
        [
            projectionTest,
            Σ
        ],
        [
            change,
            Σ
        ],
        [
            deltaBlue,
            Σ
        ],
        [
            BM_Start,
            Σ
        ]
    ]);
    Σ.refs.planner = null;

    function OrderedCollection() {
        var Σ_0 = new Σ.Scope(this, OrderedCollection, '0', Σ, {}, []);
        this.elms = new Array();
    }
    Σ.refs.OrderedCollection.prototype.add = Σ.addFunction(function αWxEc(elm) {
        var Σ_1 = new Σ.Scope(this, αWxEc, '1', Σ, {
            elm: elm
        }, []);
        this.elms.push(Σ_1.refs.elm);
    }, Σ);
    Σ.refs.OrderedCollection.prototype.at = Σ.addFunction(function α2TEj(index) {
        var Σ_2 = new Σ.Scope(this, α2TEj, '2', Σ, {
            index: index
        }, []);
        return this.elms[Σ_2.refs.index];
    }, Σ);
    Σ.refs.OrderedCollection.prototype.size = Σ.addFunction(function αLpXQ() {
        var Σ_3 = new Σ.Scope(this, αLpXQ, '3', Σ, {}, []);
        return this.elms.length;
    }, Σ);
    Σ.refs.OrderedCollection.prototype.removeFirst = Σ.addFunction(function αmYL7() {
        var Σ_4 = new Σ.Scope(this, αmYL7, '4', Σ, {}, []);
        return this.elms.pop();
    }, Σ);
    Σ.refs.OrderedCollection.prototype.remove = Σ.addFunction(function αxd2w(elm) {
        var Σ_5 = new Σ.Scope(this, αxd2w, '5', Σ, {
            elm: elm
        }, []);
        Σ_5.refs.index = 0, Σ_5.refs.skipped = 0;
        for (Σ_5.refs.i = 0; Σ_5.refs.i < this.elms.length; Σ_5.refs.i++) {
            Σ_5.refs.value = this.elms[Σ_5.refs.i];
            if (Σ_5.refs.value != Σ_5.refs.elm) {
                this.elms[Σ_5.refs.index] = Σ_5.refs.value;
                Σ_5.refs.index++;
            } else {
                Σ_5.refs.skipped++;
            }
        }
        for (Σ_5.refs.i = 0; Σ_5.refs.i < Σ_5.refs.skipped; Σ_5.refs.i++) {
            this.elms.pop();
        }
    }, Σ);

    function Strength(strengthValue, name) {
        var Σ_6 = new Σ.Scope(this, Strength, '6', Σ, {
            strengthValue: strengthValue,
            name: name
        }, []);
        this.strengthValue = Σ_6.refs.strengthValue;
        this.name = Σ_6.refs.name;
    }
    Σ.refs.Strength.stronger = Σ.addFunction(function αmO3B(s1, s2) {
        var Σ_7 = new Σ.Scope(this, αmO3B, '7', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_7.refs.s1.strengthValue < Σ_7.refs.s2.strengthValue;
    }, Σ);
    Σ.refs.Strength.weaker = Σ.addFunction(function αYm8j(s1, s2) {
        var Σ_8 = new Σ.Scope(this, αYm8j, '8', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return Σ_8.refs.s1.strengthValue > Σ_8.refs.s2.strengthValue;
    }, Σ);
    Σ.refs.Strength.weakestOf = Σ.addFunction(function αZVCz(s1, s2) {
        var Σ_9 = new Σ.Scope(this, αZVCz, '9', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return this.weaker(Σ_9.refs.s1, Σ_9.refs.s2) ? Σ_9.refs.s1 : Σ_9.refs.s2;
    }, Σ);
    Σ.refs.Strength.strongest = Σ.addFunction(function α1oA4(s1, s2) {
        var Σ_10 = new Σ.Scope(this, α1oA4, '10', Σ, {
            s1: s1,
            s2: s2
        }, []);
        return this.stronger(Σ_10.refs.s1, Σ_10.refs.s2) ? Σ_10.refs.s1 : Σ_10.refs.s2;
    }, Σ);
    Σ.refs.Strength.prototype.nextWeaker = Σ.addFunction(function αsSyj() {
        var Σ_11 = new Σ.Scope(this, αsSyj, '11', Σ, {}, []);
        switch (this.strengthValue) {
            case 0:
                return Strength.WEAKEST;
            case 1:
                return Strength.WEAK_DEFAULT;
            case 2:
                return Strength.NORMAL;
            case 3:
                return Strength.STRONG_DEFAULT;
            case 4:
                return Strength.PREFERRED;
            case 5:
                return Strength.REQUIRED;
        }
    }, Σ);
    Σ.refs.Strength.REQUIRED = new Σ.refs.Strength(0, 'required');
    Σ.refs.Strength.STONG_PREFERRED = new Σ.refs.Strength(1, 'strongPreferred');
    Σ.refs.Strength.PREFERRED = new Σ.refs.Strength(2, 'preferred');
    Σ.refs.Strength.STRONG_DEFAULT = new Σ.refs.Strength(3, 'strongDefault');
    Σ.refs.Strength.NORMAL = new Σ.refs.Strength(4, 'normal');
    Σ.refs.Strength.WEAK_DEFAULT = new Σ.refs.Strength(5, 'weakDefault');
    Σ.refs.Strength.WEAKEST = new Σ.refs.Strength(6, 'weakest');

    function Constraint(strength) {
        var Σ_12 = new Σ.Scope(this, Constraint, '12', Σ, {
            strength: strength
        }, []);
        this.strength = Σ_12.refs.strength;
    }
    Σ.refs.Constraint.prototype.addConstraint = Σ.addFunction(function αPEMZ() {
        var Σ_13 = new Σ.Scope(this, αPEMZ, '13', Σ, {}, []);
        this.addToGraph();
        Σ.refs.planner.incrementalAdd(this);
    }, Σ);
    Σ.refs.Constraint.prototype.satisfy = Σ.addFunction(function αqAnB(mark) {
        var Σ_14 = new Σ.Scope(this, αqAnB, '14', Σ, {
            mark: mark
        }, []);
        this.chooseMethod(Σ_14.refs.mark);
        if (!this.isSatisfied()) {
            if (this.strength == Σ.refs.Strength.REQUIRED) {
                alert('Could not satisfy a required constraint!');
            }
            return null;
        }
        this.markInputs(Σ_14.refs.mark);
        Σ_14.refs.out = this.output();
        Σ_14.refs.overridden = Σ_14.refs.out.determinedBy;
        if (Σ_14.refs.overridden != null) {
            Σ_14.refs.overridden.markUnsatisfied();
        }
        Σ_14.refs.out.determinedBy = this;
        if (!Σ.refs.planner.addPropagate(this, Σ_14.refs.mark)) {
            alert('Cycle encountered');
        }
        Σ_14.refs.out.mark = Σ_14.refs.mark;
        return Σ_14.refs.overridden;
    }, Σ);
    Σ.refs.Constraint.prototype.destroyConstraint = Σ.addFunction(function αYkcp() {
        var Σ_15 = new Σ.Scope(this, αYkcp, '15', Σ, {}, []);
        if (this.isSatisfied()) {
            Σ.refs.planner.incrementalRemove(this);
        } else {
            this.removeFromGraph();
        }
    }, Σ);
    t.prototype.isInput = Σ.addFunction(function αNI39() {
        var Σ_16 = new Σ.Scope(this, αNI39, '16', Σ, {}, []);
        return false;
    }, Σ);

    function UnaryConstraint(v, strength) {
        var Σ_17 = new Σ.Scope(this, UnaryConstraint, '17', Σ, {
            v: v,
            strength: strength
        }, []);
        Σ.refs.UnaryConstraint.superConstructor.call(this, Σ_17.refs.strength);
        this.myOutput = Σ_17.refs.v;
        this.satisfied = false;
        this.addConstraint();
    }
    Σ.refs.UnaryConstraint.prototype = new Σ.refs.Constraint();
    Σ.refs.UnaryConstraint.superConstructor = Σ.refs.Constraint;
    Σ.refs.UnaryConstraint.prototype.addToGraph = Σ.addFunction(function αN9oz() {
        var Σ_18 = new Σ.Scope(this, αN9oz, '18', Σ, {}, []);
        this.myOutput.addConstraint(this);
        this.satisfied = false;
    }, Σ);
    Σ.refs.UnaryConstraint.prototype.chooseMethod = Σ.addFunction(function αpbq4(mark) {
        var Σ_19 = new Σ.Scope(this, αpbq4, '19', Σ, {
            mark: mark
        }, []);
        this.satisfied = this.myOutput.mark != Σ_19.refs.mark && Σ.refs.Strength.stronger(this.strength, this.myOutput.walkStrength);
    }, Σ);
    Σ.refs.UnaryConstraint.prototype.isSatisfied = Σ.addFunction(function αKgQm() {
        var Σ_20 = new Σ.Scope(this, αKgQm, '20', Σ, {}, []);
        return this.satisfied;
    }, Σ);
    Σ.refs.UnaryConstraint.prototype.markInputs = Σ.addFunction(function αB3L3(mark) {
        var Σ_21 = new Σ.Scope(this, αB3L3, '21', Σ, {
            mark: mark
        }, []);
    }, Σ);
    Σ.refs.UnaryConstraint.prototype.output = Σ.addFunction(function α08t8() {
        var Σ_22 = new Σ.Scope(this, α08t8, '22', Σ, {}, []);
        return this.myOutput;
    }, Σ);
    Σ.refs.UnaryConstraint.prototype.recalculate = Σ.addFunction(function αFWLq() {
        var Σ_23 = new Σ.Scope(this, αFWLq, '23', Σ, {}, []);
        this.myOutput.walkStrength = this.strength;
        this.myOutput.stay = !this.isInput();
        if (this.myOutput.stay) {
            this.execute();
        }
    }, Σ);
    Σ.refs.UnaryConstraint.prototype.markUnsatisfied = Σ.addFunction(function αXAlG() {
        var Σ_24 = new Σ.Scope(this, αXAlG, '24', Σ, {}, []);
        this.satisfied = false;
    }, Σ);
    Σ.refs.UnaryConstraint.prototype.inputsKnown = Σ.addFunction(function αnO9y() {
        var Σ_25 = new Σ.Scope(this, αnO9y, '25', Σ, {}, []);
        return true;
    }, Σ);
    Σ.refs.UnaryConstraint.prototype.removeFromGraph = Σ.addFunction(function αFQtY() {
        var Σ_26 = new Σ.Scope(this, αFQtY, '26', Σ, {}, []);
        if (this.myOutput != null) {
            this.myOutput.removeConstraint(this);
        }
        this.satisfied = false;
    }, Σ);

    function StayConstraint(v, str) {
        var Σ_27 = new Σ.Scope(this, StayConstraint, '27', Σ, {
            v: v,
            str: str
        }, []);
        Σ.refs.StayConstraint.superConstructor.call(this, Σ_27.refs.v, Σ_27.refs.str);
    }

    function UnaryConstraintInheriter() {
        var Σ_28 = new Σ.Scope(this, UnaryConstraintInheriter, '28', Σ, {}, []);
    }
    Σ.refs.StayConstraint.prototype = new Σ.refs.UnaryConstraint();
    Σ.refs.StayConstraint.superConstructor = Σ.refs.UnaryConstraint;
    Σ.refs.StayConstraint.prototype.execute = Σ.addFunction(function αq6Ij() {
        var Σ_29 = new Σ.Scope(this, αq6Ij, '29', Σ, {}, []);
    }, Σ);

    function EditConstraint(v, str) {
        var Σ_30 = new Σ.Scope(this, EditConstraint, '30', Σ, {
            v: v,
            str: str
        }, []);
        Σ.refs.EditConstraint.superConstructor.call(this, Σ_30.refs.v, Σ_30.refs.str);
    }
    Σ.refs.EditConstraint.prototype = new Σ.refs.UnaryConstraint();
    Σ.refs.EditConstraint.superConstructor = Σ.refs.UnaryConstraint;
    Σ.refs.EditConstraint.prototype.isInput = Σ.addFunction(function αuhtq() {
        var Σ_31 = new Σ.Scope(this, αuhtq, '31', Σ, {}, []);
        return true;
    }, Σ);
    Σ.refs.EditConstraint.prototype.execute = Σ.addFunction(function α5Ky5() {
        var Σ_32 = new Σ.Scope(this, α5Ky5, '32', Σ, {}, []);
    }, Σ);
    Σ.refs.Direction = new Object();
    Σ.refs.Direction.NONE = 0;
    Σ.refs.Direction.FORWARD = 1;
    Σ.refs.Direction.BACKWARD = -1;

    function BinaryConstraint(var1, var2, strength) {
        var Σ_33 = new Σ.Scope(this, BinaryConstraint, '33', Σ, {
            var1: var1,
            var2: var2,
            strength: strength
        }, []);
        Σ.refs.BinaryConstraint.superConstructor.call(this, Σ_33.refs.strength);
        this.v1 = Σ_33.refs.var1;
        this.v2 = Σ_33.refs.var2;
        this.direction = Σ.refs.Direction.NONE;
        this.addConstraint();
    }
    Σ.refs.BinaryConstraint.prototype = new Σ.refs.Constraint();
    Σ.refs.BinaryConstraint.superConstructor = Σ.refs.Constraint;
    Σ.refs.BinaryConstraint.prototype.chooseMethod = Σ.addFunction(function αjQn8(mark) {
        var Σ_34 = new Σ.Scope(this, αjQn8, '34', Σ, {
            mark: mark
        }, []);
        if (this.v1.mark == Σ_34.refs.mark) {
            this.direction = this.v2.mark != Σ_34.refs.mark && Σ.refs.Strength.stronger(this.strength, this.v2.walkStrength) ? Σ.refs.Direction.FORWARD : Σ.refs.Direction.NONE;
        }
        if (this.v2.mark == Σ_34.refs.mark) {
            this.direction = this.v1.mark != Σ_34.refs.mark && Σ.refs.Strength.stronger(this.strength, this.v1.walkStrength) ? Σ.refs.Direction.BACKWARD : Σ.refs.Direction.NONE;
        }
        if (Σ.refs.Strength.weaker(this.v1.walkStrength, this.v2.walkStrength)) {
            this.direction = Σ.refs.Strength.stronger(this.strength, this.v1.walkStrength) ? Σ.refs.Direction.BACKWARD : Σ.refs.Direction.NONE;
        } else {
            this.direction = Σ.refs.Strength.stronger(this.strength, this.v2.walkStrength) ? Σ.refs.Direction.FORWARD : Σ.refs.Direction.BACKWARD;
        }
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.addToGraph = Σ.addFunction(function αHJmO() {
        var Σ_35 = new Σ.Scope(this, αHJmO, '35', Σ, {}, []);
        this.v1.addConstraint(this);
        this.v2.addConstraint(this);
        this.direction = Σ.refs.Direction.NONE;
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.isSatisfied = Σ.addFunction(function αoQvu() {
        var Σ_36 = new Σ.Scope(this, αoQvu, '36', Σ, {}, []);
        return this.direction != Σ.refs.Direction.NONE;
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.markInputs = Σ.addFunction(function αigyJ(mark) {
        var Σ_37 = new Σ.Scope(this, αigyJ, '37', Σ, {
            mark: mark
        }, []);
        this.input().mark = Σ_37.refs.mark;
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.input = Σ.addFunction(function αWqHa() {
        var Σ_38 = new Σ.Scope(this, αWqHa, '38', Σ, {}, []);
        return this.direction == Σ.refs.Direction.FORWARD ? this.v1 : this.v2;
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.output = Σ.addFunction(function αgRJP() {
        var Σ_39 = new Σ.Scope(this, αgRJP, '39', Σ, {}, []);
        return this.direction == Σ.refs.Direction.FORWARD ? this.v2 : this.v1;
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.recalculate = Σ.addFunction(function α4lH3() {
        var Σ_40 = new Σ.Scope(this, α4lH3, '40', Σ, {}, []);
        Σ_40.refs.ihn = this.input(), Σ_40.refs.out = this.output();
        Σ_40.refs.out.walkStrength = Σ.refs.Strength.weakestOf(this.strength, Σ_40.refs.ihn.walkStrength);
        Σ_40.refs.out.stay = Σ_40.refs.ihn.stay;
        if (Σ_40.refs.out.stay) {
            this.execute();
        }
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.markUnsatisfied = Σ.addFunction(function αTtrR() {
        var Σ_41 = new Σ.Scope(this, αTtrR, '41', Σ, {}, []);
        this.direction = Σ.refs.Direction.NONE;
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.inputsKnown = Σ.addFunction(function αf9kt(mark) {
        var Σ_42 = new Σ.Scope(this, αf9kt, '42', Σ, {
            mark: mark
        }, []);
        Σ_42.refs.i = this.input();
        return Σ_42.refs.i.mark == Σ_42.refs.mark || Σ_42.refs.i.stay || Σ_42.refs.i.determinedBy == null;
    }, Σ);
    Σ.refs.BinaryConstraint.prototype.removeFromGraph = Σ.addFunction(function αyahb() {
        var Σ_43 = new Σ.Scope(this, αyahb, '43', Σ, {}, []);
        if (this.v1 != null) {
            this.v1.removeConstraint(this);
        }
        if (this.v2 != null) {
            this.v2.removeConstraint(this);
        }
        this.direction = Σ.refs.Direction.NONE;
    }, Σ);

    function ScaleConstraint(src, scale, offset, dest, strength) {
        var Σ_44 = new Σ.Scope(this, ScaleConstraint, '44', Σ, {
            src: src,
            scale: scale,
            offset: offset,
            dest: dest,
            strength: strength
        }, []);
        this.direction = Σ.refs.Direction.NONE;
        this.scale = Σ_44.refs.scale;
        this.offset = Σ_44.refs.offset;
        Σ.refs.ScaleConstraint.superConstructor.call(this, Σ_44.refs.src, Σ_44.refs.dest, Σ_44.refs.strength);
    }

    function BinaryConstraintInheriter() {
        var Σ_45 = new Σ.Scope(this, BinaryConstraintInheriter, '45', Σ, {}, []);
    }
    Σ.refs.ScaleConstraint.prototype = new Σ.refs.BinaryConstraint();
    Σ.refs.ScaleConstraint.superConstructor = Σ.refs.BinaryConstraint;
    Σ.refs.ScaleConstraint.prototype.addToGraph = Σ.addFunction(function αQ40n() {
        var Σ_46 = new Σ.Scope(this, αQ40n, '46', Σ, {}, []);
        Σ.refs.ScaleConstraint.superConstructor.prototype.addToGraph.call(this);
        this.scale.addConstraint(this);
        this.offset.addConstraint(this);
    }, Σ);
    Σ.refs.ScaleConstraint.prototype.removeFromGraph = Σ.addFunction(function αjwK6() {
        var Σ_47 = new Σ.Scope(this, αjwK6, '47', Σ, {}, []);
        Σ.refs.ScaleConstraint.superConstructor.prototype.removeFromGraph.call(this);
        if (this.scale != null) {
            this.scale.removeConstraint(this);
        }
        if (this.offset != null) {
            this.offset.removeConstraint(this);
        }
    }, Σ);
    Σ.refs.ScaleConstraint.prototype.markInputs = Σ.addFunction(function αBDsL(mark) {
        var Σ_48 = new Σ.Scope(this, αBDsL, '48', Σ, {
            mark: mark
        }, []);
        Σ.refs.ScaleConstraint.superConstructor.prototype.markInputs.call(this, Σ_48.refs.mark);
        this.scale.mark = this.offset.mark = Σ_48.refs.mark;
    }, Σ);
    Σ.refs.ScaleConstraint.prototype.execute = Σ.addFunction(function α4Lil() {
        var Σ_49 = new Σ.Scope(this, α4Lil, '49', Σ, {}, []);
        if (this.direction == Σ.refs.Direction.FORWARD) {
            this.v2.value = this.v1.value * this.scale.value + this.offset.value;
        } else {
            this.v1.value = (this.v2.value - this.offset.value) / this.scale.value;
        }
    }, Σ);
    Σ.refs.ScaleConstraint.prototype.recalculate = Σ.addFunction(function αckNp() {
        var Σ_50 = new Σ.Scope(this, αckNp, '50', Σ, {}, []);
        Σ_50.refs.ihn = this.input(), Σ_50.refs.out = this.output();
        Σ_50.refs.out.walkStrength = Σ.refs.Strength.weakestOf(this.strength, Σ_50.refs.ihn.walkStrength);
        Σ_50.refs.out.stay = Σ_50.refs.ihn.stay && this.scale.stay && this.offset.stay;
        if (Σ_50.refs.out.stay) {
            this.execute();
        }
    }, Σ);

    function EqualityConstraint(var1, var2, strength) {
        var Σ_51 = new Σ.Scope(this, EqualityConstraint, '51', Σ, {
            var1: var1,
            var2: var2,
            strength: strength
        }, []);
        Σ.refs.EqualityConstraint.superConstructor.call(this, Σ_51.refs.var1, Σ_51.refs.var2, Σ_51.refs.strength);
    }
    Σ.refs.EqualityConstraint.prototype = new Σ.refs.BinaryConstraint();
    Σ.refs.EqualityConstraint.superConstructor = Σ.refs.BinaryConstraint;
    Σ.refs.EqualityConstraint.prototype.execute = Σ.addFunction(function αCbtZ() {
        var Σ_52 = new Σ.Scope(this, αCbtZ, '52', Σ, {}, []);
        this.output().value = this.input().value;
    }, Σ);

    function Variable(name, initialValue) {
        var Σ_53 = new Σ.Scope(this, Variable, '53', Σ, {
            name: name,
            initialValue: initialValue
        }, []);
        this.value = Σ_53.refs.initialValue || 0;
        this.constraints = new Σ.refs.OrderedCollection();
        this.determinedBy = null;
        this.mark = 0;
        this.walkStrength = Σ.refs.Strength.WEAKEST;
        this.stay = true;
        this.name = Σ_53.refs.name;
    }
    Σ.refs.Variable.prototype.addConstraint = Σ.addFunction(function α95ID(c) {
        var Σ_54 = new Σ.Scope(this, α95ID, '54', Σ, {
            c: c
        }, []);
        this.constraints.add(Σ_54.refs.c);
    }, Σ);
    Σ.refs.Variable.prototype.removeConstraint = Σ.addFunction(function α0wqW(c) {
        var Σ_55 = new Σ.Scope(this, α0wqW, '55', Σ, {
            c: c
        }, []);
        this.constraints.remove(Σ_55.refs.c);
        if (this.determinedBy == Σ_55.refs.c) {
            this.determinedBy = null;
        }
    }, Σ);

    function Planner() {
        var Σ_56 = new Σ.Scope(this, Planner, '56', Σ, {}, []);
        this.currentMark = 0;
    }
    Σ.refs.Planner.prototype.incrementalAdd = Σ.addFunction(function αpaij(c) {
        var Σ_57 = new Σ.Scope(this, αpaij, '57', Σ, {
            c: c
        }, []);
        Σ_57.refs.mark = this.newMark();
        Σ_57.refs.overridden = Σ_57.refs.c.satisfy(Σ_57.refs.mark);
        while (Σ_57.refs.overridden != null) {
            Σ_57.refs.overridden = Σ_57.refs.overridden.satisfy(Σ_57.refs.mark);
        }
    }, Σ);
    Σ.refs.Planner.prototype.incrementalRemove = Σ.addFunction(function αDdP7(c) {
        var Σ_58 = new Σ.Scope(this, αDdP7, '58', Σ, {
            c: c
        }, []);
        Σ_58.refs.out = Σ_58.refs.c.output();
        Σ_58.refs.c.markUnsatisfied();
        Σ_58.refs.c.removeFromGraph();
        Σ_58.refs.unsatisfied = this.removePropagateFrom(Σ_58.refs.out);
        Σ_58.refs.strength = Σ.refs.Strength.REQUIRED;
        do {
            for (Σ_58.refs.i = 0; Σ_58.refs.i < Σ_58.refs.unsatisfied.size(); Σ_58.refs.i++) {
                Σ_58.refs.u = Σ_58.refs.unsatisfied.at(Σ_58.refs.i);
                if (Σ_58.refs.u.strength == Σ_58.refs.strength) {
                    this.incrementalAdd(Σ_58.refs.u);
                }
            }
            Σ_58.refs.strength = Σ_58.refs.strength.nextWeaker();
        } while (Σ_58.refs.strength != Σ.refs.Strength.WEAKEST);
    }, Σ);
    Σ.refs.Planner.prototype.newMark = Σ.addFunction(function αstSl() {
        var Σ_59 = new Σ.Scope(this, αstSl, '59', Σ, {}, []);
        return ++this.currentMark;
    }, Σ);
    Σ.refs.Planner.prototype.makePlan = Σ.addFunction(function αmbQ5(sources) {
        var Σ_60 = new Σ.Scope(this, αmbQ5, '60', Σ, {
            sources: sources
        }, []);
        Σ_60.refs.mark = this.newMark();
        Σ_60.refs.plan = new Σ.refs.Plan();
        Σ_60.refs.todo = Σ_60.refs.sources;
        while (Σ_60.refs.todo.size() > 0) {
            Σ_60.refs.c = Σ_60.refs.todo.removeFirst();
            if (Σ_60.refs.c.output().mark != Σ_60.refs.mark && Σ_60.refs.c.inputsKnown(Σ_60.refs.mark)) {
                Σ_60.refs.plan.addConstraint(Σ_60.refs.c);
                Σ_60.refs.c.output().mark = Σ_60.refs.mark;
                this.addConstraintsConsumingTo(Σ_60.refs.c.output(), Σ_60.refs.todo);
            }
        }
        return Σ_60.refs.plan;
    }, Σ);
    Σ.refs.Planner.prototype.extractPlanFromConstraints = Σ.addFunction(function αrYww(constraints) {
        var Σ_61 = new Σ.Scope(this, αrYww, '61', Σ, {
            constraints: constraints
        }, []);
        Σ_61.refs.sources = new Σ.refs.OrderedCollection();
        for (Σ_61.refs.i = 0; Σ_61.refs.i < Σ_61.refs.constraints.size(); Σ_61.refs.i++) {
            Σ_61.refs.c = Σ_61.refs.constraints.at(Σ_61.refs.i);
            if (Σ_61.refs.c.isInput() && Σ_61.refs.c.isSatisfied()) {
                Σ_61.refs.sources.add(Σ_61.refs.c);
            }
        }
        return this.makePlan(Σ_61.refs.sources);
    }, Σ);
    Σ.refs.Planner.prototype.addPropagate = Σ.addFunction(function αiXLN(c, mark) {
        var Σ_62 = new Σ.Scope(this, αiXLN, '62', Σ, {
            c: c,
            mark: mark
        }, []);
        Σ_62.refs.todo = new Σ.refs.OrderedCollection();
        Σ_62.refs.todo.add(Σ_62.refs.c);
        while (Σ_62.refs.todo.size() > 0) {
            Σ_62.refs.d = Σ_62.refs.todo.removeFirst();
            if (Σ_62.refs.d.output().mark == Σ_62.refs.mark) {
                this.incrementalRemove(Σ_62.refs.c);
                return false;
            }
            Σ_62.refs.d.recalculate();
            this.addConstraintsConsumingTo(Σ_62.refs.d.output(), Σ_62.refs.todo);
        }
        return true;
    }, Σ);
    Σ.refs.Planner.prototype.removePropagateFrom = Σ.addFunction(function αVa20(out) {
        var Σ_63 = new Σ.Scope(this, αVa20, '63', Σ, {
            out: out
        }, []);
        Σ_63.refs.out.determinedBy = null;
        Σ_63.refs.out.walkStrength = Σ.refs.Strength.WEAKEST;
        Σ_63.refs.out.stay = true;
        Σ_63.refs.unsatisfied = new Σ.refs.OrderedCollection();
        Σ_63.refs.todo = new Σ.refs.OrderedCollection();
        Σ_63.refs.todo.add(Σ_63.refs.out);
        while (Σ_63.refs.todo.size() > 0) {
            Σ_63.refs.v = Σ_63.refs.todo.removeFirst();
            for (Σ_63.refs.i = 0; Σ_63.refs.i < Σ_63.refs.v.constraints.size(); Σ_63.refs.i++) {
                Σ_63.refs.c = Σ_63.refs.v.constraints.at(Σ_63.refs.i);
                if (!Σ_63.refs.c.isSatisfied()) {
                    Σ_63.refs.unsatisfied.add(Σ_63.refs.c);
                }
            }
            Σ_63.refs.determining = Σ_63.refs.v.determinedBy;
            for (Σ_63.refs.i = 0; Σ_63.refs.i < Σ_63.refs.v.constraints.size(); Σ_63.refs.i++) {
                Σ_63.refs.next = Σ_63.refs.v.constraints.at(Σ_63.refs.i);
                if (Σ_63.refs.next != Σ_63.refs.determining && Σ_63.refs.next.isSatisfied()) {
                    Σ_63.refs.next.recalculate();
                    Σ_63.refs.todo.add(Σ_63.refs.next.output());
                }
            }
        }
        return Σ_63.refs.unsatisfied;
    }, Σ);
    Σ.refs.Planner.prototype.addConstraintsConsumingTo = Σ.addFunction(function αHksO(v, coll) {
        var Σ_64 = new Σ.Scope(this, αHksO, '64', Σ, {
            v: v,
            coll: coll
        }, []);
        Σ_64.refs.determining = Σ_64.refs.v.determinedBy;
        Σ_64.refs.cc = Σ_64.refs.v.constraints;
        for (Σ_64.refs.i = 0; Σ_64.refs.i < Σ_64.refs.cc.size(); Σ_64.refs.i++) {
            Σ_64.refs.c = Σ_64.refs.cc.at(Σ_64.refs.i);
            if (Σ_64.refs.c != Σ_64.refs.determining && Σ_64.refs.c.isSatisfied()) {
                Σ_64.refs.coll.add(Σ_64.refs.c);
            }
        }
    }, Σ);

    function Plan() {
        var Σ_65 = new Σ.Scope(this, Plan, '65', Σ, {}, []);
        this.v = new Σ.refs.OrderedCollection();
    }
    Σ.refs.Plan.prototype.addConstraint = Σ.addFunction(function αGSWQ(c) {
        var Σ_66 = new Σ.Scope(this, αGSWQ, '66', Σ, {
            c: c
        }, []);
        this.v.add(Σ_66.refs.c);
    }, Σ);
    Σ.refs.Plan.prototype.size = Σ.addFunction(function αWZJX() {
        var Σ_67 = new Σ.Scope(this, αWZJX, '67', Σ, {}, []);
        return this.v.size();
    }, Σ);
    Σ.refs.Plan.prototype.constraintAt = Σ.addFunction(function αNd8A(index) {
        var Σ_68 = new Σ.Scope(this, αNd8A, '68', Σ, {
            index: index
        }, []);
        return this.v.at(Σ_68.refs.index);
    }, Σ);
    Σ.refs.Plan.prototype.execute = Σ.addFunction(function αkANt() {
        var Σ_69 = new Σ.Scope(this, αkANt, '69', Σ, {}, []);
        for (Σ_69.refs.i = 0; Σ_69.refs.i < this.size(); Σ_69.refs.i++) {
            Σ_69.refs.c = this.constraintAt(Σ_69.refs.i);
            Σ_69.refs.c.execute();
        }
    }, Σ);

    function chainTest(n) {
        var Σ_70 = new Σ.Scope(this, chainTest, '70', Σ, {
            n: n
        }, []);
        Σ.refs.planner = new Σ.refs.Planner();
        Σ_70.refs.prev = null, Σ_70.refs.first = null, Σ_70.refs.last = null;
        for (Σ_70.refs.i = 0; Σ_70.refs.i <= Σ_70.refs.n; Σ_70.refs.i++) {
            Σ_70.refs.name = 'v' + Σ_70.refs.i;
            Σ_70.refs.v = new Σ.refs.Variable(Σ_70.refs.name);
            if (Σ_70.refs.prev != null) {
                new Σ.refs.EqualityConstraint(Σ_70.refs.prev, Σ_70.refs.v, Σ.refs.Strength.REQUIRED);
            }
            if (Σ_70.refs.i == 0) {
                Σ_70.refs.first = Σ_70.refs.v;
            }
            if (Σ_70.refs.i == Σ_70.refs.n) {
                Σ_70.refs.last = Σ_70.refs.v;
            }
            Σ_70.refs.prev = Σ_70.refs.v;
        }
        new Σ.refs.StayConstraint(Σ_70.refs.last, Σ.refs.Strength.STRONG_DEFAULT);
        Σ_70.refs.edit = new Σ.refs.EditConstraint(Σ_70.refs.first, Σ.refs.Strength.PREFERRED);
        Σ_70.refs.edits = new Σ.refs.OrderedCollection();
        Σ_70.refs.edits.add(Σ_70.refs.edit);
        Σ_70.refs.plan = Σ.refs.planner.extractPlanFromConstraints(Σ_70.refs.edits);
        for (Σ_70.refs.i = 0; Σ_70.refs.i < 100; Σ_70.refs.i++) {
            Σ_70.refs.first.value = Σ_70.refs.i;
            Σ_70.refs.plan.execute();
            if (Σ_70.refs.last.value != Σ_70.refs.i) {
                alert('Chain test failed.');
            }
        }
    }

    function projectionTest(n) {
        var Σ_71 = new Σ.Scope(this, projectionTest, '71', Σ, {
            n: n
        }, []);
        Σ.refs.planner = new Σ.refs.Planner();
        Σ_71.refs.scale = new Σ.refs.Variable('scale', 10);
        Σ_71.refs.offset = new Σ.refs.Variable('offset', 1000);
        Σ_71.refs.src = null, Σ_71.refs.dst = null;
        Σ_71.refs.dests = new Σ.refs.OrderedCollection();
        for (Σ_71.refs.i = 0; Σ_71.refs.i < Σ_71.refs.n; Σ_71.refs.i++) {
            Σ_71.refs.src = new Σ.refs.Variable('src' + Σ_71.refs.i, Σ_71.refs.i);
            Σ_71.refs.dst = new Σ.refs.Variable('dst' + Σ_71.refs.i, Σ_71.refs.i);
            Σ_71.refs.dests.add(Σ_71.refs.dst);
            new Σ.refs.StayConstraint(Σ_71.refs.src, Σ.refs.Strength.NORMAL);
            new Σ.refs.ScaleConstraint(Σ_71.refs.src, Σ_71.refs.scale, Σ_71.refs.offset, Σ_71.refs.dst, Σ.refs.Strength.REQUIRED);
        }
        Σ.refs.change(Σ_71.refs.src, 17);
        if (Σ_71.refs.dst.value != 1170) {
            alert('Projection 1 failed');
        }
        Σ.refs.change(Σ_71.refs.dst, 1050);
        if (Σ_71.refs.src.value != 5) {
            alert('Projection 2 failed');
        }
        Σ.refs.change(Σ_71.refs.scale, 5);
        for (Σ_71.refs.i = 0; Σ_71.refs.i < Σ_71.refs.n - 1; Σ_71.refs.i++) {
            if (Σ_71.refs.dests.at(Σ_71.refs.i).value != Σ_71.refs.i * 5 + 1000) {
                alert('Projection 3 failed');
            }
        }
        Σ.refs.change(Σ_71.refs.offset, 2000);
        for (Σ_71.refs.i = 0; Σ_71.refs.i < Σ_71.refs.n - 1; Σ_71.refs.i++) {
            if (Σ_71.refs.dests.at(Σ_71.refs.i).value != Σ_71.refs.i * 5 + 2000) {
                alert('Projection 4 failed');
            }
        }
    }

    function change(v, newValue) {
        var Σ_72 = new Σ.Scope(this, change, '72', Σ, {
            v: v,
            newValue: newValue
        }, []);
        Σ_72.refs.edit = new Σ.refs.EditConstraint(Σ_72.refs.v, Σ.refs.Strength.PREFERRED);
        Σ_72.refs.edits = new Σ.refs.OrderedCollection();
        Σ_72.refs.edits.add(Σ_72.refs.edit);
        Σ_72.refs.plan = Σ.refs.planner.extractPlanFromConstraints(Σ_72.refs.edits);
        for (Σ_72.refs.i = 0; Σ_72.refs.i < 10; Σ_72.refs.i++) {
            Σ_72.refs.v.value = Σ_72.refs.newValue;
            Σ_72.refs.plan.execute();
        }
        Σ_72.refs.edit.destroyConstraint();
    }

    function deltaBlue() {
        var Σ_73 = new Σ.Scope(this, deltaBlue, '73', Σ, {}, []);
        Σ.refs.chainTest(100);
        Σ.refs.projectionTest(100);
    }
    Σ.refs.performance = {};
    Σ.refs.performance.now = Σ.addFunction(function α2bGM() {
        var Σ_74 = new Σ.Scope(this, α2bGM, '74', Σ, {}, []);
        return Date.now();
    }, Σ);
    Σ.refs.BM_RunFunc = Σ.refs.deltaBlue;
    Σ.refs.BM_SetupFunc = Σ.addFunction(function αmeDc() {
        var Σ_75 = new Σ.Scope(this, αmeDc, '75', Σ, {}, []);
    }, Σ);
    Σ.refs.BM_TearDownFunc = Σ.addFunction(function αH2Tp() {
        var Σ_76 = new Σ.Scope(this, αH2Tp, '76', Σ, {}, []);
    }, Σ);
    Σ.refs.BM_Iterations = 1000;
    Σ.refs.BM_Min_Iterations = 16;
    Σ.refs.BM_Results = [];

    function BM_Start() {
        var Σ_77 = new Σ.Scope(this, BM_Start, '77', Σ, {}, [
            [
                doRun,
                Σ_77
            ]
        ]);
        Σ.refs.BM_SetupFunc();
        Σ_77.refs.data = {
            runs: 0,
            elapsed: 0
        };
        Σ_77.refs.elapsed = 0;
        Σ_77.refs.start = new Date();
        Σ_77.refs.i = 0;

        function doRun() {
            var Σ_77_0 = new Σ.Scope(this, doRun, '0', Σ_77, {}, []);
            Σ.log('Iteration : ' + Σ_77.refs.i);
            Σ.refs.BM_RunFunc();
            Σ_77.refs.elapsed = new Date() - Σ_77.refs.start;
            Σ_77.refs.i++;
            if (Σ_77.refs.i < Σ.refs.BM_Iterations) {
                Σ.setImmediate(Σ_77.refs.doRun);
            } else {
                if (Σ_77.refs.data != null) {
                    Σ_77.refs.data.runs += Σ_77.refs.i;
                    Σ_77.refs.data.elapsed += Σ_77.refs.elapsed;
                }
                Σ.log('Runs: ' + Σ_77.refs.data.runs + '\t|\tElapsed: ' + Σ_77.refs.data.elapsed);
                Σ_77_0.refs.usec = Σ_77.refs.data.elapsed * 1000 / Σ_77.refs.data.runs;
                Σ_77_0.refs.rms = 0;
                Σ.refs.BM_Results.push({
                    time: Σ_77_0.refs.usec,
                    latency: Σ_77_0.refs.rms
                });
            }
        }
        Σ.setImmediate(Σ_77.refs.doRun);
    }
    Σ.refs.BM_Start();
}(require('things-js').bootstrap('mqtt://localhost', 'deltablue.js')));