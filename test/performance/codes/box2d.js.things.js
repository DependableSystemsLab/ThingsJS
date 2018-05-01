(function(Σ) {
    Σ.hoist([
        [
            MakeNewWorld,
            Σ
        ],
        [
            runBox2D,
            Σ
        ],
        [
            setupBox2D,
            Σ
        ],
        [
            tearDownBox2D,
            Σ
        ],
        [
            BM_Start,
            Σ
        ]
    ]);
    Σ.refs.Box2D = {};
    (function αLPvr(F, G) {
        var Σ_0 = new Σ.Scope(this, αLPvr, '0', Σ, {
            F: F,
            G: G
        }, [
            [
                K,
                Σ_0
            ]
        ]);

        function K() {
            var Σ_0_0 = new Σ.Scope(this, K, '0', Σ_0, {}, []);
        }
        if (!(Object.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function) {
            Object.defineProperty = Σ_0.addFunction(function αYGgJ(y, w, A) {
                var Σ_0_1 = new Σ.Scope(this, αYGgJ, '1', Σ_0, {
                    y: y,
                    w: w,
                    A: A
                }, []);
                Σ_0_1.refs.A.get instanceof Function && Σ_0_1.refs.y.__defineGetter__(Σ_0_1.refs.w, Σ_0_1.refs.A.get);
                Σ_0_1.refs.A.set instanceof Function && Σ_0_1.refs.y.__defineSetter__(Σ_0_1.refs.w, Σ_0_1.refs.A.set);
            }, Σ_0);
        }
        Σ_0.refs.F.inherit = Σ_0.addFunction(function αYtSs(y, w) {
            var Σ_0_2 = new Σ.Scope(this, αYtSs, '2', Σ_0, {
                y: y,
                w: w
            }, []);
            K.prototype = Σ_0_2.refs.w.prototype;
            Σ_0_2.refs.y.prototype = new K();
            Σ_0_2.refs.y.prototype.constructor = Σ_0_2.refs.y;
        }, Σ_0);
        Σ_0.refs.F.generateCallback = Σ_0.addFunction(function αEoUT(y, w) {
            var Σ_0_3 = new Σ.Scope(this, αEoUT, '3', Σ_0, {
                y: y,
                w: w
            }, []);
            return Σ_0_3.addFunction(function αTzN2() {
                var Σ_0_3_0 = new Σ.Scope(this, αTzN2, '0', Σ_0_3, {}, []);
                Σ_0_3.refs.w.apply(Σ_0_3.refs.y, arguments);
            }, Σ_0_3);
        }, Σ_0);
        Σ_0.refs.F.NVector = Σ_0.addFunction(function αuox7(y) {
            var Σ_0_4 = new Σ.Scope(this, αuox7, '4', Σ_0, {
                y: y
            }, []);
            if (Σ_0_4.refs.y === Σ_0.refs.G) {
                Σ_0_4.refs.y = 0;
            }
            for (Σ_0_4.refs.w = Array(Σ_0_4.refs.y || 0), Σ_0_4.refs.A = 0; Σ_0_4.refs.A < Σ_0_4.refs.y; ++Σ_0_4.refs.A) {
                Σ_0_4.refs.w[Σ_0_4.refs.A] = 0;
            }
            return Σ_0_4.refs.w;
        }, Σ_0);
        Σ_0.refs.F.is = Σ_0.addFunction(function α0Mbx(y, w) {
            var Σ_0_5 = new Σ.Scope(this, α0Mbx, '5', Σ_0, {
                y: y,
                w: w
            }, []);
            if (Σ_0_5.refs.y === null) {
                return false;
            }
            if (Σ_0_5.refs.w instanceof Function && Σ_0_5.refs.y instanceof Σ_0_5.refs.w) {
                return true;
            }
            if (Σ_0_5.refs.y.constructor.__implements != Σ_0.refs.G && Σ_0_5.refs.y.constructor.__implements[Σ_0_5.refs.w]) {
                return true;
            }
            return false;
        }, Σ_0);
        Σ_0.refs.F.parseUInt = Σ_0.addFunction(function αmygG(y) {
            var Σ_0_6 = new Σ.Scope(this, αmygG, '6', Σ_0, {
                y: y
            }, []);
            return Math.abs(parseInt(Σ_0_6.refs.y));
        }, Σ_0);
    }(Σ.refs.Box2D));
    Σ.refs.Vector = undefined, Σ.refs.Vector_a2j_Number = Σ.refs.Box2D.NVector;
    if (typeof Σ.refs.Box2D === 'undefined') {
        Σ.refs.Box2D = {};
    }
    if (typeof Σ.refs.Box2D.Collision === 'undefined') {
        Σ.refs.Box2D.Collision = {};
    }
    if (typeof Σ.refs.Box2D.Collision.Shapes === 'undefined') {
        Σ.refs.Box2D.Collision.Shapes = {};
    }
    if (typeof Σ.refs.Box2D.Common === 'undefined') {
        Σ.refs.Box2D.Common = {};
    }
    if (typeof Σ.refs.Box2D.Common.Math === 'undefined') {
        Σ.refs.Box2D.Common.Math = {};
    }
    if (typeof Σ.refs.Box2D.Dynamics === 'undefined') {
        Σ.refs.Box2D.Dynamics = {};
    }
    if (typeof Σ.refs.Box2D.Dynamics.Contacts === 'undefined') {
        Σ.refs.Box2D.Dynamics.Contacts = {};
    }
    if (typeof Σ.refs.Box2D.Dynamics.Controllers === 'undefined') {
        Σ.refs.Box2D.Dynamics.Controllers = {};
    }
    if (typeof Σ.refs.Box2D.Dynamics.Joints === 'undefined') {
        Σ.refs.Box2D.Dynamics.Joints = {};
    }
    (function αMhq9() {
        var Σ_1 = new Σ.Scope(this, αMhq9, '1', Σ, {}, [
            [
                F,
                Σ_1
            ],
            [
                G,
                Σ_1
            ],
            [
                K,
                Σ_1
            ],
            [
                y,
                Σ_1
            ],
            [
                w,
                Σ_1
            ],
            [
                A,
                Σ_1
            ],
            [
                U,
                Σ_1
            ],
            [
                p,
                Σ_1
            ],
            [
                B,
                Σ_1
            ],
            [
                Q,
                Σ_1
            ],
            [
                V,
                Σ_1
            ],
            [
                M,
                Σ_1
            ],
            [
                L,
                Σ_1
            ],
            [
                I,
                Σ_1
            ],
            [
                W,
                Σ_1
            ],
            [
                Y,
                Σ_1
            ],
            [
                k,
                Σ_1
            ],
            [
                z,
                Σ_1
            ],
            [
                u,
                Σ_1
            ],
            [
                D,
                Σ_1
            ],
            [
                H,
                Σ_1
            ],
            [
                O,
                Σ_1
            ],
            [
                E,
                Σ_1
            ],
            [
                R,
                Σ_1
            ],
            [
                N,
                Σ_1
            ],
            [
                S,
                Σ_1
            ],
            [
                aa,
                Σ_1
            ],
            [
                Z,
                Σ_1
            ],
            [
                d,
                Σ_1
            ],
            [
                h,
                Σ_1
            ],
            [
                l,
                Σ_1
            ],
            [
                j,
                Σ_1
            ],
            [
                o,
                Σ_1
            ],
            [
                q,
                Σ_1
            ],
            [
                n,
                Σ_1
            ],
            [
                a,
                Σ_1
            ],
            [
                c,
                Σ_1
            ],
            [
                g,
                Σ_1
            ],
            [
                b,
                Σ_1
            ],
            [
                e,
                Σ_1
            ],
            [
                f,
                Σ_1
            ],
            [
                m,
                Σ_1
            ],
            [
                r,
                Σ_1
            ],
            [
                s,
                Σ_1
            ],
            [
                v,
                Σ_1
            ],
            [
                t,
                Σ_1
            ],
            [
                x,
                Σ_1
            ],
            [
                C,
                Σ_1
            ],
            [
                J,
                Σ_1
            ],
            [
                T,
                Σ_1
            ],
            [
                P,
                Σ_1
            ],
            [
                X,
                Σ_1
            ],
            [
                $,
                Σ_1
            ],
            [
                ba,
                Σ_1
            ],
            [
                ca,
                Σ_1
            ],
            [
                da,
                Σ_1
            ],
            [
                Fa,
                Σ_1
            ],
            [
                ea,
                Σ_1
            ],
            [
                Ga,
                Σ_1
            ],
            [
                fa,
                Σ_1
            ],
            [
                ga,
                Σ_1
            ],
            [
                Ha,
                Σ_1
            ],
            [
                Ia,
                Σ_1
            ],
            [
                ha,
                Σ_1
            ],
            [
                Ja,
                Σ_1
            ],
            [
                Ka,
                Σ_1
            ],
            [
                ia,
                Σ_1
            ],
            [
                La,
                Σ_1
            ],
            [
                ja,
                Σ_1
            ],
            [
                Ma,
                Σ_1
            ],
            [
                Na,
                Σ_1
            ],
            [
                Oa,
                Σ_1
            ],
            [
                ka,
                Σ_1
            ],
            [
                Pa,
                Σ_1
            ],
            [
                Qa,
                Σ_1
            ],
            [
                Ra,
                Σ_1
            ],
            [
                Sa,
                Σ_1
            ],
            [
                Ta,
                Σ_1
            ],
            [
                Ua,
                Σ_1
            ],
            [
                Va,
                Σ_1
            ],
            [
                la,
                Σ_1
            ],
            [
                ma,
                Σ_1
            ],
            [
                na,
                Σ_1
            ],
            [
                oa,
                Σ_1
            ],
            [
                pa,
                Σ_1
            ],
            [
                qa,
                Σ_1
            ],
            [
                Wa,
                Σ_1
            ],
            [
                ra,
                Σ_1
            ],
            [
                sa,
                Σ_1
            ],
            [
                Xa,
                Σ_1
            ],
            [
                ta,
                Σ_1
            ],
            [
                ua,
                Σ_1
            ],
            [
                va,
                Σ_1
            ],
            [
                wa,
                Σ_1
            ],
            [
                xa,
                Σ_1
            ],
            [
                ya,
                Σ_1
            ],
            [
                za,
                Σ_1
            ],
            [
                Aa,
                Σ_1
            ],
            [
                Ba,
                Σ_1
            ],
            [
                Ca,
                Σ_1
            ],
            [
                Da,
                Σ_1
            ],
            [
                Ea,
                Σ_1
            ]
        ]);

        function F() {
            var Σ_1_0 = new Σ.Scope(this, F, '0', Σ_1, {}, []);
            F.b2AABB.apply(this, arguments);
        }

        function G() {
            var Σ_1_1 = new Σ.Scope(this, G, '1', Σ_1, {}, []);
            G.b2Bound.apply(this, arguments);
        }

        function K() {
            var Σ_1_2 = new Σ.Scope(this, K, '2', Σ_1, {}, []);
            K.b2BoundValues.apply(this, arguments);
            this.constructor === K && this.b2BoundValues.apply(this, arguments);
        }

        function y() {
            var Σ_1_3 = new Σ.Scope(this, y, '3', Σ_1, {}, []);
            y.b2Collision.apply(this, arguments);
        }

        function w() {
            var Σ_1_4 = new Σ.Scope(this, w, '4', Σ_1, {}, []);
            w.b2ContactID.apply(this, arguments);
            this.constructor === w && this.b2ContactID.apply(this, arguments);
        }

        function A() {
            var Σ_1_5 = new Σ.Scope(this, A, '5', Σ_1, {}, []);
            A.b2ContactPoint.apply(this, arguments);
        }

        function U() {
            var Σ_1_6 = new Σ.Scope(this, U, '6', Σ_1, {}, []);
            U.b2Distance.apply(this, arguments);
        }

        function p() {
            var Σ_1_7 = new Σ.Scope(this, p, '7', Σ_1, {}, []);
            p.b2DistanceInput.apply(this, arguments);
        }

        function B() {
            var Σ_1_8 = new Σ.Scope(this, B, '8', Σ_1, {}, []);
            B.b2DistanceOutput.apply(this, arguments);
        }

        function Q() {
            var Σ_1_9 = new Σ.Scope(this, Q, '9', Σ_1, {}, []);
            Q.b2DistanceProxy.apply(this, arguments);
        }

        function V() {
            var Σ_1_10 = new Σ.Scope(this, V, '10', Σ_1, {}, []);
            V.b2DynamicTree.apply(this, arguments);
            this.constructor === V && this.b2DynamicTree.apply(this, arguments);
        }

        function M() {
            var Σ_1_11 = new Σ.Scope(this, M, '11', Σ_1, {}, []);
            M.b2DynamicTreeBroadPhase.apply(this, arguments);
        }

        function L() {
            var Σ_1_12 = new Σ.Scope(this, L, '12', Σ_1, {}, []);
            L.b2DynamicTreeNode.apply(this, arguments);
        }

        function I() {
            var Σ_1_13 = new Σ.Scope(this, I, '13', Σ_1, {}, []);
            I.b2DynamicTreePair.apply(this, arguments);
        }

        function W() {
            var Σ_1_14 = new Σ.Scope(this, W, '14', Σ_1, {}, []);
            W.b2Manifold.apply(this, arguments);
            this.constructor === W && this.b2Manifold.apply(this, arguments);
        }

        function Y() {
            var Σ_1_15 = new Σ.Scope(this, Y, '15', Σ_1, {}, []);
            Y.b2ManifoldPoint.apply(this, arguments);
            this.constructor === Y && this.b2ManifoldPoint.apply(this, arguments);
        }

        function k() {
            var Σ_1_16 = new Σ.Scope(this, k, '16', Σ_1, {}, []);
            k.b2Point.apply(this, arguments);
        }

        function z() {
            var Σ_1_17 = new Σ.Scope(this, z, '17', Σ_1, {}, []);
            z.b2RayCastInput.apply(this, arguments);
            this.constructor === z && this.b2RayCastInput.apply(this, arguments);
        }

        function u() {
            var Σ_1_18 = new Σ.Scope(this, u, '18', Σ_1, {}, []);
            u.b2RayCastOutput.apply(this, arguments);
        }

        function D() {
            var Σ_1_19 = new Σ.Scope(this, D, '19', Σ_1, {}, []);
            D.b2Segment.apply(this, arguments);
        }

        function H() {
            var Σ_1_20 = new Σ.Scope(this, H, '20', Σ_1, {}, []);
            H.b2SeparationFunction.apply(this, arguments);
        }

        function O() {
            var Σ_1_21 = new Σ.Scope(this, O, '21', Σ_1, {}, []);
            O.b2Simplex.apply(this, arguments);
            this.constructor === O && this.b2Simplex.apply(this, arguments);
        }

        function E() {
            var Σ_1_22 = new Σ.Scope(this, E, '22', Σ_1, {}, []);
            E.b2SimplexCache.apply(this, arguments);
        }

        function R() {
            var Σ_1_23 = new Σ.Scope(this, R, '23', Σ_1, {}, []);
            R.b2SimplexVertex.apply(this, arguments);
        }

        function N() {
            var Σ_1_24 = new Σ.Scope(this, N, '24', Σ_1, {}, []);
            N.b2TimeOfImpact.apply(this, arguments);
        }

        function S() {
            var Σ_1_25 = new Σ.Scope(this, S, '25', Σ_1, {}, []);
            S.b2TOIInput.apply(this, arguments);
        }

        function aa() {
            var Σ_1_26 = new Σ.Scope(this, aa, '26', Σ_1, {}, []);
            aa.b2WorldManifold.apply(this, arguments);
            this.constructor === aa && this.b2WorldManifold.apply(this, arguments);
        }

        function Z() {
            var Σ_1_27 = new Σ.Scope(this, Z, '27', Σ_1, {}, []);
            Z.ClipVertex.apply(this, arguments);
        }

        function d() {
            var Σ_1_28 = new Σ.Scope(this, d, '28', Σ_1, {}, []);
            d.Features.apply(this, arguments);
        }

        function h() {
            var Σ_1_29 = new Σ.Scope(this, h, '29', Σ_1, {}, []);
            h.b2CircleShape.apply(this, arguments);
            this.constructor === h && this.b2CircleShape.apply(this, arguments);
        }

        function l() {
            var Σ_1_30 = new Σ.Scope(this, l, '30', Σ_1, {}, []);
            l.b2EdgeChainDef.apply(this, arguments);
            this.constructor === l && this.b2EdgeChainDef.apply(this, arguments);
        }

        function j() {
            var Σ_1_31 = new Σ.Scope(this, j, '31', Σ_1, {}, []);
            j.b2EdgeShape.apply(this, arguments);
            this.constructor === j && this.b2EdgeShape.apply(this, arguments);
        }

        function o() {
            var Σ_1_32 = new Σ.Scope(this, o, '32', Σ_1, {}, []);
            o.b2MassData.apply(this, arguments);
        }

        function q() {
            var Σ_1_33 = new Σ.Scope(this, q, '33', Σ_1, {}, []);
            q.b2PolygonShape.apply(this, arguments);
            this.constructor === q && this.b2PolygonShape.apply(this, arguments);
        }

        function n() {
            var Σ_1_34 = new Σ.Scope(this, n, '34', Σ_1, {}, []);
            n.b2Shape.apply(this, arguments);
            this.constructor === n && this.b2Shape.apply(this, arguments);
        }

        function a() {
            var Σ_1_35 = new Σ.Scope(this, a, '35', Σ_1, {}, []);
            a.b2Color.apply(this, arguments);
            this.constructor === a && this.b2Color.apply(this, arguments);
        }

        function c() {
            var Σ_1_36 = new Σ.Scope(this, c, '36', Σ_1, {}, []);
            c.b2Settings.apply(this, arguments);
        }

        function g() {
            var Σ_1_37 = new Σ.Scope(this, g, '37', Σ_1, {}, []);
            g.b2Mat22.apply(this, arguments);
            this.constructor === g && this.b2Mat22.apply(this, arguments);
        }

        function b() {
            var Σ_1_38 = new Σ.Scope(this, b, '38', Σ_1, {}, []);
            b.b2Mat33.apply(this, arguments);
            this.constructor === b && this.b2Mat33.apply(this, arguments);
        }

        function e() {
            var Σ_1_39 = new Σ.Scope(this, e, '39', Σ_1, {}, []);
            e.b2Math.apply(this, arguments);
        }

        function f() {
            var Σ_1_40 = new Σ.Scope(this, f, '40', Σ_1, {}, []);
            f.b2Sweep.apply(this, arguments);
        }

        function m() {
            var Σ_1_41 = new Σ.Scope(this, m, '41', Σ_1, {}, []);
            m.b2Transform.apply(this, arguments);
            this.constructor === m && this.b2Transform.apply(this, arguments);
        }

        function r() {
            var Σ_1_42 = new Σ.Scope(this, r, '42', Σ_1, {}, []);
            r.b2Vec2.apply(this, arguments);
            this.constructor === r && this.b2Vec2.apply(this, arguments);
        }

        function s() {
            var Σ_1_43 = new Σ.Scope(this, s, '43', Σ_1, {}, []);
            s.b2Vec3.apply(this, arguments);
            this.constructor === s && this.b2Vec3.apply(this, arguments);
        }

        function v() {
            var Σ_1_44 = new Σ.Scope(this, v, '44', Σ_1, {}, []);
            v.b2Body.apply(this, arguments);
            this.constructor === v && this.b2Body.apply(this, arguments);
        }

        function t() {
            var Σ_1_45 = new Σ.Scope(this, t, '45', Σ_1, {}, []);
            t.b2BodyDef.apply(this, arguments);
            this.constructor === t && this.b2BodyDef.apply(this, arguments);
        }

        function x() {
            var Σ_1_46 = new Σ.Scope(this, x, '46', Σ_1, {}, []);
            x.b2ContactFilter.apply(this, arguments);
        }

        function C() {
            var Σ_1_47 = new Σ.Scope(this, C, '47', Σ_1, {}, []);
            C.b2ContactImpulse.apply(this, arguments);
        }

        function J() {
            var Σ_1_48 = new Σ.Scope(this, J, '48', Σ_1, {}, []);
            J.b2ContactListener.apply(this, arguments);
        }

        function T() {
            var Σ_1_49 = new Σ.Scope(this, T, '49', Σ_1, {}, []);
            T.b2ContactManager.apply(this, arguments);
            this.constructor === T && this.b2ContactManager.apply(this, arguments);
        }

        function P() {
            var Σ_1_50 = new Σ.Scope(this, P, '50', Σ_1, {}, []);
            P.b2DebugDraw.apply(this, arguments);
            this.constructor === P && this.b2DebugDraw.apply(this, arguments);
        }

        function X() {
            var Σ_1_51 = new Σ.Scope(this, X, '51', Σ_1, {}, []);
            X.b2DestructionListener.apply(this, arguments);
        }

        function $() {
            var Σ_1_52 = new Σ.Scope(this, $, '52', Σ_1, {}, []);
            $.b2FilterData.apply(this, arguments);
        }

        function ba() {
            var Σ_1_53 = new Σ.Scope(this, ba, '53', Σ_1, {}, []);
            ba.b2Fixture.apply(this, arguments);
            this.constructor === ba && this.b2Fixture.apply(this, arguments);
        }

        function ca() {
            var Σ_1_54 = new Σ.Scope(this, ca, '54', Σ_1, {}, []);
            ca.b2FixtureDef.apply(this, arguments);
            this.constructor === ca && this.b2FixtureDef.apply(this, arguments);
        }

        function da() {
            var Σ_1_55 = new Σ.Scope(this, da, '55', Σ_1, {}, []);
            da.b2Island.apply(this, arguments);
            this.constructor === da && this.b2Island.apply(this, arguments);
        }

        function Fa() {
            var Σ_1_56 = new Σ.Scope(this, Fa, '56', Σ_1, {}, []);
            Fa.b2TimeStep.apply(this, arguments);
        }

        function ea() {
            var Σ_1_57 = new Σ.Scope(this, ea, '57', Σ_1, {}, []);
            ea.b2World.apply(this, arguments);
            this.constructor === ea && this.b2World.apply(this, arguments);
        }

        function Ga() {
            var Σ_1_58 = new Σ.Scope(this, Ga, '58', Σ_1, {}, []);
            Ga.b2CircleContact.apply(this, arguments);
        }

        function fa() {
            var Σ_1_59 = new Σ.Scope(this, fa, '59', Σ_1, {}, []);
            fa.b2Contact.apply(this, arguments);
            this.constructor === fa && this.b2Contact.apply(this, arguments);
        }

        function ga() {
            var Σ_1_60 = new Σ.Scope(this, ga, '60', Σ_1, {}, []);
            ga.b2ContactConstraint.apply(this, arguments);
            this.constructor === ga && this.b2ContactConstraint.apply(this, arguments);
        }

        function Ha() {
            var Σ_1_61 = new Σ.Scope(this, Ha, '61', Σ_1, {}, []);
            Ha.b2ContactConstraintPoint.apply(this, arguments);
        }

        function Ia() {
            var Σ_1_62 = new Σ.Scope(this, Ia, '62', Σ_1, {}, []);
            Ia.b2ContactEdge.apply(this, arguments);
        }

        function ha() {
            var Σ_1_63 = new Σ.Scope(this, ha, '63', Σ_1, {}, []);
            ha.b2ContactFactory.apply(this, arguments);
            this.constructor === ha && this.b2ContactFactory.apply(this, arguments);
        }

        function Ja() {
            var Σ_1_64 = new Σ.Scope(this, Ja, '64', Σ_1, {}, []);
            Ja.b2ContactRegister.apply(this, arguments);
        }

        function Ka() {
            var Σ_1_65 = new Σ.Scope(this, Ka, '65', Σ_1, {}, []);
            Ka.b2ContactResult.apply(this, arguments);
        }

        function ia() {
            var Σ_1_66 = new Σ.Scope(this, ia, '66', Σ_1, {}, []);
            ia.b2ContactSolver.apply(this, arguments);
            this.constructor === ia && this.b2ContactSolver.apply(this, arguments);
        }

        function La() {
            var Σ_1_67 = new Σ.Scope(this, La, '67', Σ_1, {}, []);
            La.b2EdgeAndCircleContact.apply(this, arguments);
        }

        function ja() {
            var Σ_1_68 = new Σ.Scope(this, ja, '68', Σ_1, {}, []);
            ja.b2NullContact.apply(this, arguments);
            this.constructor === ja && this.b2NullContact.apply(this, arguments);
        }

        function Ma() {
            var Σ_1_69 = new Σ.Scope(this, Ma, '69', Σ_1, {}, []);
            Ma.b2PolyAndCircleContact.apply(this, arguments);
        }

        function Na() {
            var Σ_1_70 = new Σ.Scope(this, Na, '70', Σ_1, {}, []);
            Na.b2PolyAndEdgeContact.apply(this, arguments);
        }

        function Oa() {
            var Σ_1_71 = new Σ.Scope(this, Oa, '71', Σ_1, {}, []);
            Oa.b2PolygonContact.apply(this, arguments);
        }

        function ka() {
            var Σ_1_72 = new Σ.Scope(this, ka, '72', Σ_1, {}, []);
            ka.b2PositionSolverManifold.apply(this, arguments);
            this.constructor === ka && this.b2PositionSolverManifold.apply(this, arguments);
        }

        function Pa() {
            var Σ_1_73 = new Σ.Scope(this, Pa, '73', Σ_1, {}, []);
            Pa.b2BuoyancyController.apply(this, arguments);
        }

        function Qa() {
            var Σ_1_74 = new Σ.Scope(this, Qa, '74', Σ_1, {}, []);
            Qa.b2ConstantAccelController.apply(this, arguments);
        }

        function Ra() {
            var Σ_1_75 = new Σ.Scope(this, Ra, '75', Σ_1, {}, []);
            Ra.b2ConstantForceController.apply(this, arguments);
        }

        function Sa() {
            var Σ_1_76 = new Σ.Scope(this, Sa, '76', Σ_1, {}, []);
            Sa.b2Controller.apply(this, arguments);
        }

        function Ta() {
            var Σ_1_77 = new Σ.Scope(this, Ta, '77', Σ_1, {}, []);
            Ta.b2ControllerEdge.apply(this, arguments);
        }

        function Ua() {
            var Σ_1_78 = new Σ.Scope(this, Ua, '78', Σ_1, {}, []);
            Ua.b2GravityController.apply(this, arguments);
        }

        function Va() {
            var Σ_1_79 = new Σ.Scope(this, Va, '79', Σ_1, {}, []);
            Va.b2TensorDampingController.apply(this, arguments);
        }

        function la() {
            var Σ_1_80 = new Σ.Scope(this, la, '80', Σ_1, {}, []);
            la.b2DistanceJoint.apply(this, arguments);
            this.constructor === la && this.b2DistanceJoint.apply(this, arguments);
        }

        function ma() {
            var Σ_1_81 = new Σ.Scope(this, ma, '81', Σ_1, {}, []);
            ma.b2DistanceJointDef.apply(this, arguments);
            this.constructor === ma && this.b2DistanceJointDef.apply(this, arguments);
        }

        function na() {
            var Σ_1_82 = new Σ.Scope(this, na, '82', Σ_1, {}, []);
            na.b2FrictionJoint.apply(this, arguments);
            this.constructor === na && this.b2FrictionJoint.apply(this, arguments);
        }

        function oa() {
            var Σ_1_83 = new Σ.Scope(this, oa, '83', Σ_1, {}, []);
            oa.b2FrictionJointDef.apply(this, arguments);
            this.constructor === oa && this.b2FrictionJointDef.apply(this, arguments);
        }

        function pa() {
            var Σ_1_84 = new Σ.Scope(this, pa, '84', Σ_1, {}, []);
            pa.b2GearJoint.apply(this, arguments);
            this.constructor === pa && this.b2GearJoint.apply(this, arguments);
        }

        function qa() {
            var Σ_1_85 = new Σ.Scope(this, qa, '85', Σ_1, {}, []);
            qa.b2GearJointDef.apply(this, arguments);
            this.constructor === qa && this.b2GearJointDef.apply(this, arguments);
        }

        function Wa() {
            var Σ_1_86 = new Σ.Scope(this, Wa, '86', Σ_1, {}, []);
            Wa.b2Jacobian.apply(this, arguments);
        }

        function ra() {
            var Σ_1_87 = new Σ.Scope(this, ra, '87', Σ_1, {}, []);
            ra.b2Joint.apply(this, arguments);
            this.constructor === ra && this.b2Joint.apply(this, arguments);
        }

        function sa() {
            var Σ_1_88 = new Σ.Scope(this, sa, '88', Σ_1, {}, []);
            sa.b2JointDef.apply(this, arguments);
            this.constructor === sa && this.b2JointDef.apply(this, arguments);
        }

        function Xa() {
            var Σ_1_89 = new Σ.Scope(this, Xa, '89', Σ_1, {}, []);
            Xa.b2JointEdge.apply(this, arguments);
        }

        function ta() {
            var Σ_1_90 = new Σ.Scope(this, ta, '90', Σ_1, {}, []);
            ta.b2LineJoint.apply(this, arguments);
            this.constructor === ta && this.b2LineJoint.apply(this, arguments);
        }

        function ua() {
            var Σ_1_91 = new Σ.Scope(this, ua, '91', Σ_1, {}, []);
            ua.b2LineJointDef.apply(this, arguments);
            this.constructor === ua && this.b2LineJointDef.apply(this, arguments);
        }

        function va() {
            var Σ_1_92 = new Σ.Scope(this, va, '92', Σ_1, {}, []);
            va.b2MouseJoint.apply(this, arguments);
            this.constructor === va && this.b2MouseJoint.apply(this, arguments);
        }

        function wa() {
            var Σ_1_93 = new Σ.Scope(this, wa, '93', Σ_1, {}, []);
            wa.b2MouseJointDef.apply(this, arguments);
            this.constructor === wa && this.b2MouseJointDef.apply(this, arguments);
        }

        function xa() {
            var Σ_1_94 = new Σ.Scope(this, xa, '94', Σ_1, {}, []);
            xa.b2PrismaticJoint.apply(this, arguments);
            this.constructor === xa && this.b2PrismaticJoint.apply(this, arguments);
        }

        function ya() {
            var Σ_1_95 = new Σ.Scope(this, ya, '95', Σ_1, {}, []);
            ya.b2PrismaticJointDef.apply(this, arguments);
            this.constructor === ya && this.b2PrismaticJointDef.apply(this, arguments);
        }

        function za() {
            var Σ_1_96 = new Σ.Scope(this, za, '96', Σ_1, {}, []);
            za.b2PulleyJoint.apply(this, arguments);
            this.constructor === za && this.b2PulleyJoint.apply(this, arguments);
        }

        function Aa() {
            var Σ_1_97 = new Σ.Scope(this, Aa, '97', Σ_1, {}, []);
            Aa.b2PulleyJointDef.apply(this, arguments);
            this.constructor === Aa && this.b2PulleyJointDef.apply(this, arguments);
        }

        function Ba() {
            var Σ_1_98 = new Σ.Scope(this, Ba, '98', Σ_1, {}, []);
            Ba.b2RevoluteJoint.apply(this, arguments);
            this.constructor === Ba && this.b2RevoluteJoint.apply(this, arguments);
        }

        function Ca() {
            var Σ_1_99 = new Σ.Scope(this, Ca, '99', Σ_1, {}, []);
            Ca.b2RevoluteJointDef.apply(this, arguments);
            this.constructor === Ca && this.b2RevoluteJointDef.apply(this, arguments);
        }

        function Da() {
            var Σ_1_100 = new Σ.Scope(this, Da, '100', Σ_1, {}, []);
            Da.b2WeldJoint.apply(this, arguments);
            this.constructor === Da && this.b2WeldJoint.apply(this, arguments);
        }

        function Ea() {
            var Σ_1_101 = new Σ.Scope(this, Ea, '101', Σ_1, {}, []);
            Ea.b2WeldJointDef.apply(this, arguments);
            this.constructor === Ea && this.b2WeldJointDef.apply(this, arguments);
        }
        Σ.refs.Box2D.Collision.IBroadPhase = 'Box2D.Collision.IBroadPhase';
        Σ.refs.Box2D.Collision.b2AABB = F;
        Σ.refs.Box2D.Collision.b2Bound = G;
        Σ.refs.Box2D.Collision.b2BoundValues = K;
        Σ.refs.Box2D.Collision.b2Collision = y;
        Σ.refs.Box2D.Collision.b2ContactID = w;
        Σ.refs.Box2D.Collision.b2ContactPoint = A;
        Σ.refs.Box2D.Collision.b2Distance = U;
        Σ.refs.Box2D.Collision.b2DistanceInput = p;
        Σ.refs.Box2D.Collision.b2DistanceOutput = B;
        Σ.refs.Box2D.Collision.b2DistanceProxy = Q;
        Σ.refs.Box2D.Collision.b2DynamicTree = V;
        Σ.refs.Box2D.Collision.b2DynamicTreeBroadPhase = M;
        Σ.refs.Box2D.Collision.b2DynamicTreeNode = L;
        Σ.refs.Box2D.Collision.b2DynamicTreePair = I;
        Σ.refs.Box2D.Collision.b2Manifold = W;
        Σ.refs.Box2D.Collision.b2ManifoldPoint = Y;
        Σ.refs.Box2D.Collision.b2Point = k;
        Σ.refs.Box2D.Collision.b2RayCastInput = z;
        Σ.refs.Box2D.Collision.b2RayCastOutput = u;
        Σ.refs.Box2D.Collision.b2Segment = D;
        Σ.refs.Box2D.Collision.b2SeparationFunction = H;
        Σ.refs.Box2D.Collision.b2Simplex = O;
        Σ.refs.Box2D.Collision.b2SimplexCache = E;
        Σ.refs.Box2D.Collision.b2SimplexVertex = R;
        Σ.refs.Box2D.Collision.b2TimeOfImpact = N;
        Σ.refs.Box2D.Collision.b2TOIInput = S;
        Σ.refs.Box2D.Collision.b2WorldManifold = aa;
        Σ.refs.Box2D.Collision.ClipVertex = Z;
        Σ.refs.Box2D.Collision.Features = d;
        Σ.refs.Box2D.Collision.Shapes.b2CircleShape = h;
        Σ.refs.Box2D.Collision.Shapes.b2EdgeChainDef = l;
        Σ.refs.Box2D.Collision.Shapes.b2EdgeShape = j;
        Σ.refs.Box2D.Collision.Shapes.b2MassData = o;
        Σ.refs.Box2D.Collision.Shapes.b2PolygonShape = q;
        Σ.refs.Box2D.Collision.Shapes.b2Shape = n;
        Σ.refs.Box2D.Common.b2internal = 'Box2D.Common.b2internal';
        Σ.refs.Box2D.Common.b2Color = a;
        Σ.refs.Box2D.Common.b2Settings = c;
        Σ.refs.Box2D.Common.Math.b2Mat22 = g;
        Σ.refs.Box2D.Common.Math.b2Mat33 = b;
        Σ.refs.Box2D.Common.Math.b2Math = e;
        Σ.refs.Box2D.Common.Math.b2Sweep = f;
        Σ.refs.Box2D.Common.Math.b2Transform = m;
        Σ.refs.Box2D.Common.Math.b2Vec2 = r;
        Σ.refs.Box2D.Common.Math.b2Vec3 = s;
        Σ.refs.Box2D.Dynamics.b2Body = v;
        Σ.refs.Box2D.Dynamics.b2BodyDef = t;
        Σ.refs.Box2D.Dynamics.b2ContactFilter = x;
        Σ.refs.Box2D.Dynamics.b2ContactImpulse = C;
        Σ.refs.Box2D.Dynamics.b2ContactListener = J;
        Σ.refs.Box2D.Dynamics.b2ContactManager = T;
        Σ.refs.Box2D.Dynamics.b2DebugDraw = P;
        Σ.refs.Box2D.Dynamics.b2DestructionListener = X;
        Σ.refs.Box2D.Dynamics.b2FilterData = $;
        Σ.refs.Box2D.Dynamics.b2Fixture = ba;
        Σ.refs.Box2D.Dynamics.b2FixtureDef = ca;
        Σ.refs.Box2D.Dynamics.b2Island = da;
        Σ.refs.Box2D.Dynamics.b2TimeStep = Fa;
        Σ.refs.Box2D.Dynamics.b2World = ea;
        Σ.refs.Box2D.Dynamics.Contacts.b2CircleContact = Ga;
        Σ.refs.Box2D.Dynamics.Contacts.b2Contact = fa;
        Σ.refs.Box2D.Dynamics.Contacts.b2ContactConstraint = ga;
        Σ.refs.Box2D.Dynamics.Contacts.b2ContactConstraintPoint = Ha;
        Σ.refs.Box2D.Dynamics.Contacts.b2ContactEdge = Ia;
        Σ.refs.Box2D.Dynamics.Contacts.b2ContactFactory = ha;
        Σ.refs.Box2D.Dynamics.Contacts.b2ContactRegister = Ja;
        Σ.refs.Box2D.Dynamics.Contacts.b2ContactResult = Ka;
        Σ.refs.Box2D.Dynamics.Contacts.b2ContactSolver = ia;
        Σ.refs.Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = La;
        Σ.refs.Box2D.Dynamics.Contacts.b2NullContact = ja;
        Σ.refs.Box2D.Dynamics.Contacts.b2PolyAndCircleContact = Ma;
        Σ.refs.Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = Na;
        Σ.refs.Box2D.Dynamics.Contacts.b2PolygonContact = Oa;
        Σ.refs.Box2D.Dynamics.Contacts.b2PositionSolverManifold = ka;
        Σ.refs.Box2D.Dynamics.Controllers.b2BuoyancyController = Pa;
        Σ.refs.Box2D.Dynamics.Controllers.b2ConstantAccelController = Qa;
        Σ.refs.Box2D.Dynamics.Controllers.b2ConstantForceController = Ra;
        Σ.refs.Box2D.Dynamics.Controllers.b2Controller = Sa;
        Σ.refs.Box2D.Dynamics.Controllers.b2ControllerEdge = Ta;
        Σ.refs.Box2D.Dynamics.Controllers.b2GravityController = Ua;
        Σ.refs.Box2D.Dynamics.Controllers.b2TensorDampingController = Va;
        Σ.refs.Box2D.Dynamics.Joints.b2DistanceJoint = la;
        Σ.refs.Box2D.Dynamics.Joints.b2DistanceJointDef = ma;
        Σ.refs.Box2D.Dynamics.Joints.b2FrictionJoint = na;
        Σ.refs.Box2D.Dynamics.Joints.b2FrictionJointDef = oa;
        Σ.refs.Box2D.Dynamics.Joints.b2GearJoint = pa;
        Σ.refs.Box2D.Dynamics.Joints.b2GearJointDef = qa;
        Σ.refs.Box2D.Dynamics.Joints.b2Jacobian = Wa;
        Σ.refs.Box2D.Dynamics.Joints.b2Joint = ra;
        Σ.refs.Box2D.Dynamics.Joints.b2JointDef = sa;
        Σ.refs.Box2D.Dynamics.Joints.b2JointEdge = Xa;
        Σ.refs.Box2D.Dynamics.Joints.b2LineJoint = ta;
        Σ.refs.Box2D.Dynamics.Joints.b2LineJointDef = ua;
        Σ.refs.Box2D.Dynamics.Joints.b2MouseJoint = va;
        Σ.refs.Box2D.Dynamics.Joints.b2MouseJointDef = wa;
        Σ.refs.Box2D.Dynamics.Joints.b2PrismaticJoint = xa;
        Σ.refs.Box2D.Dynamics.Joints.b2PrismaticJointDef = ya;
        Σ.refs.Box2D.Dynamics.Joints.b2PulleyJoint = za;
        Σ.refs.Box2D.Dynamics.Joints.b2PulleyJointDef = Aa;
        Σ.refs.Box2D.Dynamics.Joints.b2RevoluteJoint = Ba;
        Σ.refs.Box2D.Dynamics.Joints.b2RevoluteJointDef = Ca;
        Σ.refs.Box2D.Dynamics.Joints.b2WeldJoint = Da;
        Σ.refs.Box2D.Dynamics.Joints.b2WeldJointDef = Ea;
    }());
    Σ.refs.Box2D.postDefs = [];
    (function α6YGC() {
        var Σ_2 = new Σ.Scope(this, α6YGC, '2', Σ, {}, []);
        Σ_2.refs.F = Σ.refs.Box2D.Collision.Shapes.b2CircleShape, Σ_2.refs.G = Σ.refs.Box2D.Collision.Shapes.b2PolygonShape, Σ_2.refs.K = Σ.refs.Box2D.Collision.Shapes.b2Shape, Σ_2.refs.y = Σ.refs.Box2D.Common.b2Settings, Σ_2.refs.w = Σ.refs.Box2D.Common.Math.b2Math, Σ_2.refs.A = Σ.refs.Box2D.Common.Math.b2Sweep, Σ_2.refs.U = Σ.refs.Box2D.Common.Math.b2Transform, Σ_2.refs.p = Σ.refs.Box2D.Common.Math.b2Vec2, Σ_2.refs.B = Σ.refs.Box2D.Collision.b2AABB, Σ_2.refs.Q = Σ.refs.Box2D.Collision.b2Bound, Σ_2.refs.V = Σ.refs.Box2D.Collision.b2BoundValues, Σ_2.refs.M = Σ.refs.Box2D.Collision.b2Collision, Σ_2.refs.L = Σ.refs.Box2D.Collision.b2ContactID, Σ_2.refs.I = Σ.refs.Box2D.Collision.b2ContactPoint, Σ_2.refs.W = Σ.refs.Box2D.Collision.b2Distance, Σ_2.refs.Y = Σ.refs.Box2D.Collision.b2DistanceInput, Σ_2.refs.k = Σ.refs.Box2D.Collision.b2DistanceOutput, Σ_2.refs.z = Σ.refs.Box2D.Collision.b2DistanceProxy, Σ_2.refs.u = Σ.refs.Box2D.Collision.b2DynamicTree, Σ_2.refs.D = Σ.refs.Box2D.Collision.b2DynamicTreeBroadPhase, Σ_2.refs.H = Σ.refs.Box2D.Collision.b2DynamicTreeNode, Σ_2.refs.O = Σ.refs.Box2D.Collision.b2DynamicTreePair, Σ_2.refs.E = Σ.refs.Box2D.Collision.b2Manifold, Σ_2.refs.R = Σ.refs.Box2D.Collision.b2ManifoldPoint, Σ_2.refs.N = Σ.refs.Box2D.Collision.b2Point, Σ_2.refs.S = Σ.refs.Box2D.Collision.b2RayCastInput, Σ_2.refs.aa = Σ.refs.Box2D.Collision.b2RayCastOutput, Σ_2.refs.Z = Σ.refs.Box2D.Collision.b2Segment, Σ_2.refs.d = Σ.refs.Box2D.Collision.b2SeparationFunction, Σ_2.refs.h = Σ.refs.Box2D.Collision.b2Simplex, Σ_2.refs.l = Σ.refs.Box2D.Collision.b2SimplexCache, Σ_2.refs.j = Σ.refs.Box2D.Collision.b2SimplexVertex, Σ_2.refs.o = Σ.refs.Box2D.Collision.b2TimeOfImpact, Σ_2.refs.q = Σ.refs.Box2D.Collision.b2TOIInput, Σ_2.refs.n = Σ.refs.Box2D.Collision.b2WorldManifold, Σ_2.refs.a = Σ.refs.Box2D.Collision.ClipVertex, Σ_2.refs.c = Σ.refs.Box2D.Collision.Features, Σ_2.refs.g = Σ.refs.Box2D.Collision.IBroadPhase;
        Σ_2.refs.B.b2AABB = Σ_2.addFunction(function αOQ7k() {
            var Σ_2_0 = new Σ.Scope(this, αOQ7k, '0', Σ_2, {}, []);
            this.lowerBound = new Σ_2.refs.p();
            this.upperBound = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.B.prototype.IsValid = Σ_2.addFunction(function αvtLU() {
            var Σ_2_1 = new Σ.Scope(this, αvtLU, '1', Σ_2, {}, []);
            Σ_2_1.refs.b = this.upperBound.y - this.lowerBound.y;
            return Σ_2_1.refs.b = (Σ_2_1.refs.b = this.upperBound.x - this.lowerBound.x >= 0 && Σ_2_1.refs.b >= 0) && this.lowerBound.IsValid() && this.upperBound.IsValid();
        }, Σ_2);
        Σ_2.refs.B.prototype.GetCenter = Σ_2.addFunction(function αw4sU() {
            var Σ_2_2 = new Σ.Scope(this, αw4sU, '2', Σ_2, {}, []);
            return new Σ_2.refs.p((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2);
        }, Σ_2);
        Σ_2.refs.B.prototype.GetExtents = Σ_2.addFunction(function αR2oO() {
            var Σ_2_3 = new Σ.Scope(this, αR2oO, '3', Σ_2, {}, []);
            return new Σ_2.refs.p((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2);
        }, Σ_2);
        Σ_2.refs.B.prototype.Contains = Σ_2.addFunction(function αHmLk(b) {
            var Σ_2_4 = new Σ.Scope(this, αHmLk, '4', Σ_2, {
                b: b
            }, []);
            Σ_2_4.refs.e = true;
            return Σ_2_4.refs.e = (Σ_2_4.refs.e = (Σ_2_4.refs.e = (Σ_2_4.refs.e = Σ_2_4.refs.e && this.lowerBound.x <= Σ_2_4.refs.b.lowerBound.x) && this.lowerBound.y <= Σ_2_4.refs.b.lowerBound.y) && Σ_2_4.refs.b.upperBound.x <= this.upperBound.x) && Σ_2_4.refs.b.upperBound.y <= this.upperBound.y;
        }, Σ_2);
        Σ_2.refs.B.prototype.RayCast = Σ_2.addFunction(function αtCBL(b, e) {
            var Σ_2_5 = new Σ.Scope(this, αtCBL, '5', Σ_2, {
                b: b,
                e: e
            }, []);
            Σ_2_5.refs.f = -Number.MAX_VALUE, Σ_2_5.refs.m = undefined, Σ_2_5.refs.r = Σ_2_5.refs.e.p1.x, Σ_2_5.refs.s = Σ_2_5.refs.e.p1.y, Σ_2_5.refs.v = Σ_2_5.refs.e.p2.x - Σ_2_5.refs.e.p1.x, Σ_2_5.refs.t = Σ_2_5.refs.e.p2.y - Σ_2_5.refs.e.p1.y, Σ_2_5.refs.x = Math.abs(Σ_2_5.refs.t), Σ_2_5.refs.C = Σ_2_5.refs.b.normal, Σ_2_5.refs.J = 0, Σ_2_5.refs.T = 0, Σ_2_5.refs.P = Σ_2_5.refs.J = 0;
            Σ_2_5.refs.P = 0;
            if (Math.abs(Σ_2_5.refs.v) < Number.MIN_VALUE) {
                if (Σ_2_5.refs.r < this.lowerBound.x || this.upperBound.x < Σ_2_5.refs.r) {
                    return false;
                }
            } else {
                Σ_2_5.refs.J = 1 / Σ_2_5.refs.v;
                Σ_2_5.refs.T = (this.lowerBound.x - Σ_2_5.refs.r) * Σ_2_5.refs.J;
                Σ_2_5.refs.J = (this.upperBound.x - Σ_2_5.refs.r) * Σ_2_5.refs.J;
                Σ_2_5.refs.P = -1;
                if (Σ_2_5.refs.T > Σ_2_5.refs.J) {
                    Σ_2_5.refs.P = Σ_2_5.refs.T;
                    Σ_2_5.refs.T = Σ_2_5.refs.J;
                    Σ_2_5.refs.J = Σ_2_5.refs.P;
                    Σ_2_5.refs.P = 1;
                }
                if (Σ_2_5.refs.T > Σ_2_5.refs.f) {
                    Σ_2_5.refs.C.x = Σ_2_5.refs.P;
                    Σ_2_5.refs.C.y = 0;
                    Σ_2_5.refs.f = Σ_2_5.refs.T;
                }
                Σ_2_5.refs.m = Math.min(Σ_2_5.refs.m, Σ_2_5.refs.J);
                if (Σ_2_5.refs.f > Σ_2_5.refs.m) {
                    return false;
                }
            }
            if (Σ_2_5.refs.x < Number.MIN_VALUE) {
                if (Σ_2_5.refs.s < this.lowerBound.y || this.upperBound.y < Σ_2_5.refs.s) {
                    return false;
                }
            } else {
                Σ_2_5.refs.J = 1 / Σ_2_5.refs.t;
                Σ_2_5.refs.T = (this.lowerBound.y - Σ_2_5.refs.s) * Σ_2_5.refs.J;
                Σ_2_5.refs.J = (this.upperBound.y - Σ_2_5.refs.s) * Σ_2_5.refs.J;
                Σ_2_5.refs.P = -1;
                if (Σ_2_5.refs.T > Σ_2_5.refs.J) {
                    Σ_2_5.refs.P = Σ_2_5.refs.T;
                    Σ_2_5.refs.T = Σ_2_5.refs.J;
                    Σ_2_5.refs.J = Σ_2_5.refs.P;
                    Σ_2_5.refs.P = 1;
                }
                if (Σ_2_5.refs.T > Σ_2_5.refs.f) {
                    Σ_2_5.refs.C.y = Σ_2_5.refs.P;
                    Σ_2_5.refs.C.x = 0;
                    Σ_2_5.refs.f = Σ_2_5.refs.T;
                }
                Σ_2_5.refs.m = Math.min(Σ_2_5.refs.m, Σ_2_5.refs.J);
                if (Σ_2_5.refs.f > Σ_2_5.refs.m) {
                    return false;
                }
            }
            Σ_2_5.refs.b.fraction = Σ_2_5.refs.f;
            return true;
        }, Σ_2);
        Σ_2.refs.B.prototype.TestOverlap = Σ_2.addFunction(function αcCyY(b) {
            var Σ_2_6 = new Σ.Scope(this, αcCyY, '6', Σ_2, {
                b: b
            }, []);
            Σ_2_6.refs.e = Σ_2_6.refs.b.lowerBound.y - this.upperBound.y, Σ_2_6.refs.f = this.lowerBound.y - Σ_2_6.refs.b.upperBound.y;
            if (Σ_2_6.refs.b.lowerBound.x - this.upperBound.x > 0 || Σ_2_6.refs.e > 0) {
                return false;
            }
            if (this.lowerBound.x - Σ_2_6.refs.b.upperBound.x > 0 || Σ_2_6.refs.f > 0) {
                return false;
            }
            return true;
        }, Σ_2);
        Σ_2.refs.B.Combine = Σ_2.addFunction(function αw3iT(b, e) {
            var Σ_2_7 = new Σ.Scope(this, αw3iT, '7', Σ_2, {
                b: b,
                e: e
            }, []);
            Σ_2_7.refs.f = new Σ_2.refs.B();
            Σ_2_7.refs.f.Combine(Σ_2_7.refs.b, Σ_2_7.refs.e);
            return Σ_2_7.refs.f;
        }, Σ_2);
        Σ_2.refs.B.prototype.Combine = Σ_2.addFunction(function αWtCu(b, e) {
            var Σ_2_8 = new Σ.Scope(this, αWtCu, '8', Σ_2, {
                b: b,
                e: e
            }, []);
            this.lowerBound.x = Math.min(Σ_2_8.refs.b.lowerBound.x, Σ_2_8.refs.e.lowerBound.x);
            this.lowerBound.y = Math.min(Σ_2_8.refs.b.lowerBound.y, Σ_2_8.refs.e.lowerBound.y);
            this.upperBound.x = Math.max(Σ_2_8.refs.b.upperBound.x, Σ_2_8.refs.e.upperBound.x);
            this.upperBound.y = Math.max(Σ_2_8.refs.b.upperBound.y, Σ_2_8.refs.e.upperBound.y);
        }, Σ_2);
        Σ_2.refs.Q.b2Bound = Σ_2.addFunction(function αMWuN() {
            var Σ_2_9 = new Σ.Scope(this, αMWuN, '9', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.Q.prototype.IsLower = Σ_2.addFunction(function αUf99() {
            var Σ_2_10 = new Σ.Scope(this, αUf99, '10', Σ_2, {}, []);
            return (this.value & 1) == 0;
        }, Σ_2);
        Σ_2.refs.Q.prototype.IsUpper = Σ_2.addFunction(function α9MiW() {
            var Σ_2_11 = new Σ.Scope(this, α9MiW, '11', Σ_2, {}, []);
            return (this.value & 1) == 1;
        }, Σ_2);
        Σ_2.refs.Q.prototype.Swap = Σ_2.addFunction(function αi7LM(b) {
            var Σ_2_12 = new Σ.Scope(this, αi7LM, '12', Σ_2, {
                b: b
            }, []);
            Σ_2_12.refs.e = this.value, Σ_2_12.refs.f = this.proxy, Σ_2_12.refs.m = this.stabbingCount;
            this.value = Σ_2_12.refs.b.value;
            this.proxy = Σ_2_12.refs.b.proxy;
            this.stabbingCount = Σ_2_12.refs.b.stabbingCount;
            Σ_2_12.refs.b.value = Σ_2_12.refs.e;
            Σ_2_12.refs.b.proxy = Σ_2_12.refs.f;
            Σ_2_12.refs.b.stabbingCount = Σ_2_12.refs.m;
        }, Σ_2);
        Σ_2.refs.V.b2BoundValues = Σ_2.addFunction(function αnoq7() {
            var Σ_2_13 = new Σ.Scope(this, αnoq7, '13', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.V.prototype.b2BoundValues = Σ_2.addFunction(function αRaTY() {
            var Σ_2_14 = new Σ.Scope(this, αRaTY, '14', Σ_2, {}, []);
            this.lowerValues = new Σ.refs.Vector_a2j_Number();
            this.lowerValues[0] = 0;
            this.lowerValues[1] = 0;
            this.upperValues = new Σ.refs.Vector_a2j_Number();
            this.upperValues[0] = 0;
            this.upperValues[1] = 0;
        }, Σ_2);
        Σ_2.refs.M.b2Collision = Σ_2.addFunction(function αYmZt() {
            var Σ_2_15 = new Σ.Scope(this, αYmZt, '15', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.M.ClipSegmentToLine = Σ_2.addFunction(function α80Td(b, e, f, m) {
            var Σ_2_16 = new Σ.Scope(this, α80Td, '16', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m
            }, []);
            if (Σ_2_16.refs.m === undefined) {
                Σ_2_16.refs.m = 0;
            }
            Σ_2_16.refs.r = undefined, Σ_2_16.refs.s = 0;
            Σ_2_16.refs.r = Σ_2_16.refs.e[0];
            Σ_2_16.refs.v = Σ_2_16.refs.r.v;
            Σ_2_16.refs.r = Σ_2_16.refs.e[1];
            Σ_2_16.refs.t = Σ_2_16.refs.r.v, Σ_2_16.refs.x = Σ_2_16.refs.f.x * Σ_2_16.refs.v.x + Σ_2_16.refs.f.y * Σ_2_16.refs.v.y - Σ_2_16.refs.m;
            Σ_2_16.refs.r = Σ_2_16.refs.f.x * Σ_2_16.refs.t.x + Σ_2_16.refs.f.y * Σ_2_16.refs.t.y - Σ_2_16.refs.m;
            Σ_2_16.refs.x <= 0 && Σ_2_16.refs.b[Σ_2_16.refs.s++].Set(Σ_2_16.refs.e[0]);
            Σ_2_16.refs.r <= 0 && Σ_2_16.refs.b[Σ_2_16.refs.s++].Set(Σ_2_16.refs.e[1]);
            if (Σ_2_16.refs.x * Σ_2_16.refs.r < 0) {
                Σ_2_16.refs.f = Σ_2_16.refs.x / (Σ_2_16.refs.x - Σ_2_16.refs.r);
                Σ_2_16.refs.r = Σ_2_16.refs.b[Σ_2_16.refs.s];
                Σ_2_16.refs.r = Σ_2_16.refs.r.v;
                Σ_2_16.refs.r.x = Σ_2_16.refs.v.x + Σ_2_16.refs.f * (Σ_2_16.refs.t.x - Σ_2_16.refs.v.x);
                Σ_2_16.refs.r.y = Σ_2_16.refs.v.y + Σ_2_16.refs.f * (Σ_2_16.refs.t.y - Σ_2_16.refs.v.y);
                Σ_2_16.refs.r = Σ_2_16.refs.b[Σ_2_16.refs.s];
                Σ_2_16.refs.r.id = (Σ_2_16.refs.x > 0 ? Σ_2_16.refs.e[0] : Σ_2_16.refs.e[1]).id;
                ++Σ_2_16.refs.s;
            }
            return Σ_2_16.refs.s;
        }, Σ_2);
        Σ_2.refs.M.EdgeSeparation = Σ_2.addFunction(function α3ZlM(b, e, f, m, r) {
            var Σ_2_17 = new Σ.Scope(this, α3ZlM, '17', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r
            }, []);
            if (Σ_2_17.refs.f === undefined) {
                Σ_2_17.refs.f = 0;
            }
            parseInt(Σ_2_17.refs.b.m_vertexCount);
            Σ_2_17.refs.s = Σ_2_17.refs.b.m_vertices;
            Σ_2_17.refs.b = Σ_2_17.refs.b.m_normals;
            Σ_2_17.refs.v = parseInt(Σ_2_17.refs.m.m_vertexCount), Σ_2_17.refs.t = Σ_2_17.refs.m.m_vertices, Σ_2_17.refs.x = undefined, Σ_2_17.refs.C = undefined;
            Σ_2_17.refs.x = Σ_2_17.refs.e.R;
            Σ_2_17.refs.C = Σ_2_17.refs.b[Σ_2_17.refs.f];
            Σ_2_17.refs.b = Σ_2_17.refs.x.col1.x * Σ_2_17.refs.C.x + Σ_2_17.refs.x.col2.x * Σ_2_17.refs.C.y;
            Σ_2_17.refs.m = Σ_2_17.refs.x.col1.y * Σ_2_17.refs.C.x + Σ_2_17.refs.x.col2.y * Σ_2_17.refs.C.y;
            Σ_2_17.refs.x = Σ_2_17.refs.r.R;
            Σ_2_17.refs.J = Σ_2_17.refs.x.col1.x * Σ_2_17.refs.b + Σ_2_17.refs.x.col1.y * Σ_2_17.refs.m;
            Σ_2_17.refs.x = Σ_2_17.refs.x.col2.x * Σ_2_17.refs.b + Σ_2_17.refs.x.col2.y * Σ_2_17.refs.m;
            for (Σ_2_17.refs.T = 0, Σ_2_17.refs.P = undefined, Σ_2_17.refs.X = 0; Σ_2_17.refs.X < Σ_2_17.refs.v; ++Σ_2_17.refs.X) {
                Σ_2_17.refs.C = Σ_2_17.refs.t[Σ_2_17.refs.X];
                Σ_2_17.refs.C = Σ_2_17.refs.C.x * Σ_2_17.refs.J + Σ_2_17.refs.C.y * Σ_2_17.refs.x;
                if (Σ_2_17.refs.C < Σ_2_17.refs.P) {
                    Σ_2_17.refs.P = Σ_2_17.refs.C;
                    Σ_2_17.refs.T = Σ_2_17.refs.X;
                }
            }
            Σ_2_17.refs.C = Σ_2_17.refs.s[Σ_2_17.refs.f];
            Σ_2_17.refs.x = Σ_2_17.refs.e.R;
            Σ_2_17.refs.f = Σ_2_17.refs.e.position.x + (Σ_2_17.refs.x.col1.x * Σ_2_17.refs.C.x + Σ_2_17.refs.x.col2.x * Σ_2_17.refs.C.y);
            Σ_2_17.refs.e = Σ_2_17.refs.e.position.y + (Σ_2_17.refs.x.col1.y * Σ_2_17.refs.C.x + Σ_2_17.refs.x.col2.y * Σ_2_17.refs.C.y);
            Σ_2_17.refs.C = Σ_2_17.refs.t[Σ_2_17.refs.T];
            Σ_2_17.refs.x = Σ_2_17.refs.r.R;
            Σ_2_17.refs.s = Σ_2_17.refs.r.position.x + (Σ_2_17.refs.x.col1.x * Σ_2_17.refs.C.x + Σ_2_17.refs.x.col2.x * Σ_2_17.refs.C.y);
            Σ_2_17.refs.r = Σ_2_17.refs.r.position.y + (Σ_2_17.refs.x.col1.y * Σ_2_17.refs.C.x + Σ_2_17.refs.x.col2.y * Σ_2_17.refs.C.y);
            Σ_2_17.refs.s -= Σ_2_17.refs.f;
            Σ_2_17.refs.r -= Σ_2_17.refs.e;
            return Σ_2_17.refs.s * Σ_2_17.refs.b + Σ_2_17.refs.r * Σ_2_17.refs.m;
        }, Σ_2);
        Σ_2.refs.M.FindMaxSeparation = Σ_2.addFunction(function α1TIV(b, e, f, m, r) {
            var Σ_2_18 = new Σ.Scope(this, α1TIV, '18', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r
            }, []);
            Σ_2_18.refs.s = parseInt(Σ_2_18.refs.e.m_vertexCount), Σ_2_18.refs.v = Σ_2_18.refs.e.m_normals, Σ_2_18.refs.t = undefined, Σ_2_18.refs.x = undefined;
            Σ_2_18.refs.x = Σ_2_18.refs.r.R;
            Σ_2_18.refs.t = Σ_2_18.refs.m.m_centroid;
            Σ_2_18.refs.C = Σ_2_18.refs.r.position.x + (Σ_2_18.refs.x.col1.x * Σ_2_18.refs.t.x + Σ_2_18.refs.x.col2.x * Σ_2_18.refs.t.y), Σ_2_18.refs.J = Σ_2_18.refs.r.position.y + (Σ_2_18.refs.x.col1.y * Σ_2_18.refs.t.x + Σ_2_18.refs.x.col2.y * Σ_2_18.refs.t.y);
            Σ_2_18.refs.x = Σ_2_18.refs.f.R;
            Σ_2_18.refs.t = Σ_2_18.refs.e.m_centroid;
            Σ_2_18.refs.C -= Σ_2_18.refs.f.position.x + (Σ_2_18.refs.x.col1.x * Σ_2_18.refs.t.x + Σ_2_18.refs.x.col2.x * Σ_2_18.refs.t.y);
            Σ_2_18.refs.J -= Σ_2_18.refs.f.position.y + (Σ_2_18.refs.x.col1.y * Σ_2_18.refs.t.x + Σ_2_18.refs.x.col2.y * Σ_2_18.refs.t.y);
            Σ_2_18.refs.x = Σ_2_18.refs.C * Σ_2_18.refs.f.R.col1.x + Σ_2_18.refs.J * Σ_2_18.refs.f.R.col1.y;
            Σ_2_18.refs.J = Σ_2_18.refs.C * Σ_2_18.refs.f.R.col2.x + Σ_2_18.refs.J * Σ_2_18.refs.f.R.col2.y;
            Σ_2_18.refs.C = 0;
            for (Σ_2_18.refs.T = -Number.MAX_VALUE, Σ_2_18.refs.P = 0; Σ_2_18.refs.P < Σ_2_18.refs.s; ++Σ_2_18.refs.P) {
                Σ_2_18.refs.t = Σ_2_18.refs.v[Σ_2_18.refs.P];
                Σ_2_18.refs.t = Σ_2_18.refs.t.x * Σ_2_18.refs.x + Σ_2_18.refs.t.y * Σ_2_18.refs.J;
                if (Σ_2_18.refs.t > Σ_2_18.refs.T) {
                    Σ_2_18.refs.T = Σ_2_18.refs.t;
                    Σ_2_18.refs.C = Σ_2_18.refs.P;
                }
            }
            Σ_2_18.refs.v = Σ_2.refs.M.EdgeSeparation(Σ_2_18.refs.e, Σ_2_18.refs.f, Σ_2_18.refs.C, Σ_2_18.refs.m, Σ_2_18.refs.r);
            Σ_2_18.refs.t = parseInt(Σ_2_18.refs.C - 1 >= 0 ? Σ_2_18.refs.C - 1 : Σ_2_18.refs.s - 1);
            Σ_2_18.refs.x = Σ_2.refs.M.EdgeSeparation(Σ_2_18.refs.e, Σ_2_18.refs.f, Σ_2_18.refs.t, Σ_2_18.refs.m, Σ_2_18.refs.r);
            Σ_2_18.refs.J = parseInt(Σ_2_18.refs.C + 1 < Σ_2_18.refs.s ? Σ_2_18.refs.C + 1 : 0);
            Σ_2_18.refs.T = Σ_2.refs.M.EdgeSeparation(Σ_2_18.refs.e, Σ_2_18.refs.f, Σ_2_18.refs.J, Σ_2_18.refs.m, Σ_2_18.refs.r);
            Σ_2_18.refs.X = Σ_2_18.refs.P = 0, Σ_2_18.refs.$ = 0;
            if (Σ_2_18.refs.x > Σ_2_18.refs.v && Σ_2_18.refs.x > Σ_2_18.refs.T) {
                Σ_2_18.refs.$ = -1;
                Σ_2_18.refs.P = Σ_2_18.refs.t;
                Σ_2_18.refs.X = Σ_2_18.refs.x;
            } else if (Σ_2_18.refs.T > Σ_2_18.refs.v) {
                Σ_2_18.refs.$ = 1;
                Σ_2_18.refs.P = Σ_2_18.refs.J;
                Σ_2_18.refs.X = Σ_2_18.refs.T;
            } else {
                Σ_2_18.refs.b[0] = Σ_2_18.refs.C;
                return Σ_2_18.refs.v;
            }
            for (;;) {
                Σ_2_18.refs.C = Σ_2_18.refs.$ == -1 ? Σ_2_18.refs.P - 1 >= 0 ? Σ_2_18.refs.P - 1 : Σ_2_18.refs.s - 1 : Σ_2_18.refs.P + 1 < Σ_2_18.refs.s ? Σ_2_18.refs.P + 1 : 0;
                Σ_2_18.refs.v = Σ_2.refs.M.EdgeSeparation(Σ_2_18.refs.e, Σ_2_18.refs.f, Σ_2_18.refs.C, Σ_2_18.refs.m, Σ_2_18.refs.r);
                if (Σ_2_18.refs.v > Σ_2_18.refs.X) {
                    Σ_2_18.refs.P = Σ_2_18.refs.C;
                    Σ_2_18.refs.X = Σ_2_18.refs.v;
                } else {
                    break;
                }
            }
            Σ_2_18.refs.b[0] = Σ_2_18.refs.P;
            return Σ_2_18.refs.X;
        }, Σ_2);
        Σ_2.refs.M.FindIncidentEdge = Σ_2.addFunction(function αNzQ4(b, e, f, m, r, s) {
            var Σ_2_19 = new Σ.Scope(this, αNzQ4, '19', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r,
                s: s
            }, []);
            if (Σ_2_19.refs.m === undefined) {
                Σ_2_19.refs.m = 0;
            }
            parseInt(Σ_2_19.refs.e.m_vertexCount);
            Σ_2_19.refs.v = Σ_2_19.refs.e.m_normals, Σ_2_19.refs.t = parseInt(Σ_2_19.refs.r.m_vertexCount);
            Σ_2_19.refs.e = Σ_2_19.refs.r.m_vertices;
            Σ_2_19.refs.r = Σ_2_19.refs.r.m_normals;
            Σ_2_19.refs.x = undefined;
            Σ_2_19.refs.x = Σ_2_19.refs.f.R;
            Σ_2_19.refs.f = Σ_2_19.refs.v[Σ_2_19.refs.m];
            Σ_2_19.refs.v = Σ_2_19.refs.x.col1.x * Σ_2_19.refs.f.x + Σ_2_19.refs.x.col2.x * Σ_2_19.refs.f.y;
            Σ_2_19.refs.C = Σ_2_19.refs.x.col1.y * Σ_2_19.refs.f.x + Σ_2_19.refs.x.col2.y * Σ_2_19.refs.f.y;
            Σ_2_19.refs.x = Σ_2_19.refs.s.R;
            Σ_2_19.refs.f = Σ_2_19.refs.x.col1.x * Σ_2_19.refs.v + Σ_2_19.refs.x.col1.y * Σ_2_19.refs.C;
            Σ_2_19.refs.C = Σ_2_19.refs.x.col2.x * Σ_2_19.refs.v + Σ_2_19.refs.x.col2.y * Σ_2_19.refs.C;
            Σ_2_19.refs.v = Σ_2_19.refs.f;
            Σ_2_19.refs.x = 0;
            for (Σ_2_19.refs.J = undefined, Σ_2_19.refs.T = 0; Σ_2_19.refs.T < Σ_2_19.refs.t; ++Σ_2_19.refs.T) {
                Σ_2_19.refs.f = Σ_2_19.refs.r[Σ_2_19.refs.T];
                Σ_2_19.refs.f = Σ_2_19.refs.v * Σ_2_19.refs.f.x + Σ_2_19.refs.C * Σ_2_19.refs.f.y;
                if (Σ_2_19.refs.f < Σ_2_19.refs.J) {
                    Σ_2_19.refs.J = Σ_2_19.refs.f;
                    Σ_2_19.refs.x = Σ_2_19.refs.T;
                }
            }
            Σ_2_19.refs.r = parseInt(Σ_2_19.refs.x);
            Σ_2_19.refs.v = parseInt(Σ_2_19.refs.r + 1 < Σ_2_19.refs.t ? Σ_2_19.refs.r + 1 : 0);
            Σ_2_19.refs.t = Σ_2_19.refs.b[0];
            Σ_2_19.refs.f = Σ_2_19.refs.e[Σ_2_19.refs.r];
            Σ_2_19.refs.x = Σ_2_19.refs.s.R;
            Σ_2_19.refs.t.v.x = Σ_2_19.refs.s.position.x + (Σ_2_19.refs.x.col1.x * Σ_2_19.refs.f.x + Σ_2_19.refs.x.col2.x * Σ_2_19.refs.f.y);
            Σ_2_19.refs.t.v.y = Σ_2_19.refs.s.position.y + (Σ_2_19.refs.x.col1.y * Σ_2_19.refs.f.x + Σ_2_19.refs.x.col2.y * Σ_2_19.refs.f.y);
            Σ_2_19.refs.t.id.features.referenceEdge = Σ_2_19.refs.m;
            Σ_2_19.refs.t.id.features.incidentEdge = Σ_2_19.refs.r;
            Σ_2_19.refs.t.id.features.incidentVertex = 0;
            Σ_2_19.refs.t = Σ_2_19.refs.b[1];
            Σ_2_19.refs.f = Σ_2_19.refs.e[Σ_2_19.refs.v];
            Σ_2_19.refs.x = Σ_2_19.refs.s.R;
            Σ_2_19.refs.t.v.x = Σ_2_19.refs.s.position.x + (Σ_2_19.refs.x.col1.x * Σ_2_19.refs.f.x + Σ_2_19.refs.x.col2.x * Σ_2_19.refs.f.y);
            Σ_2_19.refs.t.v.y = Σ_2_19.refs.s.position.y + (Σ_2_19.refs.x.col1.y * Σ_2_19.refs.f.x + Σ_2_19.refs.x.col2.y * Σ_2_19.refs.f.y);
            Σ_2_19.refs.t.id.features.referenceEdge = Σ_2_19.refs.m;
            Σ_2_19.refs.t.id.features.incidentEdge = Σ_2_19.refs.v;
            Σ_2_19.refs.t.id.features.incidentVertex = 1;
        }, Σ_2);
        Σ_2.refs.M.MakeClipPointVector = Σ_2.addFunction(function αNCyQ() {
            var Σ_2_20 = new Σ.Scope(this, αNCyQ, '20', Σ_2, {}, []);
            Σ_2_20.refs.b = new Σ.refs.Vector(2);
            Σ_2_20.refs.b[0] = new Σ_2.refs.a();
            Σ_2_20.refs.b[1] = new Σ_2.refs.a();
            return Σ_2_20.refs.b;
        }, Σ_2);
        Σ_2.refs.M.CollidePolygons = Σ_2.addFunction(function αrgHM(b, e, f, m, r) {
            var Σ_2_21 = new Σ.Scope(this, αrgHM, '21', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r
            }, []);
            Σ_2_21.refs.s = undefined;
            Σ_2_21.refs.b.m_pointCount = 0;
            Σ_2_21.refs.v = Σ_2_21.refs.e.m_radius + Σ_2_21.refs.m.m_radius;
            Σ_2_21.refs.s = 0;
            Σ_2.refs.M.s_edgeAO[0] = Σ_2_21.refs.s;
            Σ_2_21.refs.t = Σ_2.refs.M.FindMaxSeparation(Σ_2.refs.M.s_edgeAO, Σ_2_21.refs.e, Σ_2_21.refs.f, Σ_2_21.refs.m, Σ_2_21.refs.r);
            Σ_2_21.refs.s = Σ_2.refs.M.s_edgeAO[0];
            if (!(Σ_2_21.refs.t > Σ_2_21.refs.v)) {
                Σ_2_21.refs.x = 0;
                Σ_2.refs.M.s_edgeBO[0] = Σ_2_21.refs.x;
                Σ_2_21.refs.C = Σ_2.refs.M.FindMaxSeparation(Σ_2.refs.M.s_edgeBO, Σ_2_21.refs.m, Σ_2_21.refs.r, Σ_2_21.refs.e, Σ_2_21.refs.f);
                Σ_2_21.refs.x = Σ_2.refs.M.s_edgeBO[0];
                if (!(Σ_2_21.refs.C > Σ_2_21.refs.v)) {
                    Σ_2_21.refs.J = 0, Σ_2_21.refs.T = 0;
                    if (Σ_2_21.refs.C > 0.98 * Σ_2_21.refs.t + 0.001) {
                        Σ_2_21.refs.t = Σ_2_21.refs.m;
                        Σ_2_21.refs.m = Σ_2_21.refs.e;
                        Σ_2_21.refs.e = Σ_2_21.refs.r;
                        Σ_2_21.refs.f = Σ_2_21.refs.f;
                        Σ_2_21.refs.J = Σ_2_21.refs.x;
                        Σ_2_21.refs.b.m_type = Σ_2.refs.E.e_faceB;
                        Σ_2_21.refs.T = 1;
                    } else {
                        Σ_2_21.refs.t = Σ_2_21.refs.e;
                        Σ_2_21.refs.m = Σ_2_21.refs.m;
                        Σ_2_21.refs.e = Σ_2_21.refs.f;
                        Σ_2_21.refs.f = Σ_2_21.refs.r;
                        Σ_2_21.refs.J = Σ_2_21.refs.s;
                        Σ_2_21.refs.b.m_type = Σ_2.refs.E.e_faceA;
                        Σ_2_21.refs.T = 0;
                    }
                    Σ_2_21.refs.s = Σ_2.refs.M.s_incidentEdge;
                    Σ_2.refs.M.FindIncidentEdge(Σ_2_21.refs.s, Σ_2_21.refs.t, Σ_2_21.refs.e, Σ_2_21.refs.J, Σ_2_21.refs.m, Σ_2_21.refs.f);
                    Σ_2_21.refs.x = parseInt(Σ_2_21.refs.t.m_vertexCount);
                    Σ_2_21.refs.r = Σ_2_21.refs.t.m_vertices;
                    Σ_2_21.refs.t = Σ_2_21.refs.r[Σ_2_21.refs.J];
                    Σ_2_21.refs.P = undefined;
                    Σ_2_21.refs.P = Σ_2_21.refs.J + 1 < Σ_2_21.refs.x ? Σ_2_21.refs.r[parseInt(Σ_2_21.refs.J + 1)] : Σ_2_21.refs.r[0];
                    Σ_2_21.refs.J = Σ_2.refs.M.s_localTangent;
                    Σ_2_21.refs.J.Set(Σ_2_21.refs.P.x - Σ_2_21.refs.t.x, Σ_2_21.refs.P.y - Σ_2_21.refs.t.y);
                    Σ_2_21.refs.J.Normalize();
                    Σ_2_21.refs.r = Σ_2.refs.M.s_localNormal;
                    Σ_2_21.refs.r.x = Σ_2_21.refs.J.y;
                    Σ_2_21.refs.r.y = -Σ_2_21.refs.J.x;
                    Σ_2_21.refs.m = Σ_2.refs.M.s_planePoint;
                    Σ_2_21.refs.m.Set(0.5 * (Σ_2_21.refs.t.x + Σ_2_21.refs.P.x), 0.5 * (Σ_2_21.refs.t.y + Σ_2_21.refs.P.y));
                    Σ_2_21.refs.C = Σ_2.refs.M.s_tangent;
                    Σ_2_21.refs.x = Σ_2_21.refs.e.R;
                    Σ_2_21.refs.C.x = Σ_2_21.refs.x.col1.x * Σ_2_21.refs.J.x + Σ_2_21.refs.x.col2.x * Σ_2_21.refs.J.y;
                    Σ_2_21.refs.C.y = Σ_2_21.refs.x.col1.y * Σ_2_21.refs.J.x + Σ_2_21.refs.x.col2.y * Σ_2_21.refs.J.y;
                    Σ_2_21.refs.X = Σ_2.refs.M.s_tangent2;
                    Σ_2_21.refs.X.x = -Σ_2_21.refs.C.x;
                    Σ_2_21.refs.X.y = -Σ_2_21.refs.C.y;
                    Σ_2_21.refs.J = Σ_2.refs.M.s_normal;
                    Σ_2_21.refs.J.x = Σ_2_21.refs.C.y;
                    Σ_2_21.refs.J.y = -Σ_2_21.refs.C.x;
                    Σ_2_21.refs.$ = Σ_2.refs.M.s_v11, Σ_2_21.refs.ba = Σ_2.refs.M.s_v12;
                    Σ_2_21.refs.$.x = Σ_2_21.refs.e.position.x + (Σ_2_21.refs.x.col1.x * Σ_2_21.refs.t.x + Σ_2_21.refs.x.col2.x * Σ_2_21.refs.t.y);
                    Σ_2_21.refs.$.y = Σ_2_21.refs.e.position.y + (Σ_2_21.refs.x.col1.y * Σ_2_21.refs.t.x + Σ_2_21.refs.x.col2.y * Σ_2_21.refs.t.y);
                    Σ_2_21.refs.ba.x = Σ_2_21.refs.e.position.x + (Σ_2_21.refs.x.col1.x * Σ_2_21.refs.P.x + Σ_2_21.refs.x.col2.x * Σ_2_21.refs.P.y);
                    Σ_2_21.refs.ba.y = Σ_2_21.refs.e.position.y + (Σ_2_21.refs.x.col1.y * Σ_2_21.refs.P.x + Σ_2_21.refs.x.col2.y * Σ_2_21.refs.P.y);
                    Σ_2_21.refs.e = Σ_2_21.refs.J.x * Σ_2_21.refs.$.x + Σ_2_21.refs.J.y * Σ_2_21.refs.$.y;
                    Σ_2_21.refs.x = Σ_2_21.refs.C.x * Σ_2_21.refs.ba.x + Σ_2_21.refs.C.y * Σ_2_21.refs.ba.y + Σ_2_21.refs.v;
                    Σ_2_21.refs.P = Σ_2.refs.M.s_clipPoints1;
                    Σ_2_21.refs.t = Σ_2.refs.M.s_clipPoints2;
                    Σ_2_21.refs.ba = 0;
                    Σ_2_21.refs.ba = Σ_2.refs.M.ClipSegmentToLine(Σ_2_21.refs.P, Σ_2_21.refs.s, Σ_2_21.refs.X, -Σ_2_21.refs.C.x * Σ_2_21.refs.$.x - Σ_2_21.refs.C.y * Σ_2_21.refs.$.y + Σ_2_21.refs.v);
                    if (!(Σ_2_21.refs.ba < 2)) {
                        Σ_2_21.refs.ba = Σ_2.refs.M.ClipSegmentToLine(Σ_2_21.refs.t, Σ_2_21.refs.P, Σ_2_21.refs.C, Σ_2_21.refs.x);
                        if (!(Σ_2_21.refs.ba < 2)) {
                            Σ_2_21.refs.b.m_localPlaneNormal.SetV(Σ_2_21.refs.r);
                            Σ_2_21.refs.b.m_localPoint.SetV(Σ_2_21.refs.m);
                            for (Σ_2_21.refs.m = Σ_2_21.refs.r = 0; Σ_2_21.refs.m < Σ_2.refs.y.b2_maxManifoldPoints; ++Σ_2_21.refs.m) {
                                Σ_2_21.refs.s = Σ_2_21.refs.t[Σ_2_21.refs.m];
                                if (Σ_2_21.refs.J.x * Σ_2_21.refs.s.v.x + Σ_2_21.refs.J.y * Σ_2_21.refs.s.v.y - Σ_2_21.refs.e <= Σ_2_21.refs.v) {
                                    Σ_2_21.refs.C = Σ_2_21.refs.b.m_points[Σ_2_21.refs.r];
                                    Σ_2_21.refs.x = Σ_2_21.refs.f.R;
                                    Σ_2_21.refs.X = Σ_2_21.refs.s.v.x - Σ_2_21.refs.f.position.x;
                                    Σ_2_21.refs.$ = Σ_2_21.refs.s.v.y - Σ_2_21.refs.f.position.y;
                                    Σ_2_21.refs.C.m_localPoint.x = Σ_2_21.refs.X * Σ_2_21.refs.x.col1.x + Σ_2_21.refs.$ * Σ_2_21.refs.x.col1.y;
                                    Σ_2_21.refs.C.m_localPoint.y = Σ_2_21.refs.X * Σ_2_21.refs.x.col2.x + Σ_2_21.refs.$ * Σ_2_21.refs.x.col2.y;
                                    Σ_2_21.refs.C.m_id.Set(Σ_2_21.refs.s.id);
                                    Σ_2_21.refs.C.m_id.features.flip = Σ_2_21.refs.T;
                                    ++Σ_2_21.refs.r;
                                }
                            }
                            Σ_2_21.refs.b.m_pointCount = Σ_2_21.refs.r;
                        }
                    }
                }
            }
        }, Σ_2);
        Σ_2.refs.M.CollideCircles = Σ_2.addFunction(function αmOD3(b, e, f, m, r) {
            var Σ_2_22 = new Σ.Scope(this, αmOD3, '22', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r
            }, []);
            Σ_2_22.refs.b.m_pointCount = 0;
            Σ_2_22.refs.s = undefined, Σ_2_22.refs.v = undefined;
            Σ_2_22.refs.s = Σ_2_22.refs.f.R;
            Σ_2_22.refs.v = Σ_2_22.refs.e.m_p;
            Σ_2_22.refs.t = Σ_2_22.refs.f.position.x + (Σ_2_22.refs.s.col1.x * Σ_2_22.refs.v.x + Σ_2_22.refs.s.col2.x * Σ_2_22.refs.v.y);
            Σ_2_22.refs.f = Σ_2_22.refs.f.position.y + (Σ_2_22.refs.s.col1.y * Σ_2_22.refs.v.x + Σ_2_22.refs.s.col2.y * Σ_2_22.refs.v.y);
            Σ_2_22.refs.s = Σ_2_22.refs.r.R;
            Σ_2_22.refs.v = Σ_2_22.refs.m.m_p;
            Σ_2_22.refs.t = Σ_2_22.refs.r.position.x + (Σ_2_22.refs.s.col1.x * Σ_2_22.refs.v.x + Σ_2_22.refs.s.col2.x * Σ_2_22.refs.v.y) - Σ_2_22.refs.t;
            Σ_2_22.refs.r = Σ_2_22.refs.r.position.y + (Σ_2_22.refs.s.col1.y * Σ_2_22.refs.v.x + Σ_2_22.refs.s.col2.y * Σ_2_22.refs.v.y) - Σ_2_22.refs.f;
            Σ_2_22.refs.s = Σ_2_22.refs.e.m_radius + Σ_2_22.refs.m.m_radius;
            if (!(Σ_2_22.refs.t * Σ_2_22.refs.t + Σ_2_22.refs.r * Σ_2_22.refs.r > Σ_2_22.refs.s * Σ_2_22.refs.s)) {
                Σ_2_22.refs.b.m_type = Σ_2.refs.E.e_circles;
                Σ_2_22.refs.b.m_localPoint.SetV(Σ_2_22.refs.e.m_p);
                Σ_2_22.refs.b.m_localPlaneNormal.SetZero();
                Σ_2_22.refs.b.m_pointCount = 1;
                Σ_2_22.refs.b.m_points[0].m_localPoint.SetV(Σ_2_22.refs.m.m_p);
                Σ_2_22.refs.b.m_points[0].m_id.key = 0;
            }
        }, Σ_2);
        Σ_2.refs.M.CollidePolygonAndCircle = Σ_2.addFunction(function αI49V(b, e, f, m, r) {
            var Σ_2_23 = new Σ.Scope(this, αI49V, '23', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r
            }, []);
            Σ_2_23.refs.s = Σ_2_23.refs.b.m_pointCount = 0, Σ_2_23.refs.v = 0, Σ_2_23.refs.t = undefined, Σ_2_23.refs.x = undefined;
            Σ_2_23.refs.x = Σ_2_23.refs.r.R;
            Σ_2_23.refs.t = Σ_2_23.refs.m.m_p;
            Σ_2_23.refs.C = Σ_2_23.refs.r.position.y + (Σ_2_23.refs.x.col1.y * Σ_2_23.refs.t.x + Σ_2_23.refs.x.col2.y * Σ_2_23.refs.t.y);
            Σ_2_23.refs.s = Σ_2_23.refs.r.position.x + (Σ_2_23.refs.x.col1.x * Σ_2_23.refs.t.x + Σ_2_23.refs.x.col2.x * Σ_2_23.refs.t.y) - Σ_2_23.refs.f.position.x;
            Σ_2_23.refs.v = Σ_2_23.refs.C - Σ_2_23.refs.f.position.y;
            Σ_2_23.refs.x = Σ_2_23.refs.f.R;
            Σ_2_23.refs.f = Σ_2_23.refs.s * Σ_2_23.refs.x.col1.x + Σ_2_23.refs.v * Σ_2_23.refs.x.col1.y;
            Σ_2_23.refs.x = Σ_2_23.refs.s * Σ_2_23.refs.x.col2.x + Σ_2_23.refs.v * Σ_2_23.refs.x.col2.y;
            Σ_2_23.refs.J = 0;
            Σ_2_23.refs.C = -Number.MAX_VALUE;
            Σ_2_23.refs.r = Σ_2_23.refs.e.m_radius + Σ_2_23.refs.m.m_radius;
            Σ_2_23.refs.T = parseInt(Σ_2_23.refs.e.m_vertexCount), Σ_2_23.refs.P = Σ_2_23.refs.e.m_vertices;
            Σ_2_23.refs.e = Σ_2_23.refs.e.m_normals;
            for (Σ_2_23.refs.X = 0; Σ_2_23.refs.X < Σ_2_23.refs.T; ++Σ_2_23.refs.X) {
                Σ_2_23.refs.t = Σ_2_23.refs.P[Σ_2_23.refs.X];
                Σ_2_23.refs.s = Σ_2_23.refs.f - Σ_2_23.refs.t.x;
                Σ_2_23.refs.v = Σ_2_23.refs.x - Σ_2_23.refs.t.y;
                Σ_2_23.refs.t = Σ_2_23.refs.e[Σ_2_23.refs.X];
                Σ_2_23.refs.s = Σ_2_23.refs.t.x * Σ_2_23.refs.s + Σ_2_23.refs.t.y * Σ_2_23.refs.v;
                if (Σ_2_23.refs.s > Σ_2_23.refs.r) {
                    return;
                }
                if (Σ_2_23.refs.s > Σ_2_23.refs.C) {
                    Σ_2_23.refs.C = Σ_2_23.refs.s;
                    Σ_2_23.refs.J = Σ_2_23.refs.X;
                }
            }
            Σ_2_23.refs.s = parseInt(Σ_2_23.refs.J);
            Σ_2_23.refs.v = parseInt(Σ_2_23.refs.s + 1 < Σ_2_23.refs.T ? Σ_2_23.refs.s + 1 : 0);
            Σ_2_23.refs.t = Σ_2_23.refs.P[Σ_2_23.refs.s];
            Σ_2_23.refs.P = Σ_2_23.refs.P[Σ_2_23.refs.v];
            if (Σ_2_23.refs.C < Number.MIN_VALUE) {
                Σ_2_23.refs.b.m_pointCount = 1;
                Σ_2_23.refs.b.m_type = Σ_2.refs.E.e_faceA;
                Σ_2_23.refs.b.m_localPlaneNormal.SetV(Σ_2_23.refs.e[Σ_2_23.refs.J]);
                Σ_2_23.refs.b.m_localPoint.x = 0.5 * (Σ_2_23.refs.t.x + Σ_2_23.refs.P.x);
                Σ_2_23.refs.b.m_localPoint.y = 0.5 * (Σ_2_23.refs.t.y + Σ_2_23.refs.P.y);
            } else {
                Σ_2_23.refs.C = (Σ_2_23.refs.f - Σ_2_23.refs.P.x) * (Σ_2_23.refs.t.x - Σ_2_23.refs.P.x) + (Σ_2_23.refs.x - Σ_2_23.refs.P.y) * (Σ_2_23.refs.t.y - Σ_2_23.refs.P.y);
                if ((Σ_2_23.refs.f - Σ_2_23.refs.t.x) * (Σ_2_23.refs.P.x - Σ_2_23.refs.t.x) + (Σ_2_23.refs.x - Σ_2_23.refs.t.y) * (Σ_2_23.refs.P.y - Σ_2_23.refs.t.y) <= 0) {
                    if ((Σ_2_23.refs.f - Σ_2_23.refs.t.x) * (Σ_2_23.refs.f - Σ_2_23.refs.t.x) + (Σ_2_23.refs.x - Σ_2_23.refs.t.y) * (Σ_2_23.refs.x - Σ_2_23.refs.t.y) > Σ_2_23.refs.r * Σ_2_23.refs.r) {
                        return;
                    }
                    Σ_2_23.refs.b.m_pointCount = 1;
                    Σ_2_23.refs.b.m_type = Σ_2.refs.E.e_faceA;
                    Σ_2_23.refs.b.m_localPlaneNormal.x = Σ_2_23.refs.f - Σ_2_23.refs.t.x;
                    Σ_2_23.refs.b.m_localPlaneNormal.y = Σ_2_23.refs.x - Σ_2_23.refs.t.y;
                    Σ_2_23.refs.b.m_localPlaneNormal.Normalize();
                    Σ_2_23.refs.b.m_localPoint.SetV(Σ_2_23.refs.t);
                } else if (Σ_2_23.refs.C <= 0) {
                    if ((Σ_2_23.refs.f - Σ_2_23.refs.P.x) * (Σ_2_23.refs.f - Σ_2_23.refs.P.x) + (Σ_2_23.refs.x - Σ_2_23.refs.P.y) * (Σ_2_23.refs.x - Σ_2_23.refs.P.y) > Σ_2_23.refs.r * Σ_2_23.refs.r) {
                        return;
                    }
                    Σ_2_23.refs.b.m_pointCount = 1;
                    Σ_2_23.refs.b.m_type = Σ_2.refs.E.e_faceA;
                    Σ_2_23.refs.b.m_localPlaneNormal.x = Σ_2_23.refs.f - Σ_2_23.refs.P.x;
                    Σ_2_23.refs.b.m_localPlaneNormal.y = Σ_2_23.refs.x - Σ_2_23.refs.P.y;
                    Σ_2_23.refs.b.m_localPlaneNormal.Normalize();
                    Σ_2_23.refs.b.m_localPoint.SetV(Σ_2_23.refs.P);
                } else {
                    Σ_2_23.refs.J = 0.5 * (Σ_2_23.refs.t.x + Σ_2_23.refs.P.x);
                    Σ_2_23.refs.t = 0.5 * (Σ_2_23.refs.t.y + Σ_2_23.refs.P.y);
                    Σ_2_23.refs.C = (Σ_2_23.refs.f - Σ_2_23.refs.J) * Σ_2_23.refs.e[Σ_2_23.refs.s].x + (Σ_2_23.refs.x - Σ_2_23.refs.t) * Σ_2_23.refs.e[Σ_2_23.refs.s].y;
                    if (Σ_2_23.refs.C > Σ_2_23.refs.r) {
                        return;
                    }
                    Σ_2_23.refs.b.m_pointCount = 1;
                    Σ_2_23.refs.b.m_type = Σ_2.refs.E.e_faceA;
                    Σ_2_23.refs.b.m_localPlaneNormal.x = Σ_2_23.refs.e[Σ_2_23.refs.s].x;
                    Σ_2_23.refs.b.m_localPlaneNormal.y = Σ_2_23.refs.e[Σ_2_23.refs.s].y;
                    Σ_2_23.refs.b.m_localPlaneNormal.Normalize();
                    Σ_2_23.refs.b.m_localPoint.Set(Σ_2_23.refs.J, Σ_2_23.refs.t);
                }
            }
            Σ_2_23.refs.b.m_points[0].m_localPoint.SetV(Σ_2_23.refs.m.m_p);
            Σ_2_23.refs.b.m_points[0].m_id.key = 0;
        }, Σ_2);
        Σ_2.refs.M.TestOverlap = Σ_2.addFunction(function αqygt(b, e) {
            var Σ_2_24 = new Σ.Scope(this, αqygt, '24', Σ_2, {
                b: b,
                e: e
            }, []);
            Σ_2_24.refs.f = Σ_2_24.refs.e.lowerBound, Σ_2_24.refs.m = Σ_2_24.refs.b.upperBound, Σ_2_24.refs.r = Σ_2_24.refs.f.x - Σ_2_24.refs.m.x, Σ_2_24.refs.s = Σ_2_24.refs.f.y - Σ_2_24.refs.m.y;
            Σ_2_24.refs.f = Σ_2_24.refs.b.lowerBound;
            Σ_2_24.refs.m = Σ_2_24.refs.e.upperBound;
            Σ_2_24.refs.v = Σ_2_24.refs.f.y - Σ_2_24.refs.m.y;
            if (Σ_2_24.refs.r > 0 || Σ_2_24.refs.s > 0) {
                return false;
            }
            if (Σ_2_24.refs.f.x - Σ_2_24.refs.m.x > 0 || Σ_2_24.refs.v > 0) {
                return false;
            }
            return true;
        }, Σ_2);
        Σ.refs.Box2D.postDefs.push(Σ_2.addFunction(function α90b8() {
            var Σ_2_25 = new Σ.Scope(this, α90b8, '25', Σ_2, {}, []);
            Σ.refs.Box2D.Collision.b2Collision.s_incidentEdge = Σ_2.refs.M.MakeClipPointVector();
            Σ.refs.Box2D.Collision.b2Collision.s_clipPoints1 = Σ_2.refs.M.MakeClipPointVector();
            Σ.refs.Box2D.Collision.b2Collision.s_clipPoints2 = Σ_2.refs.M.MakeClipPointVector();
            Σ.refs.Box2D.Collision.b2Collision.s_edgeAO = new Σ.refs.Vector_a2j_Number(1);
            Σ.refs.Box2D.Collision.b2Collision.s_edgeBO = new Σ.refs.Vector_a2j_Number(1);
            Σ.refs.Box2D.Collision.b2Collision.s_localTangent = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.s_localNormal = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.s_planePoint = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.s_normal = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.s_tangent = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.s_tangent2 = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.s_v11 = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.s_v12 = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.b2CollidePolyTempVec = new Σ_2.refs.p();
            Σ.refs.Box2D.Collision.b2Collision.b2_nullFeature = 255;
        }, Σ_2));
        Σ_2.refs.L.b2ContactID = Σ_2.addFunction(function αRgXv() {
            var Σ_2_26 = new Σ.Scope(this, αRgXv, '26', Σ_2, {}, []);
            this.features = new Σ_2.refs.c();
        }, Σ_2);
        Σ_2.refs.L.prototype.b2ContactID = Σ_2.addFunction(function αJMb3() {
            var Σ_2_27 = new Σ.Scope(this, αJMb3, '27', Σ_2, {}, []);
            this.features._m_id = this;
        }, Σ_2);
        Σ_2.refs.L.prototype.Set = Σ_2.addFunction(function αA2e8(b) {
            var Σ_2_28 = new Σ.Scope(this, αA2e8, '28', Σ_2, {
                b: b
            }, []);
            this.key = Σ_2_28.refs.b._key;
        }, Σ_2);
        Σ_2.refs.L.prototype.Copy = Σ_2.addFunction(function α0vKR() {
            var Σ_2_29 = new Σ.Scope(this, α0vKR, '29', Σ_2, {}, []);
            Σ_2_29.refs.b = new Σ_2.refs.L();
            Σ_2_29.refs.b.key = this.key;
            return Σ_2_29.refs.b;
        }, Σ_2);
        Object.defineProperty(Σ_2.refs.L.prototype, 'key', {
            enumerable: false,
            configurable: true,
            get: Σ_2.addFunction(function α5rtW() {
                var Σ_2_30 = new Σ.Scope(this, α5rtW, '30', Σ_2, {}, []);
                return this._key;
            }, Σ_2)
        });
        Object.defineProperty(Σ_2.refs.L.prototype, 'key', {
            enumerable: false,
            configurable: true,
            set: Σ_2.addFunction(function αmJVT(b) {
                var Σ_2_31 = new Σ.Scope(this, αmJVT, '31', Σ_2, {
                    b: b
                }, []);
                if (Σ_2_31.refs.b === undefined) {
                    Σ_2_31.refs.b = 0;
                }
                this._key = Σ_2_31.refs.b;
                this.features._referenceEdge = this._key & 255;
                this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
                this.features._incidentVertex = (this._key & 16711680) >> 16 & 255;
                this.features._flip = (this._key & 4278190080) >> 24 & 255;
            }, Σ_2)
        });
        Σ_2.refs.I.b2ContactPoint = Σ_2.addFunction(function α1737() {
            var Σ_2_32 = new Σ.Scope(this, α1737, '32', Σ_2, {}, []);
            this.position = new Σ_2.refs.p();
            this.velocity = new Σ_2.refs.p();
            this.normal = new Σ_2.refs.p();
            this.id = new Σ_2.refs.L();
        }, Σ_2);
        Σ_2.refs.W.b2Distance = Σ_2.addFunction(function αo8rn() {
            var Σ_2_33 = new Σ.Scope(this, αo8rn, '33', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.W.Distance = Σ_2.addFunction(function αcZQP(b, e, f) {
            var Σ_2_34 = new Σ.Scope(this, αcZQP, '34', Σ_2, {
                b: b,
                e: e,
                f: f
            }, []);
            ++Σ_2.refs.W.b2_gjkCalls;
            Σ_2_34.refs.m = Σ_2_34.refs.f.proxyA, Σ_2_34.refs.r = Σ_2_34.refs.f.proxyB, Σ_2_34.refs.s = Σ_2_34.refs.f.transformA, Σ_2_34.refs.v = Σ_2_34.refs.f.transformB, Σ_2_34.refs.t = Σ_2.refs.W.s_simplex;
            Σ_2_34.refs.t.ReadCache(Σ_2_34.refs.e, Σ_2_34.refs.m, Σ_2_34.refs.s, Σ_2_34.refs.r, Σ_2_34.refs.v);
            Σ_2_34.refs.x = Σ_2_34.refs.t.m_vertices, Σ_2_34.refs.C = Σ_2.refs.W.s_saveA, Σ_2_34.refs.J = Σ_2.refs.W.s_saveB, Σ_2_34.refs.T = 0;
            Σ_2_34.refs.t.GetClosestPoint().LengthSquared();
            for (Σ_2_34.refs.P = 0, Σ_2_34.refs.X = undefined, Σ_2_34.refs.$ = 0; Σ_2_34.refs.$ < 20;) {
                Σ_2_34.refs.T = Σ_2_34.refs.t.m_count;
                for (Σ_2_34.refs.P = 0; Σ_2_34.refs.P < Σ_2_34.refs.T; Σ_2_34.refs.P++) {
                    Σ_2_34.refs.C[Σ_2_34.refs.P] = Σ_2_34.refs.x[Σ_2_34.refs.P].indexA;
                    Σ_2_34.refs.J[Σ_2_34.refs.P] = Σ_2_34.refs.x[Σ_2_34.refs.P].indexB;
                }
                switch (t.m_count) {
                    case 1:
                        break;
                    case 2:
                        t.Solve2();
                        break;
                    case 3:
                        t.Solve3();
                        break;
                    default:
                        y.b2Assert(false);
                }
                if (Σ_2_34.refs.t.m_count == 3) {
                    break;
                }
                Σ_2_34.refs.X = Σ_2_34.refs.t.GetClosestPoint();
                Σ_2_34.refs.X.LengthSquared();
                Σ_2_34.refs.P = Σ_2_34.refs.t.GetSearchDirection();
                if (Σ_2_34.refs.P.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) {
                    break;
                }
                Σ_2_34.refs.X = Σ_2_34.refs.x[Σ_2_34.refs.t.m_count];
                Σ_2_34.refs.X.indexA = Σ_2_34.refs.m.GetSupport(Σ_2.refs.w.MulTMV(Σ_2_34.refs.s.R, Σ_2_34.refs.P.GetNegative()));
                Σ_2_34.refs.X.wA = Σ_2.refs.w.MulX(Σ_2_34.refs.s, Σ_2_34.refs.m.GetVertex(Σ_2_34.refs.X.indexA));
                Σ_2_34.refs.X.indexB = Σ_2_34.refs.r.GetSupport(Σ_2.refs.w.MulTMV(Σ_2_34.refs.v.R, Σ_2_34.refs.P));
                Σ_2_34.refs.X.wB = Σ_2.refs.w.MulX(Σ_2_34.refs.v, Σ_2_34.refs.r.GetVertex(Σ_2_34.refs.X.indexB));
                Σ_2_34.refs.X.w = Σ_2.refs.w.SubtractVV(Σ_2_34.refs.X.wB, Σ_2_34.refs.X.wA);
                ++Σ_2_34.refs.$;
                ++Σ_2.refs.W.b2_gjkIters;
                Σ_2_34.refs.ba = false;
                for (Σ_2_34.refs.P = 0; Σ_2_34.refs.P < Σ_2_34.refs.T; Σ_2_34.refs.P++) {
                    if (Σ_2_34.refs.X.indexA == Σ_2_34.refs.C[Σ_2_34.refs.P] && Σ_2_34.refs.X.indexB == Σ_2_34.refs.J[Σ_2_34.refs.P]) {
                        Σ_2_34.refs.ba = true;
                        break;
                    }
                }
                if (Σ_2_34.refs.ba) {
                    break;
                }
                ++Σ_2_34.refs.t.m_count;
            }
            Σ_2.refs.W.b2_gjkMaxIters = Σ_2.refs.w.Max(Σ_2.refs.W.b2_gjkMaxIters, Σ_2_34.refs.$);
            Σ_2_34.refs.t.GetWitnessPoints(Σ_2_34.refs.b.pointA, Σ_2_34.refs.b.pointB);
            Σ_2_34.refs.b.distance = Σ_2.refs.w.SubtractVV(Σ_2_34.refs.b.pointA, Σ_2_34.refs.b.pointB).Length();
            Σ_2_34.refs.b.iterations = Σ_2_34.refs.$;
            Σ_2_34.refs.t.WriteCache(Σ_2_34.refs.e);
            if (Σ_2_34.refs.f.useRadii) {
                Σ_2_34.refs.e = Σ_2_34.refs.m.m_radius;
                Σ_2_34.refs.r = Σ_2_34.refs.r.m_radius;
                if (Σ_2_34.refs.b.distance > Σ_2_34.refs.e + Σ_2_34.refs.r && Σ_2_34.refs.b.distance > Number.MIN_VALUE) {
                    Σ_2_34.refs.b.distance -= Σ_2_34.refs.e + Σ_2_34.refs.r;
                    Σ_2_34.refs.f = Σ_2.refs.w.SubtractVV(Σ_2_34.refs.b.pointB, Σ_2_34.refs.b.pointA);
                    Σ_2_34.refs.f.Normalize();
                    Σ_2_34.refs.b.pointA.x += Σ_2_34.refs.e * Σ_2_34.refs.f.x;
                    Σ_2_34.refs.b.pointA.y += Σ_2_34.refs.e * Σ_2_34.refs.f.y;
                    Σ_2_34.refs.b.pointB.x -= Σ_2_34.refs.r * Σ_2_34.refs.f.x;
                    Σ_2_34.refs.b.pointB.y -= Σ_2_34.refs.r * Σ_2_34.refs.f.y;
                } else {
                    Σ_2_34.refs.X = new Σ_2.refs.p();
                    Σ_2_34.refs.X.x = 0.5 * (Σ_2_34.refs.b.pointA.x + Σ_2_34.refs.b.pointB.x);
                    Σ_2_34.refs.X.y = 0.5 * (Σ_2_34.refs.b.pointA.y + Σ_2_34.refs.b.pointB.y);
                    Σ_2_34.refs.b.pointA.x = Σ_2_34.refs.b.pointB.x = Σ_2_34.refs.X.x;
                    Σ_2_34.refs.b.pointA.y = Σ_2_34.refs.b.pointB.y = Σ_2_34.refs.X.y;
                    Σ_2_34.refs.b.distance = 0;
                }
            }
        }, Σ_2);
        Σ.refs.Box2D.postDefs.push(Σ_2.addFunction(function α7NNx() {
            var Σ_2_35 = new Σ.Scope(this, α7NNx, '35', Σ_2, {}, []);
            Σ.refs.Box2D.Collision.b2Distance.s_simplex = new Σ_2.refs.h();
            Σ.refs.Box2D.Collision.b2Distance.s_saveA = new Σ.refs.Vector_a2j_Number(3);
            Σ.refs.Box2D.Collision.b2Distance.s_saveB = new Σ.refs.Vector_a2j_Number(3);
        }, Σ_2));
        Σ_2.refs.Y.b2DistanceInput = Σ_2.addFunction(function αaCdq() {
            var Σ_2_36 = new Σ.Scope(this, αaCdq, '36', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.k.b2DistanceOutput = Σ_2.addFunction(function αL534() {
            var Σ_2_37 = new Σ.Scope(this, αL534, '37', Σ_2, {}, []);
            this.pointA = new Σ_2.refs.p();
            this.pointB = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.z.b2DistanceProxy = Σ_2.addFunction(function α9TA0() {
            var Σ_2_38 = new Σ.Scope(this, α9TA0, '38', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.z.prototype.Set = Σ_2.addFunction(function αv99s(b) {
            var Σ_2_39 = new Σ.Scope(this, αv99s, '39', Σ_2, {
                b: b
            }, []);
            switch (b.GetType()) {
                case K.e_circleShape:
                    b = b instanceof F ? b : null;
                    this.m_vertices = new Vector(1, true);
                    this.m_vertices[0] = b.m_p;
                    this.m_count = 1;
                    this.m_radius = b.m_radius;
                    break;
                case K.e_polygonShape:
                    b = b instanceof G ? b : null;
                    this.m_vertices = b.m_vertices;
                    this.m_count = b.m_vertexCount;
                    this.m_radius = b.m_radius;
                    break;
                default:
                    y.b2Assert(false);
            }
        }, Σ_2);
        Σ_2.refs.z.prototype.GetSupport = Σ_2.addFunction(function αAkM0(b) {
            var Σ_2_40 = new Σ.Scope(this, αAkM0, '40', Σ_2, {
                b: b
            }, []);
            for (Σ_2_40.refs.e = 0, Σ_2_40.refs.f = this.m_vertices[0].x * Σ_2_40.refs.b.x + this.m_vertices[0].y * Σ_2_40.refs.b.y, Σ_2_40.refs.m = 1; Σ_2_40.refs.m < this.m_count; ++Σ_2_40.refs.m) {
                Σ_2_40.refs.r = this.m_vertices[Σ_2_40.refs.m].x * Σ_2_40.refs.b.x + this.m_vertices[Σ_2_40.refs.m].y * Σ_2_40.refs.b.y;
                if (Σ_2_40.refs.r > Σ_2_40.refs.f) {
                    Σ_2_40.refs.e = Σ_2_40.refs.m;
                    Σ_2_40.refs.f = Σ_2_40.refs.r;
                }
            }
            return Σ_2_40.refs.e;
        }, Σ_2);
        Σ_2.refs.z.prototype.GetSupportVertex = Σ_2.addFunction(function αmSlI(b) {
            var Σ_2_41 = new Σ.Scope(this, αmSlI, '41', Σ_2, {
                b: b
            }, []);
            for (Σ_2_41.refs.e = 0, Σ_2_41.refs.f = this.m_vertices[0].x * Σ_2_41.refs.b.x + this.m_vertices[0].y * Σ_2_41.refs.b.y, Σ_2_41.refs.m = 1; Σ_2_41.refs.m < this.m_count; ++Σ_2_41.refs.m) {
                Σ_2_41.refs.r = this.m_vertices[Σ_2_41.refs.m].x * Σ_2_41.refs.b.x + this.m_vertices[Σ_2_41.refs.m].y * Σ_2_41.refs.b.y;
                if (Σ_2_41.refs.r > Σ_2_41.refs.f) {
                    Σ_2_41.refs.e = Σ_2_41.refs.m;
                    Σ_2_41.refs.f = Σ_2_41.refs.r;
                }
            }
            return this.m_vertices[Σ_2_41.refs.e];
        }, Σ_2);
        Σ_2.refs.z.prototype.GetVertexCount = Σ_2.addFunction(function αJgFk() {
            var Σ_2_42 = new Σ.Scope(this, αJgFk, '42', Σ_2, {}, []);
            return this.m_count;
        }, Σ_2);
        Σ_2.refs.z.prototype.GetVertex = Σ_2.addFunction(function αuNSf(b) {
            var Σ_2_43 = new Σ.Scope(this, αuNSf, '43', Σ_2, {
                b: b
            }, []);
            if (Σ_2_43.refs.b === undefined) {
                Σ_2_43.refs.b = 0;
            }
            Σ_2.refs.y.b2Assert(0 <= Σ_2_43.refs.b && Σ_2_43.refs.b < this.m_count);
            return this.m_vertices[Σ_2_43.refs.b];
        }, Σ_2);
        Σ_2.refs.u.b2DynamicTree = Σ_2.addFunction(function αwUOS() {
            var Σ_2_44 = new Σ.Scope(this, αwUOS, '44', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.u.prototype.b2DynamicTree = Σ_2.addFunction(function αuCOj() {
            var Σ_2_45 = new Σ.Scope(this, αuCOj, '45', Σ_2, {}, []);
            this.m_freeList = this.m_root = null;
            this.m_insertionCount = this.m_path = 0;
        }, Σ_2);
        Σ_2.refs.u.prototype.CreateProxy = Σ_2.addFunction(function αRj0x(b, e) {
            var Σ_2_46 = new Σ.Scope(this, αRj0x, '46', Σ_2, {
                b: b,
                e: e
            }, []);
            Σ_2_46.refs.f = this.AllocateNode(), Σ_2_46.refs.m = Σ_2.refs.y.b2_aabbExtension, Σ_2_46.refs.r = Σ_2.refs.y.b2_aabbExtension;
            Σ_2_46.refs.f.aabb.lowerBound.x = Σ_2_46.refs.b.lowerBound.x - Σ_2_46.refs.m;
            Σ_2_46.refs.f.aabb.lowerBound.y = Σ_2_46.refs.b.lowerBound.y - Σ_2_46.refs.r;
            Σ_2_46.refs.f.aabb.upperBound.x = Σ_2_46.refs.b.upperBound.x + Σ_2_46.refs.m;
            Σ_2_46.refs.f.aabb.upperBound.y = Σ_2_46.refs.b.upperBound.y + Σ_2_46.refs.r;
            Σ_2_46.refs.f.userData = Σ_2_46.refs.e;
            this.InsertLeaf(Σ_2_46.refs.f);
            return Σ_2_46.refs.f;
        }, Σ_2);
        Σ_2.refs.u.prototype.DestroyProxy = Σ_2.addFunction(function αLdTe(b) {
            var Σ_2_47 = new Σ.Scope(this, αLdTe, '47', Σ_2, {
                b: b
            }, []);
            this.RemoveLeaf(Σ_2_47.refs.b);
            this.FreeNode(Σ_2_47.refs.b);
        }, Σ_2);
        Σ_2.refs.u.prototype.MoveProxy = Σ_2.addFunction(function αDEZV(b, e, f) {
            var Σ_2_48 = new Σ.Scope(this, αDEZV, '48', Σ_2, {
                b: b,
                e: e,
                f: f
            }, []);
            Σ_2.refs.y.b2Assert(Σ_2_48.refs.b.IsLeaf());
            if (Σ_2_48.refs.b.aabb.Contains(Σ_2_48.refs.e)) {
                return false;
            }
            this.RemoveLeaf(Σ_2_48.refs.b);
            Σ_2_48.refs.m = Σ_2.refs.y.b2_aabbExtension + Σ_2.refs.y.b2_aabbMultiplier * (Σ_2_48.refs.f.x > 0 ? Σ_2_48.refs.f.x : -Σ_2_48.refs.f.x);
            Σ_2_48.refs.f = Σ_2.refs.y.b2_aabbExtension + Σ_2.refs.y.b2_aabbMultiplier * (Σ_2_48.refs.f.y > 0 ? Σ_2_48.refs.f.y : -Σ_2_48.refs.f.y);
            Σ_2_48.refs.b.aabb.lowerBound.x = Σ_2_48.refs.e.lowerBound.x - Σ_2_48.refs.m;
            Σ_2_48.refs.b.aabb.lowerBound.y = Σ_2_48.refs.e.lowerBound.y - Σ_2_48.refs.f;
            Σ_2_48.refs.b.aabb.upperBound.x = Σ_2_48.refs.e.upperBound.x + Σ_2_48.refs.m;
            Σ_2_48.refs.b.aabb.upperBound.y = Σ_2_48.refs.e.upperBound.y + Σ_2_48.refs.f;
            this.InsertLeaf(Σ_2_48.refs.b);
            return true;
        }, Σ_2);
        Σ_2.refs.u.prototype.Rebalance = Σ_2.addFunction(function αiwNO(b) {
            var Σ_2_49 = new Σ.Scope(this, αiwNO, '49', Σ_2, {
                b: b
            }, []);
            if (Σ_2_49.refs.b === undefined) {
                Σ_2_49.refs.b = 0;
            }
            if (this.m_root != null) {
                for (Σ_2_49.refs.e = 0; Σ_2_49.refs.e < Σ_2_49.refs.b; Σ_2_49.refs.e++) {
                    for (Σ_2_49.refs.f = this.m_root, Σ_2_49.refs.m = 0; Σ_2_49.refs.f.IsLeaf() == false;) {
                        Σ_2_49.refs.f = this.m_path >> Σ_2_49.refs.m & 1 ? Σ_2_49.refs.f.child2 : Σ_2_49.refs.f.child1;
                        Σ_2_49.refs.m = Σ_2_49.refs.m + 1 & 31;
                    }
                    ++this.m_path;
                    this.RemoveLeaf(Σ_2_49.refs.f);
                    this.InsertLeaf(Σ_2_49.refs.f);
                }
            }
        }, Σ_2);
        Σ_2.refs.u.prototype.GetFatAABB = Σ_2.addFunction(function α84V3(b) {
            var Σ_2_50 = new Σ.Scope(this, α84V3, '50', Σ_2, {
                b: b
            }, []);
            return Σ_2_50.refs.b.aabb;
        }, Σ_2);
        Σ_2.refs.u.prototype.GetUserData = Σ_2.addFunction(function αgMl5(b) {
            var Σ_2_51 = new Σ.Scope(this, αgMl5, '51', Σ_2, {
                b: b
            }, []);
            return Σ_2_51.refs.b.userData;
        }, Σ_2);
        Σ_2.refs.u.prototype.Query = Σ_2.addFunction(function αLFqQ(b, e) {
            var Σ_2_52 = new Σ.Scope(this, αLFqQ, '52', Σ_2, {
                b: b,
                e: e
            }, []);
            if (this.m_root != null) {
                Σ_2_52.refs.f = new Σ.refs.Vector(), Σ_2_52.refs.m = 0;
                for (Σ_2_52.refs.f[Σ_2_52.refs.m++] = this.m_root; Σ_2_52.refs.m > 0;) {
                    Σ_2_52.refs.r = Σ_2_52.refs.f[--Σ_2_52.refs.m];
                    if (Σ_2_52.refs.r.aabb.TestOverlap(Σ_2_52.refs.e)) {
                        if (Σ_2_52.refs.r.IsLeaf()) {
                            if (!Σ_2_52.refs.b(Σ_2_52.refs.r)) {
                                break;
                            }
                        } else {
                            Σ_2_52.refs.f[Σ_2_52.refs.m++] = Σ_2_52.refs.r.child1;
                            Σ_2_52.refs.f[Σ_2_52.refs.m++] = Σ_2_52.refs.r.child2;
                        }
                    }
                }
            }
        }, Σ_2);
        Σ_2.refs.u.prototype.RayCast = Σ_2.addFunction(function αVCSW(b, e) {
            var Σ_2_53 = new Σ.Scope(this, αVCSW, '53', Σ_2, {
                b: b,
                e: e
            }, []);
            if (this.m_root != null) {
                Σ_2_53.refs.f = Σ_2_53.refs.e.p1, Σ_2_53.refs.m = Σ_2_53.refs.e.p2, Σ_2_53.refs.r = Σ_2.refs.w.SubtractVV(Σ_2_53.refs.f, Σ_2_53.refs.m);
                Σ_2_53.refs.r.Normalize();
                Σ_2_53.refs.r = Σ_2.refs.w.CrossFV(1, Σ_2_53.refs.r);
                Σ_2_53.refs.s = Σ_2.refs.w.AbsV(Σ_2_53.refs.r), Σ_2_53.refs.v = Σ_2_53.refs.e.maxFraction, Σ_2_53.refs.t = new Σ_2.refs.B(), Σ_2_53.refs.x = 0, Σ_2_53.refs.C = 0;
                Σ_2_53.refs.x = Σ_2_53.refs.f.x + Σ_2_53.refs.v * (Σ_2_53.refs.m.x - Σ_2_53.refs.f.x);
                Σ_2_53.refs.C = Σ_2_53.refs.f.y + Σ_2_53.refs.v * (Σ_2_53.refs.m.y - Σ_2_53.refs.f.y);
                Σ_2_53.refs.t.lowerBound.x = Math.min(Σ_2_53.refs.f.x, Σ_2_53.refs.x);
                Σ_2_53.refs.t.lowerBound.y = Math.min(Σ_2_53.refs.f.y, Σ_2_53.refs.C);
                Σ_2_53.refs.t.upperBound.x = Math.max(Σ_2_53.refs.f.x, Σ_2_53.refs.x);
                Σ_2_53.refs.t.upperBound.y = Math.max(Σ_2_53.refs.f.y, Σ_2_53.refs.C);
                Σ_2_53.refs.J = new Σ.refs.Vector(), Σ_2_53.refs.T = 0;
                for (Σ_2_53.refs.J[Σ_2_53.refs.T++] = this.m_root; Σ_2_53.refs.T > 0;) {
                    Σ_2_53.refs.v = Σ_2_53.refs.J[--Σ_2_53.refs.T];
                    if (Σ_2_53.refs.v.aabb.TestOverlap(Σ_2_53.refs.t) != false) {
                        Σ_2_53.refs.x = Σ_2_53.refs.v.aabb.GetCenter();
                        Σ_2_53.refs.C = Σ_2_53.refs.v.aabb.GetExtents();
                        if (!(Math.abs(Σ_2_53.refs.r.x * (Σ_2_53.refs.f.x - Σ_2_53.refs.x.x) + Σ_2_53.refs.r.y * (Σ_2_53.refs.f.y - Σ_2_53.refs.x.y)) - Σ_2_53.refs.s.x * Σ_2_53.refs.C.x - Σ_2_53.refs.s.y * Σ_2_53.refs.C.y > 0)) {
                            if (Σ_2_53.refs.v.IsLeaf()) {
                                Σ_2_53.refs.x = new Σ_2.refs.S();
                                Σ_2_53.refs.x.p1 = Σ_2_53.refs.e.p1;
                                Σ_2_53.refs.x.p2 = Σ_2_53.refs.e.p2;
                                Σ_2_53.refs.x.maxFraction = Σ_2_53.refs.e.maxFraction;
                                Σ_2_53.refs.v = Σ_2_53.refs.b(Σ_2_53.refs.x, Σ_2_53.refs.v);
                                if (Σ_2_53.refs.v == 0) {
                                    break;
                                }
                                if (Σ_2_53.refs.v > 0) {
                                    Σ_2_53.refs.x = Σ_2_53.refs.f.x + Σ_2_53.refs.v * (Σ_2_53.refs.m.x - Σ_2_53.refs.f.x);
                                    Σ_2_53.refs.C = Σ_2_53.refs.f.y + Σ_2_53.refs.v * (Σ_2_53.refs.m.y - Σ_2_53.refs.f.y);
                                    Σ_2_53.refs.t.lowerBound.x = Math.min(Σ_2_53.refs.f.x, Σ_2_53.refs.x);
                                    Σ_2_53.refs.t.lowerBound.y = Math.min(Σ_2_53.refs.f.y, Σ_2_53.refs.C);
                                    Σ_2_53.refs.t.upperBound.x = Math.max(Σ_2_53.refs.f.x, Σ_2_53.refs.x);
                                    Σ_2_53.refs.t.upperBound.y = Math.max(Σ_2_53.refs.f.y, Σ_2_53.refs.C);
                                }
                            } else {
                                Σ_2_53.refs.J[Σ_2_53.refs.T++] = Σ_2_53.refs.v.child1;
                                Σ_2_53.refs.J[Σ_2_53.refs.T++] = Σ_2_53.refs.v.child2;
                            }
                        }
                    }
                }
            }
        }, Σ_2);
        Σ_2.refs.u.prototype.AllocateNode = Σ_2.addFunction(function αpoyW() {
            var Σ_2_54 = new Σ.Scope(this, αpoyW, '54', Σ_2, {}, []);
            if (this.m_freeList) {
                Σ_2_54.refs.b = this.m_freeList;
                this.m_freeList = Σ_2_54.refs.b.parent;
                Σ_2_54.refs.b.parent = null;
                Σ_2_54.refs.b.child1 = null;
                Σ_2_54.refs.b.child2 = null;
                return Σ_2_54.refs.b;
            }
            return new Σ_2.refs.H();
        }, Σ_2);
        Σ_2.refs.u.prototype.FreeNode = Σ_2.addFunction(function α86tq(b) {
            var Σ_2_55 = new Σ.Scope(this, α86tq, '55', Σ_2, {
                b: b
            }, []);
            Σ_2_55.refs.b.parent = this.m_freeList;
            this.m_freeList = Σ_2_55.refs.b;
        }, Σ_2);
        Σ_2.refs.u.prototype.InsertLeaf = Σ_2.addFunction(function αEwHy(b) {
            var Σ_2_56 = new Σ.Scope(this, αEwHy, '56', Σ_2, {
                b: b
            }, []);
            ++this.m_insertionCount;
            if (this.m_root == null) {
                this.m_root = Σ_2_56.refs.b;
                this.m_root.parent = null;
            } else {
                Σ_2_56.refs.e = Σ_2_56.refs.b.aabb.GetCenter(), Σ_2_56.refs.f = this.m_root;
                if (Σ_2_56.refs.f.IsLeaf() == false) {
                    do {
                        Σ_2_56.refs.m = Σ_2_56.refs.f.child1;
                        Σ_2_56.refs.f = Σ_2_56.refs.f.child2;
                        Σ_2_56.refs.f = Math.abs((Σ_2_56.refs.m.aabb.lowerBound.x + Σ_2_56.refs.m.aabb.upperBound.x) / 2 - Σ_2_56.refs.e.x) + Math.abs((Σ_2_56.refs.m.aabb.lowerBound.y + Σ_2_56.refs.m.aabb.upperBound.y) / 2 - Σ_2_56.refs.e.y) < Math.abs((Σ_2_56.refs.f.aabb.lowerBound.x + Σ_2_56.refs.f.aabb.upperBound.x) / 2 - Σ_2_56.refs.e.x) + Math.abs((Σ_2_56.refs.f.aabb.lowerBound.y + Σ_2_56.refs.f.aabb.upperBound.y) / 2 - Σ_2_56.refs.e.y) ? Σ_2_56.refs.m : Σ_2_56.refs.f;
                    } while (Σ_2_56.refs.f.IsLeaf() == false);
                }
                Σ_2_56.refs.e = Σ_2_56.refs.f.parent;
                Σ_2_56.refs.m = this.AllocateNode();
                Σ_2_56.refs.m.parent = Σ_2_56.refs.e;
                Σ_2_56.refs.m.userData = null;
                Σ_2_56.refs.m.aabb.Combine(Σ_2_56.refs.b.aabb, Σ_2_56.refs.f.aabb);
                if (Σ_2_56.refs.e) {
                    if (Σ_2_56.refs.f.parent.child1 == Σ_2_56.refs.f) {
                        Σ_2_56.refs.e.child1 = Σ_2_56.refs.m;
                    } else {
                        Σ_2_56.refs.e.child2 = Σ_2_56.refs.m;
                    }
                    Σ_2_56.refs.m.child1 = Σ_2_56.refs.f;
                    Σ_2_56.refs.m.child2 = Σ_2_56.refs.b;
                    Σ_2_56.refs.f.parent = Σ_2_56.refs.m;
                    Σ_2_56.refs.b.parent = Σ_2_56.refs.m;
                    do {
                        if (Σ_2_56.refs.e.aabb.Contains(Σ_2_56.refs.m.aabb)) {
                            break;
                        }
                        Σ_2_56.refs.e.aabb.Combine(Σ_2_56.refs.e.child1.aabb, Σ_2_56.refs.e.child2.aabb);
                        Σ_2_56.refs.m = Σ_2_56.refs.e;
                        Σ_2_56.refs.e = Σ_2_56.refs.e.parent;
                    } while (Σ_2_56.refs.e);
                } else {
                    Σ_2_56.refs.m.child1 = Σ_2_56.refs.f;
                    Σ_2_56.refs.m.child2 = Σ_2_56.refs.b;
                    Σ_2_56.refs.f.parent = Σ_2_56.refs.m;
                    this.m_root = Σ_2_56.refs.b.parent = Σ_2_56.refs.m;
                }
            }
        }, Σ_2);
        Σ_2.refs.u.prototype.RemoveLeaf = Σ_2.addFunction(function αLhJ2(b) {
            var Σ_2_57 = new Σ.Scope(this, αLhJ2, '57', Σ_2, {
                b: b
            }, []);
            if (Σ_2_57.refs.b == this.m_root) {
                this.m_root = null;
            } else {
                Σ_2_57.refs.e = Σ_2_57.refs.b.parent, Σ_2_57.refs.f = Σ_2_57.refs.e.parent;
                Σ_2_57.refs.b = Σ_2_57.refs.e.child1 == Σ_2_57.refs.b ? Σ_2_57.refs.e.child2 : Σ_2_57.refs.e.child1;
                if (Σ_2_57.refs.f) {
                    if (Σ_2_57.refs.f.child1 == Σ_2_57.refs.e) {
                        Σ_2_57.refs.f.child1 = Σ_2_57.refs.b;
                    } else {
                        Σ_2_57.refs.f.child2 = Σ_2_57.refs.b;
                    }
                    Σ_2_57.refs.b.parent = Σ_2_57.refs.f;
                    for (this.FreeNode(Σ_2_57.refs.e); Σ_2_57.refs.f;) {
                        Σ_2_57.refs.e = Σ_2_57.refs.f.aabb;
                        Σ_2_57.refs.f.aabb = Σ_2.refs.B.Combine(Σ_2_57.refs.f.child1.aabb, Σ_2_57.refs.f.child2.aabb);
                        if (Σ_2_57.refs.e.Contains(Σ_2_57.refs.f.aabb)) {
                            break;
                        }
                        Σ_2_57.refs.f = Σ_2_57.refs.f.parent;
                    }
                } else {
                    this.m_root = Σ_2_57.refs.b;
                    Σ_2_57.refs.b.parent = null;
                    this.FreeNode(Σ_2_57.refs.e);
                }
            }
        }, Σ_2);
        Σ_2.refs.D.b2DynamicTreeBroadPhase = Σ_2.addFunction(function αfq3O() {
            var Σ_2_58 = new Σ.Scope(this, αfq3O, '58', Σ_2, {}, []);
            this.m_tree = new Σ_2.refs.u();
            this.m_moveBuffer = new Σ.refs.Vector();
            this.m_pairBuffer = new Σ.refs.Vector();
            this.m_pairCount = 0;
        }, Σ_2);
        Σ_2.refs.D.prototype.CreateProxy = Σ_2.addFunction(function αK2zK(b, e) {
            var Σ_2_59 = new Σ.Scope(this, αK2zK, '59', Σ_2, {
                b: b,
                e: e
            }, []);
            Σ_2_59.refs.f = this.m_tree.CreateProxy(Σ_2_59.refs.b, Σ_2_59.refs.e);
            ++this.m_proxyCount;
            this.BufferMove(Σ_2_59.refs.f);
            return Σ_2_59.refs.f;
        }, Σ_2);
        Σ_2.refs.D.prototype.DestroyProxy = Σ_2.addFunction(function α6S3U(b) {
            var Σ_2_60 = new Σ.Scope(this, α6S3U, '60', Σ_2, {
                b: b
            }, []);
            this.UnBufferMove(Σ_2_60.refs.b);
            --this.m_proxyCount;
            this.m_tree.DestroyProxy(Σ_2_60.refs.b);
        }, Σ_2);
        Σ_2.refs.D.prototype.MoveProxy = Σ_2.addFunction(function α2YRI(b, e, f) {
            var Σ_2_61 = new Σ.Scope(this, α2YRI, '61', Σ_2, {
                b: b,
                e: e,
                f: f
            }, []);
            this.m_tree.MoveProxy(Σ_2_61.refs.b, Σ_2_61.refs.e, Σ_2_61.refs.f) && this.BufferMove(Σ_2_61.refs.b);
        }, Σ_2);
        Σ_2.refs.D.prototype.TestOverlap = Σ_2.addFunction(function α0fqU(b, e) {
            var Σ_2_62 = new Σ.Scope(this, α0fqU, '62', Σ_2, {
                b: b,
                e: e
            }, []);
            Σ_2_62.refs.f = this.m_tree.GetFatAABB(Σ_2_62.refs.b), Σ_2_62.refs.m = this.m_tree.GetFatAABB(Σ_2_62.refs.e);
            return Σ_2_62.refs.f.TestOverlap(Σ_2_62.refs.m);
        }, Σ_2);
        Σ_2.refs.D.prototype.GetUserData = Σ_2.addFunction(function αrdhn(b) {
            var Σ_2_63 = new Σ.Scope(this, αrdhn, '63', Σ_2, {
                b: b
            }, []);
            return this.m_tree.GetUserData(Σ_2_63.refs.b);
        }, Σ_2);
        Σ_2.refs.D.prototype.GetFatAABB = Σ_2.addFunction(function αueU8(b) {
            var Σ_2_64 = new Σ.Scope(this, αueU8, '64', Σ_2, {
                b: b
            }, []);
            return this.m_tree.GetFatAABB(Σ_2_64.refs.b);
        }, Σ_2);
        Σ_2.refs.D.prototype.GetProxyCount = Σ_2.addFunction(function αWup1() {
            var Σ_2_65 = new Σ.Scope(this, αWup1, '65', Σ_2, {}, []);
            return this.m_proxyCount;
        }, Σ_2);
        Σ_2.refs.D.prototype.UpdatePairs = Σ_2.addFunction(function αs0Zr(b) {
            var Σ_2_66 = new Σ.Scope(this, αs0Zr, '66', Σ_2, {
                b: b
            }, []);
            Σ_2_66.refs.e = this;
            Σ_2_66.refs.f = Σ_2_66.refs.e.m_pairCount = 0, Σ_2_66.refs.m = undefined;
            for (Σ_2_66.refs.f = 0; Σ_2_66.refs.f < Σ_2_66.refs.e.m_moveBuffer.length; ++Σ_2_66.refs.f) {
                Σ_2_66.refs.m = Σ_2_66.refs.e.m_moveBuffer[Σ_2_66.refs.f];
                Σ_2_66.refs.r = Σ_2_66.refs.e.m_tree.GetFatAABB(Σ_2_66.refs.m);
                Σ_2_66.refs.e.m_tree.Query(Σ_2_66.addFunction(function αnIEM(t) {
                    var Σ_2_66_0 = new Σ.Scope(this, αnIEM, '0', Σ_2_66, {
                        t: t
                    }, []);
                    if (Σ_2_66_0.refs.t == Σ_2_66.refs.m) {
                        return true;
                    }
                    if (Σ_2_66.refs.e.m_pairCount == Σ_2_66.refs.e.m_pairBuffer.length) {
                        Σ_2_66.refs.e.m_pairBuffer[Σ_2_66.refs.e.m_pairCount] = new Σ_2.refs.O();
                    }
                    Σ_2_66_0.refs.x = Σ_2_66.refs.e.m_pairBuffer[Σ_2_66.refs.e.m_pairCount];
                    Σ_2_66_0.refs.x.proxyA = Σ_2_66_0.refs.t < Σ_2_66.refs.m ? Σ_2_66_0.refs.t : Σ_2_66.refs.m;
                    Σ_2_66_0.refs.x.proxyB = Σ_2_66_0.refs.t >= Σ_2_66.refs.m ? Σ_2_66_0.refs.t : Σ_2_66.refs.m;
                    ++Σ_2_66.refs.e.m_pairCount;
                    return true;
                }, Σ_2_66), Σ_2_66.refs.r);
            }
            for (Σ_2_66.refs.f = Σ_2_66.refs.e.m_moveBuffer.length = 0; Σ_2_66.refs.f < Σ_2_66.refs.e.m_pairCount;) {
                Σ_2_66.refs.r = Σ_2_66.refs.e.m_pairBuffer[Σ_2_66.refs.f];
                Σ_2_66.refs.s = Σ_2_66.refs.e.m_tree.GetUserData(Σ_2_66.refs.r.proxyA), Σ_2_66.refs.v = Σ_2_66.refs.e.m_tree.GetUserData(Σ_2_66.refs.r.proxyB);
                Σ_2_66.refs.b(Σ_2_66.refs.s, Σ_2_66.refs.v);
                for (++Σ_2_66.refs.f; Σ_2_66.refs.f < Σ_2_66.refs.e.m_pairCount;) {
                    Σ_2_66.refs.s = Σ_2_66.refs.e.m_pairBuffer[Σ_2_66.refs.f];
                    if (Σ_2_66.refs.s.proxyA != Σ_2_66.refs.r.proxyA || Σ_2_66.refs.s.proxyB != Σ_2_66.refs.r.proxyB) {
                        break;
                    }
                    ++Σ_2_66.refs.f;
                }
            }
        }, Σ_2);
        Σ_2.refs.D.prototype.Query = Σ_2.addFunction(function αgq9f(b, e) {
            var Σ_2_67 = new Σ.Scope(this, αgq9f, '67', Σ_2, {
                b: b,
                e: e
            }, []);
            this.m_tree.Query(Σ_2_67.refs.b, Σ_2_67.refs.e);
        }, Σ_2);
        Σ_2.refs.D.prototype.RayCast = Σ_2.addFunction(function αBSkR(b, e) {
            var Σ_2_68 = new Σ.Scope(this, αBSkR, '68', Σ_2, {
                b: b,
                e: e
            }, []);
            this.m_tree.RayCast(Σ_2_68.refs.b, Σ_2_68.refs.e);
        }, Σ_2);
        Σ_2.refs.D.prototype.Validate = Σ_2.addFunction(function αhZht() {
            var Σ_2_69 = new Σ.Scope(this, αhZht, '69', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.D.prototype.Rebalance = Σ_2.addFunction(function αHLFY(b) {
            var Σ_2_70 = new Σ.Scope(this, αHLFY, '70', Σ_2, {
                b: b
            }, []);
            if (Σ_2_70.refs.b === undefined) {
                Σ_2_70.refs.b = 0;
            }
            this.m_tree.Rebalance(Σ_2_70.refs.b);
        }, Σ_2);
        Σ_2.refs.D.prototype.BufferMove = Σ_2.addFunction(function αazlG(b) {
            var Σ_2_71 = new Σ.Scope(this, αazlG, '71', Σ_2, {
                b: b
            }, []);
            this.m_moveBuffer[this.m_moveBuffer.length] = Σ_2_71.refs.b;
        }, Σ_2);
        Σ_2.refs.D.prototype.UnBufferMove = Σ_2.addFunction(function αT4Di(b) {
            var Σ_2_72 = new Σ.Scope(this, αT4Di, '72', Σ_2, {
                b: b
            }, []);
            this.m_moveBuffer.splice(parseInt(this.m_moveBuffer.indexOf(Σ_2_72.refs.b)), 1);
        }, Σ_2);
        Σ_2.refs.D.prototype.ComparePairs = Σ_2.addFunction(function αRX9i() {
            var Σ_2_73 = new Σ.Scope(this, αRX9i, '73', Σ_2, {}, []);
            return 0;
        }, Σ_2);
        Σ_2.refs.D.__implements = {};
        Σ_2.refs.D.__implements[Σ_2.refs.g] = true;
        Σ_2.refs.H.b2DynamicTreeNode = Σ_2.addFunction(function αYTnY() {
            var Σ_2_74 = new Σ.Scope(this, αYTnY, '74', Σ_2, {}, []);
            this.aabb = new Σ_2.refs.B();
        }, Σ_2);
        Σ_2.refs.H.prototype.IsLeaf = Σ_2.addFunction(function αfvlE() {
            var Σ_2_75 = new Σ.Scope(this, αfvlE, '75', Σ_2, {}, []);
            return this.child1 == null;
        }, Σ_2);
        Σ_2.refs.O.b2DynamicTreePair = Σ_2.addFunction(function αeCfd() {
            var Σ_2_76 = new Σ.Scope(this, αeCfd, '76', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.E.b2Manifold = Σ_2.addFunction(function αCM6R() {
            var Σ_2_77 = new Σ.Scope(this, αCM6R, '77', Σ_2, {}, []);
            this.m_pointCount = 0;
        }, Σ_2);
        Σ_2.refs.E.prototype.b2Manifold = Σ_2.addFunction(function αt42e() {
            var Σ_2_78 = new Σ.Scope(this, αt42e, '78', Σ_2, {}, []);
            this.m_points = new Σ.refs.Vector(Σ_2.refs.y.b2_maxManifoldPoints);
            for (Σ_2_78.refs.b = 0; Σ_2_78.refs.b < Σ_2.refs.y.b2_maxManifoldPoints; Σ_2_78.refs.b++) {
                this.m_points[Σ_2_78.refs.b] = new Σ_2.refs.R();
            }
            this.m_localPlaneNormal = new Σ_2.refs.p();
            this.m_localPoint = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.E.prototype.Reset = Σ_2.addFunction(function αfrVT() {
            var Σ_2_79 = new Σ.Scope(this, αfrVT, '79', Σ_2, {}, []);
            for (Σ_2_79.refs.b = 0; Σ_2_79.refs.b < Σ_2.refs.y.b2_maxManifoldPoints; Σ_2_79.refs.b++) {
                (this.m_points[Σ_2_79.refs.b] instanceof Σ_2.refs.R ? this.m_points[Σ_2_79.refs.b] : null).Reset();
            }
            this.m_localPlaneNormal.SetZero();
            this.m_localPoint.SetZero();
            this.m_pointCount = this.m_type = 0;
        }, Σ_2);
        Σ_2.refs.E.prototype.Set = Σ_2.addFunction(function αn5Rz(b) {
            var Σ_2_80 = new Σ.Scope(this, αn5Rz, '80', Σ_2, {
                b: b
            }, []);
            this.m_pointCount = Σ_2_80.refs.b.m_pointCount;
            for (Σ_2_80.refs.e = 0; Σ_2_80.refs.e < Σ_2.refs.y.b2_maxManifoldPoints; Σ_2_80.refs.e++) {
                (this.m_points[Σ_2_80.refs.e] instanceof Σ_2.refs.R ? this.m_points[Σ_2_80.refs.e] : null).Set(Σ_2_80.refs.b.m_points[Σ_2_80.refs.e]);
            }
            this.m_localPlaneNormal.SetV(Σ_2_80.refs.b.m_localPlaneNormal);
            this.m_localPoint.SetV(Σ_2_80.refs.b.m_localPoint);
            this.m_type = Σ_2_80.refs.b.m_type;
        }, Σ_2);
        Σ_2.refs.E.prototype.Copy = Σ_2.addFunction(function αet1C() {
            var Σ_2_81 = new Σ.Scope(this, αet1C, '81', Σ_2, {}, []);
            Σ_2_81.refs.b = new Σ_2.refs.E();
            Σ_2_81.refs.b.Set(this);
            return Σ_2_81.refs.b;
        }, Σ_2);
        Σ.refs.Box2D.postDefs.push(Σ_2.addFunction(function αhLu6() {
            var Σ_2_82 = new Σ.Scope(this, αhLu6, '82', Σ_2, {}, []);
            Σ.refs.Box2D.Collision.b2Manifold.e_circles = 1;
            Σ.refs.Box2D.Collision.b2Manifold.e_faceA = 2;
            Σ.refs.Box2D.Collision.b2Manifold.e_faceB = 4;
        }, Σ_2));
        Σ_2.refs.R.b2ManifoldPoint = Σ_2.addFunction(function αHDXk() {
            var Σ_2_83 = new Σ.Scope(this, αHDXk, '83', Σ_2, {}, []);
            this.m_localPoint = new Σ_2.refs.p();
            this.m_id = new Σ_2.refs.L();
        }, Σ_2);
        Σ_2.refs.R.prototype.b2ManifoldPoint = Σ_2.addFunction(function αc2d3() {
            var Σ_2_84 = new Σ.Scope(this, αc2d3, '84', Σ_2, {}, []);
            this.Reset();
        }, Σ_2);
        Σ_2.refs.R.prototype.Reset = Σ_2.addFunction(function αAWxy() {
            var Σ_2_85 = new Σ.Scope(this, αAWxy, '85', Σ_2, {}, []);
            this.m_localPoint.SetZero();
            this.m_tangentImpulse = this.m_normalImpulse = 0;
            this.m_id.key = 0;
        }, Σ_2);
        Σ_2.refs.R.prototype.Set = Σ_2.addFunction(function αF7ft(b) {
            var Σ_2_86 = new Σ.Scope(this, αF7ft, '86', Σ_2, {
                b: b
            }, []);
            this.m_localPoint.SetV(Σ_2_86.refs.b.m_localPoint);
            this.m_normalImpulse = Σ_2_86.refs.b.m_normalImpulse;
            this.m_tangentImpulse = Σ_2_86.refs.b.m_tangentImpulse;
            this.m_id.Set(Σ_2_86.refs.b.m_id);
        }, Σ_2);
        Σ_2.refs.N.b2Point = Σ_2.addFunction(function αegod() {
            var Σ_2_87 = new Σ.Scope(this, αegod, '87', Σ_2, {}, []);
            this.p = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.N.prototype.Support = Σ_2.addFunction(function αPs79() {
            var Σ_2_88 = new Σ.Scope(this, αPs79, '88', Σ_2, {}, []);
            return this.p;
        }, Σ_2);
        Σ_2.refs.N.prototype.GetFirstVertex = Σ_2.addFunction(function αi0OH() {
            var Σ_2_89 = new Σ.Scope(this, αi0OH, '89', Σ_2, {}, []);
            return this.p;
        }, Σ_2);
        Σ_2.refs.S.b2RayCastInput = Σ_2.addFunction(function αZjca() {
            var Σ_2_90 = new Σ.Scope(this, αZjca, '90', Σ_2, {}, []);
            this.p1 = new Σ_2.refs.p();
            this.p2 = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.S.prototype.b2RayCastInput = Σ_2.addFunction(function αYOD5(b, e, f) {
            var Σ_2_91 = new Σ.Scope(this, αYOD5, '91', Σ_2, {
                b: b,
                e: e,
                f: f
            }, []);
            if (Σ_2_91.refs.b === undefined) {
                Σ_2_91.refs.b = null;
            }
            if (Σ_2_91.refs.e === undefined) {
                Σ_2_91.refs.e = null;
            }
            if (Σ_2_91.refs.f === undefined) {
                Σ_2_91.refs.f = 1;
            }
            Σ_2_91.refs.b && this.p1.SetV(Σ_2_91.refs.b);
            Σ_2_91.refs.e && this.p2.SetV(Σ_2_91.refs.e);
            this.maxFraction = Σ_2_91.refs.f;
        }, Σ_2);
        Σ_2.refs.aa.b2RayCastOutput = Σ_2.addFunction(function αrdyo() {
            var Σ_2_92 = new Σ.Scope(this, αrdyo, '92', Σ_2, {}, []);
            this.normal = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.Z.b2Segment = Σ_2.addFunction(function αBIPC() {
            var Σ_2_93 = new Σ.Scope(this, αBIPC, '93', Σ_2, {}, []);
            this.p1 = new Σ_2.refs.p();
            this.p2 = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.Z.prototype.TestSegment = Σ_2.addFunction(function αGSzX(b, e, f, m) {
            var Σ_2_94 = new Σ.Scope(this, αGSzX, '94', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m
            }, []);
            if (Σ_2_94.refs.m === undefined) {
                Σ_2_94.refs.m = 0;
            }
            Σ_2_94.refs.r = Σ_2_94.refs.f.p1, Σ_2_94.refs.s = Σ_2_94.refs.f.p2.x - Σ_2_94.refs.r.x, Σ_2_94.refs.v = Σ_2_94.refs.f.p2.y - Σ_2_94.refs.r.y;
            Σ_2_94.refs.f = this.p2.y - this.p1.y;
            Σ_2_94.refs.t = -(this.p2.x - this.p1.x), Σ_2_94.refs.x = 100 * Number.MIN_VALUE, Σ_2_94.refs.C = -(Σ_2_94.refs.s * Σ_2_94.refs.f + Σ_2_94.refs.v * Σ_2_94.refs.t);
            if (Σ_2_94.refs.C > Σ_2_94.refs.x) {
                Σ_2_94.refs.J = Σ_2_94.refs.r.x - this.p1.x, Σ_2_94.refs.T = Σ_2_94.refs.r.y - this.p1.y;
                Σ_2_94.refs.r = Σ_2_94.refs.J * Σ_2_94.refs.f + Σ_2_94.refs.T * Σ_2_94.refs.t;
                if (0 <= Σ_2_94.refs.r && Σ_2_94.refs.r <= Σ_2_94.refs.m * Σ_2_94.refs.C) {
                    Σ_2_94.refs.m = -Σ_2_94.refs.s * Σ_2_94.refs.T + Σ_2_94.refs.v * Σ_2_94.refs.J;
                    if (-Σ_2_94.refs.x * Σ_2_94.refs.C <= Σ_2_94.refs.m && Σ_2_94.refs.m <= Σ_2_94.refs.C * (1 + Σ_2_94.refs.x)) {
                        Σ_2_94.refs.r /= Σ_2_94.refs.C;
                        Σ_2_94.refs.m = Math.sqrt(Σ_2_94.refs.f * Σ_2_94.refs.f + Σ_2_94.refs.t * Σ_2_94.refs.t);
                        Σ_2_94.refs.f /= Σ_2_94.refs.m;
                        Σ_2_94.refs.t /= Σ_2_94.refs.m;
                        Σ_2_94.refs.b[0] = Σ_2_94.refs.r;
                        Σ_2_94.refs.e.Set(Σ_2_94.refs.f, Σ_2_94.refs.t);
                        return true;
                    }
                }
            }
            return false;
        }, Σ_2);
        Σ_2.refs.Z.prototype.Extend = Σ_2.addFunction(function αROSu(b) {
            var Σ_2_95 = new Σ.Scope(this, αROSu, '95', Σ_2, {
                b: b
            }, []);
            this.ExtendForward(Σ_2_95.refs.b);
            this.ExtendBackward(Σ_2_95.refs.b);
        }, Σ_2);
        Σ_2.refs.Z.prototype.ExtendForward = Σ_2.addFunction(function αpw6G(b) {
            var Σ_2_96 = new Σ.Scope(this, αpw6G, '96', Σ_2, {
                b: b
            }, []);
            Σ_2_96.refs.e = this.p2.x - this.p1.x, Σ_2_96.refs.f = this.p2.y - this.p1.y;
            Σ_2_96.refs.b = Math.min(Σ_2_96.refs.e > 0 ? (Σ_2_96.refs.b.upperBound.x - this.p1.x) / Σ_2_96.refs.e : Σ_2_96.refs.e < 0 ? (Σ_2_96.refs.b.lowerBound.x - this.p1.x) / Σ_2_96.refs.e : Number.POSITIVE_INFINITY, Σ_2_96.refs.f > 0 ? (Σ_2_96.refs.b.upperBound.y - this.p1.y) / Σ_2_96.refs.f : Σ_2_96.refs.f < 0 ? (Σ_2_96.refs.b.lowerBound.y - this.p1.y) / Σ_2_96.refs.f : Number.POSITIVE_INFINITY);
            this.p2.x = this.p1.x + Σ_2_96.refs.e * Σ_2_96.refs.b;
            this.p2.y = this.p1.y + Σ_2_96.refs.f * Σ_2_96.refs.b;
        }, Σ_2);
        Σ_2.refs.Z.prototype.ExtendBackward = Σ_2.addFunction(function αltS4(b) {
            var Σ_2_97 = new Σ.Scope(this, αltS4, '97', Σ_2, {
                b: b
            }, []);
            Σ_2_97.refs.e = -this.p2.x + this.p1.x, Σ_2_97.refs.f = -this.p2.y + this.p1.y;
            Σ_2_97.refs.b = Math.min(Σ_2_97.refs.e > 0 ? (Σ_2_97.refs.b.upperBound.x - this.p2.x) / Σ_2_97.refs.e : Σ_2_97.refs.e < 0 ? (Σ_2_97.refs.b.lowerBound.x - this.p2.x) / Σ_2_97.refs.e : Number.POSITIVE_INFINITY, Σ_2_97.refs.f > 0 ? (Σ_2_97.refs.b.upperBound.y - this.p2.y) / Σ_2_97.refs.f : Σ_2_97.refs.f < 0 ? (Σ_2_97.refs.b.lowerBound.y - this.p2.y) / Σ_2_97.refs.f : Number.POSITIVE_INFINITY);
            this.p1.x = this.p2.x + Σ_2_97.refs.e * Σ_2_97.refs.b;
            this.p1.y = this.p2.y + Σ_2_97.refs.f * Σ_2_97.refs.b;
        }, Σ_2);
        Σ_2.refs.d.b2SeparationFunction = Σ_2.addFunction(function αTt1T() {
            var Σ_2_98 = new Σ.Scope(this, αTt1T, '98', Σ_2, {}, []);
            this.m_localPoint = new Σ_2.refs.p();
            this.m_axis = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.d.prototype.Initialize = Σ_2.addFunction(function αcSg2(b, e, f, m, r) {
            var Σ_2_99 = new Σ.Scope(this, αcSg2, '99', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r
            }, []);
            this.m_proxyA = Σ_2_99.refs.e;
            this.m_proxyB = Σ_2_99.refs.m;
            Σ_2_99.refs.s = parseInt(Σ_2_99.refs.b.count);
            Σ_2.refs.y.b2Assert(0 < Σ_2_99.refs.s && Σ_2_99.refs.s < 3);
            Σ_2_99.refs.v = undefined, Σ_2_99.refs.t = undefined, Σ_2_99.refs.x = undefined, Σ_2_99.refs.C = undefined, Σ_2_99.refs.J = Σ_2_99.refs.C = Σ_2_99.refs.x = Σ_2_99.refs.m = Σ_2_99.refs.e = 0, Σ_2_99.refs.T = 0;
            Σ_2_99.refs.J = 0;
            if (Σ_2_99.refs.s == 1) {
                this.m_type = Σ_2.refs.d.e_points;
                Σ_2_99.refs.v = this.m_proxyA.GetVertex(Σ_2_99.refs.b.indexA[0]);
                Σ_2_99.refs.t = this.m_proxyB.GetVertex(Σ_2_99.refs.b.indexB[0]);
                Σ_2_99.refs.s = Σ_2_99.refs.v;
                Σ_2_99.refs.b = Σ_2_99.refs.f.R;
                Σ_2_99.refs.e = Σ_2_99.refs.f.position.x + (Σ_2_99.refs.b.col1.x * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.x * Σ_2_99.refs.s.y);
                Σ_2_99.refs.m = Σ_2_99.refs.f.position.y + (Σ_2_99.refs.b.col1.y * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.y * Σ_2_99.refs.s.y);
                Σ_2_99.refs.s = Σ_2_99.refs.t;
                Σ_2_99.refs.b = Σ_2_99.refs.r.R;
                Σ_2_99.refs.x = Σ_2_99.refs.r.position.x + (Σ_2_99.refs.b.col1.x * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.x * Σ_2_99.refs.s.y);
                Σ_2_99.refs.C = Σ_2_99.refs.r.position.y + (Σ_2_99.refs.b.col1.y * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.y * Σ_2_99.refs.s.y);
                this.m_axis.x = Σ_2_99.refs.x - Σ_2_99.refs.e;
                this.m_axis.y = Σ_2_99.refs.C - Σ_2_99.refs.m;
                this.m_axis.Normalize();
            } else {
                if (Σ_2_99.refs.b.indexB[0] == Σ_2_99.refs.b.indexB[1]) {
                    this.m_type = Σ_2.refs.d.e_faceA;
                    Σ_2_99.refs.e = this.m_proxyA.GetVertex(Σ_2_99.refs.b.indexA[0]);
                    Σ_2_99.refs.m = this.m_proxyA.GetVertex(Σ_2_99.refs.b.indexA[1]);
                    Σ_2_99.refs.t = this.m_proxyB.GetVertex(Σ_2_99.refs.b.indexB[0]);
                    this.m_localPoint.x = 0.5 * (Σ_2_99.refs.e.x + Σ_2_99.refs.m.x);
                    this.m_localPoint.y = 0.5 * (Σ_2_99.refs.e.y + Σ_2_99.refs.m.y);
                    this.m_axis = Σ_2.refs.w.CrossVF(Σ_2.refs.w.SubtractVV(Σ_2_99.refs.m, Σ_2_99.refs.e), 1);
                    this.m_axis.Normalize();
                    Σ_2_99.refs.s = this.m_axis;
                    Σ_2_99.refs.b = Σ_2_99.refs.f.R;
                    Σ_2_99.refs.J = Σ_2_99.refs.b.col1.x * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.x * Σ_2_99.refs.s.y;
                    Σ_2_99.refs.T = Σ_2_99.refs.b.col1.y * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.y * Σ_2_99.refs.s.y;
                    Σ_2_99.refs.s = this.m_localPoint;
                    Σ_2_99.refs.b = Σ_2_99.refs.f.R;
                    Σ_2_99.refs.e = Σ_2_99.refs.f.position.x + (Σ_2_99.refs.b.col1.x * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.x * Σ_2_99.refs.s.y);
                    Σ_2_99.refs.m = Σ_2_99.refs.f.position.y + (Σ_2_99.refs.b.col1.y * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.y * Σ_2_99.refs.s.y);
                    Σ_2_99.refs.s = Σ_2_99.refs.t;
                    Σ_2_99.refs.b = Σ_2_99.refs.r.R;
                    Σ_2_99.refs.x = Σ_2_99.refs.r.position.x + (Σ_2_99.refs.b.col1.x * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.x * Σ_2_99.refs.s.y);
                    Σ_2_99.refs.C = Σ_2_99.refs.r.position.y + (Σ_2_99.refs.b.col1.y * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.y * Σ_2_99.refs.s.y);
                    Σ_2_99.refs.J = (Σ_2_99.refs.x - Σ_2_99.refs.e) * Σ_2_99.refs.J + (Σ_2_99.refs.C - Σ_2_99.refs.m) * Σ_2_99.refs.T;
                } else if (Σ_2_99.refs.b.indexA[0] == Σ_2_99.refs.b.indexA[0]) {
                    this.m_type = Σ_2.refs.d.e_faceB;
                    Σ_2_99.refs.x = this.m_proxyB.GetVertex(Σ_2_99.refs.b.indexB[0]);
                    Σ_2_99.refs.C = this.m_proxyB.GetVertex(Σ_2_99.refs.b.indexB[1]);
                    Σ_2_99.refs.v = this.m_proxyA.GetVertex(Σ_2_99.refs.b.indexA[0]);
                    this.m_localPoint.x = 0.5 * (Σ_2_99.refs.x.x + Σ_2_99.refs.C.x);
                    this.m_localPoint.y = 0.5 * (Σ_2_99.refs.x.y + Σ_2_99.refs.C.y);
                    this.m_axis = Σ_2.refs.w.CrossVF(Σ_2.refs.w.SubtractVV(Σ_2_99.refs.C, Σ_2_99.refs.x), 1);
                    this.m_axis.Normalize();
                    Σ_2_99.refs.s = this.m_axis;
                    Σ_2_99.refs.b = Σ_2_99.refs.r.R;
                    Σ_2_99.refs.J = Σ_2_99.refs.b.col1.x * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.x * Σ_2_99.refs.s.y;
                    Σ_2_99.refs.T = Σ_2_99.refs.b.col1.y * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.y * Σ_2_99.refs.s.y;
                    Σ_2_99.refs.s = this.m_localPoint;
                    Σ_2_99.refs.b = Σ_2_99.refs.r.R;
                    Σ_2_99.refs.x = Σ_2_99.refs.r.position.x + (Σ_2_99.refs.b.col1.x * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.x * Σ_2_99.refs.s.y);
                    Σ_2_99.refs.C = Σ_2_99.refs.r.position.y + (Σ_2_99.refs.b.col1.y * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.y * Σ_2_99.refs.s.y);
                    Σ_2_99.refs.s = Σ_2_99.refs.v;
                    Σ_2_99.refs.b = Σ_2_99.refs.f.R;
                    Σ_2_99.refs.e = Σ_2_99.refs.f.position.x + (Σ_2_99.refs.b.col1.x * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.x * Σ_2_99.refs.s.y);
                    Σ_2_99.refs.m = Σ_2_99.refs.f.position.y + (Σ_2_99.refs.b.col1.y * Σ_2_99.refs.s.x + Σ_2_99.refs.b.col2.y * Σ_2_99.refs.s.y);
                    Σ_2_99.refs.J = (Σ_2_99.refs.e - Σ_2_99.refs.x) * Σ_2_99.refs.J + (Σ_2_99.refs.m - Σ_2_99.refs.C) * Σ_2_99.refs.T;
                } else {
                    Σ_2_99.refs.e = this.m_proxyA.GetVertex(Σ_2_99.refs.b.indexA[0]);
                    Σ_2_99.refs.m = this.m_proxyA.GetVertex(Σ_2_99.refs.b.indexA[1]);
                    Σ_2_99.refs.x = this.m_proxyB.GetVertex(Σ_2_99.refs.b.indexB[0]);
                    Σ_2_99.refs.C = this.m_proxyB.GetVertex(Σ_2_99.refs.b.indexB[1]);
                    Σ_2.refs.w.MulX(Σ_2_99.refs.f, Σ_2_99.refs.v);
                    Σ_2_99.refs.v = Σ_2.refs.w.MulMV(Σ_2_99.refs.f.R, Σ_2.refs.w.SubtractVV(Σ_2_99.refs.m, Σ_2_99.refs.e));
                    Σ_2.refs.w.MulX(Σ_2_99.refs.r, Σ_2_99.refs.t);
                    Σ_2_99.refs.J = Σ_2.refs.w.MulMV(Σ_2_99.refs.r.R, Σ_2.refs.w.SubtractVV(Σ_2_99.refs.C, Σ_2_99.refs.x));
                    Σ_2_99.refs.r = Σ_2_99.refs.v.x * Σ_2_99.refs.v.x + Σ_2_99.refs.v.y * Σ_2_99.refs.v.y;
                    Σ_2_99.refs.t = Σ_2_99.refs.J.x * Σ_2_99.refs.J.x + Σ_2_99.refs.J.y * Σ_2_99.refs.J.y;
                    Σ_2_99.refs.b = Σ_2.refs.w.SubtractVV(Σ_2_99.refs.J, Σ_2_99.refs.v);
                    Σ_2_99.refs.f = Σ_2_99.refs.v.x * Σ_2_99.refs.b.x + Σ_2_99.refs.v.y * Σ_2_99.refs.b.y;
                    Σ_2_99.refs.b = Σ_2_99.refs.J.x * Σ_2_99.refs.b.x + Σ_2_99.refs.J.y * Σ_2_99.refs.b.y;
                    Σ_2_99.refs.v = Σ_2_99.refs.v.x * Σ_2_99.refs.J.x + Σ_2_99.refs.v.y * Σ_2_99.refs.J.y;
                    Σ_2_99.refs.T = Σ_2_99.refs.r * Σ_2_99.refs.t - Σ_2_99.refs.v * Σ_2_99.refs.v;
                    Σ_2_99.refs.J = 0;
                    if (Σ_2_99.refs.T != 0) {
                        Σ_2_99.refs.J = Σ_2.refs.w.Clamp((Σ_2_99.refs.v * Σ_2_99.refs.b - Σ_2_99.refs.f * Σ_2_99.refs.t) / Σ_2_99.refs.T, 0, 1);
                    }
                    if ((Σ_2_99.refs.v * Σ_2_99.refs.J + Σ_2_99.refs.b) / Σ_2_99.refs.t < 0) {
                        Σ_2_99.refs.J = Σ_2.refs.w.Clamp((Σ_2_99.refs.v - Σ_2_99.refs.f) / Σ_2_99.refs.r, 0, 1);
                    }
                    Σ_2_99.refs.v = new Σ_2.refs.p();
                    Σ_2_99.refs.v.x = Σ_2_99.refs.e.x + Σ_2_99.refs.J * (Σ_2_99.refs.m.x - Σ_2_99.refs.e.x);
                    Σ_2_99.refs.v.y = Σ_2_99.refs.e.y + Σ_2_99.refs.J * (Σ_2_99.refs.m.y - Σ_2_99.refs.e.y);
                    Σ_2_99.refs.t = new Σ_2.refs.p();
                    Σ_2_99.refs.t.x = Σ_2_99.refs.x.x + Σ_2_99.refs.J * (Σ_2_99.refs.C.x - Σ_2_99.refs.x.x);
                    Σ_2_99.refs.t.y = Σ_2_99.refs.x.y + Σ_2_99.refs.J * (Σ_2_99.refs.C.y - Σ_2_99.refs.x.y);
                    if (Σ_2_99.refs.J == 0 || Σ_2_99.refs.J == 1) {
                        this.m_type = Σ_2.refs.d.e_faceB;
                        this.m_axis = Σ_2.refs.w.CrossVF(Σ_2.refs.w.SubtractVV(Σ_2_99.refs.C, Σ_2_99.refs.x), 1);
                        this.m_axis.Normalize();
                        this.m_localPoint = Σ_2_99.refs.t;
                    } else {
                        this.m_type = Σ_2.refs.d.e_faceA;
                        this.m_axis = Σ_2.refs.w.CrossVF(Σ_2.refs.w.SubtractVV(Σ_2_99.refs.m, Σ_2_99.refs.e), 1);
                        this.m_localPoint = Σ_2_99.refs.v;
                    }
                }
                Σ_2_99.refs.J < 0 && this.m_axis.NegativeSelf();
            }
        }, Σ_2);
        Σ_2.refs.d.prototype.Evaluate = Σ_2.addFunction(function αjOse(b, e) {
            var Σ_2_100 = new Σ.Scope(this, αjOse, '100', Σ_2, {
                b: b,
                e: e
            }, []);
            Σ_2_100.refs.f = undefined, Σ_2_100.refs.m = undefined, Σ_2_100.refs.r = 0;
            switch (this.m_type) {
                case d.e_points:
                    f = w.MulTMV(b.R, this.m_axis);
                    m = w.MulTMV(e.R, this.m_axis.GetNegative());
                    f = this.m_proxyA.GetSupportVertex(f);
                    m = this.m_proxyB.GetSupportVertex(m);
                    f = w.MulX(b, f);
                    m = w.MulX(e, m);
                    return r = (m.x - f.x) * this.m_axis.x + (m.y - f.y) * this.m_axis.y;
                case d.e_faceA:
                    r = w.MulMV(b.R, this.m_axis);
                    f = w.MulX(b, this.m_localPoint);
                    m = w.MulTMV(e.R, r.GetNegative());
                    m = this.m_proxyB.GetSupportVertex(m);
                    m = w.MulX(e, m);
                    return r = (m.x - f.x) * r.x + (m.y - f.y) * r.y;
                case d.e_faceB:
                    r = w.MulMV(e.R, this.m_axis);
                    m = w.MulX(e, this.m_localPoint);
                    f = w.MulTMV(b.R, r.GetNegative());
                    f = this.m_proxyA.GetSupportVertex(f);
                    f = w.MulX(b, f);
                    return r = (f.x - m.x) * r.x + (f.y - m.y) * r.y;
                default:
                    y.b2Assert(false);
                    return 0;
            }
        }, Σ_2);
        Σ.refs.Box2D.postDefs.push(Σ_2.addFunction(function αAB1U() {
            var Σ_2_101 = new Σ.Scope(this, αAB1U, '101', Σ_2, {}, []);
            Σ.refs.Box2D.Collision.b2SeparationFunction.e_points = 1;
            Σ.refs.Box2D.Collision.b2SeparationFunction.e_faceA = 2;
            Σ.refs.Box2D.Collision.b2SeparationFunction.e_faceB = 4;
        }, Σ_2));
        Σ_2.refs.h.b2Simplex = Σ_2.addFunction(function αt0XW() {
            var Σ_2_102 = new Σ.Scope(this, αt0XW, '102', Σ_2, {}, []);
            this.m_v1 = new Σ_2.refs.j();
            this.m_v2 = new Σ_2.refs.j();
            this.m_v3 = new Σ_2.refs.j();
            this.m_vertices = new Σ.refs.Vector(3);
        }, Σ_2);
        Σ_2.refs.h.prototype.b2Simplex = Σ_2.addFunction(function αlKbp() {
            var Σ_2_103 = new Σ.Scope(this, αlKbp, '103', Σ_2, {}, []);
            this.m_vertices[0] = this.m_v1;
            this.m_vertices[1] = this.m_v2;
            this.m_vertices[2] = this.m_v3;
        }, Σ_2);
        Σ_2.refs.h.prototype.ReadCache = Σ_2.addFunction(function α48uz(b, e, f, m, r) {
            var Σ_2_104 = new Σ.Scope(this, α48uz, '104', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r
            }, []);
            Σ_2.refs.y.b2Assert(0 <= Σ_2_104.refs.b.count && Σ_2_104.refs.b.count <= 3);
            Σ_2_104.refs.s = undefined, Σ_2_104.refs.v = undefined;
            this.m_count = Σ_2_104.refs.b.count;
            for (Σ_2_104.refs.t = this.m_vertices, Σ_2_104.refs.x = 0; Σ_2_104.refs.x < this.m_count; Σ_2_104.refs.x++) {
                Σ_2_104.refs.C = Σ_2_104.refs.t[Σ_2_104.refs.x];
                Σ_2_104.refs.C.indexA = Σ_2_104.refs.b.indexA[Σ_2_104.refs.x];
                Σ_2_104.refs.C.indexB = Σ_2_104.refs.b.indexB[Σ_2_104.refs.x];
                Σ_2_104.refs.s = Σ_2_104.refs.e.GetVertex(Σ_2_104.refs.C.indexA);
                Σ_2_104.refs.v = Σ_2_104.refs.m.GetVertex(Σ_2_104.refs.C.indexB);
                Σ_2_104.refs.C.wA = Σ_2.refs.w.MulX(Σ_2_104.refs.f, Σ_2_104.refs.s);
                Σ_2_104.refs.C.wB = Σ_2.refs.w.MulX(Σ_2_104.refs.r, Σ_2_104.refs.v);
                Σ_2_104.refs.C.w = Σ_2.refs.w.SubtractVV(Σ_2_104.refs.C.wB, Σ_2_104.refs.C.wA);
                Σ_2_104.refs.C.a = 0;
            }
            if (this.m_count > 1) {
                Σ_2_104.refs.b = Σ_2_104.refs.b.metric;
                Σ_2_104.refs.s = this.GetMetric();
                if (Σ_2_104.refs.s < 0.5 * Σ_2_104.refs.b || 2 * Σ_2_104.refs.b < Σ_2_104.refs.s || Σ_2_104.refs.s < Number.MIN_VALUE) {
                    this.m_count = 0;
                }
            }
            if (this.m_count == 0) {
                Σ_2_104.refs.C = Σ_2_104.refs.t[0];
                Σ_2_104.refs.C.indexA = 0;
                Σ_2_104.refs.C.indexB = 0;
                Σ_2_104.refs.s = Σ_2_104.refs.e.GetVertex(0);
                Σ_2_104.refs.v = Σ_2_104.refs.m.GetVertex(0);
                Σ_2_104.refs.C.wA = Σ_2.refs.w.MulX(Σ_2_104.refs.f, Σ_2_104.refs.s);
                Σ_2_104.refs.C.wB = Σ_2.refs.w.MulX(Σ_2_104.refs.r, Σ_2_104.refs.v);
                Σ_2_104.refs.C.w = Σ_2.refs.w.SubtractVV(Σ_2_104.refs.C.wB, Σ_2_104.refs.C.wA);
                this.m_count = 1;
            }
        }, Σ_2);
        Σ_2.refs.h.prototype.WriteCache = Σ_2.addFunction(function α2GVx(b) {
            var Σ_2_105 = new Σ.Scope(this, α2GVx, '105', Σ_2, {
                b: b
            }, []);
            Σ_2_105.refs.b.metric = this.GetMetric();
            Σ_2_105.refs.b.count = Σ.refs.Box2D.parseUInt(this.m_count);
            for (Σ_2_105.refs.e = this.m_vertices, Σ_2_105.refs.f = 0; Σ_2_105.refs.f < this.m_count; Σ_2_105.refs.f++) {
                Σ_2_105.refs.b.indexA[Σ_2_105.refs.f] = Σ.refs.Box2D.parseUInt(Σ_2_105.refs.e[Σ_2_105.refs.f].indexA);
                Σ_2_105.refs.b.indexB[Σ_2_105.refs.f] = Σ.refs.Box2D.parseUInt(Σ_2_105.refs.e[Σ_2_105.refs.f].indexB);
            }
        }, Σ_2);
        Σ_2.refs.h.prototype.GetSearchDirection = Σ_2.addFunction(function αkMNW() {
            var Σ_2_106 = new Σ.Scope(this, αkMNW, '106', Σ_2, {}, []);
            switch (this.m_count) {
                case 1:
                    return this.m_v1.w.GetNegative();
                case 2:
                    var b = w.SubtractVV(this.m_v2.w, this.m_v1.w);
                    return w.CrossVV(b, this.m_v1.w.GetNegative()) > 0 ? w.CrossFV(1, b) : w.CrossVF(b, 1);
                default:
                    y.b2Assert(false);
                    return new p();
            }
        }, Σ_2);
        Σ_2.refs.h.prototype.GetClosestPoint = Σ_2.addFunction(function αfmrS() {
            var Σ_2_107 = new Σ.Scope(this, αfmrS, '107', Σ_2, {}, []);
            switch (this.m_count) {
                case 0:
                    y.b2Assert(false);
                    return new p();
                case 1:
                    return this.m_v1.w;
                case 2:
                    return new p(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
                default:
                    y.b2Assert(false);
                    return new p();
            }
        }, Σ_2);
        Σ_2.refs.h.prototype.GetWitnessPoints = Σ_2.addFunction(function α9F78(b, e) {
            var Σ_2_108 = new Σ.Scope(this, α9F78, '108', Σ_2, {
                b: b,
                e: e
            }, []);
            switch (this.m_count) {
                case 0:
                    y.b2Assert(false);
                    break;
                case 1:
                    b.SetV(this.m_v1.wA);
                    e.SetV(this.m_v1.wB);
                    break;
                case 2:
                    b.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
                    b.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
                    e.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
                    e.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                    break;
                case 3:
                    e.x = b.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
                    e.y = b.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
                    break;
                default:
                    y.b2Assert(false);
            }
        }, Σ_2);
        Σ_2.refs.h.prototype.GetMetric = Σ_2.addFunction(function αwIMS() {
            var Σ_2_109 = new Σ.Scope(this, αwIMS, '109', Σ_2, {}, []);
            switch (this.m_count) {
                case 0:
                    y.b2Assert(false);
                    return 0;
                case 1:
                    return 0;
                case 2:
                    return w.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
                case 3:
                    return w.CrossVV(w.SubtractVV(this.m_v2.w, this.m_v1.w), w.SubtractVV(this.m_v3.w, this.m_v1.w));
                default:
                    y.b2Assert(false);
                    return 0;
            }
        }, Σ_2);
        Σ_2.refs.h.prototype.Solve2 = Σ_2.addFunction(function αj7x9() {
            var Σ_2_110 = new Σ.Scope(this, αj7x9, '110', Σ_2, {}, []);
            Σ_2_110.refs.b = this.m_v1.w, Σ_2_110.refs.e = this.m_v2.w, Σ_2_110.refs.f = Σ_2.refs.w.SubtractVV(Σ_2_110.refs.e, Σ_2_110.refs.b);
            Σ_2_110.refs.b = -(Σ_2_110.refs.b.x * Σ_2_110.refs.f.x + Σ_2_110.refs.b.y * Σ_2_110.refs.f.y);
            if (Σ_2_110.refs.b <= 0) {
                this.m_count = this.m_v1.a = 1;
            } else {
                Σ_2_110.refs.e = Σ_2_110.refs.e.x * Σ_2_110.refs.f.x + Σ_2_110.refs.e.y * Σ_2_110.refs.f.y;
                if (Σ_2_110.refs.e <= 0) {
                    this.m_count = this.m_v2.a = 1;
                    this.m_v1.Set(this.m_v2);
                } else {
                    Σ_2_110.refs.f = 1 / (Σ_2_110.refs.e + Σ_2_110.refs.b);
                    this.m_v1.a = Σ_2_110.refs.e * Σ_2_110.refs.f;
                    this.m_v2.a = Σ_2_110.refs.b * Σ_2_110.refs.f;
                    this.m_count = 2;
                }
            }
        }, Σ_2);
        Σ_2.refs.h.prototype.Solve3 = Σ_2.addFunction(function αgNBy() {
            var Σ_2_111 = new Σ.Scope(this, αgNBy, '111', Σ_2, {}, []);
            Σ_2_111.refs.b = this.m_v1.w, Σ_2_111.refs.e = this.m_v2.w, Σ_2_111.refs.f = this.m_v3.w, Σ_2_111.refs.m = Σ_2.refs.w.SubtractVV(Σ_2_111.refs.e, Σ_2_111.refs.b), Σ_2_111.refs.r = Σ_2.refs.w.Dot(Σ_2_111.refs.b, Σ_2_111.refs.m), Σ_2_111.refs.s = Σ_2.refs.w.Dot(Σ_2_111.refs.e, Σ_2_111.refs.m);
            Σ_2_111.refs.r = -Σ_2_111.refs.r;
            Σ_2_111.refs.v = Σ_2.refs.w.SubtractVV(Σ_2_111.refs.f, Σ_2_111.refs.b), Σ_2_111.refs.t = Σ_2.refs.w.Dot(Σ_2_111.refs.b, Σ_2_111.refs.v), Σ_2_111.refs.x = Σ_2.refs.w.Dot(Σ_2_111.refs.f, Σ_2_111.refs.v);
            Σ_2_111.refs.t = -Σ_2_111.refs.t;
            Σ_2_111.refs.C = Σ_2.refs.w.SubtractVV(Σ_2_111.refs.f, Σ_2_111.refs.e), Σ_2_111.refs.J = Σ_2.refs.w.Dot(Σ_2_111.refs.e, Σ_2_111.refs.C);
            Σ_2_111.refs.C = Σ_2.refs.w.Dot(Σ_2_111.refs.f, Σ_2_111.refs.C);
            Σ_2_111.refs.J = -Σ_2_111.refs.J;
            Σ_2_111.refs.v = Σ_2.refs.w.CrossVV(Σ_2_111.refs.m, Σ_2_111.refs.v);
            Σ_2_111.refs.m = Σ_2_111.refs.v * Σ_2.refs.w.CrossVV(Σ_2_111.refs.e, Σ_2_111.refs.f);
            Σ_2_111.refs.f = Σ_2_111.refs.v * Σ_2.refs.w.CrossVV(Σ_2_111.refs.f, Σ_2_111.refs.b);
            Σ_2_111.refs.b = Σ_2_111.refs.v * Σ_2.refs.w.CrossVV(Σ_2_111.refs.b, Σ_2_111.refs.e);
            if (Σ_2_111.refs.r <= 0 && Σ_2_111.refs.t <= 0) {
                this.m_count = this.m_v1.a = 1;
            } else if (Σ_2_111.refs.s > 0 && Σ_2_111.refs.r > 0 && Σ_2_111.refs.b <= 0) {
                Σ_2_111.refs.x = 1 / (Σ_2_111.refs.s + Σ_2_111.refs.r);
                this.m_v1.a = Σ_2_111.refs.s * Σ_2_111.refs.x;
                this.m_v2.a = Σ_2_111.refs.r * Σ_2_111.refs.x;
                this.m_count = 2;
            } else if (Σ_2_111.refs.x > 0 && Σ_2_111.refs.t > 0 && Σ_2_111.refs.f <= 0) {
                Σ_2_111.refs.s = 1 / (Σ_2_111.refs.x + Σ_2_111.refs.t);
                this.m_v1.a = Σ_2_111.refs.x * Σ_2_111.refs.s;
                this.m_v3.a = Σ_2_111.refs.t * Σ_2_111.refs.s;
                this.m_count = 2;
                this.m_v2.Set(this.m_v3);
            } else if (Σ_2_111.refs.s <= 0 && Σ_2_111.refs.J <= 0) {
                this.m_count = this.m_v2.a = 1;
                this.m_v1.Set(this.m_v2);
            } else if (Σ_2_111.refs.x <= 0 && Σ_2_111.refs.C <= 0) {
                this.m_count = this.m_v3.a = 1;
                this.m_v1.Set(this.m_v3);
            } else if (Σ_2_111.refs.C > 0 && Σ_2_111.refs.J > 0 && Σ_2_111.refs.m <= 0) {
                Σ_2_111.refs.s = 1 / (Σ_2_111.refs.C + Σ_2_111.refs.J);
                this.m_v2.a = Σ_2_111.refs.C * Σ_2_111.refs.s;
                this.m_v3.a = Σ_2_111.refs.J * Σ_2_111.refs.s;
                this.m_count = 2;
                this.m_v1.Set(this.m_v3);
            } else {
                Σ_2_111.refs.s = 1 / (Σ_2_111.refs.m + Σ_2_111.refs.f + Σ_2_111.refs.b);
                this.m_v1.a = Σ_2_111.refs.m * Σ_2_111.refs.s;
                this.m_v2.a = Σ_2_111.refs.f * Σ_2_111.refs.s;
                this.m_v3.a = Σ_2_111.refs.b * Σ_2_111.refs.s;
                this.m_count = 3;
            }
        }, Σ_2);
        Σ_2.refs.l.b2SimplexCache = Σ_2.addFunction(function αU3t6() {
            var Σ_2_112 = new Σ.Scope(this, αU3t6, '112', Σ_2, {}, []);
            this.indexA = new Σ.refs.Vector_a2j_Number(3);
            this.indexB = new Σ.refs.Vector_a2j_Number(3);
        }, Σ_2);
        Σ_2.refs.j.b2SimplexVertex = Σ_2.addFunction(function α8oHn() {
            var Σ_2_113 = new Σ.Scope(this, α8oHn, '113', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.j.prototype.Set = Σ_2.addFunction(function αPV3P(b) {
            var Σ_2_114 = new Σ.Scope(this, αPV3P, '114', Σ_2, {
                b: b
            }, []);
            this.wA.SetV(Σ_2_114.refs.b.wA);
            this.wB.SetV(Σ_2_114.refs.b.wB);
            this.w.SetV(Σ_2_114.refs.b.w);
            this.a = Σ_2_114.refs.b.a;
            this.indexA = Σ_2_114.refs.b.indexA;
            this.indexB = Σ_2_114.refs.b.indexB;
        }, Σ_2);
        Σ_2.refs.o.b2TimeOfImpact = Σ_2.addFunction(function αRbEC() {
            var Σ_2_115 = new Σ.Scope(this, αRbEC, '115', Σ_2, {}, []);
        }, Σ_2);
        Σ_2.refs.o.TimeOfImpact = Σ_2.addFunction(function αOwle(b) {
            var Σ_2_116 = new Σ.Scope(this, αOwle, '116', Σ_2, {
                b: b
            }, []);
            ++Σ_2.refs.o.b2_toiCalls;
            Σ_2_116.refs.e = Σ_2_116.refs.b.proxyA, Σ_2_116.refs.f = Σ_2_116.refs.b.proxyB, Σ_2_116.refs.m = Σ_2_116.refs.b.sweepA, Σ_2_116.refs.r = Σ_2_116.refs.b.sweepB;
            Σ_2.refs.y.b2Assert(Σ_2_116.refs.m.t0 == Σ_2_116.refs.r.t0);
            Σ_2.refs.y.b2Assert(1 - Σ_2_116.refs.m.t0 > Number.MIN_VALUE);
            Σ_2_116.refs.s = Σ_2_116.refs.e.m_radius + Σ_2_116.refs.f.m_radius;
            Σ_2_116.refs.b = Σ_2_116.refs.b.tolerance;
            Σ_2_116.refs.v = 0, Σ_2_116.refs.t = 0, Σ_2_116.refs.x = 0;
            Σ_2.refs.o.s_cache.count = 0;
            for (Σ_2.refs.o.s_distanceInput.useRadii = false;;) {
                Σ_2_116.refs.m.GetTransform(Σ_2.refs.o.s_xfA, Σ_2_116.refs.v);
                Σ_2_116.refs.r.GetTransform(Σ_2.refs.o.s_xfB, Σ_2_116.refs.v);
                Σ_2.refs.o.s_distanceInput.proxyA = Σ_2_116.refs.e;
                Σ_2.refs.o.s_distanceInput.proxyB = Σ_2_116.refs.f;
                Σ_2.refs.o.s_distanceInput.transformA = Σ_2.refs.o.s_xfA;
                Σ_2.refs.o.s_distanceInput.transformB = Σ_2.refs.o.s_xfB;
                Σ_2.refs.W.Distance(Σ_2.refs.o.s_distanceOutput, Σ_2.refs.o.s_cache, Σ_2.refs.o.s_distanceInput);
                if (Σ_2.refs.o.s_distanceOutput.distance <= 0) {
                    Σ_2_116.refs.v = 1;
                    break;
                }
                Σ_2.refs.o.s_fcn.Initialize(Σ_2.refs.o.s_cache, Σ_2_116.refs.e, Σ_2.refs.o.s_xfA, Σ_2_116.refs.f, Σ_2.refs.o.s_xfB);
                Σ_2_116.refs.C = Σ_2.refs.o.s_fcn.Evaluate(Σ_2.refs.o.s_xfA, Σ_2.refs.o.s_xfB);
                if (Σ_2_116.refs.C <= 0) {
                    Σ_2_116.refs.v = 1;
                    break;
                }
                if (Σ_2_116.refs.t == 0) {
                    Σ_2_116.refs.x = Σ_2_116.refs.C > Σ_2_116.refs.s ? Σ_2.refs.w.Max(Σ_2_116.refs.s - Σ_2_116.refs.b, 0.75 * Σ_2_116.refs.s) : Σ_2.refs.w.Max(Σ_2_116.refs.C - Σ_2_116.refs.b, 0.02 * Σ_2_116.refs.s);
                }
                if (Σ_2_116.refs.C - Σ_2_116.refs.x < 0.5 * Σ_2_116.refs.b) {
                    if (Σ_2_116.refs.t == 0) {
                        Σ_2_116.refs.v = 1;
                        break;
                    }
                    break;
                }
                Σ_2_116.refs.J = Σ_2_116.refs.v, Σ_2_116.refs.T = Σ_2_116.refs.v, Σ_2_116.refs.P = 1;
                Σ_2_116.refs.C = Σ_2_116.refs.C;
                Σ_2_116.refs.m.GetTransform(Σ_2.refs.o.s_xfA, Σ_2_116.refs.P);
                Σ_2_116.refs.r.GetTransform(Σ_2.refs.o.s_xfB, Σ_2_116.refs.P);
                Σ_2_116.refs.X = Σ_2.refs.o.s_fcn.Evaluate(Σ_2.refs.o.s_xfA, Σ_2.refs.o.s_xfB);
                if (Σ_2_116.refs.X >= Σ_2_116.refs.x) {
                    Σ_2_116.refs.v = 1;
                    break;
                }
                for (Σ_2_116.refs.$ = 0;;) {
                    Σ_2_116.refs.ba = 0;
                    Σ_2_116.refs.ba = Σ_2_116.refs.$ & 1 ? Σ_2_116.refs.T + (Σ_2_116.refs.x - Σ_2_116.refs.C) * (Σ_2_116.refs.P - Σ_2_116.refs.T) / (Σ_2_116.refs.X - Σ_2_116.refs.C) : 0.5 * (Σ_2_116.refs.T + Σ_2_116.refs.P);
                    Σ_2_116.refs.m.GetTransform(Σ_2.refs.o.s_xfA, Σ_2_116.refs.ba);
                    Σ_2_116.refs.r.GetTransform(Σ_2.refs.o.s_xfB, Σ_2_116.refs.ba);
                    Σ_2_116.refs.ca = Σ_2.refs.o.s_fcn.Evaluate(Σ_2.refs.o.s_xfA, Σ_2.refs.o.s_xfB);
                    if (Σ_2.refs.w.Abs(Σ_2_116.refs.ca - Σ_2_116.refs.x) < 0.025 * Σ_2_116.refs.b) {
                        Σ_2_116.refs.J = Σ_2_116.refs.ba;
                        break;
                    }
                    if (Σ_2_116.refs.ca > Σ_2_116.refs.x) {
                        Σ_2_116.refs.T = Σ_2_116.refs.ba;
                        Σ_2_116.refs.C = Σ_2_116.refs.ca;
                    } else {
                        Σ_2_116.refs.P = Σ_2_116.refs.ba;
                        Σ_2_116.refs.X = Σ_2_116.refs.ca;
                    }
                    ++Σ_2_116.refs.$;
                    ++Σ_2.refs.o.b2_toiRootIters;
                    if (Σ_2_116.refs.$ == 50) {
                        break;
                    }
                }
                Σ_2.refs.o.b2_toiMaxRootIters = Σ_2.refs.w.Max(Σ_2.refs.o.b2_toiMaxRootIters, Σ_2_116.refs.$);
                if (Σ_2_116.refs.J < (1 + 100 * Number.MIN_VALUE) * Σ_2_116.refs.v) {
                    break;
                }
                Σ_2_116.refs.v = Σ_2_116.refs.J;
                Σ_2_116.refs.t++;
                ++Σ_2.refs.o.b2_toiIters;
                if (Σ_2_116.refs.t == 1000) {
                    break;
                }
            }
            Σ_2.refs.o.b2_toiMaxIters = Σ_2.refs.w.Max(Σ_2.refs.o.b2_toiMaxIters, Σ_2_116.refs.t);
            return Σ_2_116.refs.v;
        }, Σ_2);
        Σ.refs.Box2D.postDefs.push(Σ_2.addFunction(function αFuAR() {
            var Σ_2_117 = new Σ.Scope(this, αFuAR, '117', Σ_2, {}, []);
            Σ.refs.Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
            Σ.refs.Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
            Σ.refs.Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
            Σ.refs.Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
            Σ.refs.Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
            Σ.refs.Box2D.Collision.b2TimeOfImpact.s_cache = new Σ_2.refs.l();
            Σ.refs.Box2D.Collision.b2TimeOfImpact.s_distanceInput = new Σ_2.refs.Y();
            Σ.refs.Box2D.Collision.b2TimeOfImpact.s_xfA = new Σ_2.refs.U();
            Σ.refs.Box2D.Collision.b2TimeOfImpact.s_xfB = new Σ_2.refs.U();
            Σ.refs.Box2D.Collision.b2TimeOfImpact.s_fcn = new Σ_2.refs.d();
            Σ.refs.Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new Σ_2.refs.k();
        }, Σ_2));
        Σ_2.refs.q.b2TOIInput = Σ_2.addFunction(function α3h70() {
            var Σ_2_118 = new Σ.Scope(this, α3h70, '118', Σ_2, {}, []);
            this.proxyA = new Σ_2.refs.z();
            this.proxyB = new Σ_2.refs.z();
            this.sweepA = new Σ_2.refs.A();
            this.sweepB = new Σ_2.refs.A();
        }, Σ_2);
        Σ_2.refs.n.b2WorldManifold = Σ_2.addFunction(function αKPnu() {
            var Σ_2_119 = new Σ.Scope(this, αKPnu, '119', Σ_2, {}, []);
            this.m_normal = new Σ_2.refs.p();
        }, Σ_2);
        Σ_2.refs.n.prototype.b2WorldManifold = Σ_2.addFunction(function αeA0R() {
            var Σ_2_120 = new Σ.Scope(this, αeA0R, '120', Σ_2, {}, []);
            this.m_points = new Σ.refs.Vector(Σ_2.refs.y.b2_maxManifoldPoints);
            for (Σ_2_120.refs.b = 0; Σ_2_120.refs.b < Σ_2.refs.y.b2_maxManifoldPoints; Σ_2_120.refs.b++) {
                this.m_points[Σ_2_120.refs.b] = new Σ_2.refs.p();
            }
        }, Σ_2);
        Σ_2.refs.n.prototype.Initialize = Σ_2.addFunction(function αXgi9(b, e, f, m, r) {
            var Σ_2_121 = new Σ.Scope(this, αXgi9, '121', Σ_2, {
                b: b,
                e: e,
                f: f,
                m: m,
                r: r
            }, []);
            if (Σ_2_121.refs.f === undefined) {
                Σ_2_121.refs.f = 0;
            }
            if (Σ_2_121.refs.r === undefined) {
                Σ_2_121.refs.r = 0;
            }
            if (Σ_2_121.refs.b.m_pointCount != 0) {
                Σ_2_121.refs.s = 0, Σ_2_121.refs.v = undefined, Σ_2_121.refs.t = undefined, Σ_2_121.refs.x = 0, Σ_2_121.refs.C = 0, Σ_2_121.refs.J = 0, Σ_2_121.refs.T = 0, Σ_2_121.refs.P = 0;
                Σ_2_121.refs.v = 0;
                switch (b.m_type) {
                    case E.e_circles:
                        t = e.R;
                        v = b.m_localPoint;
                        s = e.position.x + t.col1.x * v.x + t.col2.x * v.y;
                        e = e.position.y + t.col1.y * v.x + t.col2.y * v.y;
                        t = m.R;
                        v = b.m_points[0].m_localPoint;
                        b = m.position.x + t.col1.x * v.x + t.col2.x * v.y;
                        m = m.position.y + t.col1.y * v.x + t.col2.y * v.y;
                        v = b - s;
                        t = m - e;
                        x = v * v + t * t;
                        if (x > Number.MIN_VALUE * Number.MIN_VALUE) {
                            x = Math.sqrt(x);
                            this.m_normal.x = v / x;
                            this.m_normal.y = t / x;
                        } else {
                            this.m_normal.x = 1;
                            this.m_normal.y = 0;
                        }
                        v = e + f * this.m_normal.y;
                        m = m - r * this.m_normal.y;
                        this.m_points[0].x = 0.5 * (s + f * this.m_normal.x + (b - r * this.m_normal.x));
                        this.m_points[0].y = 0.5 * (v + m);
                        break;
                    case E.e_faceA:
                        t = e.R;
                        v = b.m_localPlaneNormal;
                        x = t.col1.x * v.x + t.col2.x * v.y;
                        C = t.col1.y * v.x + t.col2.y * v.y;
                        t = e.R;
                        v = b.m_localPoint;
                        J = e.position.x + t.col1.x * v.x + t.col2.x * v.y;
                        T = e.position.y + t.col1.y * v.x + t.col2.y * v.y;
                        this.m_normal.x = x;
                        this.m_normal.y = C;
                        for (s = 0; s < b.m_pointCount; s++) {
                            t = m.R;
                            v = b.m_points[s].m_localPoint;
                            P = m.position.x + t.col1.x * v.x + t.col2.x * v.y;
                            v = m.position.y + t.col1.y * v.x + t.col2.y * v.y;
                            this.m_points[s].x = P + 0.5 * (f - (P - J) * x - (v - T) * C - r) * x;
                            this.m_points[s].y = v + 0.5 * (f - (P - J) * x - (v - T) * C - r) * C;
                        }
                        break;
                    case E.e_faceB:
                        t = m.R;
                        v = b.m_localPlaneNormal;
                        x = t.col1.x * v.x + t.col2.x * v.y;
                        C = t.col1.y * v.x + t.col2.y * v.y;
                        t = m.R;
                        v = b.m_localPoint;
                        J = m.position.x + t.col1.x * v.x + t.col2.x * v.y;
                        T = m.position.y + t.col1.y * v.x + t.col2.y * v.y;
                        this.m_normal.x = -x;
                        this.m_normal.y = -C;
                        for (s = 0; s < b.m_pointCount; s++) {
                            t = e.R;
                            v = b.m_points[s].m_localPoint;
                            P = e.position.x + t.col1.x * v.x + t.col2.x * v.y;
                            v = e.position.y + t.col1.y * v.x + t.col2.y * v.y;
                            this.m_points[s].x = P + 0.5 * (r - (P - J) * x - (v - T) * C - f) * x;
                            this.m_points[s].y = v + 0.5 * (r - (P - J) * x - (v - T) * C - f) * C;
                        }
                }
            }
        }, Σ_2);
        Σ_2.refs.a.ClipVertex = Σ_2.addFunction(function α5FQ4() {
            var Σ_2_122 = new Σ.Scope(this, α5FQ4, '122', Σ_2, {}, []);
            this.v = new Σ_2.refs.p();
            this.id = new Σ_2.refs.L();
        }, Σ_2);
        Σ_2.refs.a.prototype.Set = Σ_2.addFunction(function αuoUO(b) {
            var Σ_2_123 = new Σ.Scope(this, αuoUO, '123', Σ_2, {
                b: b
            }, []);
            this.v.SetV(Σ_2_123.refs.b.v);
            this.id.Set(Σ_2_123.refs.b.id);
        }, Σ_2);
        Σ_2.refs.c.Features = Σ_2.addFunction(function αvCPW() {
            var Σ_2_124 = new Σ.Scope(this, αvCPW, '124', Σ_2, {}, []);
        }, Σ_2);
        Object.defineProperty(Σ_2.refs.c.prototype, 'referenceEdge', {
            enumerable: false,
            configurable: true,
            get: Σ_2.addFunction(function αZU4x() {
                var Σ_2_125 = new Σ.Scope(this, αZU4x, '125', Σ_2, {}, []);
                return this._referenceEdge;
            }, Σ_2)
        });
        Object.defineProperty(Σ_2.refs.c.prototype, 'referenceEdge', {
            enumerable: false,
            configurable: true,
            set: Σ_2.addFunction(function α4CRm(b) {
                var Σ_2_126 = new Σ.Scope(this, α4CRm, '126', Σ_2, {
                    b: b
                }, []);
                if (Σ_2_126.refs.b === undefined) {
                    Σ_2_126.refs.b = 0;
                }
                this._referenceEdge = Σ_2_126.refs.b;
                this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255;
            }, Σ_2)
        });
        Object.defineProperty(Σ_2.refs.c.prototype, 'incidentEdge', {
            enumerable: false,
            configurable: true,
            get: Σ_2.addFunction(function αJFY7() {
                var Σ_2_127 = new Σ.Scope(this, αJFY7, '127', Σ_2, {}, []);
                return this._incidentEdge;
            }, Σ_2)
        });
        Object.defineProperty(Σ_2.refs.c.prototype, 'incidentEdge', {
            enumerable: false,
            configurable: true,
            set: Σ_2.addFunction(function αsm7p(b) {
                var Σ_2_128 = new Σ.Scope(this, αsm7p, '128', Σ_2, {
                    b: b
                }, []);
                if (Σ_2_128.refs.b === undefined) {
                    Σ_2_128.refs.b = 0;
                }
                this._incidentEdge = Σ_2_128.refs.b;
                this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280;
            }, Σ_2)
        });
        Object.defineProperty(Σ_2.refs.c.prototype, 'incidentVertex', {
            enumerable: false,
            configurable: true,
            get: Σ_2.addFunction(function αCG5i() {
                var Σ_2_129 = new Σ.Scope(this, αCG5i, '129', Σ_2, {}, []);
                return this._incidentVertex;
            }, Σ_2)
        });
        Object.defineProperty(Σ_2.refs.c.prototype, 'incidentVertex', {
            enumerable: false,
            configurable: true,
            set: Σ_2.addFunction(function αnMwQ(b) {
                var Σ_2_130 = new Σ.Scope(this, αnMwQ, '130', Σ_2, {
                    b: b
                }, []);
                if (Σ_2_130.refs.b === undefined) {
                    Σ_2_130.refs.b = 0;
                }
                this._incidentVertex = Σ_2_130.refs.b;
                this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex << 16 & 16711680;
            }, Σ_2)
        });
        Object.defineProperty(Σ_2.refs.c.prototype, 'flip', {
            enumerable: false,
            configurable: true,
            get: Σ_2.addFunction(function αnaug() {
                var Σ_2_131 = new Σ.Scope(this, αnaug, '131', Σ_2, {}, []);
                return this._flip;
            }, Σ_2)
        });
        Object.defineProperty(Σ_2.refs.c.prototype, 'flip', {
            enumerable: false,
            configurable: true,
            set: Σ_2.addFunction(function αh01A(b) {
                var Σ_2_132 = new Σ.Scope(this, αh01A, '132', Σ_2, {
                    b: b
                }, []);
                if (Σ_2_132.refs.b === undefined) {
                    Σ_2_132.refs.b = 0;
                }
                this._flip = Σ_2_132.refs.b;
                this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080;
            }, Σ_2)
        });
    }());
    (function α8slR() {
        var Σ_3 = new Σ.Scope(this, α8slR, '3', Σ, {}, []);
        Σ_3.refs.F = Σ.refs.Box2D.Common.b2Settings, Σ_3.refs.G = Σ.refs.Box2D.Collision.Shapes.b2CircleShape, Σ_3.refs.K = Σ.refs.Box2D.Collision.Shapes.b2EdgeChainDef, Σ_3.refs.y = Σ.refs.Box2D.Collision.Shapes.b2EdgeShape, Σ_3.refs.w = Σ.refs.Box2D.Collision.Shapes.b2MassData, Σ_3.refs.A = Σ.refs.Box2D.Collision.Shapes.b2PolygonShape, Σ_3.refs.U = Σ.refs.Box2D.Collision.Shapes.b2Shape, Σ_3.refs.p = Σ.refs.Box2D.Common.Math.b2Mat22, Σ_3.refs.B = Σ.refs.Box2D.Common.Math.b2Math, Σ_3.refs.Q = Σ.refs.Box2D.Common.Math.b2Transform, Σ_3.refs.V = Σ.refs.Box2D.Common.Math.b2Vec2, Σ_3.refs.M = Σ.refs.Box2D.Collision.b2Distance, Σ_3.refs.L = Σ.refs.Box2D.Collision.b2DistanceInput, Σ_3.refs.I = Σ.refs.Box2D.Collision.b2DistanceOutput, Σ_3.refs.W = Σ.refs.Box2D.Collision.b2DistanceProxy, Σ_3.refs.Y = Σ.refs.Box2D.Collision.b2SimplexCache;
        Σ.refs.Box2D.inherit(Σ_3.refs.G, Σ.refs.Box2D.Collision.Shapes.b2Shape);
        Σ_3.refs.G.prototype.__super = Σ.refs.Box2D.Collision.Shapes.b2Shape.prototype;
        Σ_3.refs.G.b2CircleShape = Σ_3.addFunction(function αIDf1() {
            var Σ_3_0 = new Σ.Scope(this, αIDf1, '0', Σ_3, {}, []);
            Σ.refs.Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
            this.m_p = new Σ_3.refs.V();
        }, Σ_3);
        Σ_3.refs.G.prototype.Copy = Σ_3.addFunction(function αfqeA() {
            var Σ_3_1 = new Σ.Scope(this, αfqeA, '1', Σ_3, {}, []);
            Σ_3_1.refs.k = new Σ_3.refs.G();
            Σ_3_1.refs.k.Set(this);
            return Σ_3_1.refs.k;
        }, Σ_3);
        Σ_3.refs.G.prototype.Set = Σ_3.addFunction(function αqwxh(k) {
            var Σ_3_2 = new Σ.Scope(this, αqwxh, '2', Σ_3, {
                k: k
            }, []);
            this.__super.Set.call(this, Σ_3_2.refs.k);
            if (Σ.refs.Box2D.is(Σ_3_2.refs.k, Σ_3.refs.G)) {
                this.m_p.SetV((Σ_3_2.refs.k instanceof Σ_3.refs.G ? Σ_3_2.refs.k : null).m_p);
            }
        }, Σ_3);
        Σ_3.refs.G.prototype.TestPoint = Σ_3.addFunction(function αUZhG(k, z) {
            var Σ_3_3 = new Σ.Scope(this, αUZhG, '3', Σ_3, {
                k: k,
                z: z
            }, []);
            Σ_3_3.refs.u = Σ_3_3.refs.k.R, Σ_3_3.refs.D = Σ_3_3.refs.k.position.x + (Σ_3_3.refs.u.col1.x * this.m_p.x + Σ_3_3.refs.u.col2.x * this.m_p.y);
            Σ_3_3.refs.u = Σ_3_3.refs.k.position.y + (Σ_3_3.refs.u.col1.y * this.m_p.x + Σ_3_3.refs.u.col2.y * this.m_p.y);
            Σ_3_3.refs.D = Σ_3_3.refs.z.x - Σ_3_3.refs.D;
            Σ_3_3.refs.u = Σ_3_3.refs.z.y - Σ_3_3.refs.u;
            return Σ_3_3.refs.D * Σ_3_3.refs.D + Σ_3_3.refs.u * Σ_3_3.refs.u <= this.m_radius * this.m_radius;
        }, Σ_3);
        Σ_3.refs.G.prototype.RayCast = Σ_3.addFunction(function αioZ6(k, z, u) {
            var Σ_3_4 = new Σ.Scope(this, αioZ6, '4', Σ_3, {
                k: k,
                z: z,
                u: u
            }, []);
            Σ_3_4.refs.D = Σ_3_4.refs.u.R, Σ_3_4.refs.H = Σ_3_4.refs.z.p1.x - (Σ_3_4.refs.u.position.x + (Σ_3_4.refs.D.col1.x * this.m_p.x + Σ_3_4.refs.D.col2.x * this.m_p.y));
            Σ_3_4.refs.u = Σ_3_4.refs.z.p1.y - (Σ_3_4.refs.u.position.y + (Σ_3_4.refs.D.col1.y * this.m_p.x + Σ_3_4.refs.D.col2.y * this.m_p.y));
            Σ_3_4.refs.D = Σ_3_4.refs.z.p2.x - Σ_3_4.refs.z.p1.x;
            Σ_3_4.refs.O = Σ_3_4.refs.z.p2.y - Σ_3_4.refs.z.p1.y, Σ_3_4.refs.E = Σ_3_4.refs.H * Σ_3_4.refs.D + Σ_3_4.refs.u * Σ_3_4.refs.O, Σ_3_4.refs.R = Σ_3_4.refs.D * Σ_3_4.refs.D + Σ_3_4.refs.O * Σ_3_4.refs.O, Σ_3_4.refs.N = Σ_3_4.refs.E * Σ_3_4.refs.E - Σ_3_4.refs.R * (Σ_3_4.refs.H * Σ_3_4.refs.H + Σ_3_4.refs.u * Σ_3_4.refs.u - this.m_radius * this.m_radius);
            if (Σ_3_4.refs.N < 0 || Σ_3_4.refs.R < Number.MIN_VALUE) {
                return false;
            }
            Σ_3_4.refs.E = -(Σ_3_4.refs.E + Math.sqrt(Σ_3_4.refs.N));
            if (0 <= Σ_3_4.refs.E && Σ_3_4.refs.E <= Σ_3_4.refs.z.maxFraction * Σ_3_4.refs.R) {
                Σ_3_4.refs.E /= Σ_3_4.refs.R;
                Σ_3_4.refs.k.fraction = Σ_3_4.refs.E;
                Σ_3_4.refs.k.normal.x = Σ_3_4.refs.H + Σ_3_4.refs.E * Σ_3_4.refs.D;
                Σ_3_4.refs.k.normal.y = Σ_3_4.refs.u + Σ_3_4.refs.E * Σ_3_4.refs.O;
                Σ_3_4.refs.k.normal.Normalize();
                return true;
            }
            return false;
        }, Σ_3);
        Σ_3.refs.G.prototype.ComputeAABB = Σ_3.addFunction(function αeCD2(k, z) {
            var Σ_3_5 = new Σ.Scope(this, αeCD2, '5', Σ_3, {
                k: k,
                z: z
            }, []);
            Σ_3_5.refs.u = Σ_3_5.refs.z.R, Σ_3_5.refs.D = Σ_3_5.refs.z.position.x + (Σ_3_5.refs.u.col1.x * this.m_p.x + Σ_3_5.refs.u.col2.x * this.m_p.y);
            Σ_3_5.refs.u = Σ_3_5.refs.z.position.y + (Σ_3_5.refs.u.col1.y * this.m_p.x + Σ_3_5.refs.u.col2.y * this.m_p.y);
            Σ_3_5.refs.k.lowerBound.Set(Σ_3_5.refs.D - this.m_radius, Σ_3_5.refs.u - this.m_radius);
            Σ_3_5.refs.k.upperBound.Set(Σ_3_5.refs.D + this.m_radius, Σ_3_5.refs.u + this.m_radius);
        }, Σ_3);
        Σ_3.refs.G.prototype.ComputeMass = Σ_3.addFunction(function α3SJQ(k, z) {
            var Σ_3_6 = new Σ.Scope(this, α3SJQ, '6', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_6.refs.z === undefined) {
                Σ_3_6.refs.z = 0;
            }
            Σ_3_6.refs.k.mass = Σ_3_6.refs.z * Σ_3.refs.F.b2_pi * this.m_radius * this.m_radius;
            Σ_3_6.refs.k.center.SetV(this.m_p);
            Σ_3_6.refs.k.I = Σ_3_6.refs.k.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y));
        }, Σ_3);
        Σ_3.refs.G.prototype.ComputeSubmergedArea = Σ_3.addFunction(function αTAzA(k, z, u, D) {
            var Σ_3_7 = new Σ.Scope(this, αTAzA, '7', Σ_3, {
                k: k,
                z: z,
                u: u,
                D: D
            }, []);
            if (Σ_3_7.refs.z === undefined) {
                Σ_3_7.refs.z = 0;
            }
            Σ_3_7.refs.u = Σ_3.refs.B.MulX(Σ_3_7.refs.u, this.m_p);
            Σ_3_7.refs.H = -(Σ_3.refs.B.Dot(Σ_3_7.refs.k, Σ_3_7.refs.u) - Σ_3_7.refs.z);
            if (Σ_3_7.refs.H < -this.m_radius + Number.MIN_VALUE) {
                return 0;
            }
            if (Σ_3_7.refs.H > this.m_radius) {
                Σ_3_7.refs.D.SetV(Σ_3_7.refs.u);
                return Math.PI * this.m_radius * this.m_radius;
            }
            Σ_3_7.refs.z = this.m_radius * this.m_radius;
            Σ_3_7.refs.O = Σ_3_7.refs.H * Σ_3_7.refs.H;
            Σ_3_7.refs.H = Σ_3_7.refs.z * (Math.asin(Σ_3_7.refs.H / this.m_radius) + Math.PI / 2) + Σ_3_7.refs.H * Math.sqrt(Σ_3_7.refs.z - Σ_3_7.refs.O);
            Σ_3_7.refs.z = -2 / 3 * Math.pow(Σ_3_7.refs.z - Σ_3_7.refs.O, 1.5) / Σ_3_7.refs.H;
            Σ_3_7.refs.D.x = Σ_3_7.refs.u.x + Σ_3_7.refs.k.x * Σ_3_7.refs.z;
            Σ_3_7.refs.D.y = Σ_3_7.refs.u.y + Σ_3_7.refs.k.y * Σ_3_7.refs.z;
            return Σ_3_7.refs.H;
        }, Σ_3);
        Σ_3.refs.G.prototype.GetLocalPosition = Σ_3.addFunction(function αt11D() {
            var Σ_3_8 = new Σ.Scope(this, αt11D, '8', Σ_3, {}, []);
            return this.m_p;
        }, Σ_3);
        Σ_3.refs.G.prototype.SetLocalPosition = Σ_3.addFunction(function αqcba(k) {
            var Σ_3_9 = new Σ.Scope(this, αqcba, '9', Σ_3, {
                k: k
            }, []);
            this.m_p.SetV(Σ_3_9.refs.k);
        }, Σ_3);
        Σ_3.refs.G.prototype.GetRadius = Σ_3.addFunction(function αM0vg() {
            var Σ_3_10 = new Σ.Scope(this, αM0vg, '10', Σ_3, {}, []);
            return this.m_radius;
        }, Σ_3);
        Σ_3.refs.G.prototype.SetRadius = Σ_3.addFunction(function αnfFn(k) {
            var Σ_3_11 = new Σ.Scope(this, αnfFn, '11', Σ_3, {
                k: k
            }, []);
            if (Σ_3_11.refs.k === undefined) {
                Σ_3_11.refs.k = 0;
            }
            this.m_radius = Σ_3_11.refs.k;
        }, Σ_3);
        Σ_3.refs.G.prototype.b2CircleShape = Σ_3.addFunction(function αTl7S(k) {
            var Σ_3_12 = new Σ.Scope(this, αTl7S, '12', Σ_3, {
                k: k
            }, []);
            if (Σ_3_12.refs.k === undefined) {
                Σ_3_12.refs.k = 0;
            }
            this.__super.b2Shape.call(this);
            this.m_type = Σ_3.refs.U.e_circleShape;
            this.m_radius = Σ_3_12.refs.k;
        }, Σ_3);
        Σ_3.refs.K.b2EdgeChainDef = Σ_3.addFunction(function αkooV() {
            var Σ_3_13 = new Σ.Scope(this, αkooV, '13', Σ_3, {}, []);
        }, Σ_3);
        Σ_3.refs.K.prototype.b2EdgeChainDef = Σ_3.addFunction(function αg9H7() {
            var Σ_3_14 = new Σ.Scope(this, αg9H7, '14', Σ_3, {}, []);
            this.vertexCount = 0;
            this.isALoop = true;
            this.vertices = [];
        }, Σ_3);
        Σ.refs.Box2D.inherit(Σ_3.refs.y, Σ.refs.Box2D.Collision.Shapes.b2Shape);
        Σ_3.refs.y.prototype.__super = Σ.refs.Box2D.Collision.Shapes.b2Shape.prototype;
        Σ_3.refs.y.b2EdgeShape = Σ_3.addFunction(function αEVF8() {
            var Σ_3_15 = new Σ.Scope(this, αEVF8, '15', Σ_3, {}, []);
            Σ.refs.Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
            this.s_supportVec = new Σ_3.refs.V();
            this.m_v1 = new Σ_3.refs.V();
            this.m_v2 = new Σ_3.refs.V();
            this.m_coreV1 = new Σ_3.refs.V();
            this.m_coreV2 = new Σ_3.refs.V();
            this.m_normal = new Σ_3.refs.V();
            this.m_direction = new Σ_3.refs.V();
            this.m_cornerDir1 = new Σ_3.refs.V();
            this.m_cornerDir2 = new Σ_3.refs.V();
        }, Σ_3);
        Σ_3.refs.y.prototype.TestPoint = Σ_3.addFunction(function αe4An() {
            var Σ_3_16 = new Σ.Scope(this, αe4An, '16', Σ_3, {}, []);
            return false;
        }, Σ_3);
        Σ_3.refs.y.prototype.RayCast = Σ_3.addFunction(function αUHyC(k, z, u) {
            var Σ_3_17 = new Σ.Scope(this, αUHyC, '17', Σ_3, {
                k: k,
                z: z,
                u: u
            }, []);
            Σ_3_17.refs.D = undefined, Σ_3_17.refs.H = Σ_3_17.refs.z.p2.x - Σ_3_17.refs.z.p1.x, Σ_3_17.refs.O = Σ_3_17.refs.z.p2.y - Σ_3_17.refs.z.p1.y;
            Σ_3_17.refs.D = Σ_3_17.refs.u.R;
            Σ_3_17.refs.E = Σ_3_17.refs.u.position.x + (Σ_3_17.refs.D.col1.x * this.m_v1.x + Σ_3_17.refs.D.col2.x * this.m_v1.y), Σ_3_17.refs.R = Σ_3_17.refs.u.position.y + (Σ_3_17.refs.D.col1.y * this.m_v1.x + Σ_3_17.refs.D.col2.y * this.m_v1.y), Σ_3_17.refs.N = Σ_3_17.refs.u.position.y + (Σ_3_17.refs.D.col1.y * this.m_v2.x + Σ_3_17.refs.D.col2.y * this.m_v2.y) - Σ_3_17.refs.R;
            Σ_3_17.refs.u = -(Σ_3_17.refs.u.position.x + (Σ_3_17.refs.D.col1.x * this.m_v2.x + Σ_3_17.refs.D.col2.x * this.m_v2.y) - Σ_3_17.refs.E);
            Σ_3_17.refs.D = 100 * Number.MIN_VALUE;
            Σ_3_17.refs.S = -(Σ_3_17.refs.H * Σ_3_17.refs.N + Σ_3_17.refs.O * Σ_3_17.refs.u);
            if (Σ_3_17.refs.S > Σ_3_17.refs.D) {
                Σ_3_17.refs.E = Σ_3_17.refs.z.p1.x - Σ_3_17.refs.E;
                Σ_3_17.refs.aa = Σ_3_17.refs.z.p1.y - Σ_3_17.refs.R;
                Σ_3_17.refs.R = Σ_3_17.refs.E * Σ_3_17.refs.N + Σ_3_17.refs.aa * Σ_3_17.refs.u;
                if (0 <= Σ_3_17.refs.R && Σ_3_17.refs.R <= Σ_3_17.refs.z.maxFraction * Σ_3_17.refs.S) {
                    Σ_3_17.refs.z = -Σ_3_17.refs.H * Σ_3_17.refs.aa + Σ_3_17.refs.O * Σ_3_17.refs.E;
                    if (-Σ_3_17.refs.D * Σ_3_17.refs.S <= Σ_3_17.refs.z && Σ_3_17.refs.z <= Σ_3_17.refs.S * (1 + Σ_3_17.refs.D)) {
                        Σ_3_17.refs.R /= Σ_3_17.refs.S;
                        Σ_3_17.refs.k.fraction = Σ_3_17.refs.R;
                        Σ_3_17.refs.z = Math.sqrt(Σ_3_17.refs.N * Σ_3_17.refs.N + Σ_3_17.refs.u * Σ_3_17.refs.u);
                        Σ_3_17.refs.k.normal.x = Σ_3_17.refs.N / Σ_3_17.refs.z;
                        Σ_3_17.refs.k.normal.y = Σ_3_17.refs.u / Σ_3_17.refs.z;
                        return true;
                    }
                }
            }
            return false;
        }, Σ_3);
        Σ_3.refs.y.prototype.ComputeAABB = Σ_3.addFunction(function αyRfr(k, z) {
            var Σ_3_18 = new Σ.Scope(this, αyRfr, '18', Σ_3, {
                k: k,
                z: z
            }, []);
            Σ_3_18.refs.u = Σ_3_18.refs.z.R, Σ_3_18.refs.D = Σ_3_18.refs.z.position.x + (Σ_3_18.refs.u.col1.x * this.m_v1.x + Σ_3_18.refs.u.col2.x * this.m_v1.y), Σ_3_18.refs.H = Σ_3_18.refs.z.position.y + (Σ_3_18.refs.u.col1.y * this.m_v1.x + Σ_3_18.refs.u.col2.y * this.m_v1.y), Σ_3_18.refs.O = Σ_3_18.refs.z.position.x + (Σ_3_18.refs.u.col1.x * this.m_v2.x + Σ_3_18.refs.u.col2.x * this.m_v2.y);
            Σ_3_18.refs.u = Σ_3_18.refs.z.position.y + (Σ_3_18.refs.u.col1.y * this.m_v2.x + Σ_3_18.refs.u.col2.y * this.m_v2.y);
            if (Σ_3_18.refs.D < Σ_3_18.refs.O) {
                Σ_3_18.refs.k.lowerBound.x = Σ_3_18.refs.D;
                Σ_3_18.refs.k.upperBound.x = Σ_3_18.refs.O;
            } else {
                Σ_3_18.refs.k.lowerBound.x = Σ_3_18.refs.O;
                Σ_3_18.refs.k.upperBound.x = Σ_3_18.refs.D;
            }
            if (Σ_3_18.refs.H < Σ_3_18.refs.u) {
                Σ_3_18.refs.k.lowerBound.y = Σ_3_18.refs.H;
                Σ_3_18.refs.k.upperBound.y = Σ_3_18.refs.u;
            } else {
                Σ_3_18.refs.k.lowerBound.y = Σ_3_18.refs.u;
                Σ_3_18.refs.k.upperBound.y = Σ_3_18.refs.H;
            }
        }, Σ_3);
        Σ_3.refs.y.prototype.ComputeMass = Σ_3.addFunction(function αtJGj(k) {
            var Σ_3_19 = new Σ.Scope(this, αtJGj, '19', Σ_3, {
                k: k
            }, []);
            Σ_3_19.refs.k.mass = 0;
            Σ_3_19.refs.k.center.SetV(this.m_v1);
            Σ_3_19.refs.k.I = 0;
        }, Σ_3);
        Σ_3.refs.y.prototype.ComputeSubmergedArea = Σ_3.addFunction(function αz8aM(k, z, u, D) {
            var Σ_3_20 = new Σ.Scope(this, αz8aM, '20', Σ_3, {
                k: k,
                z: z,
                u: u,
                D: D
            }, []);
            if (Σ_3_20.refs.z === undefined) {
                Σ_3_20.refs.z = 0;
            }
            Σ_3_20.refs.H = new Σ_3.refs.V(Σ_3_20.refs.k.x * Σ_3_20.refs.z, Σ_3_20.refs.k.y * Σ_3_20.refs.z), Σ_3_20.refs.O = Σ_3.refs.B.MulX(Σ_3_20.refs.u, this.m_v1);
            Σ_3_20.refs.u = Σ_3.refs.B.MulX(Σ_3_20.refs.u, this.m_v2);
            Σ_3_20.refs.E = Σ_3.refs.B.Dot(Σ_3_20.refs.k, Σ_3_20.refs.O) - Σ_3_20.refs.z;
            Σ_3_20.refs.k = Σ_3.refs.B.Dot(Σ_3_20.refs.k, Σ_3_20.refs.u) - Σ_3_20.refs.z;
            if (Σ_3_20.refs.E > 0) {
                if (Σ_3_20.refs.k > 0) {
                    return 0;
                } else {
                    Σ_3_20.refs.O.x = -Σ_3_20.refs.k / (Σ_3_20.refs.E - Σ_3_20.refs.k) * Σ_3_20.refs.O.x + Σ_3_20.refs.E / (Σ_3_20.refs.E - Σ_3_20.refs.k) * Σ_3_20.refs.u.x;
                    Σ_3_20.refs.O.y = -Σ_3_20.refs.k / (Σ_3_20.refs.E - Σ_3_20.refs.k) * Σ_3_20.refs.O.y + Σ_3_20.refs.E / (Σ_3_20.refs.E - Σ_3_20.refs.k) * Σ_3_20.refs.u.y;
                }
            } else if (Σ_3_20.refs.k > 0) {
                Σ_3_20.refs.u.x = -Σ_3_20.refs.k / (Σ_3_20.refs.E - Σ_3_20.refs.k) * Σ_3_20.refs.O.x + Σ_3_20.refs.E / (Σ_3_20.refs.E - Σ_3_20.refs.k) * Σ_3_20.refs.u.x;
                Σ_3_20.refs.u.y = -Σ_3_20.refs.k / (Σ_3_20.refs.E - Σ_3_20.refs.k) * Σ_3_20.refs.O.y + Σ_3_20.refs.E / (Σ_3_20.refs.E - Σ_3_20.refs.k) * Σ_3_20.refs.u.y;
            }
            Σ_3_20.refs.D.x = (Σ_3_20.refs.H.x + Σ_3_20.refs.O.x + Σ_3_20.refs.u.x) / 3;
            Σ_3_20.refs.D.y = (Σ_3_20.refs.H.y + Σ_3_20.refs.O.y + Σ_3_20.refs.u.y) / 3;
            return 0.5 * ((Σ_3_20.refs.O.x - Σ_3_20.refs.H.x) * (Σ_3_20.refs.u.y - Σ_3_20.refs.H.y) - (Σ_3_20.refs.O.y - Σ_3_20.refs.H.y) * (Σ_3_20.refs.u.x - Σ_3_20.refs.H.x));
        }, Σ_3);
        Σ_3.refs.y.prototype.GetLength = Σ_3.addFunction(function α1kmF() {
            var Σ_3_21 = new Σ.Scope(this, α1kmF, '21', Σ_3, {}, []);
            return this.m_length;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetVertex1 = Σ_3.addFunction(function αu1kT() {
            var Σ_3_22 = new Σ.Scope(this, αu1kT, '22', Σ_3, {}, []);
            return this.m_v1;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetVertex2 = Σ_3.addFunction(function αYPMa() {
            var Σ_3_23 = new Σ.Scope(this, αYPMa, '23', Σ_3, {}, []);
            return this.m_v2;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetCoreVertex1 = Σ_3.addFunction(function αn7AZ() {
            var Σ_3_24 = new Σ.Scope(this, αn7AZ, '24', Σ_3, {}, []);
            return this.m_coreV1;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetCoreVertex2 = Σ_3.addFunction(function αfANo() {
            var Σ_3_25 = new Σ.Scope(this, αfANo, '25', Σ_3, {}, []);
            return this.m_coreV2;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetNormalVector = Σ_3.addFunction(function αftKZ() {
            var Σ_3_26 = new Σ.Scope(this, αftKZ, '26', Σ_3, {}, []);
            return this.m_normal;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetDirectionVector = Σ_3.addFunction(function αKxHD() {
            var Σ_3_27 = new Σ.Scope(this, αKxHD, '27', Σ_3, {}, []);
            return this.m_direction;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetCorner1Vector = Σ_3.addFunction(function αWYpT() {
            var Σ_3_28 = new Σ.Scope(this, αWYpT, '28', Σ_3, {}, []);
            return this.m_cornerDir1;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetCorner2Vector = Σ_3.addFunction(function αuTQI() {
            var Σ_3_29 = new Σ.Scope(this, αuTQI, '29', Σ_3, {}, []);
            return this.m_cornerDir2;
        }, Σ_3);
        Σ_3.refs.y.prototype.Corner1IsConvex = Σ_3.addFunction(function αTfjQ() {
            var Σ_3_30 = new Σ.Scope(this, αTfjQ, '30', Σ_3, {}, []);
            return this.m_cornerConvex1;
        }, Σ_3);
        Σ_3.refs.y.prototype.Corner2IsConvex = Σ_3.addFunction(function αSYkg() {
            var Σ_3_31 = new Σ.Scope(this, αSYkg, '31', Σ_3, {}, []);
            return this.m_cornerConvex2;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetFirstVertex = Σ_3.addFunction(function αs1ZI(k) {
            var Σ_3_32 = new Σ.Scope(this, αs1ZI, '32', Σ_3, {
                k: k
            }, []);
            Σ_3_32.refs.z = Σ_3_32.refs.k.R;
            return new Σ_3.refs.V(Σ_3_32.refs.k.position.x + (Σ_3_32.refs.z.col1.x * this.m_coreV1.x + Σ_3_32.refs.z.col2.x * this.m_coreV1.y), Σ_3_32.refs.k.position.y + (Σ_3_32.refs.z.col1.y * this.m_coreV1.x + Σ_3_32.refs.z.col2.y * this.m_coreV1.y));
        }, Σ_3);
        Σ_3.refs.y.prototype.GetNextEdge = Σ_3.addFunction(function αPKWY() {
            var Σ_3_33 = new Σ.Scope(this, αPKWY, '33', Σ_3, {}, []);
            return this.m_nextEdge;
        }, Σ_3);
        Σ_3.refs.y.prototype.GetPrevEdge = Σ_3.addFunction(function αzfaT() {
            var Σ_3_34 = new Σ.Scope(this, αzfaT, '34', Σ_3, {}, []);
            return this.m_prevEdge;
        }, Σ_3);
        Σ_3.refs.y.prototype.Support = Σ_3.addFunction(function αPtzm(k, z, u) {
            var Σ_3_35 = new Σ.Scope(this, αPtzm, '35', Σ_3, {
                k: k,
                z: z,
                u: u
            }, []);
            if (Σ_3_35.refs.z === undefined) {
                Σ_3_35.refs.z = 0;
            }
            if (Σ_3_35.refs.u === undefined) {
                Σ_3_35.refs.u = 0;
            }
            Σ_3_35.refs.D = Σ_3_35.refs.k.R, Σ_3_35.refs.H = Σ_3_35.refs.k.position.x + (Σ_3_35.refs.D.col1.x * this.m_coreV1.x + Σ_3_35.refs.D.col2.x * this.m_coreV1.y), Σ_3_35.refs.O = Σ_3_35.refs.k.position.y + (Σ_3_35.refs.D.col1.y * this.m_coreV1.x + Σ_3_35.refs.D.col2.y * this.m_coreV1.y), Σ_3_35.refs.E = Σ_3_35.refs.k.position.x + (Σ_3_35.refs.D.col1.x * this.m_coreV2.x + Σ_3_35.refs.D.col2.x * this.m_coreV2.y);
            Σ_3_35.refs.k = Σ_3_35.refs.k.position.y + (Σ_3_35.refs.D.col1.y * this.m_coreV2.x + Σ_3_35.refs.D.col2.y * this.m_coreV2.y);
            if (Σ_3_35.refs.H * Σ_3_35.refs.z + Σ_3_35.refs.O * Σ_3_35.refs.u > Σ_3_35.refs.E * Σ_3_35.refs.z + Σ_3_35.refs.k * Σ_3_35.refs.u) {
                this.s_supportVec.x = Σ_3_35.refs.H;
                this.s_supportVec.y = Σ_3_35.refs.O;
            } else {
                this.s_supportVec.x = Σ_3_35.refs.E;
                this.s_supportVec.y = Σ_3_35.refs.k;
            }
            return this.s_supportVec;
        }, Σ_3);
        Σ_3.refs.y.prototype.b2EdgeShape = Σ_3.addFunction(function αMx9H(k, z) {
            var Σ_3_36 = new Σ.Scope(this, αMx9H, '36', Σ_3, {
                k: k,
                z: z
            }, []);
            this.__super.b2Shape.call(this);
            this.m_type = Σ_3.refs.U.e_edgeShape;
            this.m_nextEdge = this.m_prevEdge = null;
            this.m_v1 = Σ_3_36.refs.k;
            this.m_v2 = Σ_3_36.refs.z;
            this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
            this.m_length = this.m_direction.Normalize();
            this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
            this.m_coreV1.Set(-Σ_3.refs.F.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -Σ_3.refs.F.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
            this.m_coreV2.Set(-Σ_3.refs.F.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -Σ_3.refs.F.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
            this.m_cornerDir1 = this.m_normal;
            this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y);
        }, Σ_3);
        Σ_3.refs.y.prototype.SetPrevEdge = Σ_3.addFunction(function αGZJD(k, z, u, D) {
            var Σ_3_37 = new Σ.Scope(this, αGZJD, '37', Σ_3, {
                k: k,
                z: z,
                u: u,
                D: D
            }, []);
            this.m_prevEdge = Σ_3_37.refs.k;
            this.m_coreV1 = Σ_3_37.refs.z;
            this.m_cornerDir1 = Σ_3_37.refs.u;
            this.m_cornerConvex1 = Σ_3_37.refs.D;
        }, Σ_3);
        Σ_3.refs.y.prototype.SetNextEdge = Σ_3.addFunction(function αDKHs(k, z, u, D) {
            var Σ_3_38 = new Σ.Scope(this, αDKHs, '38', Σ_3, {
                k: k,
                z: z,
                u: u,
                D: D
            }, []);
            this.m_nextEdge = Σ_3_38.refs.k;
            this.m_coreV2 = Σ_3_38.refs.z;
            this.m_cornerDir2 = Σ_3_38.refs.u;
            this.m_cornerConvex2 = Σ_3_38.refs.D;
        }, Σ_3);
        Σ_3.refs.w.b2MassData = Σ_3.addFunction(function αFHmc() {
            var Σ_3_39 = new Σ.Scope(this, αFHmc, '39', Σ_3, {}, []);
            this.mass = 0;
            this.center = new Σ_3.refs.V(0, 0);
            this.I = 0;
        }, Σ_3);
        Σ.refs.Box2D.inherit(Σ_3.refs.A, Σ.refs.Box2D.Collision.Shapes.b2Shape);
        Σ_3.refs.A.prototype.__super = Σ.refs.Box2D.Collision.Shapes.b2Shape.prototype;
        Σ_3.refs.A.b2PolygonShape = Σ_3.addFunction(function αdrZc() {
            var Σ_3_40 = new Σ.Scope(this, αdrZc, '40', Σ_3, {}, []);
            Σ.refs.Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        }, Σ_3);
        Σ_3.refs.A.prototype.Copy = Σ_3.addFunction(function αrZ0z() {
            var Σ_3_41 = new Σ.Scope(this, αrZ0z, '41', Σ_3, {}, []);
            Σ_3_41.refs.k = new Σ_3.refs.A();
            Σ_3_41.refs.k.Set(this);
            return Σ_3_41.refs.k;
        }, Σ_3);
        Σ_3.refs.A.prototype.Set = Σ_3.addFunction(function αrlW9(k) {
            var Σ_3_42 = new Σ.Scope(this, αrlW9, '42', Σ_3, {
                k: k
            }, []);
            this.__super.Set.call(this, Σ_3_42.refs.k);
            if (Σ.refs.Box2D.is(Σ_3_42.refs.k, Σ_3.refs.A)) {
                Σ_3_42.refs.k = Σ_3_42.refs.k instanceof Σ_3.refs.A ? Σ_3_42.refs.k : null;
                this.m_centroid.SetV(Σ_3_42.refs.k.m_centroid);
                this.m_vertexCount = Σ_3_42.refs.k.m_vertexCount;
                this.Reserve(this.m_vertexCount);
                for (Σ_3_42.refs.z = 0; Σ_3_42.refs.z < this.m_vertexCount; Σ_3_42.refs.z++) {
                    this.m_vertices[Σ_3_42.refs.z].SetV(Σ_3_42.refs.k.m_vertices[Σ_3_42.refs.z]);
                    this.m_normals[Σ_3_42.refs.z].SetV(Σ_3_42.refs.k.m_normals[Σ_3_42.refs.z]);
                }
            }
        }, Σ_3);
        Σ_3.refs.A.prototype.SetAsArray = Σ_3.addFunction(function αzCoV(k, z) {
            var Σ_3_43 = new Σ.Scope(this, αzCoV, '43', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_43.refs.z === undefined) {
                Σ_3_43.refs.z = 0;
            }
            Σ_3_43.refs.u = new Σ.refs.Vector(), Σ_3_43.refs.D = 0, Σ_3_43.refs.H = undefined;
            for (Σ_3_43.refs.D = 0; Σ_3_43.refs.D < Σ_3_43.refs.k.length; ++Σ_3_43.refs.D) {
                Σ_3_43.refs.H = Σ_3_43.refs.k[Σ_3_43.refs.D];
                Σ_3_43.refs.u.push(Σ_3_43.refs.H);
            }
            this.SetAsVector(Σ_3_43.refs.u, Σ_3_43.refs.z);
        }, Σ_3);
        Σ_3.refs.A.AsArray = Σ_3.addFunction(function αPPQH(k, z) {
            var Σ_3_44 = new Σ.Scope(this, αPPQH, '44', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_44.refs.z === undefined) {
                Σ_3_44.refs.z = 0;
            }
            Σ_3_44.refs.u = new Σ_3.refs.A();
            Σ_3_44.refs.u.SetAsArray(Σ_3_44.refs.k, Σ_3_44.refs.z);
            return Σ_3_44.refs.u;
        }, Σ_3);
        Σ_3.refs.A.prototype.SetAsVector = Σ_3.addFunction(function αhfuh(k, z) {
            var Σ_3_45 = new Σ.Scope(this, αhfuh, '45', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_45.refs.z === undefined) {
                Σ_3_45.refs.z = 0;
            }
            if (Σ_3_45.refs.z == 0) {
                Σ_3_45.refs.z = Σ_3_45.refs.k.length;
            }
            Σ_3.refs.F.b2Assert(2 <= Σ_3_45.refs.z);
            this.m_vertexCount = Σ_3_45.refs.z;
            this.Reserve(Σ_3_45.refs.z);
            Σ_3_45.refs.u = 0;
            for (Σ_3_45.refs.u = 0; Σ_3_45.refs.u < this.m_vertexCount; Σ_3_45.refs.u++) {
                this.m_vertices[Σ_3_45.refs.u].SetV(Σ_3_45.refs.k[Σ_3_45.refs.u]);
            }
            for (Σ_3_45.refs.u = 0; Σ_3_45.refs.u < this.m_vertexCount; ++Σ_3_45.refs.u) {
                Σ_3_45.refs.D = parseInt(Σ_3_45.refs.u), Σ_3_45.refs.H = parseInt(Σ_3_45.refs.u + 1 < this.m_vertexCount ? Σ_3_45.refs.u + 1 : 0);
                Σ_3_45.refs.D = Σ_3.refs.B.SubtractVV(this.m_vertices[Σ_3_45.refs.H], this.m_vertices[Σ_3_45.refs.D]);
                Σ_3.refs.F.b2Assert(Σ_3_45.refs.D.LengthSquared() > Number.MIN_VALUE);
                this.m_normals[Σ_3_45.refs.u].SetV(Σ_3.refs.B.CrossVF(Σ_3_45.refs.D, 1));
                this.m_normals[Σ_3_45.refs.u].Normalize();
            }
            this.m_centroid = Σ_3.refs.A.ComputeCentroid(this.m_vertices, this.m_vertexCount);
        }, Σ_3);
        Σ_3.refs.A.AsVector = Σ_3.addFunction(function αugw2(k, z) {
            var Σ_3_46 = new Σ.Scope(this, αugw2, '46', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_46.refs.z === undefined) {
                Σ_3_46.refs.z = 0;
            }
            Σ_3_46.refs.u = new Σ_3.refs.A();
            Σ_3_46.refs.u.SetAsVector(Σ_3_46.refs.k, Σ_3_46.refs.z);
            return Σ_3_46.refs.u;
        }, Σ_3);
        Σ_3.refs.A.prototype.SetAsBox = Σ_3.addFunction(function αAQsq(k, z) {
            var Σ_3_47 = new Σ.Scope(this, αAQsq, '47', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_47.refs.k === undefined) {
                Σ_3_47.refs.k = 0;
            }
            if (Σ_3_47.refs.z === undefined) {
                Σ_3_47.refs.z = 0;
            }
            this.m_vertexCount = 4;
            this.Reserve(4);
            this.m_vertices[0].Set(-Σ_3_47.refs.k, -Σ_3_47.refs.z);
            this.m_vertices[1].Set(Σ_3_47.refs.k, -Σ_3_47.refs.z);
            this.m_vertices[2].Set(Σ_3_47.refs.k, Σ_3_47.refs.z);
            this.m_vertices[3].Set(-Σ_3_47.refs.k, Σ_3_47.refs.z);
            this.m_normals[0].Set(0, -1);
            this.m_normals[1].Set(1, 0);
            this.m_normals[2].Set(0, 1);
            this.m_normals[3].Set(-1, 0);
            this.m_centroid.SetZero();
        }, Σ_3);
        Σ_3.refs.A.AsBox = Σ_3.addFunction(function α9f6I(k, z) {
            var Σ_3_48 = new Σ.Scope(this, α9f6I, '48', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_48.refs.k === undefined) {
                Σ_3_48.refs.k = 0;
            }
            if (Σ_3_48.refs.z === undefined) {
                Σ_3_48.refs.z = 0;
            }
            Σ_3_48.refs.u = new Σ_3.refs.A();
            Σ_3_48.refs.u.SetAsBox(Σ_3_48.refs.k, Σ_3_48.refs.z);
            return Σ_3_48.refs.u;
        }, Σ_3);
        Σ_3.refs.A.prototype.SetAsOrientedBox = Σ_3.addFunction(function αHcN5(k, z, u, D) {
            var Σ_3_49 = new Σ.Scope(this, αHcN5, '49', Σ_3, {
                k: k,
                z: z,
                u: u,
                D: D
            }, []);
            if (Σ_3_49.refs.k === undefined) {
                Σ_3_49.refs.k = 0;
            }
            if (Σ_3_49.refs.z === undefined) {
                Σ_3_49.refs.z = 0;
            }
            if (Σ_3_49.refs.u === undefined) {
                Σ_3_49.refs.u = null;
            }
            if (Σ_3_49.refs.D === undefined) {
                Σ_3_49.refs.D = 0;
            }
            this.m_vertexCount = 4;
            this.Reserve(4);
            this.m_vertices[0].Set(-Σ_3_49.refs.k, -Σ_3_49.refs.z);
            this.m_vertices[1].Set(Σ_3_49.refs.k, -Σ_3_49.refs.z);
            this.m_vertices[2].Set(Σ_3_49.refs.k, Σ_3_49.refs.z);
            this.m_vertices[3].Set(-Σ_3_49.refs.k, Σ_3_49.refs.z);
            this.m_normals[0].Set(0, -1);
            this.m_normals[1].Set(1, 0);
            this.m_normals[2].Set(0, 1);
            this.m_normals[3].Set(-1, 0);
            this.m_centroid = Σ_3_49.refs.u;
            Σ_3_49.refs.k = new Σ_3.refs.Q();
            Σ_3_49.refs.k.position = Σ_3_49.refs.u;
            Σ_3_49.refs.k.R.Set(Σ_3_49.refs.D);
            for (Σ_3_49.refs.u = 0; Σ_3_49.refs.u < this.m_vertexCount; ++Σ_3_49.refs.u) {
                this.m_vertices[Σ_3_49.refs.u] = Σ_3.refs.B.MulX(Σ_3_49.refs.k, this.m_vertices[Σ_3_49.refs.u]);
                this.m_normals[Σ_3_49.refs.u] = Σ_3.refs.B.MulMV(Σ_3_49.refs.k.R, this.m_normals[Σ_3_49.refs.u]);
            }
        }, Σ_3);
        Σ_3.refs.A.AsOrientedBox = Σ_3.addFunction(function αUJOB(k, z, u, D) {
            var Σ_3_50 = new Σ.Scope(this, αUJOB, '50', Σ_3, {
                k: k,
                z: z,
                u: u,
                D: D
            }, []);
            if (Σ_3_50.refs.k === undefined) {
                Σ_3_50.refs.k = 0;
            }
            if (Σ_3_50.refs.z === undefined) {
                Σ_3_50.refs.z = 0;
            }
            if (Σ_3_50.refs.u === undefined) {
                Σ_3_50.refs.u = null;
            }
            if (Σ_3_50.refs.D === undefined) {
                Σ_3_50.refs.D = 0;
            }
            Σ_3_50.refs.H = new Σ_3.refs.A();
            Σ_3_50.refs.H.SetAsOrientedBox(Σ_3_50.refs.k, Σ_3_50.refs.z, Σ_3_50.refs.u, Σ_3_50.refs.D);
            return Σ_3_50.refs.H;
        }, Σ_3);
        Σ_3.refs.A.prototype.SetAsEdge = Σ_3.addFunction(function αEWri(k, z) {
            var Σ_3_51 = new Σ.Scope(this, αEWri, '51', Σ_3, {
                k: k,
                z: z
            }, []);
            this.m_vertexCount = 2;
            this.Reserve(2);
            this.m_vertices[0].SetV(Σ_3_51.refs.k);
            this.m_vertices[1].SetV(Σ_3_51.refs.z);
            this.m_centroid.x = 0.5 * (Σ_3_51.refs.k.x + Σ_3_51.refs.z.x);
            this.m_centroid.y = 0.5 * (Σ_3_51.refs.k.y + Σ_3_51.refs.z.y);
            this.m_normals[0] = Σ_3.refs.B.CrossVF(Σ_3.refs.B.SubtractVV(Σ_3_51.refs.z, Σ_3_51.refs.k), 1);
            this.m_normals[0].Normalize();
            this.m_normals[1].x = -this.m_normals[0].x;
            this.m_normals[1].y = -this.m_normals[0].y;
        }, Σ_3);
        Σ_3.refs.A.AsEdge = Σ_3.addFunction(function αaqUZ(k, z) {
            var Σ_3_52 = new Σ.Scope(this, αaqUZ, '52', Σ_3, {
                k: k,
                z: z
            }, []);
            Σ_3_52.refs.u = new Σ_3.refs.A();
            Σ_3_52.refs.u.SetAsEdge(Σ_3_52.refs.k, Σ_3_52.refs.z);
            return Σ_3_52.refs.u;
        }, Σ_3);
        Σ_3.refs.A.prototype.TestPoint = Σ_3.addFunction(function αwNTY(k, z) {
            var Σ_3_53 = new Σ.Scope(this, αwNTY, '53', Σ_3, {
                k: k,
                z: z
            }, []);
            Σ_3_53.refs.u = undefined;
            Σ_3_53.refs.u = Σ_3_53.refs.k.R;
            for (Σ_3_53.refs.D = Σ_3_53.refs.z.x - Σ_3_53.refs.k.position.x, Σ_3_53.refs.H = Σ_3_53.refs.z.y - Σ_3_53.refs.k.position.y, Σ_3_53.refs.O = Σ_3_53.refs.D * Σ_3_53.refs.u.col1.x + Σ_3_53.refs.H * Σ_3_53.refs.u.col1.y, Σ_3_53.refs.E = Σ_3_53.refs.D * Σ_3_53.refs.u.col2.x + Σ_3_53.refs.H * Σ_3_53.refs.u.col2.y, Σ_3_53.refs.R = 0; Σ_3_53.refs.R < this.m_vertexCount; ++Σ_3_53.refs.R) {
                Σ_3_53.refs.u = this.m_vertices[Σ_3_53.refs.R];
                Σ_3_53.refs.D = Σ_3_53.refs.O - Σ_3_53.refs.u.x;
                Σ_3_53.refs.H = Σ_3_53.refs.E - Σ_3_53.refs.u.y;
                Σ_3_53.refs.u = this.m_normals[Σ_3_53.refs.R];
                if (Σ_3_53.refs.u.x * Σ_3_53.refs.D + Σ_3_53.refs.u.y * Σ_3_53.refs.H > 0) {
                    return false;
                }
            }
            return true;
        }, Σ_3);
        Σ_3.refs.A.prototype.RayCast = Σ_3.addFunction(function αzoGZ(k, z, u) {
            var Σ_3_54 = new Σ.Scope(this, αzoGZ, '54', Σ_3, {
                k: k,
                z: z,
                u: u
            }, []);
            Σ_3_54.refs.D = 0, Σ_3_54.refs.H = Σ_3_54.refs.z.maxFraction, Σ_3_54.refs.O = 0, Σ_3_54.refs.E = 0, Σ_3_54.refs.R = undefined, Σ_3_54.refs.N = undefined;
            Σ_3_54.refs.O = Σ_3_54.refs.z.p1.x - Σ_3_54.refs.u.position.x;
            Σ_3_54.refs.E = Σ_3_54.refs.z.p1.y - Σ_3_54.refs.u.position.y;
            Σ_3_54.refs.R = Σ_3_54.refs.u.R;
            Σ_3_54.refs.S = Σ_3_54.refs.O * Σ_3_54.refs.R.col1.x + Σ_3_54.refs.E * Σ_3_54.refs.R.col1.y, Σ_3_54.refs.aa = Σ_3_54.refs.O * Σ_3_54.refs.R.col2.x + Σ_3_54.refs.E * Σ_3_54.refs.R.col2.y;
            Σ_3_54.refs.O = Σ_3_54.refs.z.p2.x - Σ_3_54.refs.u.position.x;
            Σ_3_54.refs.E = Σ_3_54.refs.z.p2.y - Σ_3_54.refs.u.position.y;
            Σ_3_54.refs.R = Σ_3_54.refs.u.R;
            Σ_3_54.refs.z = Σ_3_54.refs.O * Σ_3_54.refs.R.col1.x + Σ_3_54.refs.E * Σ_3_54.refs.R.col1.y - Σ_3_54.refs.S;
            Σ_3_54.refs.R = Σ_3_54.refs.O * Σ_3_54.refs.R.col2.x + Σ_3_54.refs.E * Σ_3_54.refs.R.col2.y - Σ_3_54.refs.aa;
            for (Σ_3_54.refs.Z = parseInt(-1), Σ_3_54.refs.d = 0; Σ_3_54.refs.d < this.m_vertexCount; ++Σ_3_54.refs.d) {
                Σ_3_54.refs.N = this.m_vertices[Σ_3_54.refs.d];
                Σ_3_54.refs.O = Σ_3_54.refs.N.x - Σ_3_54.refs.S;
                Σ_3_54.refs.E = Σ_3_54.refs.N.y - Σ_3_54.refs.aa;
                Σ_3_54.refs.N = this.m_normals[Σ_3_54.refs.d];
                Σ_3_54.refs.O = Σ_3_54.refs.N.x * Σ_3_54.refs.O + Σ_3_54.refs.N.y * Σ_3_54.refs.E;
                Σ_3_54.refs.E = Σ_3_54.refs.N.x * Σ_3_54.refs.z + Σ_3_54.refs.N.y * Σ_3_54.refs.R;
                if (Σ_3_54.refs.E == 0) {
                    if (Σ_3_54.refs.O < 0) {
                        return false;
                    }
                } else if (Σ_3_54.refs.E < 0 && Σ_3_54.refs.O < Σ_3_54.refs.D * Σ_3_54.refs.E) {
                    Σ_3_54.refs.D = Σ_3_54.refs.O / Σ_3_54.refs.E;
                    Σ_3_54.refs.Z = Σ_3_54.refs.d;
                } else if (Σ_3_54.refs.E > 0 && Σ_3_54.refs.O < Σ_3_54.refs.H * Σ_3_54.refs.E) {
                    Σ_3_54.refs.H = Σ_3_54.refs.O / Σ_3_54.refs.E;
                }
                if (Σ_3_54.refs.H < Σ_3_54.refs.D - Number.MIN_VALUE) {
                    return false;
                }
            }
            if (Σ_3_54.refs.Z >= 0) {
                Σ_3_54.refs.k.fraction = Σ_3_54.refs.D;
                Σ_3_54.refs.R = Σ_3_54.refs.u.R;
                Σ_3_54.refs.N = this.m_normals[Σ_3_54.refs.Z];
                Σ_3_54.refs.k.normal.x = Σ_3_54.refs.R.col1.x * Σ_3_54.refs.N.x + Σ_3_54.refs.R.col2.x * Σ_3_54.refs.N.y;
                Σ_3_54.refs.k.normal.y = Σ_3_54.refs.R.col1.y * Σ_3_54.refs.N.x + Σ_3_54.refs.R.col2.y * Σ_3_54.refs.N.y;
                return true;
            }
            return false;
        }, Σ_3);
        Σ_3.refs.A.prototype.ComputeAABB = Σ_3.addFunction(function αAMGX(k, z) {
            var Σ_3_55 = new Σ.Scope(this, αAMGX, '55', Σ_3, {
                k: k,
                z: z
            }, []);
            for (Σ_3_55.refs.u = Σ_3_55.refs.z.R, Σ_3_55.refs.D = this.m_vertices[0], Σ_3_55.refs.H = Σ_3_55.refs.z.position.x + (Σ_3_55.refs.u.col1.x * Σ_3_55.refs.D.x + Σ_3_55.refs.u.col2.x * Σ_3_55.refs.D.y), Σ_3_55.refs.O = Σ_3_55.refs.z.position.y + (Σ_3_55.refs.u.col1.y * Σ_3_55.refs.D.x + Σ_3_55.refs.u.col2.y * Σ_3_55.refs.D.y), Σ_3_55.refs.E = Σ_3_55.refs.H, Σ_3_55.refs.R = Σ_3_55.refs.O, Σ_3_55.refs.N = 1; Σ_3_55.refs.N < this.m_vertexCount; ++Σ_3_55.refs.N) {
                Σ_3_55.refs.D = this.m_vertices[Σ_3_55.refs.N];
                Σ_3_55.refs.S = Σ_3_55.refs.z.position.x + (Σ_3_55.refs.u.col1.x * Σ_3_55.refs.D.x + Σ_3_55.refs.u.col2.x * Σ_3_55.refs.D.y);
                Σ_3_55.refs.D = Σ_3_55.refs.z.position.y + (Σ_3_55.refs.u.col1.y * Σ_3_55.refs.D.x + Σ_3_55.refs.u.col2.y * Σ_3_55.refs.D.y);
                Σ_3_55.refs.H = Σ_3_55.refs.H < Σ_3_55.refs.S ? Σ_3_55.refs.H : Σ_3_55.refs.S;
                Σ_3_55.refs.O = Σ_3_55.refs.O < Σ_3_55.refs.D ? Σ_3_55.refs.O : Σ_3_55.refs.D;
                Σ_3_55.refs.E = Σ_3_55.refs.E > Σ_3_55.refs.S ? Σ_3_55.refs.E : Σ_3_55.refs.S;
                Σ_3_55.refs.R = Σ_3_55.refs.R > Σ_3_55.refs.D ? Σ_3_55.refs.R : Σ_3_55.refs.D;
            }
            Σ_3_55.refs.k.lowerBound.x = Σ_3_55.refs.H - this.m_radius;
            Σ_3_55.refs.k.lowerBound.y = Σ_3_55.refs.O - this.m_radius;
            Σ_3_55.refs.k.upperBound.x = Σ_3_55.refs.E + this.m_radius;
            Σ_3_55.refs.k.upperBound.y = Σ_3_55.refs.R + this.m_radius;
        }, Σ_3);
        Σ_3.refs.A.prototype.ComputeMass = Σ_3.addFunction(function αh1nq(k, z) {
            var Σ_3_56 = new Σ.Scope(this, αh1nq, '56', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_56.refs.z === undefined) {
                Σ_3_56.refs.z = 0;
            }
            if (this.m_vertexCount == 2) {
                Σ_3_56.refs.k.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
                Σ_3_56.refs.k.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
                Σ_3_56.refs.k.mass = 0;
                Σ_3_56.refs.k.I = 0;
            } else {
                for (Σ_3_56.refs.u = 0, Σ_3_56.refs.D = 0, Σ_3_56.refs.H = 0, Σ_3_56.refs.O = 0, Σ_3_56.refs.E = 1 / 3, Σ_3_56.refs.R = 0; Σ_3_56.refs.R < this.m_vertexCount; ++Σ_3_56.refs.R) {
                    Σ_3_56.refs.N = this.m_vertices[Σ_3_56.refs.R], Σ_3_56.refs.S = Σ_3_56.refs.R + 1 < this.m_vertexCount ? this.m_vertices[parseInt(Σ_3_56.refs.R + 1)] : this.m_vertices[0], Σ_3_56.refs.aa = Σ_3_56.refs.N.x - 0, Σ_3_56.refs.Z = Σ_3_56.refs.N.y - 0, Σ_3_56.refs.d = Σ_3_56.refs.S.x - 0, Σ_3_56.refs.h = Σ_3_56.refs.S.y - 0, Σ_3_56.refs.l = Σ_3_56.refs.aa * Σ_3_56.refs.h - Σ_3_56.refs.Z * Σ_3_56.refs.d, Σ_3_56.refs.j = 0.5 * Σ_3_56.refs.l;
                    Σ_3_56.refs.H += Σ_3_56.refs.j;
                    Σ_3_56.refs.u += Σ_3_56.refs.j * Σ_3_56.refs.E * (0 + Σ_3_56.refs.N.x + Σ_3_56.refs.S.x);
                    Σ_3_56.refs.D += Σ_3_56.refs.j * Σ_3_56.refs.E * (0 + Σ_3_56.refs.N.y + Σ_3_56.refs.S.y);
                    Σ_3_56.refs.N = Σ_3_56.refs.aa;
                    Σ_3_56.refs.Z = Σ_3_56.refs.Z;
                    Σ_3_56.refs.d = Σ_3_56.refs.d;
                    Σ_3_56.refs.h = Σ_3_56.refs.h;
                    Σ_3_56.refs.O += Σ_3_56.refs.l * (Σ_3_56.refs.E * (0.25 * (Σ_3_56.refs.N * Σ_3_56.refs.N + Σ_3_56.refs.d * Σ_3_56.refs.N + Σ_3_56.refs.d * Σ_3_56.refs.d) + (0 * Σ_3_56.refs.N + 0 * Σ_3_56.refs.d)) + 0 + (Σ_3_56.refs.E * (0.25 * (Σ_3_56.refs.Z * Σ_3_56.refs.Z + Σ_3_56.refs.h * Σ_3_56.refs.Z + Σ_3_56.refs.h * Σ_3_56.refs.h) + (0 * Σ_3_56.refs.Z + 0 * Σ_3_56.refs.h)) + 0));
                }
                Σ_3_56.refs.k.mass = Σ_3_56.refs.z * Σ_3_56.refs.H;
                Σ_3_56.refs.u *= 1 / Σ_3_56.refs.H;
                Σ_3_56.refs.D *= 1 / Σ_3_56.refs.H;
                Σ_3_56.refs.k.center.Set(Σ_3_56.refs.u, Σ_3_56.refs.D);
                Σ_3_56.refs.k.I = Σ_3_56.refs.z * Σ_3_56.refs.O;
            }
        }, Σ_3);
        Σ_3.refs.A.prototype.ComputeSubmergedArea = Σ_3.addFunction(function αEPfF(k, z, u, D) {
            var Σ_3_57 = new Σ.Scope(this, αEPfF, '57', Σ_3, {
                k: k,
                z: z,
                u: u,
                D: D
            }, []);
            if (Σ_3_57.refs.z === undefined) {
                Σ_3_57.refs.z = 0;
            }
            Σ_3_57.refs.H = Σ_3.refs.B.MulTMV(Σ_3_57.refs.u.R, Σ_3_57.refs.k), Σ_3_57.refs.O = Σ_3_57.refs.z - Σ_3.refs.B.Dot(Σ_3_57.refs.k, Σ_3_57.refs.u.position), Σ_3_57.refs.E = new Σ.refs.Vector_a2j_Number(), Σ_3_57.refs.R = 0, Σ_3_57.refs.N = parseInt(-1);
            Σ_3_57.refs.z = parseInt(-1);
            Σ_3_57.refs.S = false;
            for (Σ_3_57.refs.k = Σ_3_57.refs.k = 0; Σ_3_57.refs.k < this.m_vertexCount; ++Σ_3_57.refs.k) {
                Σ_3_57.refs.E[Σ_3_57.refs.k] = Σ_3.refs.B.Dot(Σ_3_57.refs.H, this.m_vertices[Σ_3_57.refs.k]) - Σ_3_57.refs.O;
                Σ_3_57.refs.aa = Σ_3_57.refs.E[Σ_3_57.refs.k] < -Number.MIN_VALUE;
                if (Σ_3_57.refs.k > 0) {
                    if (Σ_3_57.refs.aa) {
                        if (!Σ_3_57.refs.S) {
                            Σ_3_57.refs.N = Σ_3_57.refs.k - 1;
                            Σ_3_57.refs.R++;
                        }
                    } else if (Σ_3_57.refs.S) {
                        Σ_3_57.refs.z = Σ_3_57.refs.k - 1;
                        Σ_3_57.refs.R++;
                    }
                }
                Σ_3_57.refs.S = Σ_3_57.refs.aa;
            }
            switch (R) {
                case 0:
                    if (S) {
                        k = new w();
                        this.ComputeMass(k, 1);
                        D.SetV(B.MulX(u, k.center));
                        return k.mass;
                    } else
                        return 0;
                case 1:
                    if (N == -1)
                        N = this.m_vertexCount - 1;
                    else
                        z = this.m_vertexCount - 1;
            }
            Σ_3_57.refs.k = parseInt((Σ_3_57.refs.N + 1) % this.m_vertexCount);
            Σ_3_57.refs.H = parseInt((Σ_3_57.refs.z + 1) % this.m_vertexCount);
            Σ_3_57.refs.O = (0 - Σ_3_57.refs.E[Σ_3_57.refs.N]) / (Σ_3_57.refs.E[Σ_3_57.refs.k] - Σ_3_57.refs.E[Σ_3_57.refs.N]);
            Σ_3_57.refs.E = (0 - Σ_3_57.refs.E[Σ_3_57.refs.z]) / (Σ_3_57.refs.E[Σ_3_57.refs.H] - Σ_3_57.refs.E[Σ_3_57.refs.z]);
            Σ_3_57.refs.N = new Σ_3.refs.V(this.m_vertices[Σ_3_57.refs.N].x * (1 - Σ_3_57.refs.O) + this.m_vertices[Σ_3_57.refs.k].x * Σ_3_57.refs.O, this.m_vertices[Σ_3_57.refs.N].y * (1 - Σ_3_57.refs.O) + this.m_vertices[Σ_3_57.refs.k].y * Σ_3_57.refs.O);
            Σ_3_57.refs.z = new Σ_3.refs.V(this.m_vertices[Σ_3_57.refs.z].x * (1 - Σ_3_57.refs.E) + this.m_vertices[Σ_3_57.refs.H].x * Σ_3_57.refs.E, this.m_vertices[Σ_3_57.refs.z].y * (1 - Σ_3_57.refs.E) + this.m_vertices[Σ_3_57.refs.H].y * Σ_3_57.refs.E);
            Σ_3_57.refs.E = 0;
            Σ_3_57.refs.O = new Σ_3.refs.V();
            Σ_3_57.refs.R = this.m_vertices[Σ_3_57.refs.k];
            for (Σ_3_57.refs.k = Σ_3_57.refs.k; Σ_3_57.refs.k != Σ_3_57.refs.H;) {
                Σ_3_57.refs.k = (Σ_3_57.refs.k + 1) % this.m_vertexCount;
                Σ_3_57.refs.S = Σ_3_57.refs.k == Σ_3_57.refs.H ? Σ_3_57.refs.z : this.m_vertices[Σ_3_57.refs.k];
                Σ_3_57.refs.aa = 0.5 * ((Σ_3_57.refs.R.x - Σ_3_57.refs.N.x) * (Σ_3_57.refs.S.y - Σ_3_57.refs.N.y) - (Σ_3_57.refs.R.y - Σ_3_57.refs.N.y) * (Σ_3_57.refs.S.x - Σ_3_57.refs.N.x));
                Σ_3_57.refs.E += Σ_3_57.refs.aa;
                Σ_3_57.refs.O.x += Σ_3_57.refs.aa * (Σ_3_57.refs.N.x + Σ_3_57.refs.R.x + Σ_3_57.refs.S.x) / 3;
                Σ_3_57.refs.O.y += Σ_3_57.refs.aa * (Σ_3_57.refs.N.y + Σ_3_57.refs.R.y + Σ_3_57.refs.S.y) / 3;
                Σ_3_57.refs.R = Σ_3_57.refs.S;
            }
            Σ_3_57.refs.O.Multiply(1 / Σ_3_57.refs.E);
            Σ_3_57.refs.D.SetV(Σ_3.refs.B.MulX(Σ_3_57.refs.u, Σ_3_57.refs.O));
            return Σ_3_57.refs.E;
        }, Σ_3);
        Σ_3.refs.A.prototype.GetVertexCount = Σ_3.addFunction(function αTgd0() {
            var Σ_3_58 = new Σ.Scope(this, αTgd0, '58', Σ_3, {}, []);
            return this.m_vertexCount;
        }, Σ_3);
        Σ_3.refs.A.prototype.GetVertices = Σ_3.addFunction(function αUQub() {
            var Σ_3_59 = new Σ.Scope(this, αUQub, '59', Σ_3, {}, []);
            return this.m_vertices;
        }, Σ_3);
        Σ_3.refs.A.prototype.GetNormals = Σ_3.addFunction(function αklLp() {
            var Σ_3_60 = new Σ.Scope(this, αklLp, '60', Σ_3, {}, []);
            return this.m_normals;
        }, Σ_3);
        Σ_3.refs.A.prototype.GetSupport = Σ_3.addFunction(function αRT1y(k) {
            var Σ_3_61 = new Σ.Scope(this, αRT1y, '61', Σ_3, {
                k: k
            }, []);
            for (Σ_3_61.refs.z = 0, Σ_3_61.refs.u = this.m_vertices[0].x * Σ_3_61.refs.k.x + this.m_vertices[0].y * Σ_3_61.refs.k.y, Σ_3_61.refs.D = 1; Σ_3_61.refs.D < this.m_vertexCount; ++Σ_3_61.refs.D) {
                Σ_3_61.refs.H = this.m_vertices[Σ_3_61.refs.D].x * Σ_3_61.refs.k.x + this.m_vertices[Σ_3_61.refs.D].y * Σ_3_61.refs.k.y;
                if (Σ_3_61.refs.H > Σ_3_61.refs.u) {
                    Σ_3_61.refs.z = Σ_3_61.refs.D;
                    Σ_3_61.refs.u = Σ_3_61.refs.H;
                }
            }
            return Σ_3_61.refs.z;
        }, Σ_3);
        Σ_3.refs.A.prototype.GetSupportVertex = Σ_3.addFunction(function α64dK(k) {
            var Σ_3_62 = new Σ.Scope(this, α64dK, '62', Σ_3, {
                k: k
            }, []);
            for (Σ_3_62.refs.z = 0, Σ_3_62.refs.u = this.m_vertices[0].x * Σ_3_62.refs.k.x + this.m_vertices[0].y * Σ_3_62.refs.k.y, Σ_3_62.refs.D = 1; Σ_3_62.refs.D < this.m_vertexCount; ++Σ_3_62.refs.D) {
                Σ_3_62.refs.H = this.m_vertices[Σ_3_62.refs.D].x * Σ_3_62.refs.k.x + this.m_vertices[Σ_3_62.refs.D].y * Σ_3_62.refs.k.y;
                if (Σ_3_62.refs.H > Σ_3_62.refs.u) {
                    Σ_3_62.refs.z = Σ_3_62.refs.D;
                    Σ_3_62.refs.u = Σ_3_62.refs.H;
                }
            }
            return this.m_vertices[Σ_3_62.refs.z];
        }, Σ_3);
        Σ_3.refs.A.prototype.Validate = Σ_3.addFunction(function αUdZG() {
            var Σ_3_63 = new Σ.Scope(this, αUdZG, '63', Σ_3, {}, []);
            return false;
        }, Σ_3);
        Σ_3.refs.A.prototype.b2PolygonShape = Σ_3.addFunction(function αAF29() {
            var Σ_3_64 = new Σ.Scope(this, αAF29, '64', Σ_3, {}, []);
            this.__super.b2Shape.call(this);
            this.m_type = Σ_3.refs.U.e_polygonShape;
            this.m_centroid = new Σ_3.refs.V();
            this.m_vertices = new Σ.refs.Vector();
            this.m_normals = new Σ.refs.Vector();
        }, Σ_3);
        Σ_3.refs.A.prototype.Reserve = Σ_3.addFunction(function α5WhL(k) {
            var Σ_3_65 = new Σ.Scope(this, α5WhL, '65', Σ_3, {
                k: k
            }, []);
            if (Σ_3_65.refs.k === undefined) {
                Σ_3_65.refs.k = 0;
            }
            for (Σ_3_65.refs.z = parseInt(this.m_vertices.length); Σ_3_65.refs.z < Σ_3_65.refs.k; Σ_3_65.refs.z++) {
                this.m_vertices[Σ_3_65.refs.z] = new Σ_3.refs.V();
                this.m_normals[Σ_3_65.refs.z] = new Σ_3.refs.V();
            }
        }, Σ_3);
        Σ_3.refs.A.ComputeCentroid = Σ_3.addFunction(function αC1MS(k, z) {
            var Σ_3_66 = new Σ.Scope(this, αC1MS, '66', Σ_3, {
                k: k,
                z: z
            }, []);
            if (Σ_3_66.refs.z === undefined) {
                Σ_3_66.refs.z = 0;
            }
            for (Σ_3_66.refs.u = new Σ_3.refs.V(), Σ_3_66.refs.D = 0, Σ_3_66.refs.H = 1 / 3, Σ_3_66.refs.O = 0; Σ_3_66.refs.O < Σ_3_66.refs.z; ++Σ_3_66.refs.O) {
                Σ_3_66.refs.E = Σ_3_66.refs.k[Σ_3_66.refs.O], Σ_3_66.refs.R = Σ_3_66.refs.O + 1 < Σ_3_66.refs.z ? Σ_3_66.refs.k[parseInt(Σ_3_66.refs.O + 1)] : Σ_3_66.refs.k[0], Σ_3_66.refs.N = 0.5 * ((Σ_3_66.refs.E.x - 0) * (Σ_3_66.refs.R.y - 0) - (Σ_3_66.refs.E.y - 0) * (Σ_3_66.refs.R.x - 0));
                Σ_3_66.refs.D += Σ_3_66.refs.N;
                Σ_3_66.refs.u.x += Σ_3_66.refs.N * Σ_3_66.refs.H * (0 + Σ_3_66.refs.E.x + Σ_3_66.refs.R.x);
                Σ_3_66.refs.u.y += Σ_3_66.refs.N * Σ_3_66.refs.H * (0 + Σ_3_66.refs.E.y + Σ_3_66.refs.R.y);
            }
            Σ_3_66.refs.u.x *= 1 / Σ_3_66.refs.D;
            Σ_3_66.refs.u.y *= 1 / Σ_3_66.refs.D;
            return Σ_3_66.refs.u;
        }, Σ_3);
        Σ_3.refs.A.ComputeOBB = Σ_3.addFunction(function αLVSa(k, z, u) {
            var Σ_3_67 = new Σ.Scope(this, αLVSa, '67', Σ_3, {
                k: k,
                z: z,
                u: u
            }, []);
            if (Σ_3_67.refs.u === undefined) {
                Σ_3_67.refs.u = 0;
            }
            Σ_3_67.refs.D = 0, Σ_3_67.refs.H = new Σ.refs.Vector(Σ_3_67.refs.u + 1);
            for (Σ_3_67.refs.D = 0; Σ_3_67.refs.D < Σ_3_67.refs.u; ++Σ_3_67.refs.D) {
                Σ_3_67.refs.H[Σ_3_67.refs.D] = Σ_3_67.refs.z[Σ_3_67.refs.D];
            }
            Σ_3_67.refs.H[Σ_3_67.refs.u] = Σ_3_67.refs.H[0];
            Σ_3_67.refs.z = Number.MAX_VALUE;
            for (Σ_3_67.refs.D = 1; Σ_3_67.refs.D <= Σ_3_67.refs.u; ++Σ_3_67.refs.D) {
                Σ_3_67.refs.O = Σ_3_67.refs.H[parseInt(Σ_3_67.refs.D - 1)], Σ_3_67.refs.E = Σ_3_67.refs.H[Σ_3_67.refs.D].x - Σ_3_67.refs.O.x, Σ_3_67.refs.R = Σ_3_67.refs.H[Σ_3_67.refs.D].y - Σ_3_67.refs.O.y, Σ_3_67.refs.N = Math.sqrt(Σ_3_67.refs.E * Σ_3_67.refs.E + Σ_3_67.refs.R * Σ_3_67.refs.R);
                Σ_3_67.refs.E /= Σ_3_67.refs.N;
                Σ_3_67.refs.R /= Σ_3_67.refs.N;
                for (Σ_3_67.refs.S = -Σ_3_67.refs.R, Σ_3_67.refs.aa = Σ_3_67.refs.E, Σ_3_67.refs.Z = Σ_3_67.refs.N = Number.MAX_VALUE, Σ_3_67.refs.d = -Number.MAX_VALUE, Σ_3_67.refs.h = -Number.MAX_VALUE, Σ_3_67.refs.l = 0; Σ_3_67.refs.l < Σ_3_67.refs.u; ++Σ_3_67.refs.l) {
                    Σ_3_67.refs.j = Σ_3_67.refs.H[Σ_3_67.refs.l].x - Σ_3_67.refs.O.x, Σ_3_67.refs.o = Σ_3_67.refs.H[Σ_3_67.refs.l].y - Σ_3_67.refs.O.y, Σ_3_67.refs.q = Σ_3_67.refs.E * Σ_3_67.refs.j + Σ_3_67.refs.R * Σ_3_67.refs.o;
                    Σ_3_67.refs.j = Σ_3_67.refs.S * Σ_3_67.refs.j + Σ_3_67.refs.aa * Σ_3_67.refs.o;
                    if (Σ_3_67.refs.q < Σ_3_67.refs.N) {
                        Σ_3_67.refs.N = Σ_3_67.refs.q;
                    }
                    if (Σ_3_67.refs.j < Σ_3_67.refs.Z) {
                        Σ_3_67.refs.Z = Σ_3_67.refs.j;
                    }
                    if (Σ_3_67.refs.q > Σ_3_67.refs.d) {
                        Σ_3_67.refs.d = Σ_3_67.refs.q;
                    }
                    if (Σ_3_67.refs.j > Σ_3_67.refs.h) {
                        Σ_3_67.refs.h = Σ_3_67.refs.j;
                    }
                }
                Σ_3_67.refs.l = (Σ_3_67.refs.d - Σ_3_67.refs.N) * (Σ_3_67.refs.h - Σ_3_67.refs.Z);
                if (Σ_3_67.refs.l < 0.95 * Σ_3_67.refs.z) {
                    Σ_3_67.refs.z = Σ_3_67.refs.l;
                    Σ_3_67.refs.k.R.col1.x = Σ_3_67.refs.E;
                    Σ_3_67.refs.k.R.col1.y = Σ_3_67.refs.R;
                    Σ_3_67.refs.k.R.col2.x = Σ_3_67.refs.S;
                    Σ_3_67.refs.k.R.col2.y = Σ_3_67.refs.aa;
                    Σ_3_67.refs.E = 0.5 * (Σ_3_67.refs.N + Σ_3_67.refs.d);
                    Σ_3_67.refs.R = 0.5 * (Σ_3_67.refs.Z + Σ_3_67.refs.h);
                    Σ_3_67.refs.S = Σ_3_67.refs.k.R;
                    Σ_3_67.refs.k.center.x = Σ_3_67.refs.O.x + (Σ_3_67.refs.S.col1.x * Σ_3_67.refs.E + Σ_3_67.refs.S.col2.x * Σ_3_67.refs.R);
                    Σ_3_67.refs.k.center.y = Σ_3_67.refs.O.y + (Σ_3_67.refs.S.col1.y * Σ_3_67.refs.E + Σ_3_67.refs.S.col2.y * Σ_3_67.refs.R);
                    Σ_3_67.refs.k.extents.x = 0.5 * (Σ_3_67.refs.d - Σ_3_67.refs.N);
                    Σ_3_67.refs.k.extents.y = 0.5 * (Σ_3_67.refs.h - Σ_3_67.refs.Z);
                }
            }
        }, Σ_3);
        Σ.refs.Box2D.postDefs.push(Σ_3.addFunction(function α643r() {
            var Σ_3_68 = new Σ.Scope(this, α643r, '68', Σ_3, {}, []);
            Σ.refs.Box2D.Collision.Shapes.b2PolygonShape.s_mat = new Σ_3.refs.p();
        }, Σ_3));
        Σ_3.refs.U.b2Shape = Σ_3.addFunction(function αmQRo() {
            var Σ_3_69 = new Σ.Scope(this, αmQRo, '69', Σ_3, {}, []);
        }, Σ_3);
        Σ_3.refs.U.prototype.Copy = Σ_3.addFunction(function αP2ec() {
            var Σ_3_70 = new Σ.Scope(this, αP2ec, '70', Σ_3, {}, []);
            return null;
        }, Σ_3);
        Σ_3.refs.U.prototype.Set = Σ_3.addFunction(function αFI2x(k) {
            var Σ_3_71 = new Σ.Scope(this, αFI2x, '71', Σ_3, {
                k: k
            }, []);
            this.m_radius = Σ_3_71.refs.k.m_radius;
        }, Σ_3);
        Σ_3.refs.U.prototype.GetType = Σ_3.addFunction(function αjSdi() {
            var Σ_3_72 = new Σ.Scope(this, αjSdi, '72', Σ_3, {}, []);
            return this.m_type;
        }, Σ_3);
        Σ_3.refs.U.prototype.TestPoint = Σ_3.addFunction(function αYvek() {
            var Σ_3_73 = new Σ.Scope(this, αYvek, '73', Σ_3, {}, []);
            return false;
        }, Σ_3);
        Σ_3.refs.U.prototype.RayCast = Σ_3.addFunction(function αeyB5() {
            var Σ_3_74 = new Σ.Scope(this, αeyB5, '74', Σ_3, {}, []);
            return false;
        }, Σ_3);
        Σ_3.refs.U.prototype.ComputeAABB = Σ_3.addFunction(function αegyQ() {
            var Σ_3_75 = new Σ.Scope(this, αegyQ, '75', Σ_3, {}, []);
        }, Σ_3);
        Σ_3.refs.U.prototype.ComputeMass = Σ_3.addFunction(function αClKz() {
            var Σ_3_76 = new Σ.Scope(this, αClKz, '76', Σ_3, {}, []);
        }, Σ_3);
        Σ_3.refs.U.prototype.ComputeSubmergedArea = Σ_3.addFunction(function αuqSK() {
            var Σ_3_77 = new Σ.Scope(this, αuqSK, '77', Σ_3, {}, []);
            return 0;
        }, Σ_3);
        Σ_3.refs.U.TestOverlap = Σ_3.addFunction(function αI3yo(k, z, u, D) {
            var Σ_3_78 = new Σ.Scope(this, αI3yo, '78', Σ_3, {
                k: k,
                z: z,
                u: u,
                D: D
            }, []);
            Σ_3_78.refs.H = new Σ_3.refs.L();
            Σ_3_78.refs.H.proxyA = new Σ_3.refs.W();
            Σ_3_78.refs.H.proxyA.Set(Σ_3_78.refs.k);
            Σ_3_78.refs.H.proxyB = new Σ_3.refs.W();
            Σ_3_78.refs.H.proxyB.Set(Σ_3_78.refs.u);
            Σ_3_78.refs.H.transformA = Σ_3_78.refs.z;
            Σ_3_78.refs.H.transformB = Σ_3_78.refs.D;
            Σ_3_78.refs.H.useRadii = true;
            Σ_3_78.refs.k = new Σ_3.refs.Y();
            Σ_3_78.refs.k.count = 0;
            Σ_3_78.refs.z = new Σ_3.refs.I();
            Σ_3.refs.M.Distance(Σ_3_78.refs.z, Σ_3_78.refs.k, Σ_3_78.refs.H);
            return Σ_3_78.refs.z.distance < 10 * Number.MIN_VALUE;
        }, Σ_3);
        Σ_3.refs.U.prototype.b2Shape = Σ_3.addFunction(function αe0gd() {
            var Σ_3_79 = new Σ.Scope(this, αe0gd, '79', Σ_3, {}, []);
            this.m_type = Σ_3.refs.U.e_unknownShape;
            this.m_radius = Σ_3.refs.F.b2_linearSlop;
        }, Σ_3);
        Σ.refs.Box2D.postDefs.push(Σ_3.addFunction(function αjqje() {
            var Σ_3_80 = new Σ.Scope(this, αjqje, '80', Σ_3, {}, []);
            Σ.refs.Box2D.Collision.Shapes.b2Shape.e_unknownShape = parseInt(-1);
            Σ.refs.Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
            Σ.refs.Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
            Σ.refs.Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
            Σ.refs.Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
            Σ.refs.Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
            Σ.refs.Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
            Σ.refs.Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = parseInt(-1);
        }, Σ_3));
    }());
    (function αGNvy() {
        var Σ_4 = new Σ.Scope(this, αGNvy, '4', Σ, {}, []);
        Σ_4.refs.F = Σ.refs.Box2D.Common.b2Color, Σ_4.refs.G = Σ.refs.Box2D.Common.b2Settings, Σ_4.refs.K = Σ.refs.Box2D.Common.Math.b2Math;
        Σ_4.refs.F.b2Color = Σ_4.addFunction(function α2qNs() {
            var Σ_4_0 = new Σ.Scope(this, α2qNs, '0', Σ_4, {}, []);
            this._b = this._g = this._r = 0;
        }, Σ_4);
        Σ_4.refs.F.prototype.b2Color = Σ_4.addFunction(function αwvwP(y, w, A) {
            var Σ_4_1 = new Σ.Scope(this, αwvwP, '1', Σ_4, {
                y: y,
                w: w,
                A: A
            }, []);
            if (Σ_4_1.refs.y === undefined) {
                Σ_4_1.refs.y = 0;
            }
            if (Σ_4_1.refs.w === undefined) {
                Σ_4_1.refs.w = 0;
            }
            if (Σ_4_1.refs.A === undefined) {
                Σ_4_1.refs.A = 0;
            }
            this._r = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_1.refs.y, 0, 1));
            this._g = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_1.refs.w, 0, 1));
            this._b = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_1.refs.A, 0, 1));
        }, Σ_4);
        Σ_4.refs.F.prototype.Set = Σ_4.addFunction(function αh2FE(y, w, A) {
            var Σ_4_2 = new Σ.Scope(this, αh2FE, '2', Σ_4, {
                y: y,
                w: w,
                A: A
            }, []);
            if (Σ_4_2.refs.y === undefined) {
                Σ_4_2.refs.y = 0;
            }
            if (Σ_4_2.refs.w === undefined) {
                Σ_4_2.refs.w = 0;
            }
            if (Σ_4_2.refs.A === undefined) {
                Σ_4_2.refs.A = 0;
            }
            this._r = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_2.refs.y, 0, 1));
            this._g = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_2.refs.w, 0, 1));
            this._b = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_2.refs.A, 0, 1));
        }, Σ_4);
        Object.defineProperty(Σ_4.refs.F.prototype, 'r', {
            enumerable: false,
            configurable: true,
            set: Σ_4.addFunction(function αVAp3(y) {
                var Σ_4_3 = new Σ.Scope(this, αVAp3, '3', Σ_4, {
                    y: y
                }, []);
                if (Σ_4_3.refs.y === undefined) {
                    Σ_4_3.refs.y = 0;
                }
                this._r = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_3.refs.y, 0, 1));
            }, Σ_4)
        });
        Object.defineProperty(Σ_4.refs.F.prototype, 'g', {
            enumerable: false,
            configurable: true,
            set: Σ_4.addFunction(function αoXvN(y) {
                var Σ_4_4 = new Σ.Scope(this, αoXvN, '4', Σ_4, {
                    y: y
                }, []);
                if (Σ_4_4.refs.y === undefined) {
                    Σ_4_4.refs.y = 0;
                }
                this._g = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_4.refs.y, 0, 1));
            }, Σ_4)
        });
        Object.defineProperty(Σ_4.refs.F.prototype, 'b', {
            enumerable: false,
            configurable: true,
            set: Σ_4.addFunction(function αvQ5w(y) {
                var Σ_4_5 = new Σ.Scope(this, αvQ5w, '5', Σ_4, {
                    y: y
                }, []);
                if (Σ_4_5.refs.y === undefined) {
                    Σ_4_5.refs.y = 0;
                }
                this._b = Σ.refs.Box2D.parseUInt(255 * Σ_4.refs.K.Clamp(Σ_4_5.refs.y, 0, 1));
            }, Σ_4)
        });
        Object.defineProperty(Σ_4.refs.F.prototype, 'color', {
            enumerable: false,
            configurable: true,
            get: Σ_4.addFunction(function αMsll() {
                var Σ_4_6 = new Σ.Scope(this, αMsll, '6', Σ_4, {}, []);
                return this._r << 16 | this._g << 8 | this._b;
            }, Σ_4)
        });
        Σ_4.refs.G.b2Settings = Σ_4.addFunction(function αWXqk() {
            var Σ_4_7 = new Σ.Scope(this, αWXqk, '7', Σ_4, {}, []);
        }, Σ_4);
        Σ_4.refs.G.b2MixFriction = Σ_4.addFunction(function αgwjP(y, w) {
            var Σ_4_8 = new Σ.Scope(this, αgwjP, '8', Σ_4, {
                y: y,
                w: w
            }, []);
            if (Σ_4_8.refs.y === undefined) {
                Σ_4_8.refs.y = 0;
            }
            if (Σ_4_8.refs.w === undefined) {
                Σ_4_8.refs.w = 0;
            }
            return Math.sqrt(Σ_4_8.refs.y * Σ_4_8.refs.w);
        }, Σ_4);
        Σ_4.refs.G.b2MixRestitution = Σ_4.addFunction(function αSzAU(y, w) {
            var Σ_4_9 = new Σ.Scope(this, αSzAU, '9', Σ_4, {
                y: y,
                w: w
            }, []);
            if (Σ_4_9.refs.y === undefined) {
                Σ_4_9.refs.y = 0;
            }
            if (Σ_4_9.refs.w === undefined) {
                Σ_4_9.refs.w = 0;
            }
            return Σ_4_9.refs.y > Σ_4_9.refs.w ? Σ_4_9.refs.y : Σ_4_9.refs.w;
        }, Σ_4);
        Σ_4.refs.G.b2Assert = Σ_4.addFunction(function αDmHt(y) {
            var Σ_4_10 = new Σ.Scope(this, αDmHt, '10', Σ_4, {
                y: y
            }, []);
            if (!Σ_4_10.refs.y) {
                throw 'Assertion Failed';
            }
        }, Σ_4);
        Σ.refs.Box2D.postDefs.push(Σ_4.addFunction(function αg2mF() {
            var Σ_4_11 = new Σ.Scope(this, αg2mF, '11', Σ_4, {}, []);
            Σ.refs.Box2D.Common.b2Settings.VERSION = '2.1alpha';
            Σ.refs.Box2D.Common.b2Settings.USHRT_MAX = 65535;
            Σ.refs.Box2D.Common.b2Settings.b2_pi = Math.PI;
            Σ.refs.Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
            Σ.refs.Box2D.Common.b2Settings.b2_aabbExtension = 0.1;
            Σ.refs.Box2D.Common.b2Settings.b2_aabbMultiplier = 2;
            Σ.refs.Box2D.Common.b2Settings.b2_polygonRadius = 2 * Σ_4.refs.G.b2_linearSlop;
            Σ.refs.Box2D.Common.b2Settings.b2_linearSlop = 0.005;
            Σ.refs.Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * Σ_4.refs.G.b2_pi;
            Σ.refs.Box2D.Common.b2Settings.b2_toiSlop = 8 * Σ_4.refs.G.b2_linearSlop;
            Σ.refs.Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
            Σ.refs.Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
            Σ.refs.Box2D.Common.b2Settings.b2_velocityThreshold = 1;
            Σ.refs.Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
            Σ.refs.Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * Σ_4.refs.G.b2_pi;
            Σ.refs.Box2D.Common.b2Settings.b2_maxTranslation = 2;
            Σ.refs.Box2D.Common.b2Settings.b2_maxTranslationSquared = Σ_4.refs.G.b2_maxTranslation * Σ_4.refs.G.b2_maxTranslation;
            Σ.refs.Box2D.Common.b2Settings.b2_maxRotation = 0.5 * Σ_4.refs.G.b2_pi;
            Σ.refs.Box2D.Common.b2Settings.b2_maxRotationSquared = Σ_4.refs.G.b2_maxRotation * Σ_4.refs.G.b2_maxRotation;
            Σ.refs.Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
            Σ.refs.Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
            Σ.refs.Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
            Σ.refs.Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * Σ_4.refs.G.b2_pi;
        }, Σ_4));
    }());
    (function αdRvS() {
        var Σ_5 = new Σ.Scope(this, αdRvS, '5', Σ, {}, []);
        Σ_5.refs.F = Σ.refs.Box2D.Common.Math.b2Mat22, Σ_5.refs.G = Σ.refs.Box2D.Common.Math.b2Mat33, Σ_5.refs.K = Σ.refs.Box2D.Common.Math.b2Math, Σ_5.refs.y = Σ.refs.Box2D.Common.Math.b2Sweep, Σ_5.refs.w = Σ.refs.Box2D.Common.Math.b2Transform, Σ_5.refs.A = Σ.refs.Box2D.Common.Math.b2Vec2, Σ_5.refs.U = Σ.refs.Box2D.Common.Math.b2Vec3;
        Σ_5.refs.F.b2Mat22 = Σ_5.addFunction(function α5zNV() {
            var Σ_5_0 = new Σ.Scope(this, α5zNV, '0', Σ_5, {}, []);
            this.col1 = new Σ_5.refs.A();
            this.col2 = new Σ_5.refs.A();
        }, Σ_5);
        Σ_5.refs.F.prototype.b2Mat22 = Σ_5.addFunction(function αrTH5() {
            var Σ_5_1 = new Σ.Scope(this, αrTH5, '1', Σ_5, {}, []);
            this.SetIdentity();
        }, Σ_5);
        Σ_5.refs.F.FromAngle = Σ_5.addFunction(function α9BUV(p) {
            var Σ_5_2 = new Σ.Scope(this, α9BUV, '2', Σ_5, {
                p: p
            }, []);
            if (Σ_5_2.refs.p === undefined) {
                Σ_5_2.refs.p = 0;
            }
            Σ_5_2.refs.B = new Σ_5.refs.F();
            Σ_5_2.refs.B.Set(Σ_5_2.refs.p);
            return Σ_5_2.refs.B;
        }, Σ_5);
        Σ_5.refs.F.FromVV = Σ_5.addFunction(function αRkoM(p, B) {
            var Σ_5_3 = new Σ.Scope(this, αRkoM, '3', Σ_5, {
                p: p,
                B: B
            }, []);
            Σ_5_3.refs.Q = new Σ_5.refs.F();
            Σ_5_3.refs.Q.SetVV(Σ_5_3.refs.p, Σ_5_3.refs.B);
            return Σ_5_3.refs.Q;
        }, Σ_5);
        Σ_5.refs.F.prototype.Set = Σ_5.addFunction(function αQwr0(p) {
            var Σ_5_4 = new Σ.Scope(this, αQwr0, '4', Σ_5, {
                p: p
            }, []);
            if (Σ_5_4.refs.p === undefined) {
                Σ_5_4.refs.p = 0;
            }
            Σ_5_4.refs.B = Math.cos(Σ_5_4.refs.p);
            Σ_5_4.refs.p = Math.sin(Σ_5_4.refs.p);
            this.col1.x = Σ_5_4.refs.B;
            this.col2.x = -Σ_5_4.refs.p;
            this.col1.y = Σ_5_4.refs.p;
            this.col2.y = Σ_5_4.refs.B;
        }, Σ_5);
        Σ_5.refs.F.prototype.SetVV = Σ_5.addFunction(function αHwf3(p, B) {
            var Σ_5_5 = new Σ.Scope(this, αHwf3, '5', Σ_5, {
                p: p,
                B: B
            }, []);
            this.col1.SetV(Σ_5_5.refs.p);
            this.col2.SetV(Σ_5_5.refs.B);
        }, Σ_5);
        Σ_5.refs.F.prototype.Copy = Σ_5.addFunction(function αA7Bf() {
            var Σ_5_6 = new Σ.Scope(this, αA7Bf, '6', Σ_5, {}, []);
            Σ_5_6.refs.p = new Σ_5.refs.F();
            Σ_5_6.refs.p.SetM(this);
            return Σ_5_6.refs.p;
        }, Σ_5);
        Σ_5.refs.F.prototype.SetM = Σ_5.addFunction(function αxumd(p) {
            var Σ_5_7 = new Σ.Scope(this, αxumd, '7', Σ_5, {
                p: p
            }, []);
            this.col1.SetV(Σ_5_7.refs.p.col1);
            this.col2.SetV(Σ_5_7.refs.p.col2);
        }, Σ_5);
        Σ_5.refs.F.prototype.AddM = Σ_5.addFunction(function αR248(p) {
            var Σ_5_8 = new Σ.Scope(this, αR248, '8', Σ_5, {
                p: p
            }, []);
            this.col1.x += Σ_5_8.refs.p.col1.x;
            this.col1.y += Σ_5_8.refs.p.col1.y;
            this.col2.x += Σ_5_8.refs.p.col2.x;
            this.col2.y += Σ_5_8.refs.p.col2.y;
        }, Σ_5);
        Σ_5.refs.F.prototype.SetIdentity = Σ_5.addFunction(function α7Zf0() {
            var Σ_5_9 = new Σ.Scope(this, α7Zf0, '9', Σ_5, {}, []);
            this.col1.x = 1;
            this.col2.x = 0;
            this.col1.y = 0;
            this.col2.y = 1;
        }, Σ_5);
        Σ_5.refs.F.prototype.SetZero = Σ_5.addFunction(function αfVCV() {
            var Σ_5_10 = new Σ.Scope(this, αfVCV, '10', Σ_5, {}, []);
            this.col1.x = 0;
            this.col2.x = 0;
            this.col1.y = 0;
            this.col2.y = 0;
        }, Σ_5);
        Σ_5.refs.F.prototype.GetAngle = Σ_5.addFunction(function αGOuc() {
            var Σ_5_11 = new Σ.Scope(this, αGOuc, '11', Σ_5, {}, []);
            return Math.atan2(this.col1.y, this.col1.x);
        }, Σ_5);
        Σ_5.refs.F.prototype.GetInverse = Σ_5.addFunction(function α3a2L(p) {
            var Σ_5_12 = new Σ.Scope(this, α3a2L, '12', Σ_5, {
                p: p
            }, []);
            Σ_5_12.refs.B = this.col1.x, Σ_5_12.refs.Q = this.col2.x, Σ_5_12.refs.V = this.col1.y, Σ_5_12.refs.M = this.col2.y, Σ_5_12.refs.L = Σ_5_12.refs.B * Σ_5_12.refs.M - Σ_5_12.refs.Q * Σ_5_12.refs.V;
            if (Σ_5_12.refs.L != 0) {
                Σ_5_12.refs.L = 1 / Σ_5_12.refs.L;
            }
            Σ_5_12.refs.p.col1.x = Σ_5_12.refs.L * Σ_5_12.refs.M;
            Σ_5_12.refs.p.col2.x = -Σ_5_12.refs.L * Σ_5_12.refs.Q;
            Σ_5_12.refs.p.col1.y = -Σ_5_12.refs.L * Σ_5_12.refs.V;
            Σ_5_12.refs.p.col2.y = Σ_5_12.refs.L * Σ_5_12.refs.B;
            return Σ_5_12.refs.p;
        }, Σ_5);
        Σ_5.refs.F.prototype.Solve = Σ_5.addFunction(function α33Xg(p, B, Q) {
            var Σ_5_13 = new Σ.Scope(this, α33Xg, '13', Σ_5, {
                p: p,
                B: B,
                Q: Q
            }, []);
            if (Σ_5_13.refs.B === undefined) {
                Σ_5_13.refs.B = 0;
            }
            if (Σ_5_13.refs.Q === undefined) {
                Σ_5_13.refs.Q = 0;
            }
            Σ_5_13.refs.V = this.col1.x, Σ_5_13.refs.M = this.col2.x, Σ_5_13.refs.L = this.col1.y, Σ_5_13.refs.I = this.col2.y, Σ_5_13.refs.W = Σ_5_13.refs.V * Σ_5_13.refs.I - Σ_5_13.refs.M * Σ_5_13.refs.L;
            if (Σ_5_13.refs.W != 0) {
                Σ_5_13.refs.W = 1 / Σ_5_13.refs.W;
            }
            Σ_5_13.refs.p.x = Σ_5_13.refs.W * (Σ_5_13.refs.I * Σ_5_13.refs.B - Σ_5_13.refs.M * Σ_5_13.refs.Q);
            Σ_5_13.refs.p.y = Σ_5_13.refs.W * (Σ_5_13.refs.V * Σ_5_13.refs.Q - Σ_5_13.refs.L * Σ_5_13.refs.B);
            return Σ_5_13.refs.p;
        }, Σ_5);
        Σ_5.refs.F.prototype.Abs = Σ_5.addFunction(function αMkLf() {
            var Σ_5_14 = new Σ.Scope(this, αMkLf, '14', Σ_5, {}, []);
            this.col1.Abs();
            this.col2.Abs();
        }, Σ_5);
        Σ_5.refs.G.b2Mat33 = Σ_5.addFunction(function αmelJ() {
            var Σ_5_15 = new Σ.Scope(this, αmelJ, '15', Σ_5, {}, []);
            this.col1 = new Σ_5.refs.U();
            this.col2 = new Σ_5.refs.U();
            this.col3 = new Σ_5.refs.U();
        }, Σ_5);
        Σ_5.refs.G.prototype.b2Mat33 = Σ_5.addFunction(function α2JUG(p, B, Q) {
            var Σ_5_16 = new Σ.Scope(this, α2JUG, '16', Σ_5, {
                p: p,
                B: B,
                Q: Q
            }, []);
            if (Σ_5_16.refs.p === undefined) {
                Σ_5_16.refs.p = null;
            }
            if (Σ_5_16.refs.B === undefined) {
                Σ_5_16.refs.B = null;
            }
            if (Σ_5_16.refs.Q === undefined) {
                Σ_5_16.refs.Q = null;
            }
            if (!Σ_5_16.refs.p && !Σ_5_16.refs.B && !Σ_5_16.refs.Q) {
                this.col1.SetZero();
                this.col2.SetZero();
                this.col3.SetZero();
            } else {
                this.col1.SetV(Σ_5_16.refs.p);
                this.col2.SetV(Σ_5_16.refs.B);
                this.col3.SetV(Σ_5_16.refs.Q);
            }
        }, Σ_5);
        Σ_5.refs.G.prototype.SetVVV = Σ_5.addFunction(function αxN4H(p, B, Q) {
            var Σ_5_17 = new Σ.Scope(this, αxN4H, '17', Σ_5, {
                p: p,
                B: B,
                Q: Q
            }, []);
            this.col1.SetV(Σ_5_17.refs.p);
            this.col2.SetV(Σ_5_17.refs.B);
            this.col3.SetV(Σ_5_17.refs.Q);
        }, Σ_5);
        Σ_5.refs.G.prototype.Copy = Σ_5.addFunction(function αvldG() {
            var Σ_5_18 = new Σ.Scope(this, αvldG, '18', Σ_5, {}, []);
            return new Σ_5.refs.G(this.col1, this.col2, this.col3);
        }, Σ_5);
        Σ_5.refs.G.prototype.SetM = Σ_5.addFunction(function αdttQ(p) {
            var Σ_5_19 = new Σ.Scope(this, αdttQ, '19', Σ_5, {
                p: p
            }, []);
            this.col1.SetV(Σ_5_19.refs.p.col1);
            this.col2.SetV(Σ_5_19.refs.p.col2);
            this.col3.SetV(Σ_5_19.refs.p.col3);
        }, Σ_5);
        Σ_5.refs.G.prototype.AddM = Σ_5.addFunction(function αi7R7(p) {
            var Σ_5_20 = new Σ.Scope(this, αi7R7, '20', Σ_5, {
                p: p
            }, []);
            this.col1.x += Σ_5_20.refs.p.col1.x;
            this.col1.y += Σ_5_20.refs.p.col1.y;
            this.col1.z += Σ_5_20.refs.p.col1.z;
            this.col2.x += Σ_5_20.refs.p.col2.x;
            this.col2.y += Σ_5_20.refs.p.col2.y;
            this.col2.z += Σ_5_20.refs.p.col2.z;
            this.col3.x += Σ_5_20.refs.p.col3.x;
            this.col3.y += Σ_5_20.refs.p.col3.y;
            this.col3.z += Σ_5_20.refs.p.col3.z;
        }, Σ_5);
        Σ_5.refs.G.prototype.SetIdentity = Σ_5.addFunction(function αnOks() {
            var Σ_5_21 = new Σ.Scope(this, αnOks, '21', Σ_5, {}, []);
            this.col1.x = 1;
            this.col2.x = 0;
            this.col3.x = 0;
            this.col1.y = 0;
            this.col2.y = 1;
            this.col3.y = 0;
            this.col1.z = 0;
            this.col2.z = 0;
            this.col3.z = 1;
        }, Σ_5);
        Σ_5.refs.G.prototype.SetZero = Σ_5.addFunction(function α5oS9() {
            var Σ_5_22 = new Σ.Scope(this, α5oS9, '22', Σ_5, {}, []);
            this.col1.x = 0;
            this.col2.x = 0;
            this.col3.x = 0;
            this.col1.y = 0;
            this.col2.y = 0;
            this.col3.y = 0;
            this.col1.z = 0;
            this.col2.z = 0;
            this.col3.z = 0;
        }, Σ_5);
        Σ_5.refs.G.prototype.Solve22 = Σ_5.addFunction(function αLEN0(p, B, Q) {
            var Σ_5_23 = new Σ.Scope(this, αLEN0, '23', Σ_5, {
                p: p,
                B: B,
                Q: Q
            }, []);
            if (Σ_5_23.refs.B === undefined) {
                Σ_5_23.refs.B = 0;
            }
            if (Σ_5_23.refs.Q === undefined) {
                Σ_5_23.refs.Q = 0;
            }
            Σ_5_23.refs.V = this.col1.x, Σ_5_23.refs.M = this.col2.x, Σ_5_23.refs.L = this.col1.y, Σ_5_23.refs.I = this.col2.y, Σ_5_23.refs.W = Σ_5_23.refs.V * Σ_5_23.refs.I - Σ_5_23.refs.M * Σ_5_23.refs.L;
            if (Σ_5_23.refs.W != 0) {
                Σ_5_23.refs.W = 1 / Σ_5_23.refs.W;
            }
            Σ_5_23.refs.p.x = Σ_5_23.refs.W * (Σ_5_23.refs.I * Σ_5_23.refs.B - Σ_5_23.refs.M * Σ_5_23.refs.Q);
            Σ_5_23.refs.p.y = Σ_5_23.refs.W * (Σ_5_23.refs.V * Σ_5_23.refs.Q - Σ_5_23.refs.L * Σ_5_23.refs.B);
            return Σ_5_23.refs.p;
        }, Σ_5);
        Σ_5.refs.G.prototype.Solve33 = Σ_5.addFunction(function αaXyZ(p, B, Q, V) {
            var Σ_5_24 = new Σ.Scope(this, αaXyZ, '24', Σ_5, {
                p: p,
                B: B,
                Q: Q,
                V: V
            }, []);
            if (Σ_5_24.refs.B === undefined) {
                Σ_5_24.refs.B = 0;
            }
            if (Σ_5_24.refs.Q === undefined) {
                Σ_5_24.refs.Q = 0;
            }
            if (Σ_5_24.refs.V === undefined) {
                Σ_5_24.refs.V = 0;
            }
            Σ_5_24.refs.M = this.col1.x, Σ_5_24.refs.L = this.col1.y, Σ_5_24.refs.I = this.col1.z, Σ_5_24.refs.W = this.col2.x, Σ_5_24.refs.Y = this.col2.y, Σ_5_24.refs.k = this.col2.z, Σ_5_24.refs.z = this.col3.x, Σ_5_24.refs.u = this.col3.y, Σ_5_24.refs.D = this.col3.z, Σ_5_24.refs.H = Σ_5_24.refs.M * (Σ_5_24.refs.Y * Σ_5_24.refs.D - Σ_5_24.refs.k * Σ_5_24.refs.u) + Σ_5_24.refs.L * (Σ_5_24.refs.k * Σ_5_24.refs.z - Σ_5_24.refs.W * Σ_5_24.refs.D) + Σ_5_24.refs.I * (Σ_5_24.refs.W * Σ_5_24.refs.u - Σ_5_24.refs.Y * Σ_5_24.refs.z);
            if (Σ_5_24.refs.H != 0) {
                Σ_5_24.refs.H = 1 / Σ_5_24.refs.H;
            }
            Σ_5_24.refs.p.x = Σ_5_24.refs.H * (Σ_5_24.refs.B * (Σ_5_24.refs.Y * Σ_5_24.refs.D - Σ_5_24.refs.k * Σ_5_24.refs.u) + Σ_5_24.refs.Q * (Σ_5_24.refs.k * Σ_5_24.refs.z - Σ_5_24.refs.W * Σ_5_24.refs.D) + Σ_5_24.refs.V * (Σ_5_24.refs.W * Σ_5_24.refs.u - Σ_5_24.refs.Y * Σ_5_24.refs.z));
            Σ_5_24.refs.p.y = Σ_5_24.refs.H * (Σ_5_24.refs.M * (Σ_5_24.refs.Q * Σ_5_24.refs.D - Σ_5_24.refs.V * Σ_5_24.refs.u) + Σ_5_24.refs.L * (Σ_5_24.refs.V * Σ_5_24.refs.z - Σ_5_24.refs.B * Σ_5_24.refs.D) + Σ_5_24.refs.I * (Σ_5_24.refs.B * Σ_5_24.refs.u - Σ_5_24.refs.Q * Σ_5_24.refs.z));
            Σ_5_24.refs.p.z = Σ_5_24.refs.H * (Σ_5_24.refs.M * (Σ_5_24.refs.Y * Σ_5_24.refs.V - Σ_5_24.refs.k * Σ_5_24.refs.Q) + Σ_5_24.refs.L * (Σ_5_24.refs.k * Σ_5_24.refs.B - Σ_5_24.refs.W * Σ_5_24.refs.V) + Σ_5_24.refs.I * (Σ_5_24.refs.W * Σ_5_24.refs.Q - Σ_5_24.refs.Y * Σ_5_24.refs.B));
            return Σ_5_24.refs.p;
        }, Σ_5);
        Σ_5.refs.K.b2Math = Σ_5.addFunction(function α4mwZ() {
            var Σ_5_25 = new Σ.Scope(this, α4mwZ, '25', Σ_5, {}, []);
        }, Σ_5);
        Σ_5.refs.K.IsValid = Σ_5.addFunction(function α2hg0(p) {
            var Σ_5_26 = new Σ.Scope(this, α2hg0, '26', Σ_5, {
                p: p
            }, []);
            if (Σ_5_26.refs.p === undefined) {
                Σ_5_26.refs.p = 0;
            }
            return isFinite(Σ_5_26.refs.p);
        }, Σ_5);
        Σ_5.refs.K.Dot = Σ_5.addFunction(function αR8bM(p, B) {
            var Σ_5_27 = new Σ.Scope(this, αR8bM, '27', Σ_5, {
                p: p,
                B: B
            }, []);
            return Σ_5_27.refs.p.x * Σ_5_27.refs.B.x + Σ_5_27.refs.p.y * Σ_5_27.refs.B.y;
        }, Σ_5);
        Σ_5.refs.K.CrossVV = Σ_5.addFunction(function αREQl(p, B) {
            var Σ_5_28 = new Σ.Scope(this, αREQl, '28', Σ_5, {
                p: p,
                B: B
            }, []);
            return Σ_5_28.refs.p.x * Σ_5_28.refs.B.y - Σ_5_28.refs.p.y * Σ_5_28.refs.B.x;
        }, Σ_5);
        Σ_5.refs.K.CrossVF = Σ_5.addFunction(function αsPaQ(p, B) {
            var Σ_5_29 = new Σ.Scope(this, αsPaQ, '29', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_29.refs.B === undefined) {
                Σ_5_29.refs.B = 0;
            }
            return new Σ_5.refs.A(Σ_5_29.refs.B * Σ_5_29.refs.p.y, -Σ_5_29.refs.B * Σ_5_29.refs.p.x);
        }, Σ_5);
        Σ_5.refs.K.CrossFV = Σ_5.addFunction(function αgmlt(p, B) {
            var Σ_5_30 = new Σ.Scope(this, αgmlt, '30', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_30.refs.p === undefined) {
                Σ_5_30.refs.p = 0;
            }
            return new Σ_5.refs.A(-Σ_5_30.refs.p * Σ_5_30.refs.B.y, Σ_5_30.refs.p * Σ_5_30.refs.B.x);
        }, Σ_5);
        Σ_5.refs.K.MulMV = Σ_5.addFunction(function αYXHV(p, B) {
            var Σ_5_31 = new Σ.Scope(this, αYXHV, '31', Σ_5, {
                p: p,
                B: B
            }, []);
            return new Σ_5.refs.A(Σ_5_31.refs.p.col1.x * Σ_5_31.refs.B.x + Σ_5_31.refs.p.col2.x * Σ_5_31.refs.B.y, Σ_5_31.refs.p.col1.y * Σ_5_31.refs.B.x + Σ_5_31.refs.p.col2.y * Σ_5_31.refs.B.y);
        }, Σ_5);
        Σ_5.refs.K.MulTMV = Σ_5.addFunction(function αkKs4(p, B) {
            var Σ_5_32 = new Σ.Scope(this, αkKs4, '32', Σ_5, {
                p: p,
                B: B
            }, []);
            return new Σ_5.refs.A(Σ_5.refs.K.Dot(Σ_5_32.refs.B, Σ_5_32.refs.p.col1), Σ_5.refs.K.Dot(Σ_5_32.refs.B, Σ_5_32.refs.p.col2));
        }, Σ_5);
        Σ_5.refs.K.MulX = Σ_5.addFunction(function αNwAh(p, B) {
            var Σ_5_33 = new Σ.Scope(this, αNwAh, '33', Σ_5, {
                p: p,
                B: B
            }, []);
            Σ_5_33.refs.Q = Σ_5.refs.K.MulMV(Σ_5_33.refs.p.R, Σ_5_33.refs.B);
            Σ_5_33.refs.Q.x += Σ_5_33.refs.p.position.x;
            Σ_5_33.refs.Q.y += Σ_5_33.refs.p.position.y;
            return Σ_5_33.refs.Q;
        }, Σ_5);
        Σ_5.refs.K.MulXT = Σ_5.addFunction(function αhuhH(p, B) {
            var Σ_5_34 = new Σ.Scope(this, αhuhH, '34', Σ_5, {
                p: p,
                B: B
            }, []);
            Σ_5_34.refs.Q = Σ_5.refs.K.SubtractVV(Σ_5_34.refs.B, Σ_5_34.refs.p.position), Σ_5_34.refs.V = Σ_5_34.refs.Q.x * Σ_5_34.refs.p.R.col1.x + Σ_5_34.refs.Q.y * Σ_5_34.refs.p.R.col1.y;
            Σ_5_34.refs.Q.y = Σ_5_34.refs.Q.x * Σ_5_34.refs.p.R.col2.x + Σ_5_34.refs.Q.y * Σ_5_34.refs.p.R.col2.y;
            Σ_5_34.refs.Q.x = Σ_5_34.refs.V;
            return Σ_5_34.refs.Q;
        }, Σ_5);
        Σ_5.refs.K.AddVV = Σ_5.addFunction(function α2x1Y(p, B) {
            var Σ_5_35 = new Σ.Scope(this, α2x1Y, '35', Σ_5, {
                p: p,
                B: B
            }, []);
            return new Σ_5.refs.A(Σ_5_35.refs.p.x + Σ_5_35.refs.B.x, Σ_5_35.refs.p.y + Σ_5_35.refs.B.y);
        }, Σ_5);
        Σ_5.refs.K.SubtractVV = Σ_5.addFunction(function αYnu1(p, B) {
            var Σ_5_36 = new Σ.Scope(this, αYnu1, '36', Σ_5, {
                p: p,
                B: B
            }, []);
            return new Σ_5.refs.A(Σ_5_36.refs.p.x - Σ_5_36.refs.B.x, Σ_5_36.refs.p.y - Σ_5_36.refs.B.y);
        }, Σ_5);
        Σ_5.refs.K.Distance = Σ_5.addFunction(function αi3DS(p, B) {
            var Σ_5_37 = new Σ.Scope(this, αi3DS, '37', Σ_5, {
                p: p,
                B: B
            }, []);
            Σ_5_37.refs.Q = Σ_5_37.refs.p.x - Σ_5_37.refs.B.x, Σ_5_37.refs.V = Σ_5_37.refs.p.y - Σ_5_37.refs.B.y;
            return Math.sqrt(Σ_5_37.refs.Q * Σ_5_37.refs.Q + Σ_5_37.refs.V * Σ_5_37.refs.V);
        }, Σ_5);
        Σ_5.refs.K.DistanceSquared = Σ_5.addFunction(function αFsXd(p, B) {
            var Σ_5_38 = new Σ.Scope(this, αFsXd, '38', Σ_5, {
                p: p,
                B: B
            }, []);
            Σ_5_38.refs.Q = Σ_5_38.refs.p.x - Σ_5_38.refs.B.x, Σ_5_38.refs.V = Σ_5_38.refs.p.y - Σ_5_38.refs.B.y;
            return Σ_5_38.refs.Q * Σ_5_38.refs.Q + Σ_5_38.refs.V * Σ_5_38.refs.V;
        }, Σ_5);
        Σ_5.refs.K.MulFV = Σ_5.addFunction(function αvMVf(p, B) {
            var Σ_5_39 = new Σ.Scope(this, αvMVf, '39', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_39.refs.p === undefined) {
                Σ_5_39.refs.p = 0;
            }
            return new Σ_5.refs.A(Σ_5_39.refs.p * Σ_5_39.refs.B.x, Σ_5_39.refs.p * Σ_5_39.refs.B.y);
        }, Σ_5);
        Σ_5.refs.K.AddMM = Σ_5.addFunction(function αQYCV(p, B) {
            var Σ_5_40 = new Σ.Scope(this, αQYCV, '40', Σ_5, {
                p: p,
                B: B
            }, []);
            return Σ_5.refs.F.FromVV(Σ_5.refs.K.AddVV(Σ_5_40.refs.p.col1, Σ_5_40.refs.B.col1), Σ_5.refs.K.AddVV(Σ_5_40.refs.p.col2, Σ_5_40.refs.B.col2));
        }, Σ_5);
        Σ_5.refs.K.MulMM = Σ_5.addFunction(function αkBuU(p, B) {
            var Σ_5_41 = new Σ.Scope(this, αkBuU, '41', Σ_5, {
                p: p,
                B: B
            }, []);
            return Σ_5.refs.F.FromVV(Σ_5.refs.K.MulMV(Σ_5_41.refs.p, Σ_5_41.refs.B.col1), Σ_5.refs.K.MulMV(Σ_5_41.refs.p, Σ_5_41.refs.B.col2));
        }, Σ_5);
        Σ_5.refs.K.MulTMM = Σ_5.addFunction(function α8YOW(p, B) {
            var Σ_5_42 = new Σ.Scope(this, α8YOW, '42', Σ_5, {
                p: p,
                B: B
            }, []);
            Σ_5_42.refs.Q = new Σ_5.refs.A(Σ_5.refs.K.Dot(Σ_5_42.refs.p.col1, Σ_5_42.refs.B.col1), Σ_5.refs.K.Dot(Σ_5_42.refs.p.col2, Σ_5_42.refs.B.col1)), Σ_5_42.refs.V = new Σ_5.refs.A(Σ_5.refs.K.Dot(Σ_5_42.refs.p.col1, Σ_5_42.refs.B.col2), Σ_5.refs.K.Dot(Σ_5_42.refs.p.col2, Σ_5_42.refs.B.col2));
            return Σ_5.refs.F.FromVV(Σ_5_42.refs.Q, Σ_5_42.refs.V);
        }, Σ_5);
        Σ_5.refs.K.Abs = Σ_5.addFunction(function α5sz8(p) {
            var Σ_5_43 = new Σ.Scope(this, α5sz8, '43', Σ_5, {
                p: p
            }, []);
            if (Σ_5_43.refs.p === undefined) {
                Σ_5_43.refs.p = 0;
            }
            return Σ_5_43.refs.p > 0 ? Σ_5_43.refs.p : -Σ_5_43.refs.p;
        }, Σ_5);
        Σ_5.refs.K.AbsV = Σ_5.addFunction(function αlxpF(p) {
            var Σ_5_44 = new Σ.Scope(this, αlxpF, '44', Σ_5, {
                p: p
            }, []);
            return new Σ_5.refs.A(Σ_5.refs.K.Abs(Σ_5_44.refs.p.x), Σ_5.refs.K.Abs(Σ_5_44.refs.p.y));
        }, Σ_5);
        Σ_5.refs.K.AbsM = Σ_5.addFunction(function αVVR1(p) {
            var Σ_5_45 = new Σ.Scope(this, αVVR1, '45', Σ_5, {
                p: p
            }, []);
            return Σ_5.refs.F.FromVV(Σ_5.refs.K.AbsV(Σ_5_45.refs.p.col1), Σ_5.refs.K.AbsV(Σ_5_45.refs.p.col2));
        }, Σ_5);
        Σ_5.refs.K.Min = Σ_5.addFunction(function αlMgu(p, B) {
            var Σ_5_46 = new Σ.Scope(this, αlMgu, '46', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_46.refs.p === undefined) {
                Σ_5_46.refs.p = 0;
            }
            if (Σ_5_46.refs.B === undefined) {
                Σ_5_46.refs.B = 0;
            }
            return Σ_5_46.refs.p < Σ_5_46.refs.B ? Σ_5_46.refs.p : Σ_5_46.refs.B;
        }, Σ_5);
        Σ_5.refs.K.MinV = Σ_5.addFunction(function αD0Hx(p, B) {
            var Σ_5_47 = new Σ.Scope(this, αD0Hx, '47', Σ_5, {
                p: p,
                B: B
            }, []);
            return new Σ_5.refs.A(Σ_5.refs.K.Min(Σ_5_47.refs.p.x, Σ_5_47.refs.B.x), Σ_5.refs.K.Min(Σ_5_47.refs.p.y, Σ_5_47.refs.B.y));
        }, Σ_5);
        Σ_5.refs.K.Max = Σ_5.addFunction(function αyYQI(p, B) {
            var Σ_5_48 = new Σ.Scope(this, αyYQI, '48', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_48.refs.p === undefined) {
                Σ_5_48.refs.p = 0;
            }
            if (Σ_5_48.refs.B === undefined) {
                Σ_5_48.refs.B = 0;
            }
            return Σ_5_48.refs.p > Σ_5_48.refs.B ? Σ_5_48.refs.p : Σ_5_48.refs.B;
        }, Σ_5);
        Σ_5.refs.K.MaxV = Σ_5.addFunction(function αh0vb(p, B) {
            var Σ_5_49 = new Σ.Scope(this, αh0vb, '49', Σ_5, {
                p: p,
                B: B
            }, []);
            return new Σ_5.refs.A(Σ_5.refs.K.Max(Σ_5_49.refs.p.x, Σ_5_49.refs.B.x), Σ_5.refs.K.Max(Σ_5_49.refs.p.y, Σ_5_49.refs.B.y));
        }, Σ_5);
        Σ_5.refs.K.Clamp = Σ_5.addFunction(function αsub0(p, B, Q) {
            var Σ_5_50 = new Σ.Scope(this, αsub0, '50', Σ_5, {
                p: p,
                B: B,
                Q: Q
            }, []);
            if (Σ_5_50.refs.p === undefined) {
                Σ_5_50.refs.p = 0;
            }
            if (Σ_5_50.refs.B === undefined) {
                Σ_5_50.refs.B = 0;
            }
            if (Σ_5_50.refs.Q === undefined) {
                Σ_5_50.refs.Q = 0;
            }
            return Σ_5_50.refs.p < Σ_5_50.refs.B ? Σ_5_50.refs.B : Σ_5_50.refs.p > Σ_5_50.refs.Q ? Σ_5_50.refs.Q : Σ_5_50.refs.p;
        }, Σ_5);
        Σ_5.refs.K.ClampV = Σ_5.addFunction(function αVWub(p, B, Q) {
            var Σ_5_51 = new Σ.Scope(this, αVWub, '51', Σ_5, {
                p: p,
                B: B,
                Q: Q
            }, []);
            return Σ_5.refs.K.MaxV(Σ_5_51.refs.B, Σ_5.refs.K.MinV(Σ_5_51.refs.p, Σ_5_51.refs.Q));
        }, Σ_5);
        Σ_5.refs.K.Swap = Σ_5.addFunction(function αhdwL(p, B) {
            var Σ_5_52 = new Σ.Scope(this, αhdwL, '52', Σ_5, {
                p: p,
                B: B
            }, []);
            Σ_5_52.refs.Q = Σ_5_52.refs.p[0];
            Σ_5_52.refs.p[0] = Σ_5_52.refs.B[0];
            Σ_5_52.refs.B[0] = Σ_5_52.refs.Q;
        }, Σ_5);
        Σ_5.refs.K.Random = Σ_5.addFunction(function αlvKl() {
            var Σ_5_53 = new Σ.Scope(this, αlvKl, '53', Σ_5, {}, []);
            return Math.random() * 2 - 1;
        }, Σ_5);
        Σ_5.refs.K.RandomRange = Σ_5.addFunction(function αn4RK(p, B) {
            var Σ_5_54 = new Σ.Scope(this, αn4RK, '54', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_54.refs.p === undefined) {
                Σ_5_54.refs.p = 0;
            }
            if (Σ_5_54.refs.B === undefined) {
                Σ_5_54.refs.B = 0;
            }
            Σ_5_54.refs.Q = Math.random();
            return Σ_5_54.refs.Q = (Σ_5_54.refs.B - Σ_5_54.refs.p) * Σ_5_54.refs.Q + Σ_5_54.refs.p;
        }, Σ_5);
        Σ_5.refs.K.NextPowerOfTwo = Σ_5.addFunction(function αc8pe(p) {
            var Σ_5_55 = new Σ.Scope(this, αc8pe, '55', Σ_5, {
                p: p
            }, []);
            if (Σ_5_55.refs.p === undefined) {
                Σ_5_55.refs.p = 0;
            }
            Σ_5_55.refs.p |= Σ_5_55.refs.p >> 1 & 2147483647;
            Σ_5_55.refs.p |= Σ_5_55.refs.p >> 2 & 1073741823;
            Σ_5_55.refs.p |= Σ_5_55.refs.p >> 4 & 268435455;
            Σ_5_55.refs.p |= Σ_5_55.refs.p >> 8 & 16777215;
            Σ_5_55.refs.p |= Σ_5_55.refs.p >> 16 & 65535;
            return Σ_5_55.refs.p + 1;
        }, Σ_5);
        Σ_5.refs.K.IsPowerOfTwo = Σ_5.addFunction(function αP7FY(p) {
            var Σ_5_56 = new Σ.Scope(this, αP7FY, '56', Σ_5, {
                p: p
            }, []);
            if (Σ_5_56.refs.p === undefined) {
                Σ_5_56.refs.p = 0;
            }
            return Σ_5_56.refs.p > 0 && (Σ_5_56.refs.p & Σ_5_56.refs.p - 1) == 0;
        }, Σ_5);
        Σ.refs.Box2D.postDefs.push(Σ_5.addFunction(function αRrEP() {
            var Σ_5_57 = new Σ.Scope(this, αRrEP, '57', Σ_5, {}, []);
            Σ.refs.Box2D.Common.Math.b2Math.b2Vec2_zero = new Σ_5.refs.A(0, 0);
            Σ.refs.Box2D.Common.Math.b2Math.b2Mat22_identity = Σ_5.refs.F.FromVV(new Σ_5.refs.A(1, 0), new Σ_5.refs.A(0, 1));
            Σ.refs.Box2D.Common.Math.b2Math.b2Transform_identity = new Σ_5.refs.w(Σ_5.refs.K.b2Vec2_zero, Σ_5.refs.K.b2Mat22_identity);
        }, Σ_5));
        Σ_5.refs.y.b2Sweep = Σ_5.addFunction(function αuzKP() {
            var Σ_5_58 = new Σ.Scope(this, αuzKP, '58', Σ_5, {}, []);
            this.localCenter = new Σ_5.refs.A();
            this.c0 = new Σ_5.refs.A();
            this.c = new Σ_5.refs.A();
        }, Σ_5);
        Σ_5.refs.y.prototype.Set = Σ_5.addFunction(function α3Y1F(p) {
            var Σ_5_59 = new Σ.Scope(this, α3Y1F, '59', Σ_5, {
                p: p
            }, []);
            this.localCenter.SetV(Σ_5_59.refs.p.localCenter);
            this.c0.SetV(Σ_5_59.refs.p.c0);
            this.c.SetV(Σ_5_59.refs.p.c);
            this.a0 = Σ_5_59.refs.p.a0;
            this.a = Σ_5_59.refs.p.a;
            this.t0 = Σ_5_59.refs.p.t0;
        }, Σ_5);
        Σ_5.refs.y.prototype.Copy = Σ_5.addFunction(function αuC9W() {
            var Σ_5_60 = new Σ.Scope(this, αuC9W, '60', Σ_5, {}, []);
            Σ_5_60.refs.p = new Σ_5.refs.y();
            Σ_5_60.refs.p.localCenter.SetV(this.localCenter);
            Σ_5_60.refs.p.c0.SetV(this.c0);
            Σ_5_60.refs.p.c.SetV(this.c);
            Σ_5_60.refs.p.a0 = this.a0;
            Σ_5_60.refs.p.a = this.a;
            Σ_5_60.refs.p.t0 = this.t0;
            return Σ_5_60.refs.p;
        }, Σ_5);
        Σ_5.refs.y.prototype.GetTransform = Σ_5.addFunction(function αeF2v(p, B) {
            var Σ_5_61 = new Σ.Scope(this, αeF2v, '61', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_61.refs.B === undefined) {
                Σ_5_61.refs.B = 0;
            }
            Σ_5_61.refs.p.position.x = (1 - Σ_5_61.refs.B) * this.c0.x + Σ_5_61.refs.B * this.c.x;
            Σ_5_61.refs.p.position.y = (1 - Σ_5_61.refs.B) * this.c0.y + Σ_5_61.refs.B * this.c.y;
            Σ_5_61.refs.p.R.Set((1 - Σ_5_61.refs.B) * this.a0 + Σ_5_61.refs.B * this.a);
            Σ_5_61.refs.Q = Σ_5_61.refs.p.R;
            Σ_5_61.refs.p.position.x -= Σ_5_61.refs.Q.col1.x * this.localCenter.x + Σ_5_61.refs.Q.col2.x * this.localCenter.y;
            Σ_5_61.refs.p.position.y -= Σ_5_61.refs.Q.col1.y * this.localCenter.x + Σ_5_61.refs.Q.col2.y * this.localCenter.y;
        }, Σ_5);
        Σ_5.refs.y.prototype.Advance = Σ_5.addFunction(function α3Gdy(p) {
            var Σ_5_62 = new Σ.Scope(this, α3Gdy, '62', Σ_5, {
                p: p
            }, []);
            if (Σ_5_62.refs.p === undefined) {
                Σ_5_62.refs.p = 0;
            }
            if (this.t0 < Σ_5_62.refs.p && 1 - this.t0 > Number.MIN_VALUE) {
                Σ_5_62.refs.B = (Σ_5_62.refs.p - this.t0) / (1 - this.t0);
                this.c0.x = (1 - Σ_5_62.refs.B) * this.c0.x + Σ_5_62.refs.B * this.c.x;
                this.c0.y = (1 - Σ_5_62.refs.B) * this.c0.y + Σ_5_62.refs.B * this.c.y;
                this.a0 = (1 - Σ_5_62.refs.B) * this.a0 + Σ_5_62.refs.B * this.a;
                this.t0 = Σ_5_62.refs.p;
            }
        }, Σ_5);
        Σ_5.refs.w.b2Transform = Σ_5.addFunction(function α8PC0() {
            var Σ_5_63 = new Σ.Scope(this, α8PC0, '63', Σ_5, {}, []);
            this.position = new Σ_5.refs.A();
            this.R = new Σ_5.refs.F();
        }, Σ_5);
        Σ_5.refs.w.prototype.b2Transform = Σ_5.addFunction(function αMiE0(p, B) {
            var Σ_5_64 = new Σ.Scope(this, αMiE0, '64', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_64.refs.p === undefined) {
                Σ_5_64.refs.p = null;
            }
            if (Σ_5_64.refs.B === undefined) {
                Σ_5_64.refs.B = null;
            }
            if (Σ_5_64.refs.p) {
                this.position.SetV(Σ_5_64.refs.p);
                this.R.SetM(Σ_5_64.refs.B);
            }
        }, Σ_5);
        Σ_5.refs.w.prototype.Initialize = Σ_5.addFunction(function α0Gm2(p, B) {
            var Σ_5_65 = new Σ.Scope(this, α0Gm2, '65', Σ_5, {
                p: p,
                B: B
            }, []);
            this.position.SetV(Σ_5_65.refs.p);
            this.R.SetM(Σ_5_65.refs.B);
        }, Σ_5);
        Σ_5.refs.w.prototype.SetIdentity = Σ_5.addFunction(function αhiAM() {
            var Σ_5_66 = new Σ.Scope(this, αhiAM, '66', Σ_5, {}, []);
            this.position.SetZero();
            this.R.SetIdentity();
        }, Σ_5);
        Σ_5.refs.w.prototype.Set = Σ_5.addFunction(function α4SEn(p) {
            var Σ_5_67 = new Σ.Scope(this, α4SEn, '67', Σ_5, {
                p: p
            }, []);
            this.position.SetV(Σ_5_67.refs.p.position);
            this.R.SetM(Σ_5_67.refs.p.R);
        }, Σ_5);
        Σ_5.refs.w.prototype.GetAngle = Σ_5.addFunction(function αIp9n() {
            var Σ_5_68 = new Σ.Scope(this, αIp9n, '68', Σ_5, {}, []);
            return Math.atan2(this.R.col1.y, this.R.col1.x);
        }, Σ_5);
        Σ_5.refs.A.b2Vec2 = Σ_5.addFunction(function αALZw() {
            var Σ_5_69 = new Σ.Scope(this, αALZw, '69', Σ_5, {}, []);
        }, Σ_5);
        Σ_5.refs.A.prototype.b2Vec2 = Σ_5.addFunction(function αHwn1(p, B) {
            var Σ_5_70 = new Σ.Scope(this, αHwn1, '70', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_70.refs.p === undefined) {
                Σ_5_70.refs.p = 0;
            }
            if (Σ_5_70.refs.B === undefined) {
                Σ_5_70.refs.B = 0;
            }
            this.x = Σ_5_70.refs.p;
            this.y = Σ_5_70.refs.B;
        }, Σ_5);
        Σ_5.refs.A.prototype.SetZero = Σ_5.addFunction(function αcswI() {
            var Σ_5_71 = new Σ.Scope(this, αcswI, '71', Σ_5, {}, []);
            this.y = this.x = 0;
        }, Σ_5);
        Σ_5.refs.A.prototype.Set = Σ_5.addFunction(function αsS7n(p, B) {
            var Σ_5_72 = new Σ.Scope(this, αsS7n, '72', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_72.refs.p === undefined) {
                Σ_5_72.refs.p = 0;
            }
            if (Σ_5_72.refs.B === undefined) {
                Σ_5_72.refs.B = 0;
            }
            this.x = Σ_5_72.refs.p;
            this.y = Σ_5_72.refs.B;
        }, Σ_5);
        Σ_5.refs.A.prototype.SetV = Σ_5.addFunction(function α2Q00(p) {
            var Σ_5_73 = new Σ.Scope(this, α2Q00, '73', Σ_5, {
                p: p
            }, []);
            this.x = Σ_5_73.refs.p.x;
            this.y = Σ_5_73.refs.p.y;
        }, Σ_5);
        Σ_5.refs.A.prototype.GetNegative = Σ_5.addFunction(function αMknY() {
            var Σ_5_74 = new Σ.Scope(this, αMknY, '74', Σ_5, {}, []);
            return new Σ_5.refs.A(-this.x, -this.y);
        }, Σ_5);
        Σ_5.refs.A.prototype.NegativeSelf = Σ_5.addFunction(function αIZPS() {
            var Σ_5_75 = new Σ.Scope(this, αIZPS, '75', Σ_5, {}, []);
            this.x = -this.x;
            this.y = -this.y;
        }, Σ_5);
        Σ_5.refs.A.Make = Σ_5.addFunction(function αhD1X(p, B) {
            var Σ_5_76 = new Σ.Scope(this, αhD1X, '76', Σ_5, {
                p: p,
                B: B
            }, []);
            if (Σ_5_76.refs.p === undefined) {
                Σ_5_76.refs.p = 0;
            }
            if (Σ_5_76.refs.B === undefined) {
                Σ_5_76.refs.B = 0;
            }
            return new Σ_5.refs.A(Σ_5_76.refs.p, Σ_5_76.refs.B);
        }, Σ_5);
        Σ_5.refs.A.prototype.Copy = Σ_5.addFunction(function αcWuN() {
            var Σ_5_77 = new Σ.Scope(this, αcWuN, '77', Σ_5, {}, []);
            return new Σ_5.refs.A(this.x, this.y);
        }, Σ_5);
        Σ_5.refs.A.prototype.Add = Σ_5.addFunction(function αCjjb(p) {
            var Σ_5_78 = new Σ.Scope(this, αCjjb, '78', Σ_5, {
                p: p
            }, []);
            this.x += Σ_5_78.refs.p.x;
            this.y += Σ_5_78.refs.p.y;
        }, Σ_5);
        Σ_5.refs.A.prototype.Subtract = Σ_5.addFunction(function αWySC(p) {
            var Σ_5_79 = new Σ.Scope(this, αWySC, '79', Σ_5, {
                p: p
            }, []);
            this.x -= Σ_5_79.refs.p.x;
            this.y -= Σ_5_79.refs.p.y;
        }, Σ_5);
        Σ_5.refs.A.prototype.Multiply = Σ_5.addFunction(function αGwDA(p) {
            var Σ_5_80 = new Σ.Scope(this, αGwDA, '80', Σ_5, {
                p: p
            }, []);
            if (Σ_5_80.refs.p === undefined) {
                Σ_5_80.refs.p = 0;
            }
            this.x *= Σ_5_80.refs.p;
            this.y *= Σ_5_80.refs.p;
        }, Σ_5);
        Σ_5.refs.A.prototype.MulM = Σ_5.addFunction(function αcxhc(p) {
            var Σ_5_81 = new Σ.Scope(this, αcxhc, '81', Σ_5, {
                p: p
            }, []);
            Σ_5_81.refs.B = this.x;
            this.x = Σ_5_81.refs.p.col1.x * Σ_5_81.refs.B + Σ_5_81.refs.p.col2.x * this.y;
            this.y = Σ_5_81.refs.p.col1.y * Σ_5_81.refs.B + Σ_5_81.refs.p.col2.y * this.y;
        }, Σ_5);
        Σ_5.refs.A.prototype.MulTM = Σ_5.addFunction(function αGvaa(p) {
            var Σ_5_82 = new Σ.Scope(this, αGvaa, '82', Σ_5, {
                p: p
            }, []);
            Σ_5_82.refs.B = Σ_5.refs.K.Dot(this, Σ_5_82.refs.p.col1);
            this.y = Σ_5.refs.K.Dot(this, Σ_5_82.refs.p.col2);
            this.x = Σ_5_82.refs.B;
        }, Σ_5);
        Σ_5.refs.A.prototype.CrossVF = Σ_5.addFunction(function α2lfI(p) {
            var Σ_5_83 = new Σ.Scope(this, α2lfI, '83', Σ_5, {
                p: p
            }, []);
            if (Σ_5_83.refs.p === undefined) {
                Σ_5_83.refs.p = 0;
            }
            Σ_5_83.refs.B = this.x;
            this.x = Σ_5_83.refs.p * this.y;
            this.y = -Σ_5_83.refs.p * Σ_5_83.refs.B;
        }, Σ_5);
        Σ_5.refs.A.prototype.CrossFV = Σ_5.addFunction(function α2rET(p) {
            var Σ_5_84 = new Σ.Scope(this, α2rET, '84', Σ_5, {
                p: p
            }, []);
            if (Σ_5_84.refs.p === undefined) {
                Σ_5_84.refs.p = 0;
            }
            Σ_5_84.refs.B = this.x;
            this.x = -Σ_5_84.refs.p * this.y;
            this.y = Σ_5_84.refs.p * Σ_5_84.refs.B;
        }, Σ_5);
        Σ_5.refs.A.prototype.MinV = Σ_5.addFunction(function αTwVr(p) {
            var Σ_5_85 = new Σ.Scope(this, αTwVr, '85', Σ_5, {
                p: p
            }, []);
            this.x = this.x < Σ_5_85.refs.p.x ? this.x : Σ_5_85.refs.p.x;
            this.y = this.y < Σ_5_85.refs.p.y ? this.y : Σ_5_85.refs.p.y;
        }, Σ_5);
        Σ_5.refs.A.prototype.MaxV = Σ_5.addFunction(function αH91O(p) {
            var Σ_5_86 = new Σ.Scope(this, αH91O, '86', Σ_5, {
                p: p
            }, []);
            this.x = this.x > Σ_5_86.refs.p.x ? this.x : Σ_5_86.refs.p.x;
            this.y = this.y > Σ_5_86.refs.p.y ? this.y : Σ_5_86.refs.p.y;
        }, Σ_5);
        Σ_5.refs.A.prototype.Abs = Σ_5.addFunction(function αH8Hr() {
            var Σ_5_87 = new Σ.Scope(this, αH8Hr, '87', Σ_5, {}, []);
            if (this.x < 0) {
                this.x = -this.x;
            }
            if (this.y < 0) {
                this.y = -this.y;
            }
        }, Σ_5);
        Σ_5.refs.A.prototype.Length = Σ_5.addFunction(function αcDDi() {
            var Σ_5_88 = new Σ.Scope(this, αcDDi, '88', Σ_5, {}, []);
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }, Σ_5);
        Σ_5.refs.A.prototype.LengthSquared = Σ_5.addFunction(function αYx02() {
            var Σ_5_89 = new Σ.Scope(this, αYx02, '89', Σ_5, {}, []);
            return this.x * this.x + this.y * this.y;
        }, Σ_5);
        Σ_5.refs.A.prototype.Normalize = Σ_5.addFunction(function αeztD() {
            var Σ_5_90 = new Σ.Scope(this, αeztD, '90', Σ_5, {}, []);
            Σ_5_90.refs.p = Math.sqrt(this.x * this.x + this.y * this.y);
            if (Σ_5_90.refs.p < Number.MIN_VALUE) {
                return 0;
            }
            Σ_5_90.refs.B = 1 / Σ_5_90.refs.p;
            this.x *= Σ_5_90.refs.B;
            this.y *= Σ_5_90.refs.B;
            return Σ_5_90.refs.p;
        }, Σ_5);
        Σ_5.refs.A.prototype.IsValid = Σ_5.addFunction(function αejMB() {
            var Σ_5_91 = new Σ.Scope(this, αejMB, '91', Σ_5, {}, []);
            return Σ_5.refs.K.IsValid(this.x) && Σ_5.refs.K.IsValid(this.y);
        }, Σ_5);
        Σ_5.refs.U.b2Vec3 = Σ_5.addFunction(function αMUXG() {
            var Σ_5_92 = new Σ.Scope(this, αMUXG, '92', Σ_5, {}, []);
        }, Σ_5);
        Σ_5.refs.U.prototype.b2Vec3 = Σ_5.addFunction(function αfOjk(p, B, Q) {
            var Σ_5_93 = new Σ.Scope(this, αfOjk, '93', Σ_5, {
                p: p,
                B: B,
                Q: Q
            }, []);
            if (Σ_5_93.refs.p === undefined) {
                Σ_5_93.refs.p = 0;
            }
            if (Σ_5_93.refs.B === undefined) {
                Σ_5_93.refs.B = 0;
            }
            if (Σ_5_93.refs.Q === undefined) {
                Σ_5_93.refs.Q = 0;
            }
            this.x = Σ_5_93.refs.p;
            this.y = Σ_5_93.refs.B;
            this.z = Σ_5_93.refs.Q;
        }, Σ_5);
        Σ_5.refs.U.prototype.SetZero = Σ_5.addFunction(function αWJ6u() {
            var Σ_5_94 = new Σ.Scope(this, αWJ6u, '94', Σ_5, {}, []);
            this.x = this.y = this.z = 0;
        }, Σ_5);
        Σ_5.refs.U.prototype.Set = Σ_5.addFunction(function αvriP(p, B, Q) {
            var Σ_5_95 = new Σ.Scope(this, αvriP, '95', Σ_5, {
                p: p,
                B: B,
                Q: Q
            }, []);
            if (Σ_5_95.refs.p === undefined) {
                Σ_5_95.refs.p = 0;
            }
            if (Σ_5_95.refs.B === undefined) {
                Σ_5_95.refs.B = 0;
            }
            if (Σ_5_95.refs.Q === undefined) {
                Σ_5_95.refs.Q = 0;
            }
            this.x = Σ_5_95.refs.p;
            this.y = Σ_5_95.refs.B;
            this.z = Σ_5_95.refs.Q;
        }, Σ_5);
        Σ_5.refs.U.prototype.SetV = Σ_5.addFunction(function αdNl7(p) {
            var Σ_5_96 = new Σ.Scope(this, αdNl7, '96', Σ_5, {
                p: p
            }, []);
            this.x = Σ_5_96.refs.p.x;
            this.y = Σ_5_96.refs.p.y;
            this.z = Σ_5_96.refs.p.z;
        }, Σ_5);
        Σ_5.refs.U.prototype.GetNegative = Σ_5.addFunction(function αd4oC() {
            var Σ_5_97 = new Σ.Scope(this, αd4oC, '97', Σ_5, {}, []);
            return new Σ_5.refs.U(-this.x, -this.y, -this.z);
        }, Σ_5);
        Σ_5.refs.U.prototype.NegativeSelf = Σ_5.addFunction(function αXwzY() {
            var Σ_5_98 = new Σ.Scope(this, αXwzY, '98', Σ_5, {}, []);
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
        }, Σ_5);
        Σ_5.refs.U.prototype.Copy = Σ_5.addFunction(function αTO6e() {
            var Σ_5_99 = new Σ.Scope(this, αTO6e, '99', Σ_5, {}, []);
            return new Σ_5.refs.U(this.x, this.y, this.z);
        }, Σ_5);
        Σ_5.refs.U.prototype.Add = Σ_5.addFunction(function α6DUC(p) {
            var Σ_5_100 = new Σ.Scope(this, α6DUC, '100', Σ_5, {
                p: p
            }, []);
            this.x += Σ_5_100.refs.p.x;
            this.y += Σ_5_100.refs.p.y;
            this.z += Σ_5_100.refs.p.z;
        }, Σ_5);
        Σ_5.refs.U.prototype.Subtract = Σ_5.addFunction(function α1PPJ(p) {
            var Σ_5_101 = new Σ.Scope(this, α1PPJ, '101', Σ_5, {
                p: p
            }, []);
            this.x -= Σ_5_101.refs.p.x;
            this.y -= Σ_5_101.refs.p.y;
            this.z -= Σ_5_101.refs.p.z;
        }, Σ_5);
        Σ_5.refs.U.prototype.Multiply = Σ_5.addFunction(function αw6ct(p) {
            var Σ_5_102 = new Σ.Scope(this, αw6ct, '102', Σ_5, {
                p: p
            }, []);
            if (Σ_5_102.refs.p === undefined) {
                Σ_5_102.refs.p = 0;
            }
            this.x *= Σ_5_102.refs.p;
            this.y *= Σ_5_102.refs.p;
            this.z *= Σ_5_102.refs.p;
        }, Σ_5);
    }());
    (function αQkDm() {
        var Σ_6 = new Σ.Scope(this, αQkDm, '6', Σ, {}, []);
        Σ_6.refs.F = Σ.refs.Box2D.Common.Math.b2Math, Σ_6.refs.G = Σ.refs.Box2D.Common.Math.b2Sweep, Σ_6.refs.K = Σ.refs.Box2D.Common.Math.b2Transform, Σ_6.refs.y = Σ.refs.Box2D.Common.Math.b2Vec2, Σ_6.refs.w = Σ.refs.Box2D.Common.b2Color, Σ_6.refs.A = Σ.refs.Box2D.Common.b2Settings, Σ_6.refs.U = Σ.refs.Box2D.Collision.b2AABB, Σ_6.refs.p = Σ.refs.Box2D.Collision.b2ContactPoint, Σ_6.refs.B = Σ.refs.Box2D.Collision.b2DynamicTreeBroadPhase, Σ_6.refs.Q = Σ.refs.Box2D.Collision.b2RayCastInput, Σ_6.refs.V = Σ.refs.Box2D.Collision.b2RayCastOutput, Σ_6.refs.M = Σ.refs.Box2D.Collision.Shapes.b2CircleShape, Σ_6.refs.L = Σ.refs.Box2D.Collision.Shapes.b2EdgeShape, Σ_6.refs.I = Σ.refs.Box2D.Collision.Shapes.b2MassData, Σ_6.refs.W = Σ.refs.Box2D.Collision.Shapes.b2PolygonShape, Σ_6.refs.Y = Σ.refs.Box2D.Collision.Shapes.b2Shape, Σ_6.refs.k = Σ.refs.Box2D.Dynamics.b2Body, Σ_6.refs.z = Σ.refs.Box2D.Dynamics.b2BodyDef, Σ_6.refs.u = Σ.refs.Box2D.Dynamics.b2ContactFilter, Σ_6.refs.D = Σ.refs.Box2D.Dynamics.b2ContactImpulse, Σ_6.refs.H = Σ.refs.Box2D.Dynamics.b2ContactListener, Σ_6.refs.O = Σ.refs.Box2D.Dynamics.b2ContactManager, Σ_6.refs.E = Σ.refs.Box2D.Dynamics.b2DebugDraw, Σ_6.refs.R = Σ.refs.Box2D.Dynamics.b2DestructionListener, Σ_6.refs.N = Σ.refs.Box2D.Dynamics.b2FilterData, Σ_6.refs.S = Σ.refs.Box2D.Dynamics.b2Fixture, Σ_6.refs.aa = Σ.refs.Box2D.Dynamics.b2FixtureDef, Σ_6.refs.Z = Σ.refs.Box2D.Dynamics.b2Island, Σ_6.refs.d = Σ.refs.Box2D.Dynamics.b2TimeStep, Σ_6.refs.h = Σ.refs.Box2D.Dynamics.b2World, Σ_6.refs.l = Σ.refs.Box2D.Dynamics.Contacts.b2Contact, Σ_6.refs.j = Σ.refs.Box2D.Dynamics.Contacts.b2ContactFactory, Σ_6.refs.o = Σ.refs.Box2D.Dynamics.Contacts.b2ContactSolver, Σ_6.refs.q = Σ.refs.Box2D.Dynamics.Joints.b2Joint, Σ_6.refs.n = Σ.refs.Box2D.Dynamics.Joints.b2PulleyJoint;
        Σ_6.refs.k.b2Body = Σ_6.addFunction(function αbg5X() {
            var Σ_6_0 = new Σ.Scope(this, αbg5X, '0', Σ_6, {}, []);
            this.m_xf = new Σ_6.refs.K();
            this.m_sweep = new Σ_6.refs.G();
            this.m_linearVelocity = new Σ_6.refs.y();
            this.m_force = new Σ_6.refs.y();
        }, Σ_6);
        Σ_6.refs.k.prototype.connectEdges = Σ_6.addFunction(function αeolz(a, c, g) {
            var Σ_6_1 = new Σ.Scope(this, αeolz, '1', Σ_6, {
                a: a,
                c: c,
                g: g
            }, []);
            if (Σ_6_1.refs.g === undefined) {
                Σ_6_1.refs.g = 0;
            }
            Σ_6_1.refs.b = Math.atan2(Σ_6_1.refs.c.GetDirectionVector().y, Σ_6_1.refs.c.GetDirectionVector().x);
            Σ_6_1.refs.g = Σ_6.refs.F.MulFV(Math.tan((Σ_6_1.refs.b - Σ_6_1.refs.g) * 0.5), Σ_6_1.refs.c.GetDirectionVector());
            Σ_6_1.refs.g = Σ_6.refs.F.SubtractVV(Σ_6_1.refs.g, Σ_6_1.refs.c.GetNormalVector());
            Σ_6_1.refs.g = Σ_6.refs.F.MulFV(Σ_6.refs.A.b2_toiSlop, Σ_6_1.refs.g);
            Σ_6_1.refs.g = Σ_6.refs.F.AddVV(Σ_6_1.refs.g, Σ_6_1.refs.c.GetVertex1());
            Σ_6_1.refs.e = Σ_6.refs.F.AddVV(Σ_6_1.refs.a.GetDirectionVector(), Σ_6_1.refs.c.GetDirectionVector());
            Σ_6_1.refs.e.Normalize();
            Σ_6_1.refs.f = Σ_6.refs.F.Dot(Σ_6_1.refs.a.GetDirectionVector(), Σ_6_1.refs.c.GetNormalVector()) > 0;
            Σ_6_1.refs.a.SetNextEdge(Σ_6_1.refs.c, Σ_6_1.refs.g, Σ_6_1.refs.e, Σ_6_1.refs.f);
            Σ_6_1.refs.c.SetPrevEdge(Σ_6_1.refs.a, Σ_6_1.refs.g, Σ_6_1.refs.e, Σ_6_1.refs.f);
            return Σ_6_1.refs.b;
        }, Σ_6);
        Σ_6.refs.k.prototype.CreateFixture = Σ_6.addFunction(function αh4tG(a) {
            var Σ_6_2 = new Σ.Scope(this, αh4tG, '2', Σ_6, {
                a: a
            }, []);
            if (this.m_world.IsLocked() == true) {
                return null;
            }
            Σ_6_2.refs.c = new Σ_6.refs.S();
            Σ_6_2.refs.c.Create(this, this.m_xf, Σ_6_2.refs.a);
            this.m_flags & Σ_6.refs.k.e_activeFlag && Σ_6_2.refs.c.CreateProxy(this.m_world.m_contactManager.m_broadPhase, this.m_xf);
            Σ_6_2.refs.c.m_next = this.m_fixtureList;
            this.m_fixtureList = Σ_6_2.refs.c;
            ++this.m_fixtureCount;
            Σ_6_2.refs.c.m_body = this;
            Σ_6_2.refs.c.m_density > 0 && this.ResetMassData();
            this.m_world.m_flags |= Σ_6.refs.h.e_newFixture;
            return Σ_6_2.refs.c;
        }, Σ_6);
        Σ_6.refs.k.prototype.CreateFixture2 = Σ_6.addFunction(function αLFEJ(a, c) {
            var Σ_6_3 = new Σ.Scope(this, αLFEJ, '3', Σ_6, {
                a: a,
                c: c
            }, []);
            if (Σ_6_3.refs.c === undefined) {
                Σ_6_3.refs.c = 0;
            }
            Σ_6_3.refs.g = new Σ_6.refs.aa();
            Σ_6_3.refs.g.shape = Σ_6_3.refs.a;
            Σ_6_3.refs.g.density = Σ_6_3.refs.c;
            return this.CreateFixture(Σ_6_3.refs.g);
        }, Σ_6);
        Σ_6.refs.k.prototype.DestroyFixture = Σ_6.addFunction(function αMV7z(a) {
            var Σ_6_4 = new Σ.Scope(this, αMV7z, '4', Σ_6, {
                a: a
            }, []);
            if (this.m_world.IsLocked() != true) {
                for (Σ_6_4.refs.c = this.m_fixtureList, Σ_6_4.refs.g = null; Σ_6_4.refs.c != null;) {
                    if (Σ_6_4.refs.c == Σ_6_4.refs.a) {
                        if (Σ_6_4.refs.g) {
                            Σ_6_4.refs.g.m_next = Σ_6_4.refs.a.m_next;
                        } else {
                            this.m_fixtureList = Σ_6_4.refs.a.m_next;
                        }
                        break;
                    }
                    Σ_6_4.refs.g = Σ_6_4.refs.c;
                    Σ_6_4.refs.c = Σ_6_4.refs.c.m_next;
                }
                for (Σ_6_4.refs.c = this.m_contactList; Σ_6_4.refs.c;) {
                    Σ_6_4.refs.g = Σ_6_4.refs.c.contact;
                    Σ_6_4.refs.c = Σ_6_4.refs.c.next;
                    Σ_6_4.refs.b = Σ_6_4.refs.g.GetFixtureA(), Σ_6_4.refs.e = Σ_6_4.refs.g.GetFixtureB();
                    if (Σ_6_4.refs.a == Σ_6_4.refs.b || Σ_6_4.refs.a == Σ_6_4.refs.e) {
                        this.m_world.m_contactManager.Destroy(Σ_6_4.refs.g);
                    }
                }
                this.m_flags & Σ_6.refs.k.e_activeFlag && Σ_6_4.refs.a.DestroyProxy(this.m_world.m_contactManager.m_broadPhase);
                Σ_6_4.refs.a.Destroy();
                Σ_6_4.refs.a.m_body = null;
                Σ_6_4.refs.a.m_next = null;
                --this.m_fixtureCount;
                this.ResetMassData();
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.SetPositionAndAngle = Σ_6.addFunction(function αQ3jj(a, c) {
            var Σ_6_5 = new Σ.Scope(this, αQ3jj, '5', Σ_6, {
                a: a,
                c: c
            }, []);
            if (Σ_6_5.refs.c === undefined) {
                Σ_6_5.refs.c = 0;
            }
            Σ_6_5.refs.g = undefined;
            if (this.m_world.IsLocked() != true) {
                this.m_xf.R.Set(Σ_6_5.refs.c);
                this.m_xf.position.SetV(Σ_6_5.refs.a);
                Σ_6_5.refs.g = this.m_xf.R;
                Σ_6_5.refs.b = this.m_sweep.localCenter;
                this.m_sweep.c.x = Σ_6_5.refs.g.col1.x * Σ_6_5.refs.b.x + Σ_6_5.refs.g.col2.x * Σ_6_5.refs.b.y;
                this.m_sweep.c.y = Σ_6_5.refs.g.col1.y * Σ_6_5.refs.b.x + Σ_6_5.refs.g.col2.y * Σ_6_5.refs.b.y;
                this.m_sweep.c.x += this.m_xf.position.x;
                this.m_sweep.c.y += this.m_xf.position.y;
                this.m_sweep.c0.SetV(this.m_sweep.c);
                this.m_sweep.a0 = this.m_sweep.a = Σ_6_5.refs.c;
                Σ_6_5.refs.b = this.m_world.m_contactManager.m_broadPhase;
                for (Σ_6_5.refs.g = this.m_fixtureList; Σ_6_5.refs.g; Σ_6_5.refs.g = Σ_6_5.refs.g.m_next) {
                    Σ_6_5.refs.g.Synchronize(Σ_6_5.refs.b, this.m_xf, this.m_xf);
                }
                this.m_world.m_contactManager.FindNewContacts();
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.SetTransform = Σ_6.addFunction(function αFsFM(a) {
            var Σ_6_6 = new Σ.Scope(this, αFsFM, '6', Σ_6, {
                a: a
            }, []);
            this.SetPositionAndAngle(Σ_6_6.refs.a.position, Σ_6_6.refs.a.GetAngle());
        }, Σ_6);
        Σ_6.refs.k.prototype.GetTransform = Σ_6.addFunction(function αeFHP() {
            var Σ_6_7 = new Σ.Scope(this, αeFHP, '7', Σ_6, {}, []);
            return this.m_xf;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetPosition = Σ_6.addFunction(function α2DJr() {
            var Σ_6_8 = new Σ.Scope(this, α2DJr, '8', Σ_6, {}, []);
            return this.m_xf.position;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetPosition = Σ_6.addFunction(function α9Xqg(a) {
            var Σ_6_9 = new Σ.Scope(this, α9Xqg, '9', Σ_6, {
                a: a
            }, []);
            this.SetPositionAndAngle(Σ_6_9.refs.a, this.GetAngle());
        }, Σ_6);
        Σ_6.refs.k.prototype.GetAngle = Σ_6.addFunction(function αpLv5() {
            var Σ_6_10 = new Σ.Scope(this, αpLv5, '10', Σ_6, {}, []);
            return this.m_sweep.a;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetAngle = Σ_6.addFunction(function αKBz0(a) {
            var Σ_6_11 = new Σ.Scope(this, αKBz0, '11', Σ_6, {
                a: a
            }, []);
            if (Σ_6_11.refs.a === undefined) {
                Σ_6_11.refs.a = 0;
            }
            this.SetPositionAndAngle(this.GetPosition(), Σ_6_11.refs.a);
        }, Σ_6);
        Σ_6.refs.k.prototype.GetWorldCenter = Σ_6.addFunction(function αrvHh() {
            var Σ_6_12 = new Σ.Scope(this, αrvHh, '12', Σ_6, {}, []);
            return this.m_sweep.c;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetLocalCenter = Σ_6.addFunction(function αg7lb() {
            var Σ_6_13 = new Σ.Scope(this, αg7lb, '13', Σ_6, {}, []);
            return this.m_sweep.localCenter;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetLinearVelocity = Σ_6.addFunction(function αzurh(a) {
            var Σ_6_14 = new Σ.Scope(this, αzurh, '14', Σ_6, {
                a: a
            }, []);
            this.m_type != Σ_6.refs.k.b2_staticBody && this.m_linearVelocity.SetV(Σ_6_14.refs.a);
        }, Σ_6);
        Σ_6.refs.k.prototype.GetLinearVelocity = Σ_6.addFunction(function αlX7x() {
            var Σ_6_15 = new Σ.Scope(this, αlX7x, '15', Σ_6, {}, []);
            return this.m_linearVelocity;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetAngularVelocity = Σ_6.addFunction(function αPJ0n(a) {
            var Σ_6_16 = new Σ.Scope(this, αPJ0n, '16', Σ_6, {
                a: a
            }, []);
            if (Σ_6_16.refs.a === undefined) {
                Σ_6_16.refs.a = 0;
            }
            if (this.m_type != Σ_6.refs.k.b2_staticBody) {
                this.m_angularVelocity = Σ_6_16.refs.a;
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.GetAngularVelocity = Σ_6.addFunction(function αe8I7() {
            var Σ_6_17 = new Σ.Scope(this, αe8I7, '17', Σ_6, {}, []);
            return this.m_angularVelocity;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetDefinition = Σ_6.addFunction(function αDcxR() {
            var Σ_6_18 = new Σ.Scope(this, αDcxR, '18', Σ_6, {}, []);
            Σ_6_18.refs.a = new Σ_6.refs.z();
            Σ_6_18.refs.a.type = this.GetType();
            Σ_6_18.refs.a.allowSleep = (this.m_flags & Σ_6.refs.k.e_allowSleepFlag) == Σ_6.refs.k.e_allowSleepFlag;
            Σ_6_18.refs.a.angle = this.GetAngle();
            Σ_6_18.refs.a.angularDamping = this.m_angularDamping;
            Σ_6_18.refs.a.angularVelocity = this.m_angularVelocity;
            Σ_6_18.refs.a.fixedRotation = (this.m_flags & Σ_6.refs.k.e_fixedRotationFlag) == Σ_6.refs.k.e_fixedRotationFlag;
            Σ_6_18.refs.a.bullet = (this.m_flags & Σ_6.refs.k.e_bulletFlag) == Σ_6.refs.k.e_bulletFlag;
            Σ_6_18.refs.a.awake = (this.m_flags & Σ_6.refs.k.e_awakeFlag) == Σ_6.refs.k.e_awakeFlag;
            Σ_6_18.refs.a.linearDamping = this.m_linearDamping;
            Σ_6_18.refs.a.linearVelocity.SetV(this.GetLinearVelocity());
            Σ_6_18.refs.a.position = this.GetPosition();
            Σ_6_18.refs.a.userData = this.GetUserData();
            return Σ_6_18.refs.a;
        }, Σ_6);
        Σ_6.refs.k.prototype.ApplyForce = Σ_6.addFunction(function αWXcl(a, c) {
            var Σ_6_19 = new Σ.Scope(this, αWXcl, '19', Σ_6, {
                a: a,
                c: c
            }, []);
            if (this.m_type == Σ_6.refs.k.b2_dynamicBody) {
                this.IsAwake() == false && this.SetAwake(true);
                this.m_force.x += Σ_6_19.refs.a.x;
                this.m_force.y += Σ_6_19.refs.a.y;
                this.m_torque += (Σ_6_19.refs.c.x - this.m_sweep.c.x) * Σ_6_19.refs.a.y - (Σ_6_19.refs.c.y - this.m_sweep.c.y) * Σ_6_19.refs.a.x;
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.ApplyTorque = Σ_6.addFunction(function αfnsb(a) {
            var Σ_6_20 = new Σ.Scope(this, αfnsb, '20', Σ_6, {
                a: a
            }, []);
            if (Σ_6_20.refs.a === undefined) {
                Σ_6_20.refs.a = 0;
            }
            if (this.m_type == Σ_6.refs.k.b2_dynamicBody) {
                this.IsAwake() == false && this.SetAwake(true);
                this.m_torque += Σ_6_20.refs.a;
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.ApplyImpulse = Σ_6.addFunction(function αFLVE(a, c) {
            var Σ_6_21 = new Σ.Scope(this, αFLVE, '21', Σ_6, {
                a: a,
                c: c
            }, []);
            if (this.m_type == Σ_6.refs.k.b2_dynamicBody) {
                this.IsAwake() == false && this.SetAwake(true);
                this.m_linearVelocity.x += this.m_invMass * Σ_6_21.refs.a.x;
                this.m_linearVelocity.y += this.m_invMass * Σ_6_21.refs.a.y;
                this.m_angularVelocity += this.m_invI * ((Σ_6_21.refs.c.x - this.m_sweep.c.x) * Σ_6_21.refs.a.y - (Σ_6_21.refs.c.y - this.m_sweep.c.y) * Σ_6_21.refs.a.x);
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.Split = Σ_6.addFunction(function αkph4(a) {
            var Σ_6_22 = new Σ.Scope(this, αkph4, '22', Σ_6, {
                a: a
            }, []);
            for (Σ_6_22.refs.c = this.GetLinearVelocity().Copy(), Σ_6_22.refs.g = this.GetAngularVelocity(), Σ_6_22.refs.b = this.GetWorldCenter(), Σ_6_22.refs.e = this.m_world.CreateBody(this.GetDefinition()), Σ_6_22.refs.f = undefined, Σ_6_22.refs.m = this.m_fixtureList; Σ_6_22.refs.m;) {
                if (Σ_6_22.refs.a(Σ_6_22.refs.m)) {
                    Σ_6_22.refs.r = Σ_6_22.refs.m.m_next;
                    if (Σ_6_22.refs.f) {
                        Σ_6_22.refs.f.m_next = Σ_6_22.refs.r;
                    } else {
                        this.m_fixtureList = Σ_6_22.refs.r;
                    }
                    this.m_fixtureCount--;
                    Σ_6_22.refs.m.m_next = Σ_6_22.refs.e.m_fixtureList;
                    Σ_6_22.refs.e.m_fixtureList = Σ_6_22.refs.m;
                    Σ_6_22.refs.e.m_fixtureCount++;
                    Σ_6_22.refs.m.m_body = Σ_6_22.refs.e;
                    Σ_6_22.refs.m = Σ_6_22.refs.r;
                } else {
                    Σ_6_22.refs.f = Σ_6_22.refs.m;
                    Σ_6_22.refs.m = Σ_6_22.refs.m.m_next;
                }
            }
            this.ResetMassData();
            Σ_6_22.refs.e.ResetMassData();
            Σ_6_22.refs.f = this.GetWorldCenter();
            Σ_6_22.refs.a = Σ_6_22.refs.e.GetWorldCenter();
            Σ_6_22.refs.f = Σ_6.refs.F.AddVV(Σ_6_22.refs.c, Σ_6.refs.F.CrossFV(Σ_6_22.refs.g, Σ_6.refs.F.SubtractVV(Σ_6_22.refs.f, Σ_6_22.refs.b)));
            Σ_6_22.refs.c = Σ_6.refs.F.AddVV(Σ_6_22.refs.c, Σ_6.refs.F.CrossFV(Σ_6_22.refs.g, Σ_6.refs.F.SubtractVV(Σ_6_22.refs.a, Σ_6_22.refs.b)));
            this.SetLinearVelocity(Σ_6_22.refs.f);
            Σ_6_22.refs.e.SetLinearVelocity(Σ_6_22.refs.c);
            this.SetAngularVelocity(Σ_6_22.refs.g);
            Σ_6_22.refs.e.SetAngularVelocity(Σ_6_22.refs.g);
            this.SynchronizeFixtures();
            Σ_6_22.refs.e.SynchronizeFixtures();
            return Σ_6_22.refs.e;
        }, Σ_6);
        Σ_6.refs.k.prototype.Merge = Σ_6.addFunction(function αztMm(a) {
            var Σ_6_23 = new Σ.Scope(this, αztMm, '23', Σ_6, {
                a: a
            }, []);
            Σ_6_23.refs.c = undefined;
            for (Σ_6_23.refs.c = Σ_6_23.refs.a.m_fixtureList; Σ_6_23.refs.c;) {
                Σ_6_23.refs.g = Σ_6_23.refs.c.m_next;
                Σ_6_23.refs.a.m_fixtureCount--;
                Σ_6_23.refs.c.m_next = this.m_fixtureList;
                this.m_fixtureList = Σ_6_23.refs.c;
                this.m_fixtureCount++;
                Σ_6_23.refs.c.m_body = e;
                Σ_6_23.refs.c = Σ_6_23.refs.g;
            }
            b.m_fixtureCount = 0;
            Σ_6_23.refs.b = this, Σ_6_23.refs.e = Σ_6_23.refs.a;
            Σ_6_23.refs.b.GetWorldCenter();
            Σ_6_23.refs.e.GetWorldCenter();
            Σ_6_23.refs.b.GetLinearVelocity().Copy();
            Σ_6_23.refs.e.GetLinearVelocity().Copy();
            Σ_6_23.refs.b.GetAngularVelocity();
            Σ_6_23.refs.e.GetAngularVelocity();
            Σ_6_23.refs.b.ResetMassData();
            this.SynchronizeFixtures();
        }, Σ_6);
        Σ_6.refs.k.prototype.GetMass = Σ_6.addFunction(function αRTvx() {
            var Σ_6_24 = new Σ.Scope(this, αRTvx, '24', Σ_6, {}, []);
            return this.m_mass;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetInertia = Σ_6.addFunction(function α1Wuk() {
            var Σ_6_25 = new Σ.Scope(this, α1Wuk, '25', Σ_6, {}, []);
            return this.m_I;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetMassData = Σ_6.addFunction(function αc7jp(a) {
            var Σ_6_26 = new Σ.Scope(this, αc7jp, '26', Σ_6, {
                a: a
            }, []);
            Σ_6_26.refs.a.mass = this.m_mass;
            Σ_6_26.refs.a.I = this.m_I;
            Σ_6_26.refs.a.center.SetV(this.m_sweep.localCenter);
        }, Σ_6);
        Σ_6.refs.k.prototype.SetMassData = Σ_6.addFunction(function αJZl9(a) {
            var Σ_6_27 = new Σ.Scope(this, αJZl9, '27', Σ_6, {
                a: a
            }, []);
            Σ_6.refs.A.b2Assert(this.m_world.IsLocked() == false);
            if (this.m_world.IsLocked() != true) {
                if (this.m_type == Σ_6.refs.k.b2_dynamicBody) {
                    this.m_invI = this.m_I = this.m_invMass = 0;
                    this.m_mass = Σ_6_27.refs.a.mass;
                    if (this.m_mass <= 0) {
                        this.m_mass = 1;
                    }
                    this.m_invMass = 1 / this.m_mass;
                    if (Σ_6_27.refs.a.I > 0 && (this.m_flags & Σ_6.refs.k.e_fixedRotationFlag) == 0) {
                        this.m_I = Σ_6_27.refs.a.I - this.m_mass * (Σ_6_27.refs.a.center.x * Σ_6_27.refs.a.center.x + Σ_6_27.refs.a.center.y * Σ_6_27.refs.a.center.y);
                        this.m_invI = 1 / this.m_I;
                    }
                    Σ_6_27.refs.c = this.m_sweep.c.Copy();
                    this.m_sweep.localCenter.SetV(Σ_6_27.refs.a.center);
                    this.m_sweep.c0.SetV(Σ_6.refs.F.MulX(this.m_xf, this.m_sweep.localCenter));
                    this.m_sweep.c.SetV(this.m_sweep.c0);
                    this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - Σ_6_27.refs.c.y);
                    this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - Σ_6_27.refs.c.x);
                }
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.ResetMassData = Σ_6.addFunction(function αoClh() {
            var Σ_6_28 = new Σ.Scope(this, αoClh, '28', Σ_6, {}, []);
            this.m_invI = this.m_I = this.m_invMass = this.m_mass = 0;
            this.m_sweep.localCenter.SetZero();
            if (!(this.m_type == Σ_6.refs.k.b2_staticBody || this.m_type == Σ_6.refs.k.b2_kinematicBody)) {
                for (Σ_6_28.refs.a = Σ_6.refs.y.Make(0, 0), Σ_6_28.refs.c = this.m_fixtureList; Σ_6_28.refs.c; Σ_6_28.refs.c = Σ_6_28.refs.c.m_next) {
                    if (Σ_6_28.refs.c.m_density != 0) {
                        Σ_6_28.refs.g = Σ_6_28.refs.c.GetMassData();
                        this.m_mass += Σ_6_28.refs.g.mass;
                        Σ_6_28.refs.a.x += Σ_6_28.refs.g.center.x * Σ_6_28.refs.g.mass;
                        Σ_6_28.refs.a.y += Σ_6_28.refs.g.center.y * Σ_6_28.refs.g.mass;
                        this.m_I += Σ_6_28.refs.g.I;
                    }
                }
                if (this.m_mass > 0) {
                    this.m_invMass = 1 / this.m_mass;
                    Σ_6_28.refs.a.x *= this.m_invMass;
                    Σ_6_28.refs.a.y *= this.m_invMass;
                } else {
                    this.m_invMass = this.m_mass = 1;
                }
                if (this.m_I > 0 && (this.m_flags & Σ_6.refs.k.e_fixedRotationFlag) == 0) {
                    this.m_I -= this.m_mass * (Σ_6_28.refs.a.x * Σ_6_28.refs.a.x + Σ_6_28.refs.a.y * Σ_6_28.refs.a.y);
                    this.m_I *= this.m_inertiaScale;
                    Σ_6.refs.A.b2Assert(this.m_I > 0);
                    this.m_invI = 1 / this.m_I;
                } else {
                    this.m_invI = this.m_I = 0;
                }
                Σ_6_28.refs.c = this.m_sweep.c.Copy();
                this.m_sweep.localCenter.SetV(Σ_6_28.refs.a);
                this.m_sweep.c0.SetV(Σ_6.refs.F.MulX(this.m_xf, this.m_sweep.localCenter));
                this.m_sweep.c.SetV(this.m_sweep.c0);
                this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - Σ_6_28.refs.c.y);
                this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - Σ_6_28.refs.c.x);
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.GetWorldPoint = Σ_6.addFunction(function αWGij(a) {
            var Σ_6_29 = new Σ.Scope(this, αWGij, '29', Σ_6, {
                a: a
            }, []);
            Σ_6_29.refs.c = this.m_xf.R;
            Σ_6_29.refs.a = new Σ_6.refs.y(Σ_6_29.refs.c.col1.x * Σ_6_29.refs.a.x + Σ_6_29.refs.c.col2.x * Σ_6_29.refs.a.y, Σ_6_29.refs.c.col1.y * Σ_6_29.refs.a.x + Σ_6_29.refs.c.col2.y * Σ_6_29.refs.a.y);
            Σ_6_29.refs.a.x += this.m_xf.position.x;
            Σ_6_29.refs.a.y += this.m_xf.position.y;
            return Σ_6_29.refs.a;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetWorldVector = Σ_6.addFunction(function αAlnq(a) {
            var Σ_6_30 = new Σ.Scope(this, αAlnq, '30', Σ_6, {
                a: a
            }, []);
            return Σ_6.refs.F.MulMV(this.m_xf.R, Σ_6_30.refs.a);
        }, Σ_6);
        Σ_6.refs.k.prototype.GetLocalPoint = Σ_6.addFunction(function αkF0F(a) {
            var Σ_6_31 = new Σ.Scope(this, αkF0F, '31', Σ_6, {
                a: a
            }, []);
            return Σ_6.refs.F.MulXT(this.m_xf, Σ_6_31.refs.a);
        }, Σ_6);
        Σ_6.refs.k.prototype.GetLocalVector = Σ_6.addFunction(function αrnTE(a) {
            var Σ_6_32 = new Σ.Scope(this, αrnTE, '32', Σ_6, {
                a: a
            }, []);
            return Σ_6.refs.F.MulTMV(this.m_xf.R, Σ_6_32.refs.a);
        }, Σ_6);
        Σ_6.refs.k.prototype.GetLinearVelocityFromWorldPoint = Σ_6.addFunction(function αlcpT(a) {
            var Σ_6_33 = new Σ.Scope(this, αlcpT, '33', Σ_6, {
                a: a
            }, []);
            return new Σ_6.refs.y(this.m_linearVelocity.x - this.m_angularVelocity * (Σ_6_33.refs.a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (Σ_6_33.refs.a.x - this.m_sweep.c.x));
        }, Σ_6);
        Σ_6.refs.k.prototype.GetLinearVelocityFromLocalPoint = Σ_6.addFunction(function αcqJK(a) {
            var Σ_6_34 = new Σ.Scope(this, αcqJK, '34', Σ_6, {
                a: a
            }, []);
            Σ_6_34.refs.c = this.m_xf.R;
            Σ_6_34.refs.a = new Σ_6.refs.y(Σ_6_34.refs.c.col1.x * Σ_6_34.refs.a.x + Σ_6_34.refs.c.col2.x * Σ_6_34.refs.a.y, Σ_6_34.refs.c.col1.y * Σ_6_34.refs.a.x + Σ_6_34.refs.c.col2.y * Σ_6_34.refs.a.y);
            Σ_6_34.refs.a.x += this.m_xf.position.x;
            Σ_6_34.refs.a.y += this.m_xf.position.y;
            return new Σ_6.refs.y(this.m_linearVelocity.x - this.m_angularVelocity * (Σ_6_34.refs.a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (Σ_6_34.refs.a.x - this.m_sweep.c.x));
        }, Σ_6);
        Σ_6.refs.k.prototype.GetLinearDamping = Σ_6.addFunction(function α9kHK() {
            var Σ_6_35 = new Σ.Scope(this, α9kHK, '35', Σ_6, {}, []);
            return this.m_linearDamping;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetLinearDamping = Σ_6.addFunction(function αyqIK(a) {
            var Σ_6_36 = new Σ.Scope(this, αyqIK, '36', Σ_6, {
                a: a
            }, []);
            if (Σ_6_36.refs.a === undefined) {
                Σ_6_36.refs.a = 0;
            }
            this.m_linearDamping = Σ_6_36.refs.a;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetAngularDamping = Σ_6.addFunction(function αblxn() {
            var Σ_6_37 = new Σ.Scope(this, αblxn, '37', Σ_6, {}, []);
            return this.m_angularDamping;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetAngularDamping = Σ_6.addFunction(function αqdYH(a) {
            var Σ_6_38 = new Σ.Scope(this, αqdYH, '38', Σ_6, {
                a: a
            }, []);
            if (Σ_6_38.refs.a === undefined) {
                Σ_6_38.refs.a = 0;
            }
            this.m_angularDamping = Σ_6_38.refs.a;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetType = Σ_6.addFunction(function αo7D2(a) {
            var Σ_6_39 = new Σ.Scope(this, αo7D2, '39', Σ_6, {
                a: a
            }, []);
            if (Σ_6_39.refs.a === undefined) {
                Σ_6_39.refs.a = 0;
            }
            if (this.m_type != Σ_6_39.refs.a) {
                this.m_type = Σ_6_39.refs.a;
                this.ResetMassData();
                if (this.m_type == Σ_6.refs.k.b2_staticBody) {
                    this.m_linearVelocity.SetZero();
                    this.m_angularVelocity = 0;
                }
                this.SetAwake(true);
                this.m_force.SetZero();
                this.m_torque = 0;
                for (Σ_6_39.refs.a = this.m_contactList; Σ_6_39.refs.a; Σ_6_39.refs.a = Σ_6_39.refs.a.next) {
                    Σ_6_39.refs.a.contact.FlagForFiltering();
                }
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.GetType = Σ_6.addFunction(function αFHji() {
            var Σ_6_40 = new Σ.Scope(this, αFHji, '40', Σ_6, {}, []);
            return this.m_type;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetBullet = Σ_6.addFunction(function α125l(a) {
            var Σ_6_41 = new Σ.Scope(this, α125l, '41', Σ_6, {
                a: a
            }, []);
            if (Σ_6_41.refs.a) {
                this.m_flags |= Σ_6.refs.k.e_bulletFlag;
            } else {
                this.m_flags &= ~Σ_6.refs.k.e_bulletFlag;
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.IsBullet = Σ_6.addFunction(function αBYOD() {
            var Σ_6_42 = new Σ.Scope(this, αBYOD, '42', Σ_6, {}, []);
            return (this.m_flags & Σ_6.refs.k.e_bulletFlag) == Σ_6.refs.k.e_bulletFlag;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetSleepingAllowed = Σ_6.addFunction(function α4LaJ(a) {
            var Σ_6_43 = new Σ.Scope(this, α4LaJ, '43', Σ_6, {
                a: a
            }, []);
            if (Σ_6_43.refs.a) {
                this.m_flags |= Σ_6.refs.k.e_allowSleepFlag;
            } else {
                this.m_flags &= ~Σ_6.refs.k.e_allowSleepFlag;
                this.SetAwake(true);
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.SetAwake = Σ_6.addFunction(function αVBD7(a) {
            var Σ_6_44 = new Σ.Scope(this, αVBD7, '44', Σ_6, {
                a: a
            }, []);
            if (Σ_6_44.refs.a) {
                this.m_flags |= Σ_6.refs.k.e_awakeFlag;
                this.m_sleepTime = 0;
            } else {
                this.m_flags &= ~Σ_6.refs.k.e_awakeFlag;
                this.m_sleepTime = 0;
                this.m_linearVelocity.SetZero();
                this.m_angularVelocity = 0;
                this.m_force.SetZero();
                this.m_torque = 0;
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.IsAwake = Σ_6.addFunction(function αORiX() {
            var Σ_6_45 = new Σ.Scope(this, αORiX, '45', Σ_6, {}, []);
            return (this.m_flags & Σ_6.refs.k.e_awakeFlag) == Σ_6.refs.k.e_awakeFlag;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetFixedRotation = Σ_6.addFunction(function αfqoR(a) {
            var Σ_6_46 = new Σ.Scope(this, αfqoR, '46', Σ_6, {
                a: a
            }, []);
            if (Σ_6_46.refs.a) {
                this.m_flags |= Σ_6.refs.k.e_fixedRotationFlag;
            } else {
                this.m_flags &= ~Σ_6.refs.k.e_fixedRotationFlag;
            }
            this.ResetMassData();
        }, Σ_6);
        Σ_6.refs.k.prototype.IsFixedRotation = Σ_6.addFunction(function αJKF0() {
            var Σ_6_47 = new Σ.Scope(this, αJKF0, '47', Σ_6, {}, []);
            return (this.m_flags & Σ_6.refs.k.e_fixedRotationFlag) == Σ_6.refs.k.e_fixedRotationFlag;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetActive = Σ_6.addFunction(function αvddk(a) {
            var Σ_6_48 = new Σ.Scope(this, αvddk, '48', Σ_6, {
                a: a
            }, []);
            if (Σ_6_48.refs.a != this.IsActive()) {
                Σ_6_48.refs.c = undefined;
                if (Σ_6_48.refs.a) {
                    this.m_flags |= Σ_6.refs.k.e_activeFlag;
                    Σ_6_48.refs.a = this.m_world.m_contactManager.m_broadPhase;
                    for (Σ_6_48.refs.c = this.m_fixtureList; Σ_6_48.refs.c; Σ_6_48.refs.c = Σ_6_48.refs.c.m_next) {
                        Σ_6_48.refs.c.CreateProxy(Σ_6_48.refs.a, this.m_xf);
                    }
                } else {
                    this.m_flags &= ~Σ_6.refs.k.e_activeFlag;
                    Σ_6_48.refs.a = this.m_world.m_contactManager.m_broadPhase;
                    for (Σ_6_48.refs.c = this.m_fixtureList; Σ_6_48.refs.c; Σ_6_48.refs.c = Σ_6_48.refs.c.m_next) {
                        Σ_6_48.refs.c.DestroyProxy(Σ_6_48.refs.a);
                    }
                    for (Σ_6_48.refs.a = this.m_contactList; Σ_6_48.refs.a;) {
                        Σ_6_48.refs.c = Σ_6_48.refs.a;
                        Σ_6_48.refs.a = Σ_6_48.refs.a.next;
                        this.m_world.m_contactManager.Destroy(Σ_6_48.refs.c.contact);
                    }
                    this.m_contactList = null;
                }
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.IsActive = Σ_6.addFunction(function αLhY0() {
            var Σ_6_49 = new Σ.Scope(this, αLhY0, '49', Σ_6, {}, []);
            return (this.m_flags & Σ_6.refs.k.e_activeFlag) == Σ_6.refs.k.e_activeFlag;
        }, Σ_6);
        Σ_6.refs.k.prototype.IsSleepingAllowed = Σ_6.addFunction(function αrBmj() {
            var Σ_6_50 = new Σ.Scope(this, αrBmj, '50', Σ_6, {}, []);
            return (this.m_flags & Σ_6.refs.k.e_allowSleepFlag) == Σ_6.refs.k.e_allowSleepFlag;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetFixtureList = Σ_6.addFunction(function αNcZd() {
            var Σ_6_51 = new Σ.Scope(this, αNcZd, '51', Σ_6, {}, []);
            return this.m_fixtureList;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetJointList = Σ_6.addFunction(function αWCCt() {
            var Σ_6_52 = new Σ.Scope(this, αWCCt, '52', Σ_6, {}, []);
            return this.m_jointList;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetControllerList = Σ_6.addFunction(function αf1wA() {
            var Σ_6_53 = new Σ.Scope(this, αf1wA, '53', Σ_6, {}, []);
            return this.m_controllerList;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetContactList = Σ_6.addFunction(function αeN9v() {
            var Σ_6_54 = new Σ.Scope(this, αeN9v, '54', Σ_6, {}, []);
            return this.m_contactList;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetNext = Σ_6.addFunction(function α51XL() {
            var Σ_6_55 = new Σ.Scope(this, α51XL, '55', Σ_6, {}, []);
            return this.m_next;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetUserData = Σ_6.addFunction(function αuICm() {
            var Σ_6_56 = new Σ.Scope(this, αuICm, '56', Σ_6, {}, []);
            return this.m_userData;
        }, Σ_6);
        Σ_6.refs.k.prototype.SetUserData = Σ_6.addFunction(function αednA(a) {
            var Σ_6_57 = new Σ.Scope(this, αednA, '57', Σ_6, {
                a: a
            }, []);
            this.m_userData = Σ_6_57.refs.a;
        }, Σ_6);
        Σ_6.refs.k.prototype.GetWorld = Σ_6.addFunction(function αFkPh() {
            var Σ_6_58 = new Σ.Scope(this, αFkPh, '58', Σ_6, {}, []);
            return this.m_world;
        }, Σ_6);
        Σ_6.refs.k.prototype.b2Body = Σ_6.addFunction(function α8wY8(a, c) {
            var Σ_6_59 = new Σ.Scope(this, α8wY8, '59', Σ_6, {
                a: a,
                c: c
            }, []);
            this.m_flags = 0;
            if (Σ_6_59.refs.a.bullet) {
                this.m_flags |= Σ_6.refs.k.e_bulletFlag;
            }
            if (Σ_6_59.refs.a.fixedRotation) {
                this.m_flags |= Σ_6.refs.k.e_fixedRotationFlag;
            }
            if (Σ_6_59.refs.a.allowSleep) {
                this.m_flags |= Σ_6.refs.k.e_allowSleepFlag;
            }
            if (Σ_6_59.refs.a.awake) {
                this.m_flags |= Σ_6.refs.k.e_awakeFlag;
            }
            if (Σ_6_59.refs.a.active) {
                this.m_flags |= Σ_6.refs.k.e_activeFlag;
            }
            this.m_world = Σ_6_59.refs.c;
            this.m_xf.position.SetV(Σ_6_59.refs.a.position);
            this.m_xf.R.Set(Σ_6_59.refs.a.angle);
            this.m_sweep.localCenter.SetZero();
            this.m_sweep.t0 = 1;
            this.m_sweep.a0 = this.m_sweep.a = Σ_6_59.refs.a.angle;
            Σ_6_59.refs.g = this.m_xf.R, Σ_6_59.refs.b = this.m_sweep.localCenter;
            this.m_sweep.c.x = Σ_6_59.refs.g.col1.x * Σ_6_59.refs.b.x + Σ_6_59.refs.g.col2.x * Σ_6_59.refs.b.y;
            this.m_sweep.c.y = Σ_6_59.refs.g.col1.y * Σ_6_59.refs.b.x + Σ_6_59.refs.g.col2.y * Σ_6_59.refs.b.y;
            this.m_sweep.c.x += this.m_xf.position.x;
            this.m_sweep.c.y += this.m_xf.position.y;
            this.m_sweep.c0.SetV(this.m_sweep.c);
            this.m_contactList = this.m_controllerList = this.m_jointList = null;
            this.m_controllerCount = 0;
            this.m_next = this.m_prev = null;
            this.m_linearVelocity.SetV(Σ_6_59.refs.a.linearVelocity);
            this.m_angularVelocity = Σ_6_59.refs.a.angularVelocity;
            this.m_linearDamping = Σ_6_59.refs.a.linearDamping;
            this.m_angularDamping = Σ_6_59.refs.a.angularDamping;
            this.m_force.Set(0, 0);
            this.m_sleepTime = this.m_torque = 0;
            this.m_type = Σ_6_59.refs.a.type;
            if (this.m_type == Σ_6.refs.k.b2_dynamicBody) {
                this.m_invMass = this.m_mass = 1;
            } else {
                this.m_invMass = this.m_mass = 0;
            }
            this.m_invI = this.m_I = 0;
            this.m_inertiaScale = Σ_6_59.refs.a.inertiaScale;
            this.m_userData = Σ_6_59.refs.a.userData;
            this.m_fixtureList = null;
            this.m_fixtureCount = 0;
        }, Σ_6);
        Σ_6.refs.k.prototype.SynchronizeFixtures = Σ_6.addFunction(function αsWK0() {
            var Σ_6_60 = new Σ.Scope(this, αsWK0, '60', Σ_6, {}, []);
            Σ_6_60.refs.a = Σ_6.refs.k.s_xf1;
            Σ_6_60.refs.a.R.Set(this.m_sweep.a0);
            Σ_6_60.refs.c = Σ_6_60.refs.a.R, Σ_6_60.refs.g = this.m_sweep.localCenter;
            Σ_6_60.refs.a.position.x = this.m_sweep.c0.x - (Σ_6_60.refs.c.col1.x * Σ_6_60.refs.g.x + Σ_6_60.refs.c.col2.x * Σ_6_60.refs.g.y);
            Σ_6_60.refs.a.position.y = this.m_sweep.c0.y - (Σ_6_60.refs.c.col1.y * Σ_6_60.refs.g.x + Σ_6_60.refs.c.col2.y * Σ_6_60.refs.g.y);
            Σ_6_60.refs.g = this.m_world.m_contactManager.m_broadPhase;
            for (Σ_6_60.refs.c = this.m_fixtureList; Σ_6_60.refs.c; Σ_6_60.refs.c = Σ_6_60.refs.c.m_next) {
                Σ_6_60.refs.c.Synchronize(Σ_6_60.refs.g, Σ_6_60.refs.a, this.m_xf);
            }
        }, Σ_6);
        Σ_6.refs.k.prototype.SynchronizeTransform = Σ_6.addFunction(function α9DpS() {
            var Σ_6_61 = new Σ.Scope(this, α9DpS, '61', Σ_6, {}, []);
            this.m_xf.R.Set(this.m_sweep.a);
            Σ_6_61.refs.a = this.m_xf.R, Σ_6_61.refs.c = this.m_sweep.localCenter;
            this.m_xf.position.x = this.m_sweep.c.x - (Σ_6_61.refs.a.col1.x * Σ_6_61.refs.c.x + Σ_6_61.refs.a.col2.x * Σ_6_61.refs.c.y);
            this.m_xf.position.y = this.m_sweep.c.y - (Σ_6_61.refs.a.col1.y * Σ_6_61.refs.c.x + Σ_6_61.refs.a.col2.y * Σ_6_61.refs.c.y);
        }, Σ_6);
        Σ_6.refs.k.prototype.ShouldCollide = Σ_6.addFunction(function αiS5x(a) {
            var Σ_6_62 = new Σ.Scope(this, αiS5x, '62', Σ_6, {
                a: a
            }, []);
            if (this.m_type != Σ_6.refs.k.b2_dynamicBody && Σ_6_62.refs.a.m_type != Σ_6.refs.k.b2_dynamicBody) {
                return false;
            }
            for (Σ_6_62.refs.c = this.m_jointList; Σ_6_62.refs.c; Σ_6_62.refs.c = Σ_6_62.refs.c.next) {
                if (Σ_6_62.refs.c.other == Σ_6_62.refs.a) {
                    if (Σ_6_62.refs.c.joint.m_collideConnected == false) {
                        return false;
                    }
                }
            }
            return true;
        }, Σ_6);
        Σ_6.refs.k.prototype.Advance = Σ_6.addFunction(function αGQIS(a) {
            var Σ_6_63 = new Σ.Scope(this, αGQIS, '63', Σ_6, {
                a: a
            }, []);
            if (Σ_6_63.refs.a === undefined) {
                Σ_6_63.refs.a = 0;
            }
            this.m_sweep.Advance(Σ_6_63.refs.a);
            this.m_sweep.c.SetV(this.m_sweep.c0);
            this.m_sweep.a = this.m_sweep.a0;
            this.SynchronizeTransform();
        }, Σ_6);
        Σ.refs.Box2D.postDefs.push(Σ_6.addFunction(function αPZJx() {
            var Σ_6_64 = new Σ.Scope(this, αPZJx, '64', Σ_6, {}, []);
            Σ.refs.Box2D.Dynamics.b2Body.s_xf1 = new Σ_6.refs.K();
            Σ.refs.Box2D.Dynamics.b2Body.e_islandFlag = 1;
            Σ.refs.Box2D.Dynamics.b2Body.e_awakeFlag = 2;
            Σ.refs.Box2D.Dynamics.b2Body.e_allowSleepFlag = 4;
            Σ.refs.Box2D.Dynamics.b2Body.e_bulletFlag = 8;
            Σ.refs.Box2D.Dynamics.b2Body.e_fixedRotationFlag = 16;
            Σ.refs.Box2D.Dynamics.b2Body.e_activeFlag = 32;
            Σ.refs.Box2D.Dynamics.b2Body.b2_staticBody = 0;
            Σ.refs.Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
            Σ.refs.Box2D.Dynamics.b2Body.b2_dynamicBody = 2;
        }, Σ_6));
        Σ_6.refs.z.b2BodyDef = Σ_6.addFunction(function αJKzo() {
            var Σ_6_65 = new Σ.Scope(this, αJKzo, '65', Σ_6, {}, []);
            this.position = new Σ_6.refs.y();
            this.linearVelocity = new Σ_6.refs.y();
        }, Σ_6);
        Σ_6.refs.z.prototype.b2BodyDef = Σ_6.addFunction(function α48tO() {
            var Σ_6_66 = new Σ.Scope(this, α48tO, '66', Σ_6, {}, []);
            this.userData = null;
            this.position.Set(0, 0);
            this.angle = 0;
            this.linearVelocity.Set(0, 0);
            this.angularDamping = this.linearDamping = this.angularVelocity = 0;
            this.awake = this.allowSleep = true;
            this.bullet = this.fixedRotation = false;
            this.type = Σ_6.refs.k.b2_staticBody;
            this.active = true;
            this.inertiaScale = 1;
        }, Σ_6);
        Σ_6.refs.u.b2ContactFilter = Σ_6.addFunction(function α86Ky() {
            var Σ_6_67 = new Σ.Scope(this, α86Ky, '67', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.u.prototype.ShouldCollide = Σ_6.addFunction(function αS7GJ(a, c) {
            var Σ_6_68 = new Σ.Scope(this, αS7GJ, '68', Σ_6, {
                a: a,
                c: c
            }, []);
            Σ_6_68.refs.g = Σ_6_68.refs.a.GetFilterData(), Σ_6_68.refs.b = Σ_6_68.refs.c.GetFilterData();
            if (Σ_6_68.refs.g.groupIndex == Σ_6_68.refs.b.groupIndex && Σ_6_68.refs.g.groupIndex != 0) {
                return Σ_6_68.refs.g.groupIndex > 0;
            }
            return (Σ_6_68.refs.g.maskBits & Σ_6_68.refs.b.categoryBits) != 0 && (Σ_6_68.refs.g.categoryBits & Σ_6_68.refs.b.maskBits) != 0;
        }, Σ_6);
        Σ_6.refs.u.prototype.RayCollide = Σ_6.addFunction(function αu7Ip(a, c) {
            var Σ_6_69 = new Σ.Scope(this, αu7Ip, '69', Σ_6, {
                a: a,
                c: c
            }, []);
            if (!Σ_6_69.refs.a) {
                return true;
            }
            return this.ShouldCollide(Σ_6_69.refs.a instanceof Σ_6.refs.S ? Σ_6_69.refs.a : null, Σ_6_69.refs.c);
        }, Σ_6);
        Σ.refs.Box2D.postDefs.push(Σ_6.addFunction(function αWHTb() {
            var Σ_6_70 = new Σ.Scope(this, αWHTb, '70', Σ_6, {}, []);
            Σ.refs.Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new Σ_6.refs.u();
        }, Σ_6));
        Σ_6.refs.D.b2ContactImpulse = Σ_6.addFunction(function αnAu1() {
            var Σ_6_71 = new Σ.Scope(this, αnAu1, '71', Σ_6, {}, []);
            this.normalImpulses = new Σ.refs.Vector_a2j_Number(Σ_6.refs.A.b2_maxManifoldPoints);
            this.tangentImpulses = new Σ.refs.Vector_a2j_Number(Σ_6.refs.A.b2_maxManifoldPoints);
        }, Σ_6);
        Σ_6.refs.H.b2ContactListener = Σ_6.addFunction(function αJOJm() {
            var Σ_6_72 = new Σ.Scope(this, αJOJm, '72', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.H.prototype.BeginContact = Σ_6.addFunction(function αa1sU() {
            var Σ_6_73 = new Σ.Scope(this, αa1sU, '73', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.H.prototype.EndContact = Σ_6.addFunction(function αHxbS() {
            var Σ_6_74 = new Σ.Scope(this, αHxbS, '74', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.H.prototype.PreSolve = Σ_6.addFunction(function αyJmJ() {
            var Σ_6_75 = new Σ.Scope(this, αyJmJ, '75', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.H.prototype.PostSolve = Σ_6.addFunction(function αbaXF() {
            var Σ_6_76 = new Σ.Scope(this, αbaXF, '76', Σ_6, {}, []);
        }, Σ_6);
        Σ.refs.Box2D.postDefs.push(Σ_6.addFunction(function αasa6() {
            var Σ_6_77 = new Σ.Scope(this, αasa6, '77', Σ_6, {}, []);
            Σ.refs.Box2D.Dynamics.b2ContactListener.b2_defaultListener = new Σ_6.refs.H();
        }, Σ_6));
        Σ_6.refs.O.b2ContactManager = Σ_6.addFunction(function αZhIO() {
            var Σ_6_78 = new Σ.Scope(this, αZhIO, '78', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.O.prototype.b2ContactManager = Σ_6.addFunction(function αgBJX() {
            var Σ_6_79 = new Σ.Scope(this, αgBJX, '79', Σ_6, {}, []);
            this.m_world = null;
            this.m_contactCount = 0;
            this.m_contactFilter = Σ_6.refs.u.b2_defaultFilter;
            this.m_contactListener = Σ_6.refs.H.b2_defaultListener;
            this.m_contactFactory = new Σ_6.refs.j(this.m_allocator);
            this.m_broadPhase = new Σ_6.refs.B();
        }, Σ_6);
        Σ_6.refs.O.prototype.AddPair = Σ_6.addFunction(function αBBTe(a, c) {
            var Σ_6_80 = new Σ.Scope(this, αBBTe, '80', Σ_6, {
                a: a,
                c: c
            }, []);
            Σ_6_80.refs.g = Σ_6_80.refs.a instanceof Σ_6.refs.S ? Σ_6_80.refs.a : null, Σ_6_80.refs.b = Σ_6_80.refs.c instanceof Σ_6.refs.S ? Σ_6_80.refs.c : null, Σ_6_80.refs.e = Σ_6_80.refs.g.GetBody(), Σ_6_80.refs.f = Σ_6_80.refs.b.GetBody();
            if (Σ_6_80.refs.e != Σ_6_80.refs.f) {
                for (Σ_6_80.refs.m = Σ_6_80.refs.f.GetContactList(); Σ_6_80.refs.m;) {
                    if (Σ_6_80.refs.m.other == Σ_6_80.refs.e) {
                        Σ_6_80.refs.r = Σ_6_80.refs.m.contact.GetFixtureA(), Σ_6_80.refs.s = Σ_6_80.refs.m.contact.GetFixtureB();
                        if (Σ_6_80.refs.r == Σ_6_80.refs.g && Σ_6_80.refs.s == Σ_6_80.refs.b) {
                            return;
                        }
                        if (Σ_6_80.refs.r == Σ_6_80.refs.b && Σ_6_80.refs.s == Σ_6_80.refs.g) {
                            return;
                        }
                    }
                    Σ_6_80.refs.m = Σ_6_80.refs.m.next;
                }
                if (Σ_6_80.refs.f.ShouldCollide(Σ_6_80.refs.e) != false) {
                    if (this.m_contactFilter.ShouldCollide(Σ_6_80.refs.g, Σ_6_80.refs.b) != false) {
                        Σ_6_80.refs.m = this.m_contactFactory.Create(Σ_6_80.refs.g, Σ_6_80.refs.b);
                        Σ_6_80.refs.g = Σ_6_80.refs.m.GetFixtureA();
                        Σ_6_80.refs.b = Σ_6_80.refs.m.GetFixtureB();
                        Σ_6_80.refs.e = Σ_6_80.refs.g.m_body;
                        Σ_6_80.refs.f = Σ_6_80.refs.b.m_body;
                        Σ_6_80.refs.m.m_prev = null;
                        Σ_6_80.refs.m.m_next = this.m_world.m_contactList;
                        if (this.m_world.m_contactList != null) {
                            this.m_world.m_contactList.m_prev = Σ_6_80.refs.m;
                        }
                        this.m_world.m_contactList = Σ_6_80.refs.m;
                        Σ_6_80.refs.m.m_nodeA.contact = Σ_6_80.refs.m;
                        Σ_6_80.refs.m.m_nodeA.other = Σ_6_80.refs.f;
                        Σ_6_80.refs.m.m_nodeA.prev = null;
                        Σ_6_80.refs.m.m_nodeA.next = Σ_6_80.refs.e.m_contactList;
                        if (Σ_6_80.refs.e.m_contactList != null) {
                            Σ_6_80.refs.e.m_contactList.prev = Σ_6_80.refs.m.m_nodeA;
                        }
                        Σ_6_80.refs.e.m_contactList = Σ_6_80.refs.m.m_nodeA;
                        Σ_6_80.refs.m.m_nodeB.contact = Σ_6_80.refs.m;
                        Σ_6_80.refs.m.m_nodeB.other = Σ_6_80.refs.e;
                        Σ_6_80.refs.m.m_nodeB.prev = null;
                        Σ_6_80.refs.m.m_nodeB.next = Σ_6_80.refs.f.m_contactList;
                        if (Σ_6_80.refs.f.m_contactList != null) {
                            Σ_6_80.refs.f.m_contactList.prev = Σ_6_80.refs.m.m_nodeB;
                        }
                        Σ_6_80.refs.f.m_contactList = Σ_6_80.refs.m.m_nodeB;
                        ++this.m_world.m_contactCount;
                    }
                }
            }
        }, Σ_6);
        Σ_6.refs.O.prototype.FindNewContacts = Σ_6.addFunction(function αo1qr() {
            var Σ_6_81 = new Σ.Scope(this, αo1qr, '81', Σ_6, {}, []);
            this.m_broadPhase.UpdatePairs(Σ.refs.Box2D.generateCallback(this, this.AddPair));
        }, Σ_6);
        Σ_6.refs.O.prototype.Destroy = Σ_6.addFunction(function αRiiX(a) {
            var Σ_6_82 = new Σ.Scope(this, αRiiX, '82', Σ_6, {
                a: a
            }, []);
            Σ_6_82.refs.c = Σ_6_82.refs.a.GetFixtureA(), Σ_6_82.refs.g = Σ_6_82.refs.a.GetFixtureB();
            Σ_6_82.refs.c = Σ_6_82.refs.c.GetBody();
            Σ_6_82.refs.g = Σ_6_82.refs.g.GetBody();
            Σ_6_82.refs.a.IsTouching() && this.m_contactListener.EndContact(Σ_6_82.refs.a);
            if (Σ_6_82.refs.a.m_prev) {
                Σ_6_82.refs.a.m_prev.m_next = Σ_6_82.refs.a.m_next;
            }
            if (Σ_6_82.refs.a.m_next) {
                Σ_6_82.refs.a.m_next.m_prev = Σ_6_82.refs.a.m_prev;
            }
            if (Σ_6_82.refs.a == this.m_world.m_contactList) {
                this.m_world.m_contactList = Σ_6_82.refs.a.m_next;
            }
            if (Σ_6_82.refs.a.m_nodeA.prev) {
                Σ_6_82.refs.a.m_nodeA.prev.next = Σ_6_82.refs.a.m_nodeA.next;
            }
            if (Σ_6_82.refs.a.m_nodeA.next) {
                Σ_6_82.refs.a.m_nodeA.next.prev = Σ_6_82.refs.a.m_nodeA.prev;
            }
            if (Σ_6_82.refs.a.m_nodeA == Σ_6_82.refs.c.m_contactList) {
                Σ_6_82.refs.c.m_contactList = Σ_6_82.refs.a.m_nodeA.next;
            }
            if (Σ_6_82.refs.a.m_nodeB.prev) {
                Σ_6_82.refs.a.m_nodeB.prev.next = Σ_6_82.refs.a.m_nodeB.next;
            }
            if (Σ_6_82.refs.a.m_nodeB.next) {
                Σ_6_82.refs.a.m_nodeB.next.prev = Σ_6_82.refs.a.m_nodeB.prev;
            }
            if (Σ_6_82.refs.a.m_nodeB == Σ_6_82.refs.g.m_contactList) {
                Σ_6_82.refs.g.m_contactList = Σ_6_82.refs.a.m_nodeB.next;
            }
            this.m_contactFactory.Destroy(Σ_6_82.refs.a);
            --this.m_contactCount;
        }, Σ_6);
        Σ_6.refs.O.prototype.Collide = Σ_6.addFunction(function αYTb7() {
            var Σ_6_83 = new Σ.Scope(this, αYTb7, '83', Σ_6, {}, []);
            for (Σ_6_83.refs.a = this.m_world.m_contactList; Σ_6_83.refs.a;) {
                Σ_6_83.refs.c = Σ_6_83.refs.a.GetFixtureA(), Σ_6_83.refs.g = Σ_6_83.refs.a.GetFixtureB(), Σ_6_83.refs.b = Σ_6_83.refs.c.GetBody(), Σ_6_83.refs.e = Σ_6_83.refs.g.GetBody();
                if (Σ_6_83.refs.b.IsAwake() == false && Σ_6_83.refs.e.IsAwake() == false) {
                    Σ_6_83.refs.a = Σ_6_83.refs.a.GetNext();
                } else {
                    if (Σ_6_83.refs.a.m_flags & Σ_6.refs.l.e_filterFlag) {
                        if (Σ_6_83.refs.e.ShouldCollide(Σ_6_83.refs.b) == false) {
                            Σ_6_83.refs.c = Σ_6_83.refs.a;
                            Σ_6_83.refs.a = Σ_6_83.refs.c.GetNext();
                            this.Destroy(Σ_6_83.refs.c);
                            continue;
                        }
                        if (this.m_contactFilter.ShouldCollide(Σ_6_83.refs.c, Σ_6_83.refs.g) == false) {
                            Σ_6_83.refs.c = Σ_6_83.refs.a;
                            Σ_6_83.refs.a = Σ_6_83.refs.c.GetNext();
                            this.Destroy(Σ_6_83.refs.c);
                            continue;
                        }
                        Σ_6_83.refs.a.m_flags &= ~Σ_6.refs.l.e_filterFlag;
                    }
                    if (this.m_broadPhase.TestOverlap(Σ_6_83.refs.c.m_proxy, Σ_6_83.refs.g.m_proxy) == false) {
                        Σ_6_83.refs.c = Σ_6_83.refs.a;
                        Σ_6_83.refs.a = Σ_6_83.refs.c.GetNext();
                        this.Destroy(Σ_6_83.refs.c);
                    } else {
                        Σ_6_83.refs.a.Update(this.m_contactListener);
                        Σ_6_83.refs.a = Σ_6_83.refs.a.GetNext();
                    }
                }
            }
        }, Σ_6);
        Σ.refs.Box2D.postDefs.push(Σ_6.addFunction(function αdIIa() {
            var Σ_6_84 = new Σ.Scope(this, αdIIa, '84', Σ_6, {}, []);
            Σ.refs.Box2D.Dynamics.b2ContactManager.s_evalCP = new Σ_6.refs.p();
        }, Σ_6));
        Σ_6.refs.E.b2DebugDraw = Σ_6.addFunction(function αO8c0() {
            var Σ_6_85 = new Σ.Scope(this, αO8c0, '85', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.b2DebugDraw = Σ_6.addFunction(function α65GQ() {
            var Σ_6_86 = new Σ.Scope(this, α65GQ, '86', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.SetFlags = Σ_6.addFunction(function αvv3h() {
            var Σ_6_87 = new Σ.Scope(this, αvv3h, '87', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.GetFlags = Σ_6.addFunction(function α3qXp() {
            var Σ_6_88 = new Σ.Scope(this, α3qXp, '88', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.AppendFlags = Σ_6.addFunction(function α7IHA() {
            var Σ_6_89 = new Σ.Scope(this, α7IHA, '89', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.ClearFlags = Σ_6.addFunction(function αKRMj() {
            var Σ_6_90 = new Σ.Scope(this, αKRMj, '90', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.SetSprite = Σ_6.addFunction(function αZIYm() {
            var Σ_6_91 = new Σ.Scope(this, αZIYm, '91', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.GetSprite = Σ_6.addFunction(function α1Q0S() {
            var Σ_6_92 = new Σ.Scope(this, α1Q0S, '92', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.SetDrawScale = Σ_6.addFunction(function αZcMl() {
            var Σ_6_93 = new Σ.Scope(this, αZcMl, '93', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.GetDrawScale = Σ_6.addFunction(function αmSm9() {
            var Σ_6_94 = new Σ.Scope(this, αmSm9, '94', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.SetLineThickness = Σ_6.addFunction(function αLq6R() {
            var Σ_6_95 = new Σ.Scope(this, αLq6R, '95', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.GetLineThickness = Σ_6.addFunction(function αG0G3() {
            var Σ_6_96 = new Σ.Scope(this, αG0G3, '96', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.SetAlpha = Σ_6.addFunction(function αfpaA() {
            var Σ_6_97 = new Σ.Scope(this, αfpaA, '97', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.GetAlpha = Σ_6.addFunction(function αjHxo() {
            var Σ_6_98 = new Σ.Scope(this, αjHxo, '98', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.SetFillAlpha = Σ_6.addFunction(function αfqV3() {
            var Σ_6_99 = new Σ.Scope(this, αfqV3, '99', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.GetFillAlpha = Σ_6.addFunction(function αKIcy() {
            var Σ_6_100 = new Σ.Scope(this, αKIcy, '100', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.SetXFormScale = Σ_6.addFunction(function αWHy0() {
            var Σ_6_101 = new Σ.Scope(this, αWHy0, '101', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.GetXFormScale = Σ_6.addFunction(function α5oJZ() {
            var Σ_6_102 = new Σ.Scope(this, α5oJZ, '102', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.DrawPolygon = Σ_6.addFunction(function αg9XU() {
            var Σ_6_103 = new Σ.Scope(this, αg9XU, '103', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.DrawSolidPolygon = Σ_6.addFunction(function αiG7r() {
            var Σ_6_104 = new Σ.Scope(this, αiG7r, '104', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.DrawCircle = Σ_6.addFunction(function αy8O3() {
            var Σ_6_105 = new Σ.Scope(this, αy8O3, '105', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.DrawSolidCircle = Σ_6.addFunction(function α6gPI() {
            var Σ_6_106 = new Σ.Scope(this, α6gPI, '106', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.DrawSegment = Σ_6.addFunction(function αTPaY() {
            var Σ_6_107 = new Σ.Scope(this, αTPaY, '107', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.E.prototype.DrawTransform = Σ_6.addFunction(function αb14p() {
            var Σ_6_108 = new Σ.Scope(this, αb14p, '108', Σ_6, {}, []);
        }, Σ_6);
        Σ.refs.Box2D.postDefs.push(Σ_6.addFunction(function α4TZU() {
            var Σ_6_109 = new Σ.Scope(this, α4TZU, '109', Σ_6, {}, []);
            Σ.refs.Box2D.Dynamics.b2DebugDraw.e_shapeBit = 1;
            Σ.refs.Box2D.Dynamics.b2DebugDraw.e_jointBit = 2;
            Σ.refs.Box2D.Dynamics.b2DebugDraw.e_aabbBit = 4;
            Σ.refs.Box2D.Dynamics.b2DebugDraw.e_pairBit = 8;
            Σ.refs.Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 16;
            Σ.refs.Box2D.Dynamics.b2DebugDraw.e_controllerBit = 32;
        }, Σ_6));
        Σ_6.refs.R.b2DestructionListener = Σ_6.addFunction(function αxcXW() {
            var Σ_6_110 = new Σ.Scope(this, αxcXW, '110', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.R.prototype.SayGoodbyeJoint = Σ_6.addFunction(function α2Vg2() {
            var Σ_6_111 = new Σ.Scope(this, α2Vg2, '111', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.R.prototype.SayGoodbyeFixture = Σ_6.addFunction(function α2gbN() {
            var Σ_6_112 = new Σ.Scope(this, α2gbN, '112', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.N.b2FilterData = Σ_6.addFunction(function αZQCu() {
            var Σ_6_113 = new Σ.Scope(this, αZQCu, '113', Σ_6, {}, []);
            this.categoryBits = 1;
            this.maskBits = 65535;
            this.groupIndex = 0;
        }, Σ_6);
        Σ_6.refs.N.prototype.Copy = Σ_6.addFunction(function αVTVM() {
            var Σ_6_114 = new Σ.Scope(this, αVTVM, '114', Σ_6, {}, []);
            Σ_6_114.refs.a = new Σ_6.refs.N();
            Σ_6_114.refs.a.categoryBits = this.categoryBits;
            Σ_6_114.refs.a.maskBits = this.maskBits;
            Σ_6_114.refs.a.groupIndex = this.groupIndex;
            return Σ_6_114.refs.a;
        }, Σ_6);
        Σ_6.refs.S.b2Fixture = Σ_6.addFunction(function αI9yA() {
            var Σ_6_115 = new Σ.Scope(this, αI9yA, '115', Σ_6, {}, []);
            this.m_filter = new Σ_6.refs.N();
        }, Σ_6);
        Σ_6.refs.S.prototype.GetType = Σ_6.addFunction(function αbD2i() {
            var Σ_6_116 = new Σ.Scope(this, αbD2i, '116', Σ_6, {}, []);
            return this.m_shape.GetType();
        }, Σ_6);
        Σ_6.refs.S.prototype.GetShape = Σ_6.addFunction(function αpWFx() {
            var Σ_6_117 = new Σ.Scope(this, αpWFx, '117', Σ_6, {}, []);
            return this.m_shape;
        }, Σ_6);
        Σ_6.refs.S.prototype.SetSensor = Σ_6.addFunction(function αGknw(a) {
            var Σ_6_118 = new Σ.Scope(this, αGknw, '118', Σ_6, {
                a: a
            }, []);
            if (this.m_isSensor != Σ_6_118.refs.a) {
                this.m_isSensor = Σ_6_118.refs.a;
                if (this.m_body != null) {
                    for (Σ_6_118.refs.a = this.m_body.GetContactList(); Σ_6_118.refs.a;) {
                        Σ_6_118.refs.c = Σ_6_118.refs.a.contact, Σ_6_118.refs.g = Σ_6_118.refs.c.GetFixtureA(), Σ_6_118.refs.b = Σ_6_118.refs.c.GetFixtureB();
                        if (Σ_6_118.refs.g == this || Σ_6_118.refs.b == this) {
                            Σ_6_118.refs.c.SetSensor(Σ_6_118.refs.g.IsSensor() || Σ_6_118.refs.b.IsSensor());
                        }
                        Σ_6_118.refs.a = Σ_6_118.refs.a.next;
                    }
                }
            }
        }, Σ_6);
        Σ_6.refs.S.prototype.IsSensor = Σ_6.addFunction(function αHksj() {
            var Σ_6_119 = new Σ.Scope(this, αHksj, '119', Σ_6, {}, []);
            return this.m_isSensor;
        }, Σ_6);
        Σ_6.refs.S.prototype.SetFilterData = Σ_6.addFunction(function αNnRY(a) {
            var Σ_6_120 = new Σ.Scope(this, αNnRY, '120', Σ_6, {
                a: a
            }, []);
            this.m_filter = Σ_6_120.refs.a.Copy();
            if (!this.m_body) {
                for (Σ_6_120.refs.a = this.m_body.GetContactList(); Σ_6_120.refs.a;) {
                    Σ_6_120.refs.c = Σ_6_120.refs.a.contact, Σ_6_120.refs.g = Σ_6_120.refs.c.GetFixtureA(), Σ_6_120.refs.b = Σ_6_120.refs.c.GetFixtureB();
                    if (Σ_6_120.refs.g == this || Σ_6_120.refs.b == this) {
                        Σ_6_120.refs.c.FlagForFiltering();
                    }
                    Σ_6_120.refs.a = Σ_6_120.refs.a.next;
                }
            }
        }, Σ_6);
        Σ_6.refs.S.prototype.GetFilterData = Σ_6.addFunction(function αwptt() {
            var Σ_6_121 = new Σ.Scope(this, αwptt, '121', Σ_6, {}, []);
            return this.m_filter.Copy();
        }, Σ_6);
        Σ_6.refs.S.prototype.GetBody = Σ_6.addFunction(function αpkD3() {
            var Σ_6_122 = new Σ.Scope(this, αpkD3, '122', Σ_6, {}, []);
            return this.m_body;
        }, Σ_6);
        Σ_6.refs.S.prototype.GetNext = Σ_6.addFunction(function α44hA() {
            var Σ_6_123 = new Σ.Scope(this, α44hA, '123', Σ_6, {}, []);
            return this.m_next;
        }, Σ_6);
        Σ_6.refs.S.prototype.GetUserData = Σ_6.addFunction(function αptIG() {
            var Σ_6_124 = new Σ.Scope(this, αptIG, '124', Σ_6, {}, []);
            return this.m_userData;
        }, Σ_6);
        Σ_6.refs.S.prototype.SetUserData = Σ_6.addFunction(function αxUYi(a) {
            var Σ_6_125 = new Σ.Scope(this, αxUYi, '125', Σ_6, {
                a: a
            }, []);
            this.m_userData = Σ_6_125.refs.a;
        }, Σ_6);
        Σ_6.refs.S.prototype.TestPoint = Σ_6.addFunction(function αp9fW(a) {
            var Σ_6_126 = new Σ.Scope(this, αp9fW, '126', Σ_6, {
                a: a
            }, []);
            return this.m_shape.TestPoint(this.m_body.GetTransform(), Σ_6_126.refs.a);
        }, Σ_6);
        Σ_6.refs.S.prototype.RayCast = Σ_6.addFunction(function α3RtU(a, c) {
            var Σ_6_127 = new Σ.Scope(this, α3RtU, '127', Σ_6, {
                a: a,
                c: c
            }, []);
            return this.m_shape.RayCast(Σ_6_127.refs.a, Σ_6_127.refs.c, this.m_body.GetTransform());
        }, Σ_6);
        Σ_6.refs.S.prototype.GetMassData = Σ_6.addFunction(function αkEAP(a) {
            var Σ_6_128 = new Σ.Scope(this, αkEAP, '128', Σ_6, {
                a: a
            }, []);
            if (Σ_6_128.refs.a === undefined) {
                Σ_6_128.refs.a = null;
            }
            if (Σ_6_128.refs.a == null) {
                Σ_6_128.refs.a = new Σ_6.refs.I();
            }
            this.m_shape.ComputeMass(Σ_6_128.refs.a, this.m_density);
            return Σ_6_128.refs.a;
        }, Σ_6);
        Σ_6.refs.S.prototype.SetDensity = Σ_6.addFunction(function αdXS4(a) {
            var Σ_6_129 = new Σ.Scope(this, αdXS4, '129', Σ_6, {
                a: a
            }, []);
            if (Σ_6_129.refs.a === undefined) {
                Σ_6_129.refs.a = 0;
            }
            this.m_density = Σ_6_129.refs.a;
        }, Σ_6);
        Σ_6.refs.S.prototype.GetDensity = Σ_6.addFunction(function αfmRe() {
            var Σ_6_130 = new Σ.Scope(this, αfmRe, '130', Σ_6, {}, []);
            return this.m_density;
        }, Σ_6);
        Σ_6.refs.S.prototype.GetFriction = Σ_6.addFunction(function αCEFy() {
            var Σ_6_131 = new Σ.Scope(this, αCEFy, '131', Σ_6, {}, []);
            return this.m_friction;
        }, Σ_6);
        Σ_6.refs.S.prototype.SetFriction = Σ_6.addFunction(function αVdcm(a) {
            var Σ_6_132 = new Σ.Scope(this, αVdcm, '132', Σ_6, {
                a: a
            }, []);
            if (Σ_6_132.refs.a === undefined) {
                Σ_6_132.refs.a = 0;
            }
            this.m_friction = Σ_6_132.refs.a;
        }, Σ_6);
        Σ_6.refs.S.prototype.GetRestitution = Σ_6.addFunction(function αSuxd() {
            var Σ_6_133 = new Σ.Scope(this, αSuxd, '133', Σ_6, {}, []);
            return this.m_restitution;
        }, Σ_6);
        Σ_6.refs.S.prototype.SetRestitution = Σ_6.addFunction(function αn36C(a) {
            var Σ_6_134 = new Σ.Scope(this, αn36C, '134', Σ_6, {
                a: a
            }, []);
            if (Σ_6_134.refs.a === undefined) {
                Σ_6_134.refs.a = 0;
            }
            this.m_restitution = Σ_6_134.refs.a;
        }, Σ_6);
        Σ_6.refs.S.prototype.GetAABB = Σ_6.addFunction(function αAzC2() {
            var Σ_6_135 = new Σ.Scope(this, αAzC2, '135', Σ_6, {}, []);
            return this.m_aabb;
        }, Σ_6);
        Σ_6.refs.S.prototype.b2Fixture = Σ_6.addFunction(function α2cZA() {
            var Σ_6_136 = new Σ.Scope(this, α2cZA, '136', Σ_6, {}, []);
            this.m_aabb = new Σ_6.refs.U();
            this.m_shape = this.m_next = this.m_body = this.m_userData = null;
            this.m_restitution = this.m_friction = this.m_density = 0;
        }, Σ_6);
        Σ_6.refs.S.prototype.Create = Σ_6.addFunction(function αQxs6(a, c, g) {
            var Σ_6_137 = new Σ.Scope(this, αQxs6, '137', Σ_6, {
                a: a,
                c: c,
                g: g
            }, []);
            this.m_userData = Σ_6_137.refs.g.userData;
            this.m_friction = Σ_6_137.refs.g.friction;
            this.m_restitution = Σ_6_137.refs.g.restitution;
            this.m_body = Σ_6_137.refs.a;
            this.m_next = null;
            this.m_filter = Σ_6_137.refs.g.filter.Copy();
            this.m_isSensor = Σ_6_137.refs.g.isSensor;
            this.m_shape = Σ_6_137.refs.g.shape.Copy();
            this.m_density = Σ_6_137.refs.g.density;
        }, Σ_6);
        Σ_6.refs.S.prototype.Destroy = Σ_6.addFunction(function αc4zd() {
            var Σ_6_138 = new Σ.Scope(this, αc4zd, '138', Σ_6, {}, []);
            this.m_shape = null;
        }, Σ_6);
        Σ_6.refs.S.prototype.CreateProxy = Σ_6.addFunction(function αET9e(a, c) {
            var Σ_6_139 = new Σ.Scope(this, αET9e, '139', Σ_6, {
                a: a,
                c: c
            }, []);
            this.m_shape.ComputeAABB(this.m_aabb, Σ_6_139.refs.c);
            this.m_proxy = Σ_6_139.refs.a.CreateProxy(this.m_aabb, this);
        }, Σ_6);
        Σ_6.refs.S.prototype.DestroyProxy = Σ_6.addFunction(function α6Waq(a) {
            var Σ_6_140 = new Σ.Scope(this, α6Waq, '140', Σ_6, {
                a: a
            }, []);
            if (this.m_proxy != null) {
                Σ_6_140.refs.a.DestroyProxy(this.m_proxy);
                this.m_proxy = null;
            }
        }, Σ_6);
        Σ_6.refs.S.prototype.Synchronize = Σ_6.addFunction(function αE1vC(a, c, g) {
            var Σ_6_141 = new Σ.Scope(this, αE1vC, '141', Σ_6, {
                a: a,
                c: c,
                g: g
            }, []);
            if (this.m_proxy) {
                Σ_6_141.refs.b = new Σ_6.refs.U(), Σ_6_141.refs.e = new Σ_6.refs.U();
                this.m_shape.ComputeAABB(Σ_6_141.refs.b, Σ_6_141.refs.c);
                this.m_shape.ComputeAABB(Σ_6_141.refs.e, Σ_6_141.refs.g);
                this.m_aabb.Combine(Σ_6_141.refs.b, Σ_6_141.refs.e);
                Σ_6_141.refs.c = Σ_6.refs.F.SubtractVV(Σ_6_141.refs.g.position, Σ_6_141.refs.c.position);
                Σ_6_141.refs.a.MoveProxy(this.m_proxy, this.m_aabb, Σ_6_141.refs.c);
            }
        }, Σ_6);
        Σ_6.refs.aa.b2FixtureDef = Σ_6.addFunction(function αqGFE() {
            var Σ_6_142 = new Σ.Scope(this, αqGFE, '142', Σ_6, {}, []);
            this.filter = new Σ_6.refs.N();
        }, Σ_6);
        Σ_6.refs.aa.prototype.b2FixtureDef = Σ_6.addFunction(function αCy9J() {
            var Σ_6_143 = new Σ.Scope(this, αCy9J, '143', Σ_6, {}, []);
            this.userData = this.shape = null;
            this.friction = 0.2;
            this.density = this.restitution = 0;
            this.filter.categoryBits = 1;
            this.filter.maskBits = 65535;
            this.filter.groupIndex = 0;
            this.isSensor = false;
        }, Σ_6);
        Σ_6.refs.Z.b2Island = Σ_6.addFunction(function αuJaC() {
            var Σ_6_144 = new Σ.Scope(this, αuJaC, '144', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.Z.prototype.b2Island = Σ_6.addFunction(function αfqpR() {
            var Σ_6_145 = new Σ.Scope(this, αfqpR, '145', Σ_6, {}, []);
            this.m_bodies = new Σ.refs.Vector();
            this.m_contacts = new Σ.refs.Vector();
            this.m_joints = new Σ.refs.Vector();
        }, Σ_6);
        Σ_6.refs.Z.prototype.Initialize = Σ_6.addFunction(function αwf5q(a, c, g, b, e, f) {
            var Σ_6_146 = new Σ.Scope(this, αwf5q, '146', Σ_6, {
                a: a,
                c: c,
                g: g,
                b: b,
                e: e,
                f: f
            }, []);
            if (Σ_6_146.refs.a === undefined) {
                Σ_6_146.refs.a = 0;
            }
            if (Σ_6_146.refs.c === undefined) {
                Σ_6_146.refs.c = 0;
            }
            if (Σ_6_146.refs.g === undefined) {
                Σ_6_146.refs.g = 0;
            }
            Σ_6_146.refs.m = 0;
            this.m_bodyCapacity = Σ_6_146.refs.a;
            this.m_contactCapacity = Σ_6_146.refs.c;
            this.m_jointCapacity = Σ_6_146.refs.g;
            this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
            this.m_allocator = Σ_6_146.refs.b;
            this.m_listener = Σ_6_146.refs.e;
            this.m_contactSolver = Σ_6_146.refs.f;
            for (Σ_6_146.refs.m = this.m_bodies.length; Σ_6_146.refs.m < Σ_6_146.refs.a; Σ_6_146.refs.m++) {
                this.m_bodies[Σ_6_146.refs.m] = null;
            }
            for (Σ_6_146.refs.m = this.m_contacts.length; Σ_6_146.refs.m < Σ_6_146.refs.c; Σ_6_146.refs.m++) {
                this.m_contacts[Σ_6_146.refs.m] = null;
            }
            for (Σ_6_146.refs.m = this.m_joints.length; Σ_6_146.refs.m < Σ_6_146.refs.g; Σ_6_146.refs.m++) {
                this.m_joints[Σ_6_146.refs.m] = null;
            }
        }, Σ_6);
        Σ_6.refs.Z.prototype.Clear = Σ_6.addFunction(function αlG23() {
            var Σ_6_147 = new Σ.Scope(this, αlG23, '147', Σ_6, {}, []);
            this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        }, Σ_6);
        Σ_6.refs.Z.prototype.Solve = Σ_6.addFunction(function αubMI(a, c, g) {
            var Σ_6_148 = new Σ.Scope(this, αubMI, '148', Σ_6, {
                a: a,
                c: c,
                g: g
            }, []);
            Σ_6_148.refs.b = 0, Σ_6_148.refs.e = 0, Σ_6_148.refs.f = undefined;
            for (Σ_6_148.refs.b = 0; Σ_6_148.refs.b < this.m_bodyCount; ++Σ_6_148.refs.b) {
                Σ_6_148.refs.e = this.m_bodies[Σ_6_148.refs.b];
                if (Σ_6_148.refs.e.GetType() == Σ_6.refs.k.b2_dynamicBody) {
                    Σ_6_148.refs.e.m_linearVelocity.x += Σ_6_148.refs.a.dt * (Σ_6_148.refs.c.x + Σ_6_148.refs.e.m_invMass * Σ_6_148.refs.e.m_force.x);
                    Σ_6_148.refs.e.m_linearVelocity.y += Σ_6_148.refs.a.dt * (Σ_6_148.refs.c.y + Σ_6_148.refs.e.m_invMass * Σ_6_148.refs.e.m_force.y);
                    Σ_6_148.refs.e.m_angularVelocity += Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_invI * Σ_6_148.refs.e.m_torque;
                    Σ_6_148.refs.e.m_linearVelocity.Multiply(Σ_6.refs.F.Clamp(1 - Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_linearDamping, 0, 1));
                    Σ_6_148.refs.e.m_angularVelocity *= Σ_6.refs.F.Clamp(1 - Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_angularDamping, 0, 1);
                }
            }
            this.m_contactSolver.Initialize(Σ_6_148.refs.a, this.m_contacts, this.m_contactCount, this.m_allocator);
            Σ_6_148.refs.c = this.m_contactSolver;
            Σ_6_148.refs.c.InitVelocityConstraints(Σ_6_148.refs.a);
            for (Σ_6_148.refs.b = 0; Σ_6_148.refs.b < this.m_jointCount; ++Σ_6_148.refs.b) {
                Σ_6_148.refs.f = this.m_joints[Σ_6_148.refs.b];
                Σ_6_148.refs.f.InitVelocityConstraints(Σ_6_148.refs.a);
            }
            for (Σ_6_148.refs.b = 0; Σ_6_148.refs.b < Σ_6_148.refs.a.velocityIterations; ++Σ_6_148.refs.b) {
                for (Σ_6_148.refs.e = 0; Σ_6_148.refs.e < this.m_jointCount; ++Σ_6_148.refs.e) {
                    Σ_6_148.refs.f = this.m_joints[Σ_6_148.refs.e];
                    Σ_6_148.refs.f.SolveVelocityConstraints(Σ_6_148.refs.a);
                }
                Σ_6_148.refs.c.SolveVelocityConstraints();
            }
            for (Σ_6_148.refs.b = 0; Σ_6_148.refs.b < this.m_jointCount; ++Σ_6_148.refs.b) {
                Σ_6_148.refs.f = this.m_joints[Σ_6_148.refs.b];
                Σ_6_148.refs.f.FinalizeVelocityConstraints();
            }
            Σ_6_148.refs.c.FinalizeVelocityConstraints();
            for (Σ_6_148.refs.b = 0; Σ_6_148.refs.b < this.m_bodyCount; ++Σ_6_148.refs.b) {
                Σ_6_148.refs.e = this.m_bodies[Σ_6_148.refs.b];
                if (Σ_6_148.refs.e.GetType() != Σ_6.refs.k.b2_staticBody) {
                    Σ_6_148.refs.m = Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_linearVelocity.x, Σ_6_148.refs.r = Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_linearVelocity.y;
                    if (Σ_6_148.refs.m * Σ_6_148.refs.m + Σ_6_148.refs.r * Σ_6_148.refs.r > Σ_6.refs.A.b2_maxTranslationSquared) {
                        Σ_6_148.refs.e.m_linearVelocity.Normalize();
                        Σ_6_148.refs.e.m_linearVelocity.x *= Σ_6.refs.A.b2_maxTranslation * Σ_6_148.refs.a.inv_dt;
                        Σ_6_148.refs.e.m_linearVelocity.y *= Σ_6.refs.A.b2_maxTranslation * Σ_6_148.refs.a.inv_dt;
                    }
                    Σ_6_148.refs.m = Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_angularVelocity;
                    if (Σ_6_148.refs.m * Σ_6_148.refs.m > Σ_6.refs.A.b2_maxRotationSquared) {
                        Σ_6_148.refs.e.m_angularVelocity = Σ_6_148.refs.e.m_angularVelocity < 0 ? -Σ_6.refs.A.b2_maxRotation * Σ_6_148.refs.a.inv_dt : Σ_6.refs.A.b2_maxRotation * Σ_6_148.refs.a.inv_dt;
                    }
                    Σ_6_148.refs.e.m_sweep.c0.SetV(Σ_6_148.refs.e.m_sweep.c);
                    Σ_6_148.refs.e.m_sweep.a0 = Σ_6_148.refs.e.m_sweep.a;
                    Σ_6_148.refs.e.m_sweep.c.x += Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_linearVelocity.x;
                    Σ_6_148.refs.e.m_sweep.c.y += Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_linearVelocity.y;
                    Σ_6_148.refs.e.m_sweep.a += Σ_6_148.refs.a.dt * Σ_6_148.refs.e.m_angularVelocity;
                    Σ_6_148.refs.e.SynchronizeTransform();
                }
            }
            for (Σ_6_148.refs.b = 0; Σ_6_148.refs.b < Σ_6_148.refs.a.positionIterations; ++Σ_6_148.refs.b) {
                Σ_6_148.refs.m = Σ_6_148.refs.c.SolvePositionConstraints(Σ_6.refs.A.b2_contactBaumgarte);
                Σ_6_148.refs.r = true;
                for (Σ_6_148.refs.e = 0; Σ_6_148.refs.e < this.m_jointCount; ++Σ_6_148.refs.e) {
                    Σ_6_148.refs.f = this.m_joints[Σ_6_148.refs.e];
                    Σ_6_148.refs.f = Σ_6_148.refs.f.SolvePositionConstraints(Σ_6.refs.A.b2_contactBaumgarte);
                    Σ_6_148.refs.r = Σ_6_148.refs.r && Σ_6_148.refs.f;
                }
                if (Σ_6_148.refs.m && Σ_6_148.refs.r) {
                    break;
                }
            }
            this.Report(Σ_6_148.refs.c.m_constraints);
            if (Σ_6_148.refs.g) {
                Σ_6_148.refs.g = Number.MAX_VALUE;
                Σ_6_148.refs.c = Σ_6.refs.A.b2_linearSleepTolerance * Σ_6.refs.A.b2_linearSleepTolerance;
                Σ_6_148.refs.m = Σ_6.refs.A.b2_angularSleepTolerance * Σ_6.refs.A.b2_angularSleepTolerance;
                for (Σ_6_148.refs.b = 0; Σ_6_148.refs.b < this.m_bodyCount; ++Σ_6_148.refs.b) {
                    Σ_6_148.refs.e = this.m_bodies[Σ_6_148.refs.b];
                    if (Σ_6_148.refs.e.GetType() != Σ_6.refs.k.b2_staticBody) {
                        if ((Σ_6_148.refs.e.m_flags & Σ_6.refs.k.e_allowSleepFlag) == 0) {
                            Σ_6_148.refs.g = Σ_6_148.refs.e.m_sleepTime = 0;
                        }
                        if ((Σ_6_148.refs.e.m_flags & Σ_6.refs.k.e_allowSleepFlag) == 0 || Σ_6_148.refs.e.m_angularVelocity * Σ_6_148.refs.e.m_angularVelocity > Σ_6_148.refs.m || Σ_6.refs.F.Dot(Σ_6_148.refs.e.m_linearVelocity, Σ_6_148.refs.e.m_linearVelocity) > Σ_6_148.refs.c) {
                            Σ_6_148.refs.g = Σ_6_148.refs.e.m_sleepTime = 0;
                        } else {
                            Σ_6_148.refs.e.m_sleepTime += Σ_6_148.refs.a.dt;
                            Σ_6_148.refs.g = Σ_6.refs.F.Min(Σ_6_148.refs.g, Σ_6_148.refs.e.m_sleepTime);
                        }
                    }
                }
                if (Σ_6_148.refs.g >= Σ_6.refs.A.b2_timeToSleep) {
                    for (Σ_6_148.refs.b = 0; Σ_6_148.refs.b < this.m_bodyCount; ++Σ_6_148.refs.b) {
                        Σ_6_148.refs.e = this.m_bodies[Σ_6_148.refs.b];
                        Σ_6_148.refs.e.SetAwake(false);
                    }
                }
            }
        }, Σ_6);
        Σ_6.refs.Z.prototype.SolveTOI = Σ_6.addFunction(function αbGFg(a) {
            var Σ_6_149 = new Σ.Scope(this, αbGFg, '149', Σ_6, {
                a: a
            }, []);
            Σ_6_149.refs.c = 0, Σ_6_149.refs.g = 0;
            this.m_contactSolver.Initialize(Σ_6_149.refs.a, this.m_contacts, this.m_contactCount, this.m_allocator);
            Σ_6_149.refs.b = this.m_contactSolver;
            for (Σ_6_149.refs.c = 0; Σ_6_149.refs.c < this.m_jointCount; ++Σ_6_149.refs.c) {
                this.m_joints[Σ_6_149.refs.c].InitVelocityConstraints(Σ_6_149.refs.a);
            }
            for (Σ_6_149.refs.c = 0; Σ_6_149.refs.c < Σ_6_149.refs.a.velocityIterations; ++Σ_6_149.refs.c) {
                Σ_6_149.refs.b.SolveVelocityConstraints();
                for (Σ_6_149.refs.g = 0; Σ_6_149.refs.g < this.m_jointCount; ++Σ_6_149.refs.g) {
                    this.m_joints[Σ_6_149.refs.g].SolveVelocityConstraints(Σ_6_149.refs.a);
                }
            }
            for (Σ_6_149.refs.c = 0; Σ_6_149.refs.c < this.m_bodyCount; ++Σ_6_149.refs.c) {
                Σ_6_149.refs.g = this.m_bodies[Σ_6_149.refs.c];
                if (Σ_6_149.refs.g.GetType() != Σ_6.refs.k.b2_staticBody) {
                    Σ_6_149.refs.e = Σ_6_149.refs.a.dt * Σ_6_149.refs.g.m_linearVelocity.x, Σ_6_149.refs.f = Σ_6_149.refs.a.dt * Σ_6_149.refs.g.m_linearVelocity.y;
                    if (Σ_6_149.refs.e * Σ_6_149.refs.e + Σ_6_149.refs.f * Σ_6_149.refs.f > Σ_6.refs.A.b2_maxTranslationSquared) {
                        Σ_6_149.refs.g.m_linearVelocity.Normalize();
                        Σ_6_149.refs.g.m_linearVelocity.x *= Σ_6.refs.A.b2_maxTranslation * Σ_6_149.refs.a.inv_dt;
                        Σ_6_149.refs.g.m_linearVelocity.y *= Σ_6.refs.A.b2_maxTranslation * Σ_6_149.refs.a.inv_dt;
                    }
                    Σ_6_149.refs.e = Σ_6_149.refs.a.dt * Σ_6_149.refs.g.m_angularVelocity;
                    if (Σ_6_149.refs.e * Σ_6_149.refs.e > Σ_6.refs.A.b2_maxRotationSquared) {
                        Σ_6_149.refs.g.m_angularVelocity = Σ_6_149.refs.g.m_angularVelocity < 0 ? -Σ_6.refs.A.b2_maxRotation * Σ_6_149.refs.a.inv_dt : Σ_6.refs.A.b2_maxRotation * Σ_6_149.refs.a.inv_dt;
                    }
                    Σ_6_149.refs.g.m_sweep.c0.SetV(Σ_6_149.refs.g.m_sweep.c);
                    Σ_6_149.refs.g.m_sweep.a0 = Σ_6_149.refs.g.m_sweep.a;
                    Σ_6_149.refs.g.m_sweep.c.x += Σ_6_149.refs.a.dt * Σ_6_149.refs.g.m_linearVelocity.x;
                    Σ_6_149.refs.g.m_sweep.c.y += Σ_6_149.refs.a.dt * Σ_6_149.refs.g.m_linearVelocity.y;
                    Σ_6_149.refs.g.m_sweep.a += Σ_6_149.refs.a.dt * Σ_6_149.refs.g.m_angularVelocity;
                    Σ_6_149.refs.g.SynchronizeTransform();
                }
            }
            for (Σ_6_149.refs.c = 0; Σ_6_149.refs.c < Σ_6_149.refs.a.positionIterations; ++Σ_6_149.refs.c) {
                Σ_6_149.refs.e = Σ_6_149.refs.b.SolvePositionConstraints(0.75);
                Σ_6_149.refs.f = true;
                for (Σ_6_149.refs.g = 0; Σ_6_149.refs.g < this.m_jointCount; ++Σ_6_149.refs.g) {
                    Σ_6_149.refs.m = this.m_joints[Σ_6_149.refs.g].SolvePositionConstraints(Σ_6.refs.A.b2_contactBaumgarte);
                    Σ_6_149.refs.f = Σ_6_149.refs.f && Σ_6_149.refs.m;
                }
                if (Σ_6_149.refs.e && Σ_6_149.refs.f) {
                    break;
                }
            }
            this.Report(Σ_6_149.refs.b.m_constraints);
        }, Σ_6);
        Σ_6.refs.Z.prototype.Report = Σ_6.addFunction(function α1aLf(a) {
            var Σ_6_150 = new Σ.Scope(this, α1aLf, '150', Σ_6, {
                a: a
            }, []);
            if (this.m_listener != null) {
                for (Σ_6_150.refs.c = 0; Σ_6_150.refs.c < this.m_contactCount; ++Σ_6_150.refs.c) {
                    for (Σ_6_150.refs.g = this.m_contacts[Σ_6_150.refs.c], Σ_6_150.refs.b = Σ_6_150.refs.a[Σ_6_150.refs.c], Σ_6_150.refs.e = 0; Σ_6_150.refs.e < Σ_6_150.refs.b.pointCount; ++Σ_6_150.refs.e) {
                        Σ_6.refs.Z.s_impulse.normalImpulses[Σ_6_150.refs.e] = Σ_6_150.refs.b.points[Σ_6_150.refs.e].normalImpulse;
                        Σ_6.refs.Z.s_impulse.tangentImpulses[Σ_6_150.refs.e] = Σ_6_150.refs.b.points[Σ_6_150.refs.e].tangentImpulse;
                    }
                    this.m_listener.PostSolve(Σ_6_150.refs.g, Σ_6.refs.Z.s_impulse);
                }
            }
        }, Σ_6);
        Σ_6.refs.Z.prototype.AddBody = Σ_6.addFunction(function αeDU9(a) {
            var Σ_6_151 = new Σ.Scope(this, αeDU9, '151', Σ_6, {
                a: a
            }, []);
            Σ_6_151.refs.a.m_islandIndex = this.m_bodyCount;
            this.m_bodies[this.m_bodyCount++] = Σ_6_151.refs.a;
        }, Σ_6);
        Σ_6.refs.Z.prototype.AddContact = Σ_6.addFunction(function αLtIv(a) {
            var Σ_6_152 = new Σ.Scope(this, αLtIv, '152', Σ_6, {
                a: a
            }, []);
            this.m_contacts[this.m_contactCount++] = Σ_6_152.refs.a;
        }, Σ_6);
        Σ_6.refs.Z.prototype.AddJoint = Σ_6.addFunction(function αHAGo(a) {
            var Σ_6_153 = new Σ.Scope(this, αHAGo, '153', Σ_6, {
                a: a
            }, []);
            this.m_joints[this.m_jointCount++] = Σ_6_153.refs.a;
        }, Σ_6);
        Σ.refs.Box2D.postDefs.push(Σ_6.addFunction(function αb1Ss() {
            var Σ_6_154 = new Σ.Scope(this, αb1Ss, '154', Σ_6, {}, []);
            Σ.refs.Box2D.Dynamics.b2Island.s_impulse = new Σ_6.refs.D();
        }, Σ_6));
        Σ_6.refs.d.b2TimeStep = Σ_6.addFunction(function αiDvc() {
            var Σ_6_155 = new Σ.Scope(this, αiDvc, '155', Σ_6, {}, []);
        }, Σ_6);
        Σ_6.refs.d.prototype.Set = Σ_6.addFunction(function αgyIG(a) {
            var Σ_6_156 = new Σ.Scope(this, αgyIG, '156', Σ_6, {
                a: a
            }, []);
            this.dt = Σ_6_156.refs.a.dt;
            this.inv_dt = Σ_6_156.refs.a.inv_dt;
            this.positionIterations = Σ_6_156.refs.a.positionIterations;
            this.velocityIterations = Σ_6_156.refs.a.velocityIterations;
            this.warmStarting = Σ_6_156.refs.a.warmStarting;
        }, Σ_6);
        Σ_6.refs.h.b2World = Σ_6.addFunction(function α13yp() {
            var Σ_6_157 = new Σ.Scope(this, α13yp, '157', Σ_6, {}, []);
            this.s_stack = new Σ.refs.Vector();
            this.m_contactManager = new Σ_6.refs.O();
            this.m_contactSolver = new Σ_6.refs.o();
            this.m_island = new Σ_6.refs.Z();
        }, Σ_6);
        Σ_6.refs.h.prototype.b2World = Σ_6.addFunction(function αofh5(a, c) {
            var Σ_6_158 = new Σ.Scope(this, αofh5, '158', Σ_6, {
                a: a,
                c: c
            }, []);
            this.m_controllerList = this.m_jointList = this.m_contactList = this.m_bodyList = this.m_debugDraw = this.m_destructionListener = null;
            this.m_controllerCount = this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
            Σ_6.refs.h.m_warmStarting = true;
            Σ_6.refs.h.m_continuousPhysics = true;
            this.m_allowSleep = Σ_6_158.refs.c;
            this.m_gravity = Σ_6_158.refs.a;
            this.m_inv_dt0 = 0;
            this.m_contactManager.m_world = this;
            this.m_groundBody = this.CreateBody(new Σ_6.refs.z());
        }, Σ_6);
        Σ_6.refs.h.prototype.SetDestructionListener = Σ_6.addFunction(function αvQZC(a) {
            var Σ_6_159 = new Σ.Scope(this, αvQZC, '159', Σ_6, {
                a: a
            }, []);
            this.m_destructionListener = Σ_6_159.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.SetContactFilter = Σ_6.addFunction(function αUphf(a) {
            var Σ_6_160 = new Σ.Scope(this, αUphf, '160', Σ_6, {
                a: a
            }, []);
            this.m_contactManager.m_contactFilter = Σ_6_160.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.SetContactListener = Σ_6.addFunction(function αm20S(a) {
            var Σ_6_161 = new Σ.Scope(this, αm20S, '161', Σ_6, {
                a: a
            }, []);
            this.m_contactManager.m_contactListener = Σ_6_161.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.SetDebugDraw = Σ_6.addFunction(function αtnff(a) {
            var Σ_6_162 = new Σ.Scope(this, αtnff, '162', Σ_6, {
                a: a
            }, []);
            this.m_debugDraw = Σ_6_162.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.SetBroadPhase = Σ_6.addFunction(function αl0RR(a) {
            var Σ_6_163 = new Σ.Scope(this, αl0RR, '163', Σ_6, {
                a: a
            }, []);
            Σ_6_163.refs.c = this.m_contactManager.m_broadPhase;
            this.m_contactManager.m_broadPhase = Σ_6_163.refs.a;
            for (Σ_6_163.refs.g = this.m_bodyList; Σ_6_163.refs.g; Σ_6_163.refs.g = Σ_6_163.refs.g.m_next) {
                for (Σ_6_163.refs.b = Σ_6_163.refs.g.m_fixtureList; Σ_6_163.refs.b; Σ_6_163.refs.b = Σ_6_163.refs.b.m_next) {
                    Σ_6_163.refs.b.m_proxy = Σ_6_163.refs.a.CreateProxy(Σ_6_163.refs.c.GetFatAABB(Σ_6_163.refs.b.m_proxy), Σ_6_163.refs.b);
                }
            }
        }, Σ_6);
        Σ_6.refs.h.prototype.Validate = Σ_6.addFunction(function αZKx8() {
            var Σ_6_164 = new Σ.Scope(this, αZKx8, '164', Σ_6, {}, []);
            this.m_contactManager.m_broadPhase.Validate();
        }, Σ_6);
        Σ_6.refs.h.prototype.GetProxyCount = Σ_6.addFunction(function αoB3u() {
            var Σ_6_165 = new Σ.Scope(this, αoB3u, '165', Σ_6, {}, []);
            return this.m_contactManager.m_broadPhase.GetProxyCount();
        }, Σ_6);
        Σ_6.refs.h.prototype.CreateBody = Σ_6.addFunction(function αPAn8(a) {
            var Σ_6_166 = new Σ.Scope(this, αPAn8, '166', Σ_6, {
                a: a
            }, []);
            if (this.IsLocked() == true) {
                return null;
            }
            Σ_6_166.refs.a = new Σ_6.refs.k(Σ_6_166.refs.a, this);
            Σ_6_166.refs.a.m_prev = null;
            if (Σ_6_166.refs.a.m_next = this.m_bodyList) {
                this.m_bodyList.m_prev = Σ_6_166.refs.a;
            }
            this.m_bodyList = Σ_6_166.refs.a;
            ++this.m_bodyCount;
            return Σ_6_166.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.DestroyBody = Σ_6.addFunction(function αTWCP(a) {
            var Σ_6_167 = new Σ.Scope(this, αTWCP, '167', Σ_6, {
                a: a
            }, []);
            if (this.IsLocked() != true) {
                for (Σ_6_167.refs.c = Σ_6_167.refs.a.m_jointList; Σ_6_167.refs.c;) {
                    Σ_6_167.refs.g = Σ_6_167.refs.c;
                    Σ_6_167.refs.c = Σ_6_167.refs.c.next;
                    this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(Σ_6_167.refs.g.joint);
                    this.DestroyJoint(Σ_6_167.refs.g.joint);
                }
                for (Σ_6_167.refs.c = Σ_6_167.refs.a.m_controllerList; Σ_6_167.refs.c;) {
                    Σ_6_167.refs.g = Σ_6_167.refs.c;
                    Σ_6_167.refs.c = Σ_6_167.refs.c.nextController;
                    Σ_6_167.refs.g.controller.RemoveBody(Σ_6_167.refs.a);
                }
                for (Σ_6_167.refs.c = Σ_6_167.refs.a.m_contactList; Σ_6_167.refs.c;) {
                    Σ_6_167.refs.g = Σ_6_167.refs.c;
                    Σ_6_167.refs.c = Σ_6_167.refs.c.next;
                    this.m_contactManager.Destroy(Σ_6_167.refs.g.contact);
                }
                Σ_6_167.refs.a.m_contactList = null;
                for (Σ_6_167.refs.c = Σ_6_167.refs.a.m_fixtureList; Σ_6_167.refs.c;) {
                    Σ_6_167.refs.g = Σ_6_167.refs.c;
                    Σ_6_167.refs.c = Σ_6_167.refs.c.m_next;
                    this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(Σ_6_167.refs.g);
                    Σ_6_167.refs.g.DestroyProxy(this.m_contactManager.m_broadPhase);
                    Σ_6_167.refs.g.Destroy();
                }
                Σ_6_167.refs.a.m_fixtureList = null;
                Σ_6_167.refs.a.m_fixtureCount = 0;
                if (Σ_6_167.refs.a.m_prev) {
                    Σ_6_167.refs.a.m_prev.m_next = Σ_6_167.refs.a.m_next;
                }
                if (Σ_6_167.refs.a.m_next) {
                    Σ_6_167.refs.a.m_next.m_prev = Σ_6_167.refs.a.m_prev;
                }
                if (Σ_6_167.refs.a == this.m_bodyList) {
                    this.m_bodyList = Σ_6_167.refs.a.m_next;
                }
                --this.m_bodyCount;
            }
        }, Σ_6);
        Σ_6.refs.h.prototype.CreateJoint = Σ_6.addFunction(function αTHzl(a) {
            var Σ_6_168 = new Σ.Scope(this, αTHzl, '168', Σ_6, {
                a: a
            }, []);
            Σ_6_168.refs.c = Σ_6.refs.q.Create(Σ_6_168.refs.a, null);
            Σ_6_168.refs.c.m_prev = null;
            if (Σ_6_168.refs.c.m_next = this.m_jointList) {
                this.m_jointList.m_prev = Σ_6_168.refs.c;
            }
            this.m_jointList = Σ_6_168.refs.c;
            ++this.m_jointCount;
            Σ_6_168.refs.c.m_edgeA.joint = Σ_6_168.refs.c;
            Σ_6_168.refs.c.m_edgeA.other = Σ_6_168.refs.c.m_bodyB;
            Σ_6_168.refs.c.m_edgeA.prev = null;
            if (Σ_6_168.refs.c.m_edgeA.next = Σ_6_168.refs.c.m_bodyA.m_jointList) {
                Σ_6_168.refs.c.m_bodyA.m_jointList.prev = Σ_6_168.refs.c.m_edgeA;
            }
            Σ_6_168.refs.c.m_bodyA.m_jointList = Σ_6_168.refs.c.m_edgeA;
            Σ_6_168.refs.c.m_edgeB.joint = Σ_6_168.refs.c;
            Σ_6_168.refs.c.m_edgeB.other = Σ_6_168.refs.c.m_bodyA;
            Σ_6_168.refs.c.m_edgeB.prev = null;
            if (Σ_6_168.refs.c.m_edgeB.next = Σ_6_168.refs.c.m_bodyB.m_jointList) {
                Σ_6_168.refs.c.m_bodyB.m_jointList.prev = Σ_6_168.refs.c.m_edgeB;
            }
            Σ_6_168.refs.c.m_bodyB.m_jointList = Σ_6_168.refs.c.m_edgeB;
            Σ_6_168.refs.g = Σ_6_168.refs.a.bodyA, Σ_6_168.refs.b = Σ_6_168.refs.a.bodyB;
            if (Σ_6_168.refs.a.collideConnected == false) {
                for (Σ_6_168.refs.a = Σ_6_168.refs.b.GetContactList(); Σ_6_168.refs.a;) {
                    Σ_6_168.refs.a.other == Σ_6_168.refs.g && Σ_6_168.refs.a.contact.FlagForFiltering();
                    Σ_6_168.refs.a = Σ_6_168.refs.a.next;
                }
            }
            return Σ_6_168.refs.c;
        }, Σ_6);
        Σ_6.refs.h.prototype.DestroyJoint = Σ_6.addFunction(function αYsWk(a) {
            var Σ_6_169 = new Σ.Scope(this, αYsWk, '169', Σ_6, {
                a: a
            }, []);
            Σ_6_169.refs.c = Σ_6_169.refs.a.m_collideConnected;
            if (Σ_6_169.refs.a.m_prev) {
                Σ_6_169.refs.a.m_prev.m_next = Σ_6_169.refs.a.m_next;
            }
            if (Σ_6_169.refs.a.m_next) {
                Σ_6_169.refs.a.m_next.m_prev = Σ_6_169.refs.a.m_prev;
            }
            if (Σ_6_169.refs.a == this.m_jointList) {
                this.m_jointList = Σ_6_169.refs.a.m_next;
            }
            Σ_6_169.refs.g = Σ_6_169.refs.a.m_bodyA, Σ_6_169.refs.b = Σ_6_169.refs.a.m_bodyB;
            Σ_6_169.refs.g.SetAwake(true);
            Σ_6_169.refs.b.SetAwake(true);
            if (Σ_6_169.refs.a.m_edgeA.prev) {
                Σ_6_169.refs.a.m_edgeA.prev.next = Σ_6_169.refs.a.m_edgeA.next;
            }
            if (Σ_6_169.refs.a.m_edgeA.next) {
                Σ_6_169.refs.a.m_edgeA.next.prev = Σ_6_169.refs.a.m_edgeA.prev;
            }
            if (Σ_6_169.refs.a.m_edgeA == Σ_6_169.refs.g.m_jointList) {
                Σ_6_169.refs.g.m_jointList = Σ_6_169.refs.a.m_edgeA.next;
            }
            Σ_6_169.refs.a.m_edgeA.prev = null;
            Σ_6_169.refs.a.m_edgeA.next = null;
            if (Σ_6_169.refs.a.m_edgeB.prev) {
                Σ_6_169.refs.a.m_edgeB.prev.next = Σ_6_169.refs.a.m_edgeB.next;
            }
            if (Σ_6_169.refs.a.m_edgeB.next) {
                Σ_6_169.refs.a.m_edgeB.next.prev = Σ_6_169.refs.a.m_edgeB.prev;
            }
            if (Σ_6_169.refs.a.m_edgeB == Σ_6_169.refs.b.m_jointList) {
                Σ_6_169.refs.b.m_jointList = Σ_6_169.refs.a.m_edgeB.next;
            }
            Σ_6_169.refs.a.m_edgeB.prev = null;
            Σ_6_169.refs.a.m_edgeB.next = null;
            Σ_6.refs.q.Destroy(Σ_6_169.refs.a, null);
            --this.m_jointCount;
            if (Σ_6_169.refs.c == false) {
                for (Σ_6_169.refs.a = Σ_6_169.refs.b.GetContactList(); Σ_6_169.refs.a;) {
                    Σ_6_169.refs.a.other == Σ_6_169.refs.g && Σ_6_169.refs.a.contact.FlagForFiltering();
                    Σ_6_169.refs.a = Σ_6_169.refs.a.next;
                }
            }
        }, Σ_6);
        Σ_6.refs.h.prototype.AddController = Σ_6.addFunction(function α73vo(a) {
            var Σ_6_170 = new Σ.Scope(this, α73vo, '170', Σ_6, {
                a: a
            }, []);
            Σ_6_170.refs.a.m_next = this.m_controllerList;
            Σ_6_170.refs.a.m_prev = null;
            this.m_controllerList = Σ_6_170.refs.a;
            Σ_6_170.refs.a.m_world = this;
            this.m_controllerCount++;
            return Σ_6_170.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.RemoveController = Σ_6.addFunction(function αplUK(a) {
            var Σ_6_171 = new Σ.Scope(this, αplUK, '171', Σ_6, {
                a: a
            }, []);
            if (Σ_6_171.refs.a.m_prev) {
                Σ_6_171.refs.a.m_prev.m_next = Σ_6_171.refs.a.m_next;
            }
            if (Σ_6_171.refs.a.m_next) {
                Σ_6_171.refs.a.m_next.m_prev = Σ_6_171.refs.a.m_prev;
            }
            if (this.m_controllerList == Σ_6_171.refs.a) {
                this.m_controllerList = Σ_6_171.refs.a.m_next;
            }
            this.m_controllerCount--;
        }, Σ_6);
        Σ_6.refs.h.prototype.CreateController = Σ_6.addFunction(function αfcmH(a) {
            var Σ_6_172 = new Σ.Scope(this, αfcmH, '172', Σ_6, {
                a: a
            }, []);
            if (Σ_6_172.refs.a.m_world != this) {
                throw Error('Controller can only be a member of one world');
            }
            Σ_6_172.refs.a.m_next = this.m_controllerList;
            Σ_6_172.refs.a.m_prev = null;
            if (this.m_controllerList) {
                this.m_controllerList.m_prev = Σ_6_172.refs.a;
            }
            this.m_controllerList = Σ_6_172.refs.a;
            ++this.m_controllerCount;
            Σ_6_172.refs.a.m_world = this;
            return Σ_6_172.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.DestroyController = Σ_6.addFunction(function αiNQj(a) {
            var Σ_6_173 = new Σ.Scope(this, αiNQj, '173', Σ_6, {
                a: a
            }, []);
            Σ_6_173.refs.a.Clear();
            if (Σ_6_173.refs.a.m_next) {
                Σ_6_173.refs.a.m_next.m_prev = Σ_6_173.refs.a.m_prev;
            }
            if (Σ_6_173.refs.a.m_prev) {
                Σ_6_173.refs.a.m_prev.m_next = Σ_6_173.refs.a.m_next;
            }
            if (Σ_6_173.refs.a == this.m_controllerList) {
                this.m_controllerList = Σ_6_173.refs.a.m_next;
            }
            --this.m_controllerCount;
        }, Σ_6);
        Σ_6.refs.h.prototype.SetWarmStarting = Σ_6.addFunction(function αlMIq(a) {
            var Σ_6_174 = new Σ.Scope(this, αlMIq, '174', Σ_6, {
                a: a
            }, []);
            Σ_6.refs.h.m_warmStarting = Σ_6_174.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.SetContinuousPhysics = Σ_6.addFunction(function αcj2G(a) {
            var Σ_6_175 = new Σ.Scope(this, αcj2G, '175', Σ_6, {
                a: a
            }, []);
            Σ_6.refs.h.m_continuousPhysics = Σ_6_175.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.GetBodyCount = Σ_6.addFunction(function αC94W() {
            var Σ_6_176 = new Σ.Scope(this, αC94W, '176', Σ_6, {}, []);
            return this.m_bodyCount;
        }, Σ_6);
        Σ_6.refs.h.prototype.GetJointCount = Σ_6.addFunction(function α9fnX() {
            var Σ_6_177 = new Σ.Scope(this, α9fnX, '177', Σ_6, {}, []);
            return this.m_jointCount;
        }, Σ_6);
        Σ_6.refs.h.prototype.GetContactCount = Σ_6.addFunction(function αBskW() {
            var Σ_6_178 = new Σ.Scope(this, αBskW, '178', Σ_6, {}, []);
            return this.m_contactCount;
        }, Σ_6);
        Σ_6.refs.h.prototype.SetGravity = Σ_6.addFunction(function α4wyG(a) {
            var Σ_6_179 = new Σ.Scope(this, α4wyG, '179', Σ_6, {
                a: a
            }, []);
            this.m_gravity = Σ_6_179.refs.a;
        }, Σ_6);
        Σ_6.refs.h.prototype.GetGravity = Σ_6.addFunction(function α0ZSA() {
            var Σ_6_180 = new Σ.Scope(this, α0ZSA, '180', Σ_6, {}, []);
            return this.m_gravity;
        }, Σ_6);
        Σ_6.refs.h.prototype.GetGroundBody = Σ_6.addFunction(function αM40L() {
            var Σ_6_181 = new Σ.Scope(this, αM40L, '181', Σ_6, {}, []);
            return this.m_groundBody;
        }, Σ_6);
        Σ_6.refs.h.prototype.Step = Σ_6.addFunction(function αQ0Rb(a, c, g) {
            var Σ_6_182 = new Σ.Scope(this, αQ0Rb, '182', Σ_6, {
                a: a,
                c: c,
                g: g
            }, []);
            if (Σ_6_182.refs.a === undefined) {
                Σ_6_182.refs.a = 0;
            }
            if (Σ_6_182.refs.c === undefined) {
                Σ_6_182.refs.c = 0;
            }
            if (Σ_6_182.refs.g === undefined) {
                Σ_6_182.refs.g = 0;
            }
            if (this.m_flags & Σ_6.refs.h.e_newFixture) {
                this.m_contactManager.FindNewContacts();
                this.m_flags &= ~Σ_6.refs.h.e_newFixture;
            }
            this.m_flags |= Σ_6.refs.h.e_locked;
            Σ_6_182.refs.b = Σ_6.refs.h.s_timestep2;
            Σ_6_182.refs.b.dt = Σ_6_182.refs.a;
            Σ_6_182.refs.b.velocityIterations = Σ_6_182.refs.c;
            Σ_6_182.refs.b.positionIterations = Σ_6_182.refs.g;
            Σ_6_182.refs.b.inv_dt = Σ_6_182.refs.a > 0 ? 1 / Σ_6_182.refs.a : 0;
            Σ_6_182.refs.b.dtRatio = this.m_inv_dt0 * Σ_6_182.refs.a;
            Σ_6_182.refs.b.warmStarting = Σ_6.refs.h.m_warmStarting;
            this.m_contactManager.Collide();
            Σ_6_182.refs.b.dt > 0 && this.Solve(Σ_6_182.refs.b);
            Σ_6.refs.h.m_continuousPhysics && Σ_6_182.refs.b.dt > 0 && this.SolveTOI(Σ_6_182.refs.b);
            if (Σ_6_182.refs.b.dt > 0) {
                this.m_inv_dt0 = Σ_6_182.refs.b.inv_dt;
            }
            this.m_flags &= ~Σ_6.refs.h.e_locked;
        }, Σ_6);
        Σ_6.refs.h.prototype.ClearForces = Σ_6.addFunction(function αF84v() {
            var Σ_6_183 = new Σ.Scope(this, αF84v, '183', Σ_6, {}, []);
            for (Σ_6_183.refs.a = this.m_bodyList; Σ_6_183.refs.a; Σ_6_183.refs.a = Σ_6_183.refs.a.m_next) {
                Σ_6_183.refs.a.m_force.SetZero();
                Σ_6_183.refs.a.m_torque = 0;
            }
        }, Σ_6);
        Σ_6.refs.h.prototype.DrawDebugData = Σ_6.addFunction(function α6Oob() {
            var Σ_6_184 = new Σ.Scope(this, α6Oob, '184', Σ_6, {}, []);
            if (this.m_debugDraw != null) {
                this.m_debugDraw.m_sprite.graphics.clear();
                Σ_6_184.refs.a = this.m_debugDraw.GetFlags(), Σ_6_184.refs.c = undefined, Σ_6_184.refs.g = undefined, Σ_6_184.refs.b = undefined;
                new Σ_6.refs.y();
                new Σ_6.refs.y();
                new Σ_6.refs.y();
                Σ_6_184.refs.e = undefined;
                new Σ_6.refs.U();
                new Σ_6.refs.U();
                Σ_6_184.refs.e = [
                    new y(),
                    new y(),
                    new y(),
                    new y()
                ];
                Σ_6_184.refs.f = new Σ_6.refs.w(0, 0, 0);
                if (Σ_6_184.refs.a & Σ_6.refs.E.e_shapeBit) {
                    for (Σ_6_184.refs.c = this.m_bodyList; Σ_6_184.refs.c; Σ_6_184.refs.c = Σ_6_184.refs.c.m_next) {
                        Σ_6_184.refs.e = Σ_6_184.refs.c.m_xf;
                        for (Σ_6_184.refs.g = Σ_6_184.refs.c.GetFixtureList(); Σ_6_184.refs.g; Σ_6_184.refs.g = Σ_6_184.refs.g.m_next) {
                            Σ_6_184.refs.b = Σ_6_184.refs.g.GetShape();
                            if (Σ_6_184.refs.c.IsActive() == false) {
                                Σ_6_184.refs.f.Set(0.5, 0.5, 0.3);
                            } else if (Σ_6_184.refs.c.GetType() == Σ_6.refs.k.b2_staticBody) {
                                Σ_6_184.refs.f.Set(0.5, 0.9, 0.5);
                            } else if (Σ_6_184.refs.c.GetType() == Σ_6.refs.k.b2_kinematicBody) {
                                Σ_6_184.refs.f.Set(0.5, 0.5, 0.9);
                            } else {
                                Σ_6_184.refs.c.IsAwake() == false ? Σ_6_184.refs.f.Set(0.6, 0.6, 0.6) : Σ_6_184.refs.f.Set(0.9, 0.7, 0.7);
                            }
                            this.DrawShape(Σ_6_184.refs.b, Σ_6_184.refs.e, Σ_6_184.refs.f);
                        }
                    }
                }
                if (Σ_6_184.refs.a & Σ_6.refs.E.e_jointBit) {
                    for (Σ_6_184.refs.c = this.m_jointList; Σ_6_184.refs.c; Σ_6_184.refs.c = Σ_6_184.refs.c.m_next) {
                        this.DrawJoint(Σ_6_184.refs.c);
                    }
                }
                if (Σ_6_184.refs.a & Σ_6.refs.E.e_controllerBit) {
                    for (Σ_6_184.refs.c = this.m_controllerList; Σ_6_184.refs.c; Σ_6_184.refs.c = Σ_6_184.refs.c.m_next) {
                        Σ_6_184.refs.c.Draw(this.m_debugDraw);
                    }
                }
                if (Σ_6_184.refs.a & Σ_6.refs.E.e_pairBit) {
                    Σ_6_184.refs.f.Set(0.3, 0.9, 0.9);
                    for (Σ_6_184.refs.c = this.m_contactManager.m_contactList; Σ_6_184.refs.c; Σ_6_184.refs.c = Σ_6_184.refs.c.GetNext()) {
                        Σ_6_184.refs.b = Σ_6_184.refs.c.GetFixtureA();
                        Σ_6_184.refs.g = Σ_6_184.refs.c.GetFixtureB();
                        Σ_6_184.refs.b = Σ_6_184.refs.b.GetAABB().GetCenter();
                        Σ_6_184.refs.g = Σ_6_184.refs.g.GetAABB().GetCenter();
                        this.m_debugDraw.DrawSegment(Σ_6_184.refs.b, Σ_6_184.refs.g, Σ_6_184.refs.f);
                    }
                }
                if (Σ_6_184.refs.a & Σ_6.refs.E.e_aabbBit) {
                    Σ_6_184.refs.b = this.m_contactManager.m_broadPhase;
                    Σ_6_184.refs.e = [
                        new y(),
                        new y(),
                        new y(),
                        new y()
                    ];
                    for (Σ_6_184.refs.c = this.m_bodyList; Σ_6_184.refs.c; Σ_6_184.refs.c = Σ_6_184.refs.c.GetNext()) {
                        if (Σ_6_184.refs.c.IsActive() != false) {
                            for (Σ_6_184.refs.g = Σ_6_184.refs.c.GetFixtureList(); Σ_6_184.refs.g; Σ_6_184.refs.g = Σ_6_184.refs.g.GetNext()) {
                                Σ_6_184.refs.m = Σ_6_184.refs.b.GetFatAABB(Σ_6_184.refs.g.m_proxy);
                                Σ_6_184.refs.e[0].Set(Σ_6_184.refs.m.lowerBound.x, Σ_6_184.refs.m.lowerBound.y);
                                Σ_6_184.refs.e[1].Set(Σ_6_184.refs.m.upperBound.x, Σ_6_184.refs.m.lowerBound.y);
                                Σ_6_184.refs.e[2].Set(Σ_6_184.refs.m.upperBound.x, Σ_6_184.refs.m.upperBound.y);
                                Σ_6_184.refs.e[3].Set(Σ_6_184.refs.m.lowerBound.x, Σ_6_184.refs.m.upperBound.y);
                                this.m_debugDraw.DrawPolygon(Σ_6_184.refs.e, 4, Σ_6_184.refs.f);
                            }
                        }
                    }
                }
                if (Σ_6_184.refs.a & Σ_6.refs.E.e_centerOfMassBit) {
                    for (Σ_6_184.refs.c = this.m_bodyList; Σ_6_184.refs.c; Σ_6_184.refs.c = Σ_6_184.refs.c.m_next) {
                        Σ_6_184.refs.e = Σ_6.refs.h.s_xf;
                        Σ_6_184.refs.e.R = Σ_6_184.refs.c.m_xf.R;
                        Σ_6_184.refs.e.position = Σ_6_184.refs.c.GetWorldCenter();
                        this.m_debugDraw.DrawTransform(Σ_6_184.refs.e);
                    }
                }
            }
        }, Σ_6);
        Σ_6.refs.h.prototype.QueryAABB = Σ_6.addFunction(function αWGVI(a, c) {
            var Σ_6_185 = new Σ.Scope(this, αWGVI, '185', Σ_6, {
                a: a,
                c: c
            }, []);
            Σ_6_185.refs.g = this.m_contactManager.m_broadPhase;
            Σ_6_185.refs.g.Query(Σ_6_185.addFunction(function α0YZv(b) {
                var Σ_6_185_0 = new Σ.Scope(this, α0YZv, '0', Σ_6_185, {
                    b: b
                }, []);
                return Σ_6_185.refs.a(Σ_6_185.refs.g.GetUserData(Σ_6_185_0.refs.b));
            }, Σ_6_185), Σ_6_185.refs.c);
        }, Σ_6);
        Σ_6.refs.h.prototype.QueryShape = Σ_6.addFunction(function αwCvH(a, c, g) {
            var Σ_6_186 = new Σ.Scope(this, αwCvH, '186', Σ_6, {
                a: a,
                c: c,
                g: g
            }, []);
            if (Σ_6_186.refs.g === undefined) {
                Σ_6_186.refs.g = null;
            }
            if (Σ_6_186.refs.g == null) {
                Σ_6_186.refs.g = new Σ_6.refs.K();
                Σ_6_186.refs.g.SetIdentity();
            }
            Σ_6_186.refs.b = this.m_contactManager.m_broadPhase, Σ_6_186.refs.e = new Σ_6.refs.U();
            Σ_6_186.refs.c.ComputeAABB(Σ_6_186.refs.e, Σ_6_186.refs.g);
            Σ_6_186.refs.b.Query(Σ_6_186.addFunction(function αjP9L(f) {
                var Σ_6_186_0 = new Σ.Scope(this, αjP9L, '0', Σ_6_186, {
                    f: f
                }, []);
                Σ_6_186_0.refs.f = Σ_6_186.refs.b.GetUserData(Σ_6_186_0.refs.f) instanceof Σ_6.refs.S ? Σ_6_186.refs.b.GetUserData(Σ_6_186_0.refs.f) : null;
                if (Σ_6.refs.Y.TestOverlap(Σ_6_186.refs.c, Σ_6_186.refs.g, Σ_6_186_0.refs.f.GetShape(), Σ_6_186_0.refs.f.GetBody().GetTransform())) {
                    return Σ_6_186.refs.a(Σ_6_186_0.refs.f);
                }
                return true;
            }, Σ_6_186), Σ_6_186.refs.e);
        }, Σ_6);
        Σ_6.refs.h.prototype.QueryPoint = Σ_6.addFunction(function αSheh(a, c) {
            var Σ_6_187 = new Σ.Scope(this, αSheh, '187', Σ_6, {
                a: a,
                c: c
            }, []);
            Σ_6_187.refs.g = this.m_contactManager.m_broadPhase, Σ_6_187.refs.b = new Σ_6.refs.U();
            Σ_6_187.refs.b.lowerBound.Set(Σ_6_187.refs.c.x - Σ_6.refs.A.b2_linearSlop, Σ_6_187.refs.c.y - Σ_6.refs.A.b2_linearSlop);
            Σ_6_187.refs.b.upperBound.Set(Σ_6_187.refs.c.x + Σ_6.refs.A.b2_linearSlop, Σ_6_187.refs.c.y + Σ_6.refs.A.b2_linearSlop);
            Σ_6_187.refs.g.Query(Σ_6_187.addFunction(function αh6K3(e) {
                var Σ_6_187_0 = new Σ.Scope(this, αh6K3, '0', Σ_6_187, {
                    e: e
                }, []);
                Σ_6_187_0.refs.e = Σ_6_187.refs.g.GetUserData(Σ_6_187_0.refs.e) instanceof Σ_6.refs.S ? Σ_6_187.refs.g.GetUserData(Σ_6_187_0.refs.e) : null;
                if (Σ_6_187_0.refs.e.TestPoint(Σ_6_187.refs.c)) {
                    return Σ_6_187.refs.a(Σ_6_187_0.refs.e);
                }
                return true;
            }, Σ_6_187), Σ_6_187.refs.b);
        }, Σ_6);
        Σ_6.refs.h.prototype.RayCast = Σ_6.addFunction(function αeoJQ(a, c, g) {
            var Σ_6_188 = new Σ.Scope(this, αeoJQ, '188', Σ_6, {
                a: a,
                c: c,
                g: g
            }, []);
            Σ_6_188.refs.b = this.m_contactManager.m_broadPhase, Σ_6_188.refs.e = new Σ_6.refs.V(), Σ_6_188.refs.f = new Σ_6.refs.Q(Σ_6_188.refs.c, Σ_6_188.refs.g);
            Σ_6_188.refs.b.RayCast(Σ_6_188.addFunction(function αukXX(m, r) {
                var Σ_6_188_0 = new Σ.Scope(this, αukXX, '0', Σ_6_188, {
                    m: m,
                    r: r
                }, []);
                Σ_6_188_0.refs.s = Σ_6_188.refs.b.GetUserData(Σ_6_188_0.refs.r);
                Σ_6_188_0.refs.s = Σ_6_188_0.refs.s instanceof Σ_6.refs.S ? Σ_6_188_0.refs.s : null;
                if (Σ_6_188_0.refs.s.RayCast(Σ_6_188.refs.e, Σ_6_188_0.refs.m)) {
                    Σ_6_188_0.refs.v = Σ_6_188.refs.e.fraction, Σ_6_188_0.refs.t = new Σ_6.refs.y((1 - Σ_6_188_0.refs.v) * Σ_6_188.refs.c.x + Σ_6_188_0.refs.v * Σ_6_188.refs.g.x, (1 - Σ_6_188_0.refs.v) * Σ_6_188.refs.c.y + Σ_6_188_0.refs.v * Σ_6_188.refs.g.y);
                    return Σ_6_188.refs.a(Σ_6_188_0.refs.s, Σ_6_188_0.refs.t, Σ_6_188.refs.e.normal, Σ_6_188_0.refs.v);
                }
                return Σ_6_188_0.refs.m.maxFraction;
            }, Σ_6_188), Σ_6_188.refs.f);
        }, Σ_6);
        Σ_6.refs.h.prototype.RayCastOne = Σ_6.addFunction(function αWaD5(a, c) {
            var Σ_6_189 = new Σ.Scope(this, αWaD5, '189', Σ_6, {
                a: a,
                c: c
            }, []);
            Σ_6_189.refs.g = undefined;
            this.RayCast(Σ_6_189.addFunction(function αOfh7(b, e, f, m) {
                var Σ_6_189_0 = new Σ.Scope(this, αOfh7, '0', Σ_6_189, {
                    b: b,
                    e: e,
                    f: f,
                    m: m
                }, []);
                if (Σ_6_189_0.refs.m === undefined) {
                    Σ_6_189_0.refs.m = 0;
                }
                Σ_6_189.refs.g = Σ_6_189_0.refs.b;
                return Σ_6_189_0.refs.m;
            }, Σ_6_189), Σ_6_189.refs.a, Σ_6_189.refs.c);
            return Σ_6_189.refs.g;
        }, Σ_6);
        Σ_6.refs.h.prototype.RayCastAll = Σ_6.addFunction(function αWdvf(a, c) {
            var Σ_6_190 = new Σ.Scope(this, αWdvf, '190', Σ_6, {
                a: a,
                c: c
            }, []);
            Σ_6_190.refs.g = new Σ.refs.Vector();
            this.RayCast(Σ_6_190.addFunction(function αazBg(b) {
                var Σ_6_190_0 = new Σ.Scope(this, αazBg, '0', Σ_6_190, {
                    b: b
                }, []);
                Σ_6_190.refs.g[Σ_6_190.refs.g.length] = Σ_6_190_0.refs.b;
                return 1;
            }, Σ_6_190), Σ_6_190.refs.a, Σ_6_190.refs.c);
            return Σ_6_190.refs.g;
        }, Σ_6);
        Σ_6.refs.h.prototype.GetBodyList = Σ_6.addFunction(function αNLIU() {
            var Σ_6_191 = new Σ.Scope(this, αNLIU, '191', Σ_6, {}, []);
            return this.m_bodyList;
        }, Σ_6);
        Σ_6.refs.h.prototype.GetJointList = Σ_6.addFunction(function αOISX() {
            var Σ_6_192 = new Σ.Scope(this, αOISX, '192', Σ_6, {}, []);
            return this.m_jointList;
        }, Σ_6);
        Σ_6.refs.h.prototype.GetContactList = Σ_6.addFunction(function α6EZH() {
            var Σ_6_193 = new Σ.Scope(this, α6EZH, '193', Σ_6, {}, []);
            return this.m_contactList;
        }, Σ_6);
        Σ_6.refs.h.prototype.IsLocked = Σ_6.addFunction(function αfBIm() {
            var Σ_6_194 = new Σ.Scope(this, αfBIm, '194', Σ_6, {}, []);
            return (this.m_flags & Σ_6.refs.h.e_locked) > 0;
        }, Σ_6);
        Σ_6.refs.h.prototype.Solve = Σ_6.addFunction(function αJb3k(a) {
            var Σ_6_195 = new Σ.Scope(this, αJb3k, '195', Σ_6, {
                a: a
            }, []);
            for (Σ_6_195.refs.c = undefined, Σ_6_195.refs.g = this.m_controllerList; Σ_6_195.refs.g; Σ_6_195.refs.g = Σ_6_195.refs.g.m_next) {
                Σ_6_195.refs.g.Step(Σ_6_195.refs.a);
            }
            Σ_6_195.refs.g = this.m_island;
            Σ_6_195.refs.g.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
            for (Σ_6_195.refs.c = this.m_bodyList; Σ_6_195.refs.c; Σ_6_195.refs.c = Σ_6_195.refs.c.m_next) {
                Σ_6_195.refs.c.m_flags &= ~Σ_6.refs.k.e_islandFlag;
            }
            for (Σ_6_195.refs.b = this.m_contactList; Σ_6_195.refs.b; Σ_6_195.refs.b = Σ_6_195.refs.b.m_next) {
                Σ_6_195.refs.b.m_flags &= ~Σ_6.refs.l.e_islandFlag;
            }
            for (Σ_6_195.refs.b = this.m_jointList; Σ_6_195.refs.b; Σ_6_195.refs.b = Σ_6_195.refs.b.m_next) {
                Σ_6_195.refs.b.m_islandFlag = false;
            }
            parseInt(this.m_bodyCount);
            Σ_6_195.refs.b = this.s_stack;
            for (Σ_6_195.refs.e = this.m_bodyList; Σ_6_195.refs.e; Σ_6_195.refs.e = Σ_6_195.refs.e.m_next) {
                if (!(Σ_6_195.refs.e.m_flags & Σ_6.refs.k.e_islandFlag)) {
                    if (!(Σ_6_195.refs.e.IsAwake() == false || Σ_6_195.refs.e.IsActive() == false)) {
                        if (Σ_6_195.refs.e.GetType() != Σ_6.refs.k.b2_staticBody) {
                            Σ_6_195.refs.g.Clear();
                            Σ_6_195.refs.f = 0;
                            Σ_6_195.refs.b[Σ_6_195.refs.f++] = Σ_6_195.refs.e;
                            for (Σ_6_195.refs.e.m_flags |= Σ_6.refs.k.e_islandFlag; Σ_6_195.refs.f > 0;) {
                                Σ_6_195.refs.c = Σ_6_195.refs.b[--Σ_6_195.refs.f];
                                Σ_6_195.refs.g.AddBody(Σ_6_195.refs.c);
                                Σ_6_195.refs.c.IsAwake() == false && Σ_6_195.refs.c.SetAwake(true);
                                if (Σ_6_195.refs.c.GetType() != Σ_6.refs.k.b2_staticBody) {
                                    for (Σ_6_195.refs.m = undefined, Σ_6_195.refs.r = Σ_6_195.refs.c.m_contactList; Σ_6_195.refs.r; Σ_6_195.refs.r = Σ_6_195.refs.r.next) {
                                        if (!(Σ_6_195.refs.r.contact.m_flags & Σ_6.refs.l.e_islandFlag)) {
                                            if (!(Σ_6_195.refs.r.contact.IsSensor() == true || Σ_6_195.refs.r.contact.IsEnabled() == false || Σ_6_195.refs.r.contact.IsTouching() == false)) {
                                                Σ_6_195.refs.g.AddContact(Σ_6_195.refs.r.contact);
                                                Σ_6_195.refs.r.contact.m_flags |= Σ_6.refs.l.e_islandFlag;
                                                Σ_6_195.refs.m = Σ_6_195.refs.r.other;
                                                if (!(Σ_6_195.refs.m.m_flags & Σ_6.refs.k.e_islandFlag)) {
                                                    Σ_6_195.refs.b[Σ_6_195.refs.f++] = Σ_6_195.refs.m;
                                                    Σ_6_195.refs.m.m_flags |= Σ_6.refs.k.e_islandFlag;
                                                }
                                            }
                                        }
                                    }
                                    for (Σ_6_195.refs.c = Σ_6_195.refs.c.m_jointList; Σ_6_195.refs.c; Σ_6_195.refs.c = Σ_6_195.refs.c.next) {
                                        if (Σ_6_195.refs.c.joint.m_islandFlag != true) {
                                            Σ_6_195.refs.m = Σ_6_195.refs.c.other;
                                            if (Σ_6_195.refs.m.IsActive() != false) {
                                                Σ_6_195.refs.g.AddJoint(Σ_6_195.refs.c.joint);
                                                Σ_6_195.refs.c.joint.m_islandFlag = true;
                                                if (!(Σ_6_195.refs.m.m_flags & Σ_6.refs.k.e_islandFlag)) {
                                                    Σ_6_195.refs.b[Σ_6_195.refs.f++] = Σ_6_195.refs.m;
                                                    Σ_6_195.refs.m.m_flags |= Σ_6.refs.k.e_islandFlag;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            Σ_6_195.refs.g.Solve(Σ_6_195.refs.a, this.m_gravity, this.m_allowSleep);
                            for (Σ_6_195.refs.f = 0; Σ_6_195.refs.f < Σ_6_195.refs.g.m_bodyCount; ++Σ_6_195.refs.f) {
                                Σ_6_195.refs.c = Σ_6_195.refs.g.m_bodies[Σ_6_195.refs.f];
                                if (Σ_6_195.refs.c.GetType() == Σ_6.refs.k.b2_staticBody) {
                                    Σ_6_195.refs.c.m_flags &= ~Σ_6.refs.k.e_islandFlag;
                                }
                            }
                        }
                    }
                }
            }
            for (Σ_6_195.refs.f = 0; Σ_6_195.refs.f < Σ_6_195.refs.b.length; ++Σ_6_195.refs.f) {
                if (!Σ_6_195.refs.b[Σ_6_195.refs.f]) {
                    break;
                }
                Σ_6_195.refs.b[Σ_6_195.refs.f] = null;
            }
            for (Σ_6_195.refs.c = this.m_bodyList; Σ_6_195.refs.c; Σ_6_195.refs.c = Σ_6_195.refs.c.m_next) {
                Σ_6_195.refs.c.IsAwake() == false || Σ_6_195.refs.c.IsActive() == false || Σ_6_195.refs.c.GetType() != Σ_6.refs.k.b2_staticBody && Σ_6_195.refs.c.SynchronizeFixtures();
            }
            this.m_contactManager.FindNewContacts();
        }, Σ_6);
        Σ_6.refs.h.prototype.SolveTOI = Σ_6.addFunction(function αFtzQ(a) {
            var Σ_6_196 = new Σ.Scope(this, αFtzQ, '196', Σ_6, {
                a: a
            }, []);
            Σ_6_196.refs.c = undefined, Σ_6_196.refs.g = undefined, Σ_6_196.refs.b = undefined, Σ_6_196.refs.e = this.m_island;
            Σ_6_196.refs.e.Initialize(this.m_bodyCount, Σ_6.refs.A.b2_maxTOIContactsPerIsland, Σ_6.refs.A.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
            Σ_6_196.refs.f = Σ_6.refs.h.s_queue;
            for (Σ_6_196.refs.c = this.m_bodyList; Σ_6_196.refs.c; Σ_6_196.refs.c = Σ_6_196.refs.c.m_next) {
                Σ_6_196.refs.c.m_flags &= ~Σ_6.refs.k.e_islandFlag;
                Σ_6_196.refs.c.m_sweep.t0 = 0;
            }
            for (Σ_6_196.refs.b = this.m_contactList; Σ_6_196.refs.b; Σ_6_196.refs.b = Σ_6_196.refs.b.m_next) {
                Σ_6_196.refs.b.m_flags &= ~(Σ_6.refs.l.e_toiFlag | Σ_6.refs.l.e_islandFlag);
            }
            for (Σ_6_196.refs.b = this.m_jointList; Σ_6_196.refs.b; Σ_6_196.refs.b = Σ_6_196.refs.b.m_next) {
                Σ_6_196.refs.b.m_islandFlag = false;
            }
            for (;;) {
                Σ_6_196.refs.m = null, Σ_6_196.refs.r = 1;
                for (Σ_6_196.refs.b = this.m_contactList; Σ_6_196.refs.b; Σ_6_196.refs.b = Σ_6_196.refs.b.m_next) {
                    if (!(Σ_6_196.refs.b.IsSensor() == true || Σ_6_196.refs.b.IsEnabled() == false || Σ_6_196.refs.b.IsContinuous() == false)) {
                        Σ_6_196.refs.c = 1;
                        if (Σ_6_196.refs.b.m_flags & Σ_6.refs.l.e_toiFlag) {
                            Σ_6_196.refs.c = Σ_6_196.refs.b.m_toi;
                        } else {
                            Σ_6_196.refs.c = Σ_6_196.refs.b.m_fixtureA;
                            Σ_6_196.refs.g = Σ_6_196.refs.b.m_fixtureB;
                            Σ_6_196.refs.c = Σ_6_196.refs.c.m_body;
                            Σ_6_196.refs.g = Σ_6_196.refs.g.m_body;
                            if ((Σ_6_196.refs.c.GetType() != Σ_6.refs.k.b2_dynamicBody || Σ_6_196.refs.c.IsAwake() == false) && (Σ_6_196.refs.g.GetType() != Σ_6.refs.k.b2_dynamicBody || Σ_6_196.refs.g.IsAwake() == false)) {
                                continue;
                            }
                            Σ_6_196.refs.s = Σ_6_196.refs.c.m_sweep.t0;
                            if (Σ_6_196.refs.c.m_sweep.t0 < Σ_6_196.refs.g.m_sweep.t0) {
                                Σ_6_196.refs.s = Σ_6_196.refs.g.m_sweep.t0;
                                Σ_6_196.refs.c.m_sweep.Advance(Σ_6_196.refs.s);
                            } else if (Σ_6_196.refs.g.m_sweep.t0 < Σ_6_196.refs.c.m_sweep.t0) {
                                Σ_6_196.refs.s = Σ_6_196.refs.c.m_sweep.t0;
                                Σ_6_196.refs.g.m_sweep.Advance(Σ_6_196.refs.s);
                            }
                            Σ_6_196.refs.c = Σ_6_196.refs.b.ComputeTOI(Σ_6_196.refs.c.m_sweep, Σ_6_196.refs.g.m_sweep);
                            Σ_6.refs.A.b2Assert(0 <= Σ_6_196.refs.c && Σ_6_196.refs.c <= 1);
                            if (Σ_6_196.refs.c > 0 && Σ_6_196.refs.c < 1) {
                                Σ_6_196.refs.c = (1 - Σ_6_196.refs.c) * Σ_6_196.refs.s + Σ_6_196.refs.c;
                                if (Σ_6_196.refs.c > 1) {
                                    Σ_6_196.refs.c = 1;
                                }
                            }
                            Σ_6_196.refs.b.m_toi = Σ_6_196.refs.c;
                            Σ_6_196.refs.b.m_flags |= Σ_6.refs.l.e_toiFlag;
                        }
                        if (Number.MIN_VALUE < Σ_6_196.refs.c && Σ_6_196.refs.c < Σ_6_196.refs.r) {
                            Σ_6_196.refs.m = Σ_6_196.refs.b;
                            Σ_6_196.refs.r = Σ_6_196.refs.c;
                        }
                    }
                }
                if (Σ_6_196.refs.m == null || 1 - 100 * Number.MIN_VALUE < Σ_6_196.refs.r) {
                    break;
                }
                Σ_6_196.refs.c = Σ_6_196.refs.m.m_fixtureA;
                Σ_6_196.refs.g = Σ_6_196.refs.m.m_fixtureB;
                Σ_6_196.refs.c = Σ_6_196.refs.c.m_body;
                Σ_6_196.refs.g = Σ_6_196.refs.g.m_body;
                Σ_6.refs.h.s_backupA.Set(Σ_6_196.refs.c.m_sweep);
                Σ_6.refs.h.s_backupB.Set(Σ_6_196.refs.g.m_sweep);
                Σ_6_196.refs.c.Advance(Σ_6_196.refs.r);
                Σ_6_196.refs.g.Advance(Σ_6_196.refs.r);
                Σ_6_196.refs.m.Update(this.m_contactManager.m_contactListener);
                Σ_6_196.refs.m.m_flags &= ~Σ_6.refs.l.e_toiFlag;
                if (Σ_6_196.refs.m.IsSensor() == true || Σ_6_196.refs.m.IsEnabled() == false) {
                    Σ_6_196.refs.c.m_sweep.Set(Σ_6.refs.h.s_backupA);
                    Σ_6_196.refs.g.m_sweep.Set(Σ_6.refs.h.s_backupB);
                    Σ_6_196.refs.c.SynchronizeTransform();
                    Σ_6_196.refs.g.SynchronizeTransform();
                } else if (Σ_6_196.refs.m.IsTouching() != false) {
                    Σ_6_196.refs.c = Σ_6_196.refs.c;
                    if (Σ_6_196.refs.c.GetType() != Σ_6.refs.k.b2_dynamicBody) {
                        Σ_6_196.refs.c = Σ_6_196.refs.g;
                    }
                    Σ_6_196.refs.e.Clear();
                    Σ_6_196.refs.m = Σ_6_196.refs.b = 0;
                    Σ_6_196.refs.f[Σ_6_196.refs.b + Σ_6_196.refs.m++] = Σ_6_196.refs.c;
                    for (Σ_6_196.refs.c.m_flags |= Σ_6.refs.k.e_islandFlag; Σ_6_196.refs.m > 0;) {
                        Σ_6_196.refs.c = Σ_6_196.refs.f[Σ_6_196.refs.b++];
                        --Σ_6_196.refs.m;
                        Σ_6_196.refs.e.AddBody(Σ_6_196.refs.c);
                        Σ_6_196.refs.c.IsAwake() == false && Σ_6_196.refs.c.SetAwake(true);
                        if (Σ_6_196.refs.c.GetType() == Σ_6.refs.k.b2_dynamicBody) {
                            for (Σ_6_196.refs.g = Σ_6_196.refs.c.m_contactList; Σ_6_196.refs.g; Σ_6_196.refs.g = Σ_6_196.refs.g.next) {
                                if (Σ_6_196.refs.e.m_contactCount == Σ_6_196.refs.e.m_contactCapacity) {
                                    break;
                                }
                                if (!(Σ_6_196.refs.g.contact.m_flags & Σ_6.refs.l.e_islandFlag)) {
                                    if (!(Σ_6_196.refs.g.contact.IsSensor() == true || Σ_6_196.refs.g.contact.IsEnabled() == false || Σ_6_196.refs.g.contact.IsTouching() == false)) {
                                        Σ_6_196.refs.e.AddContact(Σ_6_196.refs.g.contact);
                                        Σ_6_196.refs.g.contact.m_flags |= Σ_6.refs.l.e_islandFlag;
                                        Σ_6_196.refs.s = Σ_6_196.refs.g.other;
                                        if (!(Σ_6_196.refs.s.m_flags & Σ_6.refs.k.e_islandFlag)) {
                                            if (Σ_6_196.refs.s.GetType() != Σ_6.refs.k.b2_staticBody) {
                                                Σ_6_196.refs.s.Advance(Σ_6_196.refs.r);
                                                Σ_6_196.refs.s.SetAwake(true);
                                            }
                                            Σ_6_196.refs.f[Σ_6_196.refs.b + Σ_6_196.refs.m] = Σ_6_196.refs.s;
                                            ++Σ_6_196.refs.m;
                                            Σ_6_196.refs.s.m_flags |= Σ_6.refs.k.e_islandFlag;
                                        }
                                    }
                                }
                            }
                            for (Σ_6_196.refs.c = Σ_6_196.refs.c.m_jointList; Σ_6_196.refs.c; Σ_6_196.refs.c = Σ_6_196.refs.c.next) {
                                if (Σ_6_196.refs.e.m_jointCount != Σ_6_196.refs.e.m_jointCapacity) {
                                    if (Σ_6_196.refs.c.joint.m_islandFlag != true) {
                                        Σ_6_196.refs.s = Σ_6_196.refs.c.other;
                                        if (Σ_6_196.refs.s.IsActive() != false) {
                                            Σ_6_196.refs.e.AddJoint(Σ_6_196.refs.c.joint);
                                            Σ_6_196.refs.c.joint.m_islandFlag = true;
                                            if (!(Σ_6_196.refs.s.m_flags & Σ_6.refs.k.e_islandFlag)) {
                                                if (Σ_6_196.refs.s.GetType() != Σ_6.refs.k.b2_staticBody) {
                                                    Σ_6_196.refs.s.Advance(Σ_6_196.refs.r);
                                                    Σ_6_196.refs.s.SetAwake(true);
                                                }
                                                Σ_6_196.refs.f[Σ_6_196.refs.b + Σ_6_196.refs.m] = Σ_6_196.refs.s;
                                                ++Σ_6_196.refs.m;
                                                Σ_6_196.refs.s.m_flags |= Σ_6.refs.k.e_islandFlag;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    Σ_6_196.refs.b = Σ_6.refs.h.s_timestep;
                    Σ_6_196.refs.b.warmStarting = false;
                    Σ_6_196.refs.b.dt = (1 - Σ_6_196.refs.r) * Σ_6_196.refs.a.dt;
                    Σ_6_196.refs.b.inv_dt = 1 / Σ_6_196.refs.b.dt;
                    Σ_6_196.refs.b.dtRatio = 0;
                    Σ_6_196.refs.b.velocityIterations = Σ_6_196.refs.a.velocityIterations;
                    Σ_6_196.refs.b.positionIterations = Σ_6_196.refs.a.positionIterations;
                    Σ_6_196.refs.e.SolveTOI(Σ_6_196.refs.b);
                    for (Σ_6_196.refs.r = Σ_6_196.refs.r = 0; Σ_6_196.refs.r < Σ_6_196.refs.e.m_bodyCount; ++Σ_6_196.refs.r) {
                        Σ_6_196.refs.c = Σ_6_196.refs.e.m_bodies[Σ_6_196.refs.r];
                        Σ_6_196.refs.c.m_flags &= ~Σ_6.refs.k.e_islandFlag;
                        if (Σ_6_196.refs.c.IsAwake() != false) {
                            if (Σ_6_196.refs.c.GetType() == Σ_6.refs.k.b2_dynamicBody) {
                                Σ_6_196.refs.c.SynchronizeFixtures();
                                for (Σ_6_196.refs.g = Σ_6_196.refs.c.m_contactList; Σ_6_196.refs.g; Σ_6_196.refs.g = Σ_6_196.refs.g.next) {
                                    Σ_6_196.refs.g.contact.m_flags &= ~Σ_6.refs.l.e_toiFlag;
                                }
                            }
                        }
                    }
                    for (Σ_6_196.refs.r = 0; Σ_6_196.refs.r < Σ_6_196.refs.e.m_contactCount; ++Σ_6_196.refs.r) {
                        Σ_6_196.refs.b = Σ_6_196.refs.e.m_contacts[Σ_6_196.refs.r];
                        Σ_6_196.refs.b.m_flags &= ~(Σ_6.refs.l.e_toiFlag | Σ_6.refs.l.e_islandFlag);
                    }
                    for (Σ_6_196.refs.r = 0; Σ_6_196.refs.r < Σ_6_196.refs.e.m_jointCount; ++Σ_6_196.refs.r) {
                        Σ_6_196.refs.b = Σ_6_196.refs.e.m_joints[Σ_6_196.refs.r];
                        Σ_6_196.refs.b.m_islandFlag = false;
                    }
                    this.m_contactManager.FindNewContacts();
                }
            }
        }, Σ_6);
        Σ_6.refs.h.prototype.DrawJoint = Σ_6.addFunction(function αyuPE(a) {
            var Σ_6_197 = new Σ.Scope(this, αyuPE, '197', Σ_6, {
                a: a
            }, []);
            Σ_6_197.refs.c = Σ_6_197.refs.a.GetBodyA(), Σ_6_197.refs.g = Σ_6_197.refs.a.GetBodyB(), Σ_6_197.refs.b = Σ_6_197.refs.c.m_xf.position, Σ_6_197.refs.e = Σ_6_197.refs.g.m_xf.position, Σ_6_197.refs.f = Σ_6_197.refs.a.GetAnchorA(), Σ_6_197.refs.m = Σ_6_197.refs.a.GetAnchorB(), Σ_6_197.refs.r = Σ_6.refs.h.s_jointColor;
            switch (a.m_type) {
                case q.e_distanceJoint:
                    this.m_debugDraw.DrawSegment(f, m, r);
                    break;
                case q.e_pulleyJoint:
                    c = a instanceof n ? a : null;
                    a = c.GetGroundAnchorA();
                    c = c.GetGroundAnchorB();
                    this.m_debugDraw.DrawSegment(a, f, r);
                    this.m_debugDraw.DrawSegment(c, m, r);
                    this.m_debugDraw.DrawSegment(a, c, r);
                    break;
                case q.e_mouseJoint:
                    this.m_debugDraw.DrawSegment(f, m, r);
                    break;
                default:
                    c != this.m_groundBody && this.m_debugDraw.DrawSegment(b, f, r);
                    this.m_debugDraw.DrawSegment(f, m, r);
                    g != this.m_groundBody && this.m_debugDraw.DrawSegment(e, m, r);
            }
        }, Σ_6);
        Σ_6.refs.h.prototype.DrawShape = Σ_6.addFunction(function αeP15(a, c, g) {
            var Σ_6_198 = new Σ.Scope(this, αeP15, '198', Σ_6, {
                a: a,
                c: c,
                g: g
            }, []);
            switch (a.m_type) {
                case Y.e_circleShape:
                    var b = a instanceof M ? a : null;
                    this.m_debugDraw.DrawSolidCircle(F.MulX(c, b.m_p), b.m_radius, c.R.col1, g);
                    break;
                case Y.e_polygonShape:
                    b = 0;
                    b = a instanceof W ? a : null;
                    a = parseInt(b.GetVertexCount());
                    var e = b.GetVertices(),
                        f = new Vector(a);
                    for (b = 0; b < a; ++b)
                        f[b] = F.MulX(c, e[b]);
                    this.m_debugDraw.DrawSolidPolygon(f, a, g);
                    break;
                case Y.e_edgeShape:
                    b = a instanceof L ? a : null;
                    this.m_debugDraw.DrawSegment(F.MulX(c, b.GetVertex1()), F.MulX(c, b.GetVertex2()), g);
            }
        }, Σ_6);
        Σ.refs.Box2D.postDefs.push(Σ_6.addFunction(function αaAVR() {
            var Σ_6_199 = new Σ.Scope(this, αaAVR, '199', Σ_6, {}, []);
            Σ.refs.Box2D.Dynamics.b2World.s_timestep2 = new Σ_6.refs.d();
            Σ.refs.Box2D.Dynamics.b2World.s_xf = new Σ_6.refs.K();
            Σ.refs.Box2D.Dynamics.b2World.s_backupA = new Σ_6.refs.G();
            Σ.refs.Box2D.Dynamics.b2World.s_backupB = new Σ_6.refs.G();
            Σ.refs.Box2D.Dynamics.b2World.s_timestep = new Σ_6.refs.d();
            Σ.refs.Box2D.Dynamics.b2World.s_queue = new Σ.refs.Vector();
            Σ.refs.Box2D.Dynamics.b2World.s_jointColor = new Σ_6.refs.w(0.5, 0.8, 0.8);
            Σ.refs.Box2D.Dynamics.b2World.e_newFixture = 1;
            Σ.refs.Box2D.Dynamics.b2World.e_locked = 2;
        }, Σ_6));
    }());
    (function αqwDG() {
        var Σ_7 = new Σ.Scope(this, αqwDG, '7', Σ, {}, []);
        Σ_7.refs.F = Σ.refs.Box2D.Collision.Shapes.b2CircleShape, Σ_7.refs.G = Σ.refs.Box2D.Collision.Shapes.b2EdgeShape, Σ_7.refs.K = Σ.refs.Box2D.Collision.Shapes.b2PolygonShape, Σ_7.refs.y = Σ.refs.Box2D.Collision.Shapes.b2Shape, Σ_7.refs.w = Σ.refs.Box2D.Dynamics.Contacts.b2CircleContact, Σ_7.refs.A = Σ.refs.Box2D.Dynamics.Contacts.b2Contact, Σ_7.refs.U = Σ.refs.Box2D.Dynamics.Contacts.b2ContactConstraint, Σ_7.refs.p = Σ.refs.Box2D.Dynamics.Contacts.b2ContactConstraintPoint, Σ_7.refs.B = Σ.refs.Box2D.Dynamics.Contacts.b2ContactEdge, Σ_7.refs.Q = Σ.refs.Box2D.Dynamics.Contacts.b2ContactFactory, Σ_7.refs.V = Σ.refs.Box2D.Dynamics.Contacts.b2ContactRegister, Σ_7.refs.M = Σ.refs.Box2D.Dynamics.Contacts.b2ContactResult, Σ_7.refs.L = Σ.refs.Box2D.Dynamics.Contacts.b2ContactSolver, Σ_7.refs.I = Σ.refs.Box2D.Dynamics.Contacts.b2EdgeAndCircleContact, Σ_7.refs.W = Σ.refs.Box2D.Dynamics.Contacts.b2NullContact, Σ_7.refs.Y = Σ.refs.Box2D.Dynamics.Contacts.b2PolyAndCircleContact, Σ_7.refs.k = Σ.refs.Box2D.Dynamics.Contacts.b2PolyAndEdgeContact, Σ_7.refs.z = Σ.refs.Box2D.Dynamics.Contacts.b2PolygonContact, Σ_7.refs.u = Σ.refs.Box2D.Dynamics.Contacts.b2PositionSolverManifold, Σ_7.refs.D = Σ.refs.Box2D.Dynamics.b2Body, Σ_7.refs.H = Σ.refs.Box2D.Dynamics.b2TimeStep, Σ_7.refs.O = Σ.refs.Box2D.Common.b2Settings, Σ_7.refs.E = Σ.refs.Box2D.Common.Math.b2Mat22, Σ_7.refs.R = Σ.refs.Box2D.Common.Math.b2Math, Σ_7.refs.N = Σ.refs.Box2D.Common.Math.b2Vec2, Σ_7.refs.S = Σ.refs.Box2D.Collision.b2Collision, Σ_7.refs.aa = Σ.refs.Box2D.Collision.b2ContactID, Σ_7.refs.Z = Σ.refs.Box2D.Collision.b2Manifold, Σ_7.refs.d = Σ.refs.Box2D.Collision.b2TimeOfImpact, Σ_7.refs.h = Σ.refs.Box2D.Collision.b2TOIInput, Σ_7.refs.l = Σ.refs.Box2D.Collision.b2WorldManifold;
        Σ.refs.Box2D.inherit(Σ_7.refs.w, Σ.refs.Box2D.Dynamics.Contacts.b2Contact);
        Σ_7.refs.w.prototype.__super = Σ.refs.Box2D.Dynamics.Contacts.b2Contact.prototype;
        Σ_7.refs.w.b2CircleContact = Σ_7.addFunction(function αkAx4() {
            var Σ_7_0 = new Σ.Scope(this, αkAx4, '0', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
        }, Σ_7);
        Σ_7.refs.w.Create = Σ_7.addFunction(function αrYT1() {
            var Σ_7_1 = new Σ.Scope(this, αrYT1, '1', Σ_7, {}, []);
            return new Σ_7.refs.w();
        }, Σ_7);
        Σ_7.refs.w.Destroy = Σ_7.addFunction(function αC3Ep() {
            var Σ_7_2 = new Σ.Scope(this, αC3Ep, '2', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.w.prototype.Reset = Σ_7.addFunction(function αPTKH(j, o) {
            var Σ_7_3 = new Σ.Scope(this, αPTKH, '3', Σ_7, {
                j: j,
                o: o
            }, []);
            this.__super.Reset.call(this, Σ_7_3.refs.j, Σ_7_3.refs.o);
        }, Σ_7);
        Σ_7.refs.w.prototype.Evaluate = Σ_7.addFunction(function αKavC() {
            var Σ_7_4 = new Σ.Scope(this, αKavC, '4', Σ_7, {}, []);
            Σ_7_4.refs.j = this.m_fixtureA.GetBody(), Σ_7_4.refs.o = this.m_fixtureB.GetBody();
            Σ_7.refs.S.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof Σ_7.refs.F ? this.m_fixtureA.GetShape() : null, Σ_7_4.refs.j.m_xf, this.m_fixtureB.GetShape() instanceof Σ_7.refs.F ? this.m_fixtureB.GetShape() : null, Σ_7_4.refs.o.m_xf);
        }, Σ_7);
        Σ_7.refs.A.b2Contact = Σ_7.addFunction(function αVYAj() {
            var Σ_7_5 = new Σ.Scope(this, αVYAj, '5', Σ_7, {}, []);
            this.m_nodeA = new Σ_7.refs.B();
            this.m_nodeB = new Σ_7.refs.B();
            this.m_manifold = new Σ_7.refs.Z();
            this.m_oldManifold = new Σ_7.refs.Z();
        }, Σ_7);
        Σ_7.refs.A.prototype.GetManifold = Σ_7.addFunction(function αKIsv() {
            var Σ_7_6 = new Σ.Scope(this, αKIsv, '6', Σ_7, {}, []);
            return this.m_manifold;
        }, Σ_7);
        Σ_7.refs.A.prototype.GetWorldManifold = Σ_7.addFunction(function αhWlD(j) {
            var Σ_7_7 = new Σ.Scope(this, αhWlD, '7', Σ_7, {
                j: j
            }, []);
            Σ_7_7.refs.o = this.m_fixtureA.GetBody(), Σ_7_7.refs.q = this.m_fixtureB.GetBody(), Σ_7_7.refs.n = this.m_fixtureA.GetShape(), Σ_7_7.refs.a = this.m_fixtureB.GetShape();
            Σ_7_7.refs.j.Initialize(this.m_manifold, Σ_7_7.refs.o.GetTransform(), Σ_7_7.refs.n.m_radius, Σ_7_7.refs.q.GetTransform(), Σ_7_7.refs.a.m_radius);
        }, Σ_7);
        Σ_7.refs.A.prototype.IsTouching = Σ_7.addFunction(function α3Atp() {
            var Σ_7_8 = new Σ.Scope(this, α3Atp, '8', Σ_7, {}, []);
            return (this.m_flags & Σ_7.refs.A.e_touchingFlag) == Σ_7.refs.A.e_touchingFlag;
        }, Σ_7);
        Σ_7.refs.A.prototype.IsContinuous = Σ_7.addFunction(function αtXik() {
            var Σ_7_9 = new Σ.Scope(this, αtXik, '9', Σ_7, {}, []);
            return (this.m_flags & Σ_7.refs.A.e_continuousFlag) == Σ_7.refs.A.e_continuousFlag;
        }, Σ_7);
        Σ_7.refs.A.prototype.SetSensor = Σ_7.addFunction(function α4pYN(j) {
            var Σ_7_10 = new Σ.Scope(this, α4pYN, '10', Σ_7, {
                j: j
            }, []);
            if (Σ_7_10.refs.j) {
                this.m_flags |= Σ_7.refs.A.e_sensorFlag;
            } else {
                this.m_flags &= ~Σ_7.refs.A.e_sensorFlag;
            }
        }, Σ_7);
        Σ_7.refs.A.prototype.IsSensor = Σ_7.addFunction(function αjiGg() {
            var Σ_7_11 = new Σ.Scope(this, αjiGg, '11', Σ_7, {}, []);
            return (this.m_flags & Σ_7.refs.A.e_sensorFlag) == Σ_7.refs.A.e_sensorFlag;
        }, Σ_7);
        Σ_7.refs.A.prototype.SetEnabled = Σ_7.addFunction(function αAKh5(j) {
            var Σ_7_12 = new Σ.Scope(this, αAKh5, '12', Σ_7, {
                j: j
            }, []);
            if (Σ_7_12.refs.j) {
                this.m_flags |= Σ_7.refs.A.e_enabledFlag;
            } else {
                this.m_flags &= ~Σ_7.refs.A.e_enabledFlag;
            }
        }, Σ_7);
        Σ_7.refs.A.prototype.IsEnabled = Σ_7.addFunction(function αzULi() {
            var Σ_7_13 = new Σ.Scope(this, αzULi, '13', Σ_7, {}, []);
            return (this.m_flags & Σ_7.refs.A.e_enabledFlag) == Σ_7.refs.A.e_enabledFlag;
        }, Σ_7);
        Σ_7.refs.A.prototype.GetNext = Σ_7.addFunction(function αOqHo() {
            var Σ_7_14 = new Σ.Scope(this, αOqHo, '14', Σ_7, {}, []);
            return this.m_next;
        }, Σ_7);
        Σ_7.refs.A.prototype.GetFixtureA = Σ_7.addFunction(function α075i() {
            var Σ_7_15 = new Σ.Scope(this, α075i, '15', Σ_7, {}, []);
            return this.m_fixtureA;
        }, Σ_7);
        Σ_7.refs.A.prototype.GetFixtureB = Σ_7.addFunction(function αgzHL() {
            var Σ_7_16 = new Σ.Scope(this, αgzHL, '16', Σ_7, {}, []);
            return this.m_fixtureB;
        }, Σ_7);
        Σ_7.refs.A.prototype.FlagForFiltering = Σ_7.addFunction(function αd4Pp() {
            var Σ_7_17 = new Σ.Scope(this, αd4Pp, '17', Σ_7, {}, []);
            this.m_flags |= Σ_7.refs.A.e_filterFlag;
        }, Σ_7);
        Σ_7.refs.A.prototype.b2Contact = Σ_7.addFunction(function αRtVg() {
            var Σ_7_18 = new Σ.Scope(this, αRtVg, '18', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.A.prototype.Reset = Σ_7.addFunction(function α2qR6(j, o) {
            var Σ_7_19 = new Σ.Scope(this, α2qR6, '19', Σ_7, {
                j: j,
                o: o
            }, []);
            if (Σ_7_19.refs.j === undefined) {
                Σ_7_19.refs.j = null;
            }
            if (Σ_7_19.refs.o === undefined) {
                Σ_7_19.refs.o = null;
            }
            this.m_flags = Σ_7.refs.A.e_enabledFlag;
            if (!Σ_7_19.refs.j || !Σ_7_19.refs.o) {
                this.m_fixtureB = this.m_fixtureA = null;
            } else {
                if (Σ_7_19.refs.j.IsSensor() || Σ_7_19.refs.o.IsSensor()) {
                    this.m_flags |= Σ_7.refs.A.e_sensorFlag;
                }
                Σ_7_19.refs.q = Σ_7_19.refs.j.GetBody(), Σ_7_19.refs.n = Σ_7_19.refs.o.GetBody();
                if (Σ_7_19.refs.q.GetType() != Σ_7.refs.D.b2_dynamicBody || Σ_7_19.refs.q.IsBullet() || Σ_7_19.refs.n.GetType() != Σ_7.refs.D.b2_dynamicBody || Σ_7_19.refs.n.IsBullet()) {
                    this.m_flags |= Σ_7.refs.A.e_continuousFlag;
                }
                this.m_fixtureA = Σ_7_19.refs.j;
                this.m_fixtureB = Σ_7_19.refs.o;
                this.m_manifold.m_pointCount = 0;
                this.m_next = this.m_prev = null;
                this.m_nodeA.contact = null;
                this.m_nodeA.prev = null;
                this.m_nodeA.next = null;
                this.m_nodeA.other = null;
                this.m_nodeB.contact = null;
                this.m_nodeB.prev = null;
                this.m_nodeB.next = null;
                this.m_nodeB.other = null;
            }
        }, Σ_7);
        Σ_7.refs.A.prototype.Update = Σ_7.addFunction(function αzxWk(j) {
            var Σ_7_20 = new Σ.Scope(this, αzxWk, '20', Σ_7, {
                j: j
            }, []);
            Σ_7_20.refs.o = this.m_oldManifold;
            this.m_oldManifold = this.m_manifold;
            this.m_manifold = Σ_7_20.refs.o;
            this.m_flags |= Σ_7.refs.A.e_enabledFlag;
            Σ_7_20.refs.q = false;
            Σ_7_20.refs.o = (this.m_flags & Σ_7.refs.A.e_touchingFlag) == Σ_7.refs.A.e_touchingFlag;
            Σ_7_20.refs.n = this.m_fixtureA.m_body, Σ_7_20.refs.a = this.m_fixtureB.m_body, Σ_7_20.refs.c = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
            if (this.m_flags & Σ_7.refs.A.e_sensorFlag) {
                if (Σ_7_20.refs.c) {
                    Σ_7_20.refs.q = this.m_fixtureA.GetShape();
                    Σ_7_20.refs.c = this.m_fixtureB.GetShape();
                    Σ_7_20.refs.n = Σ_7_20.refs.n.GetTransform();
                    Σ_7_20.refs.a = Σ_7_20.refs.a.GetTransform();
                    Σ_7_20.refs.q = Σ_7.refs.y.TestOverlap(Σ_7_20.refs.q, Σ_7_20.refs.n, Σ_7_20.refs.c, Σ_7_20.refs.a);
                }
                this.m_manifold.m_pointCount = 0;
            } else {
                if (Σ_7_20.refs.n.GetType() != Σ_7.refs.D.b2_dynamicBody || Σ_7_20.refs.n.IsBullet() || Σ_7_20.refs.a.GetType() != Σ_7.refs.D.b2_dynamicBody || Σ_7_20.refs.a.IsBullet()) {
                    this.m_flags |= Σ_7.refs.A.e_continuousFlag;
                } else {
                    this.m_flags &= ~Σ_7.refs.A.e_continuousFlag;
                }
                if (Σ_7_20.refs.c) {
                    this.Evaluate();
                    Σ_7_20.refs.q = this.m_manifold.m_pointCount > 0;
                    for (Σ_7_20.refs.c = 0; Σ_7_20.refs.c < this.m_manifold.m_pointCount; ++Σ_7_20.refs.c) {
                        Σ_7_20.refs.g = this.m_manifold.m_points[Σ_7_20.refs.c];
                        Σ_7_20.refs.g.m_normalImpulse = 0;
                        Σ_7_20.refs.g.m_tangentImpulse = 0;
                        for (Σ_7_20.refs.b = Σ_7_20.refs.g.m_id, Σ_7_20.refs.e = 0; Σ_7_20.refs.e < this.m_oldManifold.m_pointCount; ++Σ_7_20.refs.e) {
                            Σ_7_20.refs.f = this.m_oldManifold.m_points[Σ_7_20.refs.e];
                            if (Σ_7_20.refs.f.m_id.key == Σ_7_20.refs.b.key) {
                                Σ_7_20.refs.g.m_normalImpulse = Σ_7_20.refs.f.m_normalImpulse;
                                Σ_7_20.refs.g.m_tangentImpulse = Σ_7_20.refs.f.m_tangentImpulse;
                                break;
                            }
                        }
                    }
                } else {
                    this.m_manifold.m_pointCount = 0;
                }
                if (Σ_7_20.refs.q != Σ_7_20.refs.o) {
                    Σ_7_20.refs.n.SetAwake(true);
                    Σ_7_20.refs.a.SetAwake(true);
                }
            }
            if (Σ_7_20.refs.q) {
                this.m_flags |= Σ_7.refs.A.e_touchingFlag;
            } else {
                this.m_flags &= ~Σ_7.refs.A.e_touchingFlag;
            }
            Σ_7_20.refs.o == false && Σ_7_20.refs.q == true && Σ_7_20.refs.j.BeginContact(this);
            Σ_7_20.refs.o == true && Σ_7_20.refs.q == false && Σ_7_20.refs.j.EndContact(this);
            (this.m_flags & Σ_7.refs.A.e_sensorFlag) == 0 && Σ_7_20.refs.j.PreSolve(this, this.m_oldManifold);
        }, Σ_7);
        Σ_7.refs.A.prototype.Evaluate = Σ_7.addFunction(function αEguj() {
            var Σ_7_21 = new Σ.Scope(this, αEguj, '21', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.A.prototype.ComputeTOI = Σ_7.addFunction(function α5Y5q(j, o) {
            var Σ_7_22 = new Σ.Scope(this, α5Y5q, '22', Σ_7, {
                j: j,
                o: o
            }, []);
            Σ_7.refs.A.s_input.proxyA.Set(this.m_fixtureA.GetShape());
            Σ_7.refs.A.s_input.proxyB.Set(this.m_fixtureB.GetShape());
            Σ_7.refs.A.s_input.sweepA = Σ_7_22.refs.j;
            Σ_7.refs.A.s_input.sweepB = Σ_7_22.refs.o;
            Σ_7.refs.A.s_input.tolerance = Σ_7.refs.O.b2_linearSlop;
            return Σ_7.refs.d.TimeOfImpact(Σ_7.refs.A.s_input);
        }, Σ_7);
        Σ.refs.Box2D.postDefs.push(Σ_7.addFunction(function αeyiP() {
            var Σ_7_23 = new Σ.Scope(this, αeyiP, '23', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1;
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2;
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4;
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8;
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16;
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32;
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 64;
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.s_input = new Σ_7.refs.h();
        }, Σ_7));
        Σ_7.refs.U.b2ContactConstraint = Σ_7.addFunction(function αvntT() {
            var Σ_7_24 = new Σ.Scope(this, αvntT, '24', Σ_7, {}, []);
            this.localPlaneNormal = new Σ_7.refs.N();
            this.localPoint = new Σ_7.refs.N();
            this.normal = new Σ_7.refs.N();
            this.normalMass = new Σ_7.refs.E();
            this.K = new Σ_7.refs.E();
        }, Σ_7);
        Σ_7.refs.U.prototype.b2ContactConstraint = Σ_7.addFunction(function αM35M() {
            var Σ_7_25 = new Σ.Scope(this, αM35M, '25', Σ_7, {}, []);
            this.points = new Σ.refs.Vector(Σ_7.refs.O.b2_maxManifoldPoints);
            for (Σ_7_25.refs.j = 0; Σ_7_25.refs.j < Σ_7.refs.O.b2_maxManifoldPoints; Σ_7_25.refs.j++) {
                this.points[Σ_7_25.refs.j] = new Σ_7.refs.p();
            }
        }, Σ_7);
        Σ_7.refs.p.b2ContactConstraintPoint = Σ_7.addFunction(function αA0JP() {
            var Σ_7_26 = new Σ.Scope(this, αA0JP, '26', Σ_7, {}, []);
            this.localPoint = new Σ_7.refs.N();
            this.rA = new Σ_7.refs.N();
            this.rB = new Σ_7.refs.N();
        }, Σ_7);
        Σ_7.refs.B.b2ContactEdge = Σ_7.addFunction(function αWhLB() {
            var Σ_7_27 = new Σ.Scope(this, αWhLB, '27', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.Q.b2ContactFactory = Σ_7.addFunction(function αIvxC() {
            var Σ_7_28 = new Σ.Scope(this, αIvxC, '28', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.Q.prototype.b2ContactFactory = Σ_7.addFunction(function αAtrS(j) {
            var Σ_7_29 = new Σ.Scope(this, αAtrS, '29', Σ_7, {
                j: j
            }, []);
            this.m_allocator = Σ_7_29.refs.j;
            this.InitializeRegisters();
        }, Σ_7);
        Σ_7.refs.Q.prototype.AddType = Σ_7.addFunction(function αVNd4(j, o, q, n) {
            var Σ_7_30 = new Σ.Scope(this, αVNd4, '30', Σ_7, {
                j: j,
                o: o,
                q: q,
                n: n
            }, []);
            if (Σ_7_30.refs.q === undefined) {
                Σ_7_30.refs.q = 0;
            }
            if (Σ_7_30.refs.n === undefined) {
                Σ_7_30.refs.n = 0;
            }
            this.m_registers[Σ_7_30.refs.q][Σ_7_30.refs.n].createFcn = Σ_7_30.refs.j;
            this.m_registers[Σ_7_30.refs.q][Σ_7_30.refs.n].destroyFcn = Σ_7_30.refs.o;
            this.m_registers[Σ_7_30.refs.q][Σ_7_30.refs.n].primary = true;
            if (Σ_7_30.refs.q != Σ_7_30.refs.n) {
                this.m_registers[Σ_7_30.refs.n][Σ_7_30.refs.q].createFcn = Σ_7_30.refs.j;
                this.m_registers[Σ_7_30.refs.n][Σ_7_30.refs.q].destroyFcn = Σ_7_30.refs.o;
                this.m_registers[Σ_7_30.refs.n][Σ_7_30.refs.q].primary = false;
            }
        }, Σ_7);
        Σ_7.refs.Q.prototype.InitializeRegisters = Σ_7.addFunction(function αxUsn() {
            var Σ_7_31 = new Σ.Scope(this, αxUsn, '31', Σ_7, {}, []);
            this.m_registers = new Σ.refs.Vector(Σ_7.refs.y.e_shapeTypeCount);
            for (Σ_7_31.refs.j = 0; Σ_7_31.refs.j < Σ_7.refs.y.e_shapeTypeCount; Σ_7_31.refs.j++) {
                this.m_registers[Σ_7_31.refs.j] = new Σ.refs.Vector(Σ_7.refs.y.e_shapeTypeCount);
                for (Σ_7_31.refs.o = 0; Σ_7_31.refs.o < Σ_7.refs.y.e_shapeTypeCount; Σ_7_31.refs.o++) {
                    this.m_registers[Σ_7_31.refs.j][Σ_7_31.refs.o] = new Σ_7.refs.V();
                }
            }
            this.AddType(Σ_7.refs.w.Create, Σ_7.refs.w.Destroy, Σ_7.refs.y.e_circleShape, Σ_7.refs.y.e_circleShape);
            this.AddType(Σ_7.refs.Y.Create, Σ_7.refs.Y.Destroy, Σ_7.refs.y.e_polygonShape, Σ_7.refs.y.e_circleShape);
            this.AddType(Σ_7.refs.z.Create, Σ_7.refs.z.Destroy, Σ_7.refs.y.e_polygonShape, Σ_7.refs.y.e_polygonShape);
            this.AddType(Σ_7.refs.I.Create, Σ_7.refs.I.Destroy, Σ_7.refs.y.e_edgeShape, Σ_7.refs.y.e_circleShape);
            this.AddType(Σ_7.refs.k.Create, Σ_7.refs.k.Destroy, Σ_7.refs.y.e_polygonShape, Σ_7.refs.y.e_edgeShape);
        }, Σ_7);
        Σ_7.refs.Q.prototype.Create = Σ_7.addFunction(function α0uB5(j, o) {
            var Σ_7_32 = new Σ.Scope(this, α0uB5, '32', Σ_7, {
                j: j,
                o: o
            }, []);
            Σ_7_32.refs.q = parseInt(Σ_7_32.refs.j.GetType()), Σ_7_32.refs.n = parseInt(Σ_7_32.refs.o.GetType());
            Σ_7_32.refs.q = this.m_registers[Σ_7_32.refs.q][Σ_7_32.refs.n];
            if (Σ_7_32.refs.q.pool) {
                Σ_7_32.refs.n = Σ_7_32.refs.q.pool;
                Σ_7_32.refs.q.pool = Σ_7_32.refs.n.m_next;
                Σ_7_32.refs.q.poolCount--;
                Σ_7_32.refs.n.Reset(Σ_7_32.refs.j, Σ_7_32.refs.o);
                return Σ_7_32.refs.n;
            }
            Σ_7_32.refs.n = Σ_7_32.refs.q.createFcn;
            if (Σ_7_32.refs.n != null) {
                if (Σ_7_32.refs.q.primary) {
                    Σ_7_32.refs.n = Σ_7_32.refs.n(this.m_allocator);
                    Σ_7_32.refs.n.Reset(Σ_7_32.refs.j, Σ_7_32.refs.o);
                } else {
                    Σ_7_32.refs.n = Σ_7_32.refs.n(this.m_allocator);
                    Σ_7_32.refs.n.Reset(Σ_7_32.refs.o, Σ_7_32.refs.j);
                }
                return Σ_7_32.refs.n;
            } else {
                return null;
            }
        }, Σ_7);
        Σ_7.refs.Q.prototype.Destroy = Σ_7.addFunction(function αSDbE(j) {
            var Σ_7_33 = new Σ.Scope(this, αSDbE, '33', Σ_7, {
                j: j
            }, []);
            if (Σ_7_33.refs.j.m_manifold.m_pointCount > 0) {
                Σ_7_33.refs.j.m_fixtureA.m_body.SetAwake(true);
                Σ_7_33.refs.j.m_fixtureB.m_body.SetAwake(true);
            }
            Σ_7_33.refs.o = parseInt(Σ_7_33.refs.j.m_fixtureA.GetType()), Σ_7_33.refs.q = parseInt(Σ_7_33.refs.j.m_fixtureB.GetType());
            Σ_7_33.refs.o = this.m_registers[Σ_7_33.refs.o][Σ_7_33.refs.q];
            Σ_7_33.refs.o.poolCount++;
            Σ_7_33.refs.j.m_next = Σ_7_33.refs.o.pool;
            Σ_7_33.refs.o.pool = Σ_7_33.refs.j;
            Σ_7_33.refs.o = Σ_7_33.refs.o.destroyFcn;
            Σ_7_33.refs.o(Σ_7_33.refs.j, this.m_allocator);
        }, Σ_7);
        Σ_7.refs.V.b2ContactRegister = Σ_7.addFunction(function αmetY() {
            var Σ_7_34 = new Σ.Scope(this, αmetY, '34', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.M.b2ContactResult = Σ_7.addFunction(function αAbh8() {
            var Σ_7_35 = new Σ.Scope(this, αAbh8, '35', Σ_7, {}, []);
            this.position = new Σ_7.refs.N();
            this.normal = new Σ_7.refs.N();
            this.id = new Σ_7.refs.aa();
        }, Σ_7);
        Σ_7.refs.L.b2ContactSolver = Σ_7.addFunction(function αxcB3() {
            var Σ_7_36 = new Σ.Scope(this, αxcB3, '36', Σ_7, {}, []);
            this.m_step = new Σ_7.refs.H();
            this.m_constraints = new Σ.refs.Vector();
        }, Σ_7);
        Σ_7.refs.L.prototype.b2ContactSolver = Σ_7.addFunction(function α9Nqw() {
            var Σ_7_37 = new Σ.Scope(this, α9Nqw, '37', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.L.prototype.Initialize = Σ_7.addFunction(function αV0aO(j, o, q, n) {
            var Σ_7_38 = new Σ.Scope(this, αV0aO, '38', Σ_7, {
                j: j,
                o: o,
                q: q,
                n: n
            }, []);
            if (Σ_7_38.refs.q === undefined) {
                Σ_7_38.refs.q = 0;
            }
            Σ_7_38.refs.a = undefined;
            this.m_step.Set(Σ_7_38.refs.j);
            this.m_allocator = Σ_7_38.refs.n;
            Σ_7_38.refs.j = 0;
            for (this.m_constraintCount = Σ_7_38.refs.q; this.m_constraints.length < this.m_constraintCount;) {
                this.m_constraints[this.m_constraints.length] = new Σ_7.refs.U();
            }
            for (Σ_7_38.refs.j = 0; Σ_7_38.refs.j < Σ_7_38.refs.q; ++Σ_7_38.refs.j) {
                Σ_7_38.refs.a = Σ_7_38.refs.o[Σ_7_38.refs.j];
                Σ_7_38.refs.n = Σ_7_38.refs.a.m_fixtureA;
                Σ_7_38.refs.c = Σ_7_38.refs.a.m_fixtureB, Σ_7_38.refs.g = Σ_7_38.refs.n.m_shape.m_radius, Σ_7_38.refs.b = Σ_7_38.refs.c.m_shape.m_radius, Σ_7_38.refs.e = Σ_7_38.refs.n.m_body, Σ_7_38.refs.f = Σ_7_38.refs.c.m_body, Σ_7_38.refs.m = Σ_7_38.refs.a.GetManifold(), Σ_7_38.refs.r = Σ_7.refs.O.b2MixFriction(Σ_7_38.refs.n.GetFriction(), Σ_7_38.refs.c.GetFriction()), Σ_7_38.refs.s = Σ_7.refs.O.b2MixRestitution(Σ_7_38.refs.n.GetRestitution(), Σ_7_38.refs.c.GetRestitution()), Σ_7_38.refs.v = Σ_7_38.refs.e.m_linearVelocity.x, Σ_7_38.refs.t = Σ_7_38.refs.e.m_linearVelocity.y, Σ_7_38.refs.x = Σ_7_38.refs.f.m_linearVelocity.x, Σ_7_38.refs.C = Σ_7_38.refs.f.m_linearVelocity.y, Σ_7_38.refs.J = Σ_7_38.refs.e.m_angularVelocity, Σ_7_38.refs.T = Σ_7_38.refs.f.m_angularVelocity;
                Σ_7.refs.O.b2Assert(Σ_7_38.refs.m.m_pointCount > 0);
                Σ_7.refs.L.s_worldManifold.Initialize(Σ_7_38.refs.m, Σ_7_38.refs.e.m_xf, Σ_7_38.refs.g, Σ_7_38.refs.f.m_xf, Σ_7_38.refs.b);
                Σ_7_38.refs.c = Σ_7.refs.L.s_worldManifold.m_normal.x;
                Σ_7_38.refs.a = Σ_7.refs.L.s_worldManifold.m_normal.y;
                Σ_7_38.refs.n = this.m_constraints[Σ_7_38.refs.j];
                Σ_7_38.refs.n.bodyA = Σ_7_38.refs.e;
                Σ_7_38.refs.n.bodyB = Σ_7_38.refs.f;
                Σ_7_38.refs.n.manifold = Σ_7_38.refs.m;
                Σ_7_38.refs.n.normal.x = Σ_7_38.refs.c;
                Σ_7_38.refs.n.normal.y = Σ_7_38.refs.a;
                Σ_7_38.refs.n.pointCount = Σ_7_38.refs.m.m_pointCount;
                Σ_7_38.refs.n.friction = Σ_7_38.refs.r;
                Σ_7_38.refs.n.restitution = Σ_7_38.refs.s;
                Σ_7_38.refs.n.localPlaneNormal.x = Σ_7_38.refs.m.m_localPlaneNormal.x;
                Σ_7_38.refs.n.localPlaneNormal.y = Σ_7_38.refs.m.m_localPlaneNormal.y;
                Σ_7_38.refs.n.localPoint.x = Σ_7_38.refs.m.m_localPoint.x;
                Σ_7_38.refs.n.localPoint.y = Σ_7_38.refs.m.m_localPoint.y;
                Σ_7_38.refs.n.radius = Σ_7_38.refs.g + Σ_7_38.refs.b;
                Σ_7_38.refs.n.type = Σ_7_38.refs.m.m_type;
                for (Σ_7_38.refs.g = 0; Σ_7_38.refs.g < Σ_7_38.refs.n.pointCount; ++Σ_7_38.refs.g) {
                    Σ_7_38.refs.r = Σ_7_38.refs.m.m_points[Σ_7_38.refs.g];
                    Σ_7_38.refs.b = Σ_7_38.refs.n.points[Σ_7_38.refs.g];
                    Σ_7_38.refs.b.normalImpulse = Σ_7_38.refs.r.m_normalImpulse;
                    Σ_7_38.refs.b.tangentImpulse = Σ_7_38.refs.r.m_tangentImpulse;
                    Σ_7_38.refs.b.localPoint.SetV(Σ_7_38.refs.r.m_localPoint);
                    Σ_7_38.refs.r = Σ_7_38.refs.b.rA.x = Σ_7.refs.L.s_worldManifold.m_points[Σ_7_38.refs.g].x - Σ_7_38.refs.e.m_sweep.c.x;
                    Σ_7_38.refs.s = Σ_7_38.refs.b.rA.y = Σ_7.refs.L.s_worldManifold.m_points[Σ_7_38.refs.g].y - Σ_7_38.refs.e.m_sweep.c.y;
                    Σ_7_38.refs.P = Σ_7_38.refs.b.rB.x = Σ_7.refs.L.s_worldManifold.m_points[Σ_7_38.refs.g].x - Σ_7_38.refs.f.m_sweep.c.x, Σ_7_38.refs.X = Σ_7_38.refs.b.rB.y = Σ_7.refs.L.s_worldManifold.m_points[Σ_7_38.refs.g].y - Σ_7_38.refs.f.m_sweep.c.y, Σ_7_38.refs.$ = Σ_7_38.refs.r * Σ_7_38.refs.a - Σ_7_38.refs.s * Σ_7_38.refs.c, Σ_7_38.refs.ba = Σ_7_38.refs.P * Σ_7_38.refs.a - Σ_7_38.refs.X * Σ_7_38.refs.c;
                    Σ_7_38.refs.$ *= Σ_7_38.refs.$;
                    Σ_7_38.refs.ba *= Σ_7_38.refs.ba;
                    Σ_7_38.refs.b.normalMass = 1 / (Σ_7_38.refs.e.m_invMass + Σ_7_38.refs.f.m_invMass + Σ_7_38.refs.e.m_invI * Σ_7_38.refs.$ + Σ_7_38.refs.f.m_invI * Σ_7_38.refs.ba);
                    Σ_7_38.refs.ca = Σ_7_38.refs.e.m_mass * Σ_7_38.refs.e.m_invMass + Σ_7_38.refs.f.m_mass * Σ_7_38.refs.f.m_invMass;
                    Σ_7_38.refs.ca += Σ_7_38.refs.e.m_mass * Σ_7_38.refs.e.m_invI * Σ_7_38.refs.$ + Σ_7_38.refs.f.m_mass * Σ_7_38.refs.f.m_invI * Σ_7_38.refs.ba;
                    Σ_7_38.refs.b.equalizedMass = 1 / Σ_7_38.refs.ca;
                    Σ_7_38.refs.ba = Σ_7_38.refs.a;
                    Σ_7_38.refs.ca = -Σ_7_38.refs.c;
                    Σ_7_38.refs.$ = Σ_7_38.refs.r * Σ_7_38.refs.ca - Σ_7_38.refs.s * Σ_7_38.refs.ba;
                    Σ_7_38.refs.ba = Σ_7_38.refs.P * Σ_7_38.refs.ca - Σ_7_38.refs.X * Σ_7_38.refs.ba;
                    Σ_7_38.refs.$ *= Σ_7_38.refs.$;
                    Σ_7_38.refs.ba *= Σ_7_38.refs.ba;
                    Σ_7_38.refs.b.tangentMass = 1 / (Σ_7_38.refs.e.m_invMass + Σ_7_38.refs.f.m_invMass + Σ_7_38.refs.e.m_invI * Σ_7_38.refs.$ + Σ_7_38.refs.f.m_invI * Σ_7_38.refs.ba);
                    Σ_7_38.refs.b.velocityBias = 0;
                    Σ_7_38.refs.r = Σ_7_38.refs.n.normal.x * (Σ_7_38.refs.x + -Σ_7_38.refs.T * Σ_7_38.refs.X - Σ_7_38.refs.v - -Σ_7_38.refs.J * Σ_7_38.refs.s) + Σ_7_38.refs.n.normal.y * (Σ_7_38.refs.C + Σ_7_38.refs.T * Σ_7_38.refs.P - Σ_7_38.refs.t - Σ_7_38.refs.J * Σ_7_38.refs.r);
                    if (Σ_7_38.refs.r < -Σ_7.refs.O.b2_velocityThreshold) {
                        Σ_7_38.refs.b.velocityBias += -Σ_7_38.refs.n.restitution * Σ_7_38.refs.r;
                    }
                }
                if (Σ_7_38.refs.n.pointCount == 2) {
                    Σ_7_38.refs.C = Σ_7_38.refs.n.points[0];
                    Σ_7_38.refs.x = Σ_7_38.refs.n.points[1];
                    Σ_7_38.refs.m = Σ_7_38.refs.e.m_invMass;
                    Σ_7_38.refs.e = Σ_7_38.refs.e.m_invI;
                    Σ_7_38.refs.v = Σ_7_38.refs.f.m_invMass;
                    Σ_7_38.refs.f = Σ_7_38.refs.f.m_invI;
                    Σ_7_38.refs.t = Σ_7_38.refs.C.rA.x * Σ_7_38.refs.a - Σ_7_38.refs.C.rA.y * Σ_7_38.refs.c;
                    Σ_7_38.refs.C = Σ_7_38.refs.C.rB.x * Σ_7_38.refs.a - Σ_7_38.refs.C.rB.y * Σ_7_38.refs.c;
                    Σ_7_38.refs.J = Σ_7_38.refs.x.rA.x * Σ_7_38.refs.a - Σ_7_38.refs.x.rA.y * Σ_7_38.refs.c;
                    Σ_7_38.refs.x = Σ_7_38.refs.x.rB.x * Σ_7_38.refs.a - Σ_7_38.refs.x.rB.y * Σ_7_38.refs.c;
                    Σ_7_38.refs.c = Σ_7_38.refs.m + Σ_7_38.refs.v + Σ_7_38.refs.e * Σ_7_38.refs.t * Σ_7_38.refs.t + Σ_7_38.refs.f * Σ_7_38.refs.C * Σ_7_38.refs.C;
                    Σ_7_38.refs.a = Σ_7_38.refs.m + Σ_7_38.refs.v + Σ_7_38.refs.e * Σ_7_38.refs.J * Σ_7_38.refs.J + Σ_7_38.refs.f * Σ_7_38.refs.x * Σ_7_38.refs.x;
                    Σ_7_38.refs.f = Σ_7_38.refs.m + Σ_7_38.refs.v + Σ_7_38.refs.e * Σ_7_38.refs.t * Σ_7_38.refs.J + Σ_7_38.refs.f * Σ_7_38.refs.C * Σ_7_38.refs.x;
                    if (Σ_7_38.refs.c * Σ_7_38.refs.c < 100 * (Σ_7_38.refs.c * Σ_7_38.refs.a - Σ_7_38.refs.f * Σ_7_38.refs.f)) {
                        Σ_7_38.refs.n.K.col1.Set(Σ_7_38.refs.c, Σ_7_38.refs.f);
                        Σ_7_38.refs.n.K.col2.Set(Σ_7_38.refs.f, Σ_7_38.refs.a);
                        Σ_7_38.refs.n.K.GetInverse(Σ_7_38.refs.n.normalMass);
                    } else {
                        Σ_7_38.refs.n.pointCount = 1;
                    }
                }
            }
        }, Σ_7);
        Σ_7.refs.L.prototype.InitVelocityConstraints = Σ_7.addFunction(function αgEP2(j) {
            var Σ_7_39 = new Σ.Scope(this, αgEP2, '39', Σ_7, {
                j: j
            }, []);
            for (Σ_7_39.refs.o = 0; Σ_7_39.refs.o < this.m_constraintCount; ++Σ_7_39.refs.o) {
                Σ_7_39.refs.q = this.m_constraints[Σ_7_39.refs.o], Σ_7_39.refs.n = Σ_7_39.refs.q.bodyA, Σ_7_39.refs.a = Σ_7_39.refs.q.bodyB, Σ_7_39.refs.c = Σ_7_39.refs.n.m_invMass, Σ_7_39.refs.g = Σ_7_39.refs.n.m_invI, Σ_7_39.refs.b = Σ_7_39.refs.a.m_invMass, Σ_7_39.refs.e = Σ_7_39.refs.a.m_invI, Σ_7_39.refs.f = Σ_7_39.refs.q.normal.x, Σ_7_39.refs.m = Σ_7_39.refs.q.normal.y, Σ_7_39.refs.r = Σ_7_39.refs.m, Σ_7_39.refs.s = -Σ_7_39.refs.f, Σ_7_39.refs.v = 0, Σ_7_39.refs.t = 0;
                if (Σ_7_39.refs.j.warmStarting) {
                    Σ_7_39.refs.t = Σ_7_39.refs.q.pointCount;
                    for (Σ_7_39.refs.v = 0; Σ_7_39.refs.v < Σ_7_39.refs.t; ++Σ_7_39.refs.v) {
                        Σ_7_39.refs.x = Σ_7_39.refs.q.points[Σ_7_39.refs.v];
                        Σ_7_39.refs.x.normalImpulse *= Σ_7_39.refs.j.dtRatio;
                        Σ_7_39.refs.x.tangentImpulse *= Σ_7_39.refs.j.dtRatio;
                        Σ_7_39.refs.C = Σ_7_39.refs.x.normalImpulse * Σ_7_39.refs.f + Σ_7_39.refs.x.tangentImpulse * Σ_7_39.refs.r, Σ_7_39.refs.J = Σ_7_39.refs.x.normalImpulse * Σ_7_39.refs.m + Σ_7_39.refs.x.tangentImpulse * Σ_7_39.refs.s;
                        Σ_7_39.refs.n.m_angularVelocity -= Σ_7_39.refs.g * (Σ_7_39.refs.x.rA.x * Σ_7_39.refs.J - Σ_7_39.refs.x.rA.y * Σ_7_39.refs.C);
                        Σ_7_39.refs.n.m_linearVelocity.x -= Σ_7_39.refs.c * Σ_7_39.refs.C;
                        Σ_7_39.refs.n.m_linearVelocity.y -= Σ_7_39.refs.c * Σ_7_39.refs.J;
                        Σ_7_39.refs.a.m_angularVelocity += Σ_7_39.refs.e * (Σ_7_39.refs.x.rB.x * Σ_7_39.refs.J - Σ_7_39.refs.x.rB.y * Σ_7_39.refs.C);
                        Σ_7_39.refs.a.m_linearVelocity.x += Σ_7_39.refs.b * Σ_7_39.refs.C;
                        Σ_7_39.refs.a.m_linearVelocity.y += Σ_7_39.refs.b * Σ_7_39.refs.J;
                    }
                } else {
                    Σ_7_39.refs.t = Σ_7_39.refs.q.pointCount;
                    for (Σ_7_39.refs.v = 0; Σ_7_39.refs.v < Σ_7_39.refs.t; ++Σ_7_39.refs.v) {
                        Σ_7_39.refs.n = Σ_7_39.refs.q.points[Σ_7_39.refs.v];
                        Σ_7_39.refs.n.normalImpulse = 0;
                        Σ_7_39.refs.n.tangentImpulse = 0;
                    }
                }
            }
        }, Σ_7);
        Σ_7.refs.L.prototype.SolveVelocityConstraints = Σ_7.addFunction(function αbJnE() {
            var Σ_7_40 = new Σ.Scope(this, αbJnE, '40', Σ_7, {}, []);
            for (Σ_7_40.refs.j = 0, Σ_7_40.refs.o = undefined, Σ_7_40.refs.q = 0, Σ_7_40.refs.n = 0, Σ_7_40.refs.a = 0, Σ_7_40.refs.c = Σ_7_40.refs.n = Σ_7_40.refs.n = Σ_7_40.refs.q = Σ_7_40.refs.q = 0, Σ_7_40.refs.g = Σ_7_40.refs.q = Σ_7_40.refs.q = 0, Σ_7_40.refs.b = Σ_7_40.refs.q = Σ_7_40.refs.a = 0, Σ_7_40.refs.e = 0, Σ_7_40.refs.f = undefined, Σ_7_40.refs.m = 0; Σ_7_40.refs.m < this.m_constraintCount; ++Σ_7_40.refs.m) {
                Σ_7_40.refs.a = this.m_constraints[Σ_7_40.refs.m];
                Σ_7_40.refs.r = Σ_7_40.refs.a.bodyA, Σ_7_40.refs.s = Σ_7_40.refs.a.bodyB, Σ_7_40.refs.v = Σ_7_40.refs.r.m_angularVelocity, Σ_7_40.refs.t = Σ_7_40.refs.s.m_angularVelocity, Σ_7_40.refs.x = Σ_7_40.refs.r.m_linearVelocity, Σ_7_40.refs.C = Σ_7_40.refs.s.m_linearVelocity, Σ_7_40.refs.J = Σ_7_40.refs.r.m_invMass, Σ_7_40.refs.T = Σ_7_40.refs.r.m_invI, Σ_7_40.refs.P = Σ_7_40.refs.s.m_invMass, Σ_7_40.refs.X = Σ_7_40.refs.s.m_invI;
                Σ_7_40.refs.b = Σ_7_40.refs.a.normal.x;
                Σ_7_40.refs.$ = Σ_7_40.refs.e = Σ_7_40.refs.a.normal.y;
                Σ_7_40.refs.f = -Σ_7_40.refs.b;
                Σ_7_40.refs.g = Σ_7_40.refs.a.friction;
                for (Σ_7_40.refs.j = 0; Σ_7_40.refs.j < Σ_7_40.refs.a.pointCount; Σ_7_40.refs.j++) {
                    Σ_7_40.refs.o = Σ_7_40.refs.a.points[Σ_7_40.refs.j];
                    Σ_7_40.refs.q = Σ_7_40.refs.C.x - Σ_7_40.refs.t * Σ_7_40.refs.o.rB.y - Σ_7_40.refs.x.x + Σ_7_40.refs.v * Σ_7_40.refs.o.rA.y;
                    Σ_7_40.refs.n = Σ_7_40.refs.C.y + Σ_7_40.refs.t * Σ_7_40.refs.o.rB.x - Σ_7_40.refs.x.y - Σ_7_40.refs.v * Σ_7_40.refs.o.rA.x;
                    Σ_7_40.refs.q = Σ_7_40.refs.q * Σ_7_40.refs.$ + Σ_7_40.refs.n * Σ_7_40.refs.f;
                    Σ_7_40.refs.q = Σ_7_40.refs.o.tangentMass * -Σ_7_40.refs.q;
                    Σ_7_40.refs.n = Σ_7_40.refs.g * Σ_7_40.refs.o.normalImpulse;
                    Σ_7_40.refs.n = Σ_7.refs.R.Clamp(Σ_7_40.refs.o.tangentImpulse + Σ_7_40.refs.q, -Σ_7_40.refs.n, Σ_7_40.refs.n);
                    Σ_7_40.refs.q = Σ_7_40.refs.n - Σ_7_40.refs.o.tangentImpulse;
                    Σ_7_40.refs.c = Σ_7_40.refs.q * Σ_7_40.refs.$;
                    Σ_7_40.refs.q = Σ_7_40.refs.q * Σ_7_40.refs.f;
                    Σ_7_40.refs.x.x -= Σ_7_40.refs.J * Σ_7_40.refs.c;
                    Σ_7_40.refs.x.y -= Σ_7_40.refs.J * Σ_7_40.refs.q;
                    Σ_7_40.refs.v -= Σ_7_40.refs.T * (Σ_7_40.refs.o.rA.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rA.y * Σ_7_40.refs.c);
                    Σ_7_40.refs.C.x += Σ_7_40.refs.P * Σ_7_40.refs.c;
                    Σ_7_40.refs.C.y += Σ_7_40.refs.P * Σ_7_40.refs.q;
                    Σ_7_40.refs.t += Σ_7_40.refs.X * (Σ_7_40.refs.o.rB.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rB.y * Σ_7_40.refs.c);
                    Σ_7_40.refs.o.tangentImpulse = Σ_7_40.refs.n;
                }
                parseInt(Σ_7_40.refs.a.pointCount);
                if (Σ_7_40.refs.a.pointCount == 1) {
                    Σ_7_40.refs.o = Σ_7_40.refs.a.points[0];
                    Σ_7_40.refs.q = Σ_7_40.refs.C.x + -Σ_7_40.refs.t * Σ_7_40.refs.o.rB.y - Σ_7_40.refs.x.x - -Σ_7_40.refs.v * Σ_7_40.refs.o.rA.y;
                    Σ_7_40.refs.n = Σ_7_40.refs.C.y + Σ_7_40.refs.t * Σ_7_40.refs.o.rB.x - Σ_7_40.refs.x.y - Σ_7_40.refs.v * Σ_7_40.refs.o.rA.x;
                    Σ_7_40.refs.a = Σ_7_40.refs.q * Σ_7_40.refs.b + Σ_7_40.refs.n * Σ_7_40.refs.e;
                    Σ_7_40.refs.q = -Σ_7_40.refs.o.normalMass * (Σ_7_40.refs.a - Σ_7_40.refs.o.velocityBias);
                    Σ_7_40.refs.n = Σ_7_40.refs.o.normalImpulse + Σ_7_40.refs.q;
                    Σ_7_40.refs.n = Σ_7_40.refs.n > 0 ? Σ_7_40.refs.n : 0;
                    Σ_7_40.refs.q = Σ_7_40.refs.n - Σ_7_40.refs.o.normalImpulse;
                    Σ_7_40.refs.c = Σ_7_40.refs.q * Σ_7_40.refs.b;
                    Σ_7_40.refs.q = Σ_7_40.refs.q * Σ_7_40.refs.e;
                    Σ_7_40.refs.x.x -= Σ_7_40.refs.J * Σ_7_40.refs.c;
                    Σ_7_40.refs.x.y -= Σ_7_40.refs.J * Σ_7_40.refs.q;
                    Σ_7_40.refs.v -= Σ_7_40.refs.T * (Σ_7_40.refs.o.rA.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rA.y * Σ_7_40.refs.c);
                    Σ_7_40.refs.C.x += Σ_7_40.refs.P * Σ_7_40.refs.c;
                    Σ_7_40.refs.C.y += Σ_7_40.refs.P * Σ_7_40.refs.q;
                    Σ_7_40.refs.t += Σ_7_40.refs.X * (Σ_7_40.refs.o.rB.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rB.y * Σ_7_40.refs.c);
                    Σ_7_40.refs.o.normalImpulse = Σ_7_40.refs.n;
                } else {
                    Σ_7_40.refs.o = Σ_7_40.refs.a.points[0];
                    Σ_7_40.refs.j = Σ_7_40.refs.a.points[1];
                    Σ_7_40.refs.q = Σ_7_40.refs.o.normalImpulse;
                    Σ_7_40.refs.g = Σ_7_40.refs.j.normalImpulse;
                    Σ_7_40.refs.ba = (Σ_7_40.refs.C.x - Σ_7_40.refs.t * Σ_7_40.refs.o.rB.y - Σ_7_40.refs.x.x + Σ_7_40.refs.v * Σ_7_40.refs.o.rA.y) * Σ_7_40.refs.b + (Σ_7_40.refs.C.y + Σ_7_40.refs.t * Σ_7_40.refs.o.rB.x - Σ_7_40.refs.x.y - Σ_7_40.refs.v * Σ_7_40.refs.o.rA.x) * Σ_7_40.refs.e, Σ_7_40.refs.ca = (Σ_7_40.refs.C.x - Σ_7_40.refs.t * Σ_7_40.refs.j.rB.y - Σ_7_40.refs.x.x + Σ_7_40.refs.v * Σ_7_40.refs.j.rA.y) * Σ_7_40.refs.b + (Σ_7_40.refs.C.y + Σ_7_40.refs.t * Σ_7_40.refs.j.rB.x - Σ_7_40.refs.x.y - Σ_7_40.refs.v * Σ_7_40.refs.j.rA.x) * Σ_7_40.refs.e;
                    Σ_7_40.refs.n = Σ_7_40.refs.ba - Σ_7_40.refs.o.velocityBias;
                    Σ_7_40.refs.c = Σ_7_40.refs.ca - Σ_7_40.refs.j.velocityBias;
                    Σ_7_40.refs.f = Σ_7_40.refs.a.K;
                    Σ_7_40.refs.n -= Σ_7_40.refs.f.col1.x * Σ_7_40.refs.q + Σ_7_40.refs.f.col2.x * Σ_7_40.refs.g;
                    for (Σ_7_40.refs.c -= Σ_7_40.refs.f.col1.y * Σ_7_40.refs.q + Σ_7_40.refs.f.col2.y * Σ_7_40.refs.g;;) {
                        Σ_7_40.refs.f = Σ_7_40.refs.a.normalMass;
                        Σ_7_40.refs.$ = -(Σ_7_40.refs.f.col1.x * Σ_7_40.refs.n + Σ_7_40.refs.f.col2.x * Σ_7_40.refs.c);
                        Σ_7_40.refs.f = -(Σ_7_40.refs.f.col1.y * Σ_7_40.refs.n + Σ_7_40.refs.f.col2.y * Σ_7_40.refs.c);
                        if (Σ_7_40.refs.$ >= 0 && Σ_7_40.refs.f >= 0) {
                            Σ_7_40.refs.q = Σ_7_40.refs.$ - Σ_7_40.refs.q;
                            Σ_7_40.refs.g = Σ_7_40.refs.f - Σ_7_40.refs.g;
                            Σ_7_40.refs.a = Σ_7_40.refs.q * Σ_7_40.refs.b;
                            Σ_7_40.refs.q = Σ_7_40.refs.q * Σ_7_40.refs.e;
                            Σ_7_40.refs.b = Σ_7_40.refs.g * Σ_7_40.refs.b;
                            Σ_7_40.refs.e = Σ_7_40.refs.g * Σ_7_40.refs.e;
                            Σ_7_40.refs.x.x -= Σ_7_40.refs.J * (Σ_7_40.refs.a + Σ_7_40.refs.b);
                            Σ_7_40.refs.x.y -= Σ_7_40.refs.J * (Σ_7_40.refs.q + Σ_7_40.refs.e);
                            Σ_7_40.refs.v -= Σ_7_40.refs.T * (Σ_7_40.refs.o.rA.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rA.y * Σ_7_40.refs.a + Σ_7_40.refs.j.rA.x * Σ_7_40.refs.e - Σ_7_40.refs.j.rA.y * Σ_7_40.refs.b);
                            Σ_7_40.refs.C.x += Σ_7_40.refs.P * (Σ_7_40.refs.a + Σ_7_40.refs.b);
                            Σ_7_40.refs.C.y += Σ_7_40.refs.P * (Σ_7_40.refs.q + Σ_7_40.refs.e);
                            Σ_7_40.refs.t += Σ_7_40.refs.X * (Σ_7_40.refs.o.rB.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rB.y * Σ_7_40.refs.a + Σ_7_40.refs.j.rB.x * Σ_7_40.refs.e - Σ_7_40.refs.j.rB.y * Σ_7_40.refs.b);
                            Σ_7_40.refs.o.normalImpulse = Σ_7_40.refs.$;
                            Σ_7_40.refs.j.normalImpulse = Σ_7_40.refs.f;
                            break;
                        }
                        Σ_7_40.refs.$ = -Σ_7_40.refs.o.normalMass * Σ_7_40.refs.n;
                        Σ_7_40.refs.f = 0;
                        Σ_7_40.refs.ca = Σ_7_40.refs.a.K.col1.y * Σ_7_40.refs.$ + Σ_7_40.refs.c;
                        if (Σ_7_40.refs.$ >= 0 && Σ_7_40.refs.ca >= 0) {
                            Σ_7_40.refs.q = Σ_7_40.refs.$ - Σ_7_40.refs.q;
                            Σ_7_40.refs.g = Σ_7_40.refs.f - Σ_7_40.refs.g;
                            Σ_7_40.refs.a = Σ_7_40.refs.q * Σ_7_40.refs.b;
                            Σ_7_40.refs.q = Σ_7_40.refs.q * Σ_7_40.refs.e;
                            Σ_7_40.refs.b = Σ_7_40.refs.g * Σ_7_40.refs.b;
                            Σ_7_40.refs.e = Σ_7_40.refs.g * Σ_7_40.refs.e;
                            Σ_7_40.refs.x.x -= Σ_7_40.refs.J * (Σ_7_40.refs.a + Σ_7_40.refs.b);
                            Σ_7_40.refs.x.y -= Σ_7_40.refs.J * (Σ_7_40.refs.q + Σ_7_40.refs.e);
                            Σ_7_40.refs.v -= Σ_7_40.refs.T * (Σ_7_40.refs.o.rA.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rA.y * Σ_7_40.refs.a + Σ_7_40.refs.j.rA.x * Σ_7_40.refs.e - Σ_7_40.refs.j.rA.y * Σ_7_40.refs.b);
                            Σ_7_40.refs.C.x += Σ_7_40.refs.P * (Σ_7_40.refs.a + Σ_7_40.refs.b);
                            Σ_7_40.refs.C.y += Σ_7_40.refs.P * (Σ_7_40.refs.q + Σ_7_40.refs.e);
                            Σ_7_40.refs.t += Σ_7_40.refs.X * (Σ_7_40.refs.o.rB.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rB.y * Σ_7_40.refs.a + Σ_7_40.refs.j.rB.x * Σ_7_40.refs.e - Σ_7_40.refs.j.rB.y * Σ_7_40.refs.b);
                            Σ_7_40.refs.o.normalImpulse = Σ_7_40.refs.$;
                            Σ_7_40.refs.j.normalImpulse = Σ_7_40.refs.f;
                            break;
                        }
                        Σ_7_40.refs.$ = 0;
                        Σ_7_40.refs.f = -Σ_7_40.refs.j.normalMass * Σ_7_40.refs.c;
                        Σ_7_40.refs.ba = Σ_7_40.refs.a.K.col2.x * Σ_7_40.refs.f + Σ_7_40.refs.n;
                        if (Σ_7_40.refs.f >= 0 && Σ_7_40.refs.ba >= 0) {
                            Σ_7_40.refs.q = Σ_7_40.refs.$ - Σ_7_40.refs.q;
                            Σ_7_40.refs.g = Σ_7_40.refs.f - Σ_7_40.refs.g;
                            Σ_7_40.refs.a = Σ_7_40.refs.q * Σ_7_40.refs.b;
                            Σ_7_40.refs.q = Σ_7_40.refs.q * Σ_7_40.refs.e;
                            Σ_7_40.refs.b = Σ_7_40.refs.g * Σ_7_40.refs.b;
                            Σ_7_40.refs.e = Σ_7_40.refs.g * Σ_7_40.refs.e;
                            Σ_7_40.refs.x.x -= Σ_7_40.refs.J * (Σ_7_40.refs.a + Σ_7_40.refs.b);
                            Σ_7_40.refs.x.y -= Σ_7_40.refs.J * (Σ_7_40.refs.q + Σ_7_40.refs.e);
                            Σ_7_40.refs.v -= Σ_7_40.refs.T * (Σ_7_40.refs.o.rA.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rA.y * Σ_7_40.refs.a + Σ_7_40.refs.j.rA.x * Σ_7_40.refs.e - Σ_7_40.refs.j.rA.y * Σ_7_40.refs.b);
                            Σ_7_40.refs.C.x += Σ_7_40.refs.P * (Σ_7_40.refs.a + Σ_7_40.refs.b);
                            Σ_7_40.refs.C.y += Σ_7_40.refs.P * (Σ_7_40.refs.q + Σ_7_40.refs.e);
                            Σ_7_40.refs.t += Σ_7_40.refs.X * (Σ_7_40.refs.o.rB.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rB.y * Σ_7_40.refs.a + Σ_7_40.refs.j.rB.x * Σ_7_40.refs.e - Σ_7_40.refs.j.rB.y * Σ_7_40.refs.b);
                            Σ_7_40.refs.o.normalImpulse = Σ_7_40.refs.$;
                            Σ_7_40.refs.j.normalImpulse = Σ_7_40.refs.f;
                            break;
                        }
                        Σ_7_40.refs.f = Σ_7_40.refs.$ = 0;
                        Σ_7_40.refs.ba = Σ_7_40.refs.n;
                        Σ_7_40.refs.ca = Σ_7_40.refs.c;
                        if (Σ_7_40.refs.ba >= 0 && Σ_7_40.refs.ca >= 0) {
                            Σ_7_40.refs.q = Σ_7_40.refs.$ - Σ_7_40.refs.q;
                            Σ_7_40.refs.g = Σ_7_40.refs.f - Σ_7_40.refs.g;
                            Σ_7_40.refs.a = Σ_7_40.refs.q * Σ_7_40.refs.b;
                            Σ_7_40.refs.q = Σ_7_40.refs.q * Σ_7_40.refs.e;
                            Σ_7_40.refs.b = Σ_7_40.refs.g * Σ_7_40.refs.b;
                            Σ_7_40.refs.e = Σ_7_40.refs.g * Σ_7_40.refs.e;
                            Σ_7_40.refs.x.x -= Σ_7_40.refs.J * (Σ_7_40.refs.a + Σ_7_40.refs.b);
                            Σ_7_40.refs.x.y -= Σ_7_40.refs.J * (Σ_7_40.refs.q + Σ_7_40.refs.e);
                            Σ_7_40.refs.v -= Σ_7_40.refs.T * (Σ_7_40.refs.o.rA.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rA.y * Σ_7_40.refs.a + Σ_7_40.refs.j.rA.x * Σ_7_40.refs.e - Σ_7_40.refs.j.rA.y * Σ_7_40.refs.b);
                            Σ_7_40.refs.C.x += Σ_7_40.refs.P * (Σ_7_40.refs.a + Σ_7_40.refs.b);
                            Σ_7_40.refs.C.y += Σ_7_40.refs.P * (Σ_7_40.refs.q + Σ_7_40.refs.e);
                            Σ_7_40.refs.t += Σ_7_40.refs.X * (Σ_7_40.refs.o.rB.x * Σ_7_40.refs.q - Σ_7_40.refs.o.rB.y * Σ_7_40.refs.a + Σ_7_40.refs.j.rB.x * Σ_7_40.refs.e - Σ_7_40.refs.j.rB.y * Σ_7_40.refs.b);
                            Σ_7_40.refs.o.normalImpulse = Σ_7_40.refs.$;
                            Σ_7_40.refs.j.normalImpulse = Σ_7_40.refs.f;
                            break;
                        }
                        break;
                    }
                }
                Σ_7_40.refs.r.m_angularVelocity = Σ_7_40.refs.v;
                Σ_7_40.refs.s.m_angularVelocity = Σ_7_40.refs.t;
            }
        }, Σ_7);
        Σ_7.refs.L.prototype.FinalizeVelocityConstraints = Σ_7.addFunction(function αsVZ3() {
            var Σ_7_41 = new Σ.Scope(this, αsVZ3, '41', Σ_7, {}, []);
            for (Σ_7_41.refs.j = 0; Σ_7_41.refs.j < this.m_constraintCount; ++Σ_7_41.refs.j) {
                for (Σ_7_41.refs.o = this.m_constraints[Σ_7_41.refs.j], Σ_7_41.refs.q = Σ_7_41.refs.o.manifold, Σ_7_41.refs.n = 0; Σ_7_41.refs.n < Σ_7_41.refs.o.pointCount; ++Σ_7_41.refs.n) {
                    Σ_7_41.refs.a = Σ_7_41.refs.q.m_points[Σ_7_41.refs.n], Σ_7_41.refs.c = Σ_7_41.refs.o.points[Σ_7_41.refs.n];
                    Σ_7_41.refs.a.m_normalImpulse = Σ_7_41.refs.c.normalImpulse;
                    Σ_7_41.refs.a.m_tangentImpulse = Σ_7_41.refs.c.tangentImpulse;
                }
            }
        }, Σ_7);
        Σ_7.refs.L.prototype.SolvePositionConstraints = Σ_7.addFunction(function αihyt(j) {
            var Σ_7_42 = new Σ.Scope(this, αihyt, '42', Σ_7, {
                j: j
            }, []);
            if (Σ_7_42.refs.j === undefined) {
                Σ_7_42.refs.j = 0;
            }
            for (Σ_7_42.refs.o = 0, Σ_7_42.refs.q = 0; Σ_7_42.refs.q < this.m_constraintCount; Σ_7_42.refs.q++) {
                Σ_7_42.refs.n = this.m_constraints[Σ_7_42.refs.q], Σ_7_42.refs.a = Σ_7_42.refs.n.bodyA, Σ_7_42.refs.c = Σ_7_42.refs.n.bodyB, Σ_7_42.refs.g = Σ_7_42.refs.a.m_mass * Σ_7_42.refs.a.m_invMass, Σ_7_42.refs.b = Σ_7_42.refs.a.m_mass * Σ_7_42.refs.a.m_invI, Σ_7_42.refs.e = Σ_7_42.refs.c.m_mass * Σ_7_42.refs.c.m_invMass, Σ_7_42.refs.f = Σ_7_42.refs.c.m_mass * Σ_7_42.refs.c.m_invI;
                Σ_7.refs.L.s_psm.Initialize(Σ_7_42.refs.n);
                for (Σ_7_42.refs.m = Σ_7.refs.L.s_psm.m_normal, Σ_7_42.refs.r = 0; Σ_7_42.refs.r < Σ_7_42.refs.n.pointCount; Σ_7_42.refs.r++) {
                    Σ_7_42.refs.s = Σ_7_42.refs.n.points[Σ_7_42.refs.r], Σ_7_42.refs.v = Σ_7.refs.L.s_psm.m_points[Σ_7_42.refs.r], Σ_7_42.refs.t = Σ_7.refs.L.s_psm.m_separations[Σ_7_42.refs.r], Σ_7_42.refs.x = Σ_7_42.refs.v.x - Σ_7_42.refs.a.m_sweep.c.x, Σ_7_42.refs.C = Σ_7_42.refs.v.y - Σ_7_42.refs.a.m_sweep.c.y, Σ_7_42.refs.J = Σ_7_42.refs.v.x - Σ_7_42.refs.c.m_sweep.c.x;
                    Σ_7_42.refs.v = Σ_7_42.refs.v.y - Σ_7_42.refs.c.m_sweep.c.y;
                    Σ_7_42.refs.o = Σ_7_42.refs.o < Σ_7_42.refs.t ? Σ_7_42.refs.o : Σ_7_42.refs.t;
                    Σ_7_42.refs.t = Σ_7.refs.R.Clamp(Σ_7_42.refs.j * (Σ_7_42.refs.t + Σ_7.refs.O.b2_linearSlop), -Σ_7.refs.O.b2_maxLinearCorrection, 0);
                    Σ_7_42.refs.t = -Σ_7_42.refs.s.equalizedMass * Σ_7_42.refs.t;
                    Σ_7_42.refs.s = Σ_7_42.refs.t * Σ_7_42.refs.m.x;
                    Σ_7_42.refs.t = Σ_7_42.refs.t * Σ_7_42.refs.m.y;
                    Σ_7_42.refs.a.m_sweep.c.x -= Σ_7_42.refs.g * Σ_7_42.refs.s;
                    Σ_7_42.refs.a.m_sweep.c.y -= Σ_7_42.refs.g * Σ_7_42.refs.t;
                    Σ_7_42.refs.a.m_sweep.a -= Σ_7_42.refs.b * (Σ_7_42.refs.x * Σ_7_42.refs.t - Σ_7_42.refs.C * Σ_7_42.refs.s);
                    Σ_7_42.refs.a.SynchronizeTransform();
                    Σ_7_42.refs.c.m_sweep.c.x += Σ_7_42.refs.e * Σ_7_42.refs.s;
                    Σ_7_42.refs.c.m_sweep.c.y += Σ_7_42.refs.e * Σ_7_42.refs.t;
                    Σ_7_42.refs.c.m_sweep.a += Σ_7_42.refs.f * (Σ_7_42.refs.J * Σ_7_42.refs.t - Σ_7_42.refs.v * Σ_7_42.refs.s);
                    Σ_7_42.refs.c.SynchronizeTransform();
                }
            }
            return Σ_7_42.refs.o > -1.5 * Σ_7.refs.O.b2_linearSlop;
        }, Σ_7);
        Σ.refs.Box2D.postDefs.push(Σ_7.addFunction(function αylYb() {
            var Σ_7_43 = new Σ.Scope(this, αylYb, '43', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new Σ_7.refs.l();
            Σ.refs.Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new Σ_7.refs.u();
        }, Σ_7));
        Σ.refs.Box2D.inherit(Σ_7.refs.I, Σ.refs.Box2D.Dynamics.Contacts.b2Contact);
        Σ_7.refs.I.prototype.__super = Σ.refs.Box2D.Dynamics.Contacts.b2Contact.prototype;
        Σ_7.refs.I.b2EdgeAndCircleContact = Σ_7.addFunction(function αU4Od() {
            var Σ_7_44 = new Σ.Scope(this, αU4Od, '44', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
        }, Σ_7);
        Σ_7.refs.I.Create = Σ_7.addFunction(function αopHF() {
            var Σ_7_45 = new Σ.Scope(this, αopHF, '45', Σ_7, {}, []);
            return new Σ_7.refs.I();
        }, Σ_7);
        Σ_7.refs.I.Destroy = Σ_7.addFunction(function αaYwl() {
            var Σ_7_46 = new Σ.Scope(this, αaYwl, '46', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.I.prototype.Reset = Σ_7.addFunction(function αBsKs(j, o) {
            var Σ_7_47 = new Σ.Scope(this, αBsKs, '47', Σ_7, {
                j: j,
                o: o
            }, []);
            this.__super.Reset.call(this, Σ_7_47.refs.j, Σ_7_47.refs.o);
        }, Σ_7);
        Σ_7.refs.I.prototype.Evaluate = Σ_7.addFunction(function αgqJ8() {
            var Σ_7_48 = new Σ.Scope(this, αgqJ8, '48', Σ_7, {}, []);
            Σ_7_48.refs.j = this.m_fixtureA.GetBody(), Σ_7_48.refs.o = this.m_fixtureB.GetBody();
            this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof Σ_7.refs.G ? this.m_fixtureA.GetShape() : null, Σ_7_48.refs.j.m_xf, this.m_fixtureB.GetShape() instanceof Σ_7.refs.F ? this.m_fixtureB.GetShape() : null, Σ_7_48.refs.o.m_xf);
        }, Σ_7);
        Σ_7.refs.I.prototype.b2CollideEdgeAndCircle = Σ_7.addFunction(function αziAB() {
            var Σ_7_49 = new Σ.Scope(this, αziAB, '49', Σ_7, {}, []);
        }, Σ_7);
        Σ.refs.Box2D.inherit(Σ_7.refs.W, Σ.refs.Box2D.Dynamics.Contacts.b2Contact);
        Σ_7.refs.W.prototype.__super = Σ.refs.Box2D.Dynamics.Contacts.b2Contact.prototype;
        Σ_7.refs.W.b2NullContact = Σ_7.addFunction(function α1qG9() {
            var Σ_7_50 = new Σ.Scope(this, α1qG9, '50', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
        }, Σ_7);
        Σ_7.refs.W.prototype.b2NullContact = Σ_7.addFunction(function αHZCv() {
            var Σ_7_51 = new Σ.Scope(this, αHZCv, '51', Σ_7, {}, []);
            this.__super.b2Contact.call(this);
        }, Σ_7);
        Σ_7.refs.W.prototype.Evaluate = Σ_7.addFunction(function αJEXj() {
            var Σ_7_52 = new Σ.Scope(this, αJEXj, '52', Σ_7, {}, []);
        }, Σ_7);
        Σ.refs.Box2D.inherit(Σ_7.refs.Y, Σ.refs.Box2D.Dynamics.Contacts.b2Contact);
        Σ_7.refs.Y.prototype.__super = Σ.refs.Box2D.Dynamics.Contacts.b2Contact.prototype;
        Σ_7.refs.Y.b2PolyAndCircleContact = Σ_7.addFunction(function αHHug() {
            var Σ_7_53 = new Σ.Scope(this, αHHug, '53', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
        }, Σ_7);
        Σ_7.refs.Y.Create = Σ_7.addFunction(function αWvcI() {
            var Σ_7_54 = new Σ.Scope(this, αWvcI, '54', Σ_7, {}, []);
            return new Σ_7.refs.Y();
        }, Σ_7);
        Σ_7.refs.Y.Destroy = Σ_7.addFunction(function αYpD5() {
            var Σ_7_55 = new Σ.Scope(this, αYpD5, '55', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.Y.prototype.Reset = Σ_7.addFunction(function α6zTB(j, o) {
            var Σ_7_56 = new Σ.Scope(this, α6zTB, '56', Σ_7, {
                j: j,
                o: o
            }, []);
            this.__super.Reset.call(this, Σ_7_56.refs.j, Σ_7_56.refs.o);
            Σ_7.refs.O.b2Assert(Σ_7_56.refs.j.GetType() == Σ_7.refs.y.e_polygonShape);
            Σ_7.refs.O.b2Assert(Σ_7_56.refs.o.GetType() == Σ_7.refs.y.e_circleShape);
        }, Σ_7);
        Σ_7.refs.Y.prototype.Evaluate = Σ_7.addFunction(function αQcLo() {
            var Σ_7_57 = new Σ.Scope(this, αQcLo, '57', Σ_7, {}, []);
            Σ_7_57.refs.j = this.m_fixtureA.m_body, Σ_7_57.refs.o = this.m_fixtureB.m_body;
            Σ_7.refs.S.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof Σ_7.refs.K ? this.m_fixtureA.GetShape() : null, Σ_7_57.refs.j.m_xf, this.m_fixtureB.GetShape() instanceof Σ_7.refs.F ? this.m_fixtureB.GetShape() : null, Σ_7_57.refs.o.m_xf);
        }, Σ_7);
        Σ.refs.Box2D.inherit(Σ_7.refs.k, Σ.refs.Box2D.Dynamics.Contacts.b2Contact);
        Σ_7.refs.k.prototype.__super = Σ.refs.Box2D.Dynamics.Contacts.b2Contact.prototype;
        Σ_7.refs.k.b2PolyAndEdgeContact = Σ_7.addFunction(function αiA5y() {
            var Σ_7_58 = new Σ.Scope(this, αiA5y, '58', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
        }, Σ_7);
        Σ_7.refs.k.Create = Σ_7.addFunction(function αur60() {
            var Σ_7_59 = new Σ.Scope(this, αur60, '59', Σ_7, {}, []);
            return new Σ_7.refs.k();
        }, Σ_7);
        Σ_7.refs.k.Destroy = Σ_7.addFunction(function αkI9N() {
            var Σ_7_60 = new Σ.Scope(this, αkI9N, '60', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.k.prototype.Reset = Σ_7.addFunction(function αg6wx(j, o) {
            var Σ_7_61 = new Σ.Scope(this, αg6wx, '61', Σ_7, {
                j: j,
                o: o
            }, []);
            this.__super.Reset.call(this, Σ_7_61.refs.j, Σ_7_61.refs.o);
            Σ_7.refs.O.b2Assert(Σ_7_61.refs.j.GetType() == Σ_7.refs.y.e_polygonShape);
            Σ_7.refs.O.b2Assert(Σ_7_61.refs.o.GetType() == Σ_7.refs.y.e_edgeShape);
        }, Σ_7);
        Σ_7.refs.k.prototype.Evaluate = Σ_7.addFunction(function αozfc() {
            var Σ_7_62 = new Σ.Scope(this, αozfc, '62', Σ_7, {}, []);
            Σ_7_62.refs.j = this.m_fixtureA.GetBody(), Σ_7_62.refs.o = this.m_fixtureB.GetBody();
            this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof Σ_7.refs.K ? this.m_fixtureA.GetShape() : null, Σ_7_62.refs.j.m_xf, this.m_fixtureB.GetShape() instanceof Σ_7.refs.G ? this.m_fixtureB.GetShape() : null, Σ_7_62.refs.o.m_xf);
        }, Σ_7);
        Σ_7.refs.k.prototype.b2CollidePolyAndEdge = Σ_7.addFunction(function αpqEc() {
            var Σ_7_63 = new Σ.Scope(this, αpqEc, '63', Σ_7, {}, []);
        }, Σ_7);
        Σ.refs.Box2D.inherit(Σ_7.refs.z, Σ.refs.Box2D.Dynamics.Contacts.b2Contact);
        Σ_7.refs.z.prototype.__super = Σ.refs.Box2D.Dynamics.Contacts.b2Contact.prototype;
        Σ_7.refs.z.b2PolygonContact = Σ_7.addFunction(function αuDak() {
            var Σ_7_64 = new Σ.Scope(this, αuDak, '64', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
        }, Σ_7);
        Σ_7.refs.z.Create = Σ_7.addFunction(function αeIGL() {
            var Σ_7_65 = new Σ.Scope(this, αeIGL, '65', Σ_7, {}, []);
            return new Σ_7.refs.z();
        }, Σ_7);
        Σ_7.refs.z.Destroy = Σ_7.addFunction(function α6cBk() {
            var Σ_7_66 = new Σ.Scope(this, α6cBk, '66', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.z.prototype.Reset = Σ_7.addFunction(function αpxF2(j, o) {
            var Σ_7_67 = new Σ.Scope(this, αpxF2, '67', Σ_7, {
                j: j,
                o: o
            }, []);
            this.__super.Reset.call(this, Σ_7_67.refs.j, Σ_7_67.refs.o);
        }, Σ_7);
        Σ_7.refs.z.prototype.Evaluate = Σ_7.addFunction(function αLbOs() {
            var Σ_7_68 = new Σ.Scope(this, αLbOs, '68', Σ_7, {}, []);
            Σ_7_68.refs.j = this.m_fixtureA.GetBody(), Σ_7_68.refs.o = this.m_fixtureB.GetBody();
            Σ_7.refs.S.CollidePolygons(this.m_manifold, this.m_fixtureA.GetShape() instanceof Σ_7.refs.K ? this.m_fixtureA.GetShape() : null, Σ_7_68.refs.j.m_xf, this.m_fixtureB.GetShape() instanceof Σ_7.refs.K ? this.m_fixtureB.GetShape() : null, Σ_7_68.refs.o.m_xf);
        }, Σ_7);
        Σ_7.refs.u.b2PositionSolverManifold = Σ_7.addFunction(function αZpou() {
            var Σ_7_69 = new Σ.Scope(this, αZpou, '69', Σ_7, {}, []);
        }, Σ_7);
        Σ_7.refs.u.prototype.b2PositionSolverManifold = Σ_7.addFunction(function αOKnD() {
            var Σ_7_70 = new Σ.Scope(this, αOKnD, '70', Σ_7, {}, []);
            this.m_normal = new Σ_7.refs.N();
            this.m_separations = new Σ.refs.Vector_a2j_Number(Σ_7.refs.O.b2_maxManifoldPoints);
            this.m_points = new Σ.refs.Vector(Σ_7.refs.O.b2_maxManifoldPoints);
            for (Σ_7_70.refs.j = 0; Σ_7_70.refs.j < Σ_7.refs.O.b2_maxManifoldPoints; Σ_7_70.refs.j++) {
                this.m_points[Σ_7_70.refs.j] = new Σ_7.refs.N();
            }
        }, Σ_7);
        Σ_7.refs.u.prototype.Initialize = Σ_7.addFunction(function αzRM7(j) {
            var Σ_7_71 = new Σ.Scope(this, αzRM7, '71', Σ_7, {
                j: j
            }, []);
            Σ_7.refs.O.b2Assert(Σ_7_71.refs.j.pointCount > 0);
            Σ_7_71.refs.o = 0, Σ_7_71.refs.q = 0, Σ_7_71.refs.n = 0, Σ_7_71.refs.a = undefined, Σ_7_71.refs.c = 0, Σ_7_71.refs.g = 0;
            switch (j.type) {
                case Z.e_circles:
                    a = j.bodyA.m_xf.R;
                    n = j.localPoint;
                    o = j.bodyA.m_xf.position.x + (a.col1.x * n.x + a.col2.x * n.y);
                    q = j.bodyA.m_xf.position.y + (a.col1.y * n.x + a.col2.y * n.y);
                    a = j.bodyB.m_xf.R;
                    n = j.points[0].localPoint;
                    c = j.bodyB.m_xf.position.x + (a.col1.x * n.x + a.col2.x * n.y);
                    a = j.bodyB.m_xf.position.y + (a.col1.y * n.x + a.col2.y * n.y);
                    n = c - o;
                    g = a - q;
                    var b = n * n + g * g;
                    if (b > Number.MIN_VALUE * Number.MIN_VALUE) {
                        b = Math.sqrt(b);
                        this.m_normal.x = n / b;
                        this.m_normal.y = g / b;
                    } else {
                        this.m_normal.x = 1;
                        this.m_normal.y = 0;
                    }
                    this.m_points[0].x = 0.5 * (o + c);
                    this.m_points[0].y = 0.5 * (q + a);
                    this.m_separations[0] = n * this.m_normal.x + g * this.m_normal.y - j.radius;
                    break;
                case Z.e_faceA:
                    a = j.bodyA.m_xf.R;
                    n = j.localPlaneNormal;
                    this.m_normal.x = a.col1.x * n.x + a.col2.x * n.y;
                    this.m_normal.y = a.col1.y * n.x + a.col2.y * n.y;
                    a = j.bodyA.m_xf.R;
                    n = j.localPoint;
                    c = j.bodyA.m_xf.position.x + (a.col1.x * n.x + a.col2.x * n.y);
                    g = j.bodyA.m_xf.position.y + (a.col1.y * n.x + a.col2.y * n.y);
                    a = j.bodyB.m_xf.R;
                    for (o = 0; o < j.pointCount; ++o) {
                        n = j.points[o].localPoint;
                        q = j.bodyB.m_xf.position.x + (a.col1.x * n.x + a.col2.x * n.y);
                        n = j.bodyB.m_xf.position.y + (a.col1.y * n.x + a.col2.y * n.y);
                        this.m_separations[o] = (q - c) * this.m_normal.x + (n - g) * this.m_normal.y - j.radius;
                        this.m_points[o].x = q;
                        this.m_points[o].y = n;
                    }
                    break;
                case Z.e_faceB:
                    a = j.bodyB.m_xf.R;
                    n = j.localPlaneNormal;
                    this.m_normal.x = a.col1.x * n.x + a.col2.x * n.y;
                    this.m_normal.y = a.col1.y * n.x + a.col2.y * n.y;
                    a = j.bodyB.m_xf.R;
                    n = j.localPoint;
                    c = j.bodyB.m_xf.position.x + (a.col1.x * n.x + a.col2.x * n.y);
                    g = j.bodyB.m_xf.position.y + (a.col1.y * n.x + a.col2.y * n.y);
                    a = j.bodyA.m_xf.R;
                    for (o = 0; o < j.pointCount; ++o) {
                        n = j.points[o].localPoint;
                        q = j.bodyA.m_xf.position.x + (a.col1.x * n.x + a.col2.x * n.y);
                        n = j.bodyA.m_xf.position.y + (a.col1.y * n.x + a.col2.y * n.y);
                        this.m_separations[o] = (q - c) * this.m_normal.x + (n - g) * this.m_normal.y - j.radius;
                        this.m_points[o].Set(q, n);
                    }
                    this.m_normal.x *= -1;
                    this.m_normal.y *= -1;
            }
        }, Σ_7);
        Σ.refs.Box2D.postDefs.push(Σ_7.addFunction(function α3eZw() {
            var Σ_7_72 = new Σ.Scope(this, α3eZw, '72', Σ_7, {}, []);
            Σ.refs.Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new Σ_7.refs.N();
            Σ.refs.Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new Σ_7.refs.N();
        }, Σ_7));
    }());
    (function αiQIM() {
        var Σ_8 = new Σ.Scope(this, αiQIM, '8', Σ, {}, []);
        Σ_8.refs.F = Σ.refs.Box2D.Common.Math.b2Mat22, Σ_8.refs.G = Σ.refs.Box2D.Common.Math.b2Math, Σ_8.refs.K = Σ.refs.Box2D.Common.Math.b2Vec2, Σ_8.refs.y = Σ.refs.Box2D.Common.b2Color, Σ_8.refs.w = Σ.refs.Box2D.Dynamics.Controllers.b2BuoyancyController, Σ_8.refs.A = Σ.refs.Box2D.Dynamics.Controllers.b2ConstantAccelController, Σ_8.refs.U = Σ.refs.Box2D.Dynamics.Controllers.b2ConstantForceController, Σ_8.refs.p = Σ.refs.Box2D.Dynamics.Controllers.b2Controller, Σ_8.refs.B = Σ.refs.Box2D.Dynamics.Controllers.b2ControllerEdge, Σ_8.refs.Q = Σ.refs.Box2D.Dynamics.Controllers.b2GravityController, Σ_8.refs.V = Σ.refs.Box2D.Dynamics.Controllers.b2TensorDampingController;
        Σ.refs.Box2D.inherit(Σ_8.refs.w, Σ.refs.Box2D.Dynamics.Controllers.b2Controller);
        Σ_8.refs.w.prototype.__super = Σ.refs.Box2D.Dynamics.Controllers.b2Controller.prototype;
        Σ_8.refs.w.b2BuoyancyController = Σ_8.addFunction(function αZLFz() {
            var Σ_8_0 = new Σ.Scope(this, αZLFz, '0', Σ_8, {}, []);
            Σ.refs.Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
            this.normal = new Σ_8.refs.K(0, -1);
            this.density = this.offset = 0;
            this.velocity = new Σ_8.refs.K(0, 0);
            this.linearDrag = 2;
            this.angularDrag = 1;
            this.useDensity = false;
            this.useWorldGravity = true;
            this.gravity = null;
        }, Σ_8);
        Σ_8.refs.w.prototype.Step = Σ_8.addFunction(function αnjg2() {
            var Σ_8_1 = new Σ.Scope(this, αnjg2, '1', Σ_8, {}, []);
            if (this.m_bodyList) {
                if (this.useWorldGravity) {
                    this.gravity = this.GetWorld().GetGravity().Copy();
                }
                for (Σ_8_1.refs.M = this.m_bodyList; Σ_8_1.refs.M; Σ_8_1.refs.M = Σ_8_1.refs.M.nextBody) {
                    Σ_8_1.refs.L = Σ_8_1.refs.M.body;
                    if (Σ_8_1.refs.L.IsAwake() != false) {
                        for (Σ_8_1.refs.I = new Σ_8.refs.K(), Σ_8_1.refs.W = new Σ_8.refs.K(), Σ_8_1.refs.Y = 0, Σ_8_1.refs.k = 0, Σ_8_1.refs.z = Σ_8_1.refs.L.GetFixtureList(); Σ_8_1.refs.z; Σ_8_1.refs.z = Σ_8_1.refs.z.GetNext()) {
                            Σ_8_1.refs.u = new Σ_8.refs.K(), Σ_8_1.refs.D = Σ_8_1.refs.z.GetShape().ComputeSubmergedArea(this.normal, this.offset, Σ_8_1.refs.L.GetTransform(), Σ_8_1.refs.u);
                            Σ_8_1.refs.Y += Σ_8_1.refs.D;
                            Σ_8_1.refs.I.x += Σ_8_1.refs.D * Σ_8_1.refs.u.x;
                            Σ_8_1.refs.I.y += Σ_8_1.refs.D * Σ_8_1.refs.u.y;
                            Σ_8_1.refs.H = 0;
                            Σ_8_1.refs.H = 1;
                            Σ_8_1.refs.k += Σ_8_1.refs.D * Σ_8_1.refs.H;
                            Σ_8_1.refs.W.x += Σ_8_1.refs.D * Σ_8_1.refs.u.x * Σ_8_1.refs.H;
                            Σ_8_1.refs.W.y += Σ_8_1.refs.D * Σ_8_1.refs.u.y * Σ_8_1.refs.H;
                        }
                        Σ_8_1.refs.I.x /= Σ_8_1.refs.Y;
                        Σ_8_1.refs.I.y /= Σ_8_1.refs.Y;
                        Σ_8_1.refs.W.x /= Σ_8_1.refs.k;
                        Σ_8_1.refs.W.y /= Σ_8_1.refs.k;
                        if (!(Σ_8_1.refs.Y < Number.MIN_VALUE)) {
                            Σ_8_1.refs.k = this.gravity.GetNegative();
                            Σ_8_1.refs.k.Multiply(this.density * Σ_8_1.refs.Y);
                            Σ_8_1.refs.L.ApplyForce(Σ_8_1.refs.k, Σ_8_1.refs.W);
                            Σ_8_1.refs.W = Σ_8_1.refs.L.GetLinearVelocityFromWorldPoint(Σ_8_1.refs.I);
                            Σ_8_1.refs.W.Subtract(this.velocity);
                            Σ_8_1.refs.W.Multiply(-this.linearDrag * Σ_8_1.refs.Y);
                            Σ_8_1.refs.L.ApplyForce(Σ_8_1.refs.W, Σ_8_1.refs.I);
                            Σ_8_1.refs.L.ApplyTorque(-Σ_8_1.refs.L.GetInertia() / Σ_8_1.refs.L.GetMass() * Σ_8_1.refs.Y * Σ_8_1.refs.L.GetAngularVelocity() * this.angularDrag);
                        }
                    }
                }
            }
        }, Σ_8);
        Σ_8.refs.w.prototype.Draw = Σ_8.addFunction(function αQ4Ap(M) {
            var Σ_8_2 = new Σ.Scope(this, αQ4Ap, '2', Σ_8, {
                M: M
            }, []);
            Σ_8_2.refs.L = new Σ_8.refs.K(), Σ_8_2.refs.I = new Σ_8.refs.K();
            Σ_8_2.refs.L.x = this.normal.x * this.offset + this.normal.y * 1000;
            Σ_8_2.refs.L.y = this.normal.y * this.offset - this.normal.x * 1000;
            Σ_8_2.refs.I.x = this.normal.x * this.offset - this.normal.y * 1000;
            Σ_8_2.refs.I.y = this.normal.y * this.offset + this.normal.x * 1000;
            Σ_8_2.refs.W = new Σ_8.refs.y(0, 0, 1);
            Σ_8_2.refs.M.DrawSegment(Σ_8_2.refs.L, Σ_8_2.refs.I, Σ_8_2.refs.W);
        }, Σ_8);
        Σ.refs.Box2D.inherit(Σ_8.refs.A, Σ.refs.Box2D.Dynamics.Controllers.b2Controller);
        Σ_8.refs.A.prototype.__super = Σ.refs.Box2D.Dynamics.Controllers.b2Controller.prototype;
        Σ_8.refs.A.b2ConstantAccelController = Σ_8.addFunction(function αb90Z() {
            var Σ_8_3 = new Σ.Scope(this, αb90Z, '3', Σ_8, {}, []);
            Σ.refs.Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
            this.A = new Σ_8.refs.K(0, 0);
        }, Σ_8);
        Σ_8.refs.A.prototype.Step = Σ_8.addFunction(function αO14G(M) {
            var Σ_8_4 = new Σ.Scope(this, αO14G, '4', Σ_8, {
                M: M
            }, []);
            Σ_8_4.refs.M = new Σ_8.refs.K(this.A.x * Σ_8_4.refs.M.dt, this.A.y * Σ_8_4.refs.M.dt);
            for (Σ_8_4.refs.L = this.m_bodyList; Σ_8_4.refs.L; Σ_8_4.refs.L = Σ_8_4.refs.L.nextBody) {
                Σ_8_4.refs.I = Σ_8_4.refs.L.body;
                Σ_8_4.refs.I.IsAwake() && Σ_8_4.refs.I.SetLinearVelocity(new Σ_8.refs.K(Σ_8_4.refs.I.GetLinearVelocity().x + Σ_8_4.refs.M.x, Σ_8_4.refs.I.GetLinearVelocity().y + Σ_8_4.refs.M.y));
            }
        }, Σ_8);
        Σ.refs.Box2D.inherit(Σ_8.refs.U, Σ.refs.Box2D.Dynamics.Controllers.b2Controller);
        Σ_8.refs.U.prototype.__super = Σ.refs.Box2D.Dynamics.Controllers.b2Controller.prototype;
        Σ_8.refs.U.b2ConstantForceController = Σ_8.addFunction(function αlR92() {
            var Σ_8_5 = new Σ.Scope(this, αlR92, '5', Σ_8, {}, []);
            Σ.refs.Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
            this.F = new Σ_8.refs.K(0, 0);
        }, Σ_8);
        Σ_8.refs.U.prototype.Step = Σ_8.addFunction(function αOOPd() {
            var Σ_8_6 = new Σ.Scope(this, αOOPd, '6', Σ_8, {}, []);
            for (Σ_8_6.refs.M = this.m_bodyList; Σ_8_6.refs.M; Σ_8_6.refs.M = Σ_8_6.refs.M.nextBody) {
                Σ_8_6.refs.L = Σ_8_6.refs.M.body;
                Σ_8_6.refs.L.IsAwake() && Σ_8_6.refs.L.ApplyForce(this.F, Σ_8_6.refs.L.GetWorldCenter());
            }
        }, Σ_8);
        Σ_8.refs.p.b2Controller = Σ_8.addFunction(function αIM3G() {
            var Σ_8_7 = new Σ.Scope(this, αIM3G, '7', Σ_8, {}, []);
        }, Σ_8);
        Σ_8.refs.p.prototype.Step = Σ_8.addFunction(function αbEj4() {
            var Σ_8_8 = new Σ.Scope(this, αbEj4, '8', Σ_8, {}, []);
        }, Σ_8);
        Σ_8.refs.p.prototype.Draw = Σ_8.addFunction(function αFQ8U() {
            var Σ_8_9 = new Σ.Scope(this, αFQ8U, '9', Σ_8, {}, []);
        }, Σ_8);
        Σ_8.refs.p.prototype.AddBody = Σ_8.addFunction(function αTsEf(M) {
            var Σ_8_10 = new Σ.Scope(this, αTsEf, '10', Σ_8, {
                M: M
            }, []);
            Σ_8_10.refs.L = new Σ_8.refs.B();
            Σ_8_10.refs.L.controller = this;
            Σ_8_10.refs.L.body = Σ_8_10.refs.M;
            Σ_8_10.refs.L.nextBody = this.m_bodyList;
            Σ_8_10.refs.L.prevBody = null;
            this.m_bodyList = Σ_8_10.refs.L;
            if (Σ_8_10.refs.L.nextBody) {
                Σ_8_10.refs.L.nextBody.prevBody = Σ_8_10.refs.L;
            }
            this.m_bodyCount++;
            Σ_8_10.refs.L.nextController = Σ_8_10.refs.M.m_controllerList;
            Σ_8_10.refs.L.prevController = null;
            Σ_8_10.refs.M.m_controllerList = Σ_8_10.refs.L;
            if (Σ_8_10.refs.L.nextController) {
                Σ_8_10.refs.L.nextController.prevController = Σ_8_10.refs.L;
            }
            Σ_8_10.refs.M.m_controllerCount++;
        }, Σ_8);
        Σ_8.refs.p.prototype.RemoveBody = Σ_8.addFunction(function αyJ88(M) {
            var Σ_8_11 = new Σ.Scope(this, αyJ88, '11', Σ_8, {
                M: M
            }, []);
            for (Σ_8_11.refs.L = Σ_8_11.refs.M.m_controllerList; Σ_8_11.refs.L && Σ_8_11.refs.L.controller != this;) {
                Σ_8_11.refs.L = Σ_8_11.refs.L.nextController;
            }
            if (Σ_8_11.refs.L.prevBody) {
                Σ_8_11.refs.L.prevBody.nextBody = Σ_8_11.refs.L.nextBody;
            }
            if (Σ_8_11.refs.L.nextBody) {
                Σ_8_11.refs.L.nextBody.prevBody = Σ_8_11.refs.L.prevBody;
            }
            if (Σ_8_11.refs.L.nextController) {
                Σ_8_11.refs.L.nextController.prevController = Σ_8_11.refs.L.prevController;
            }
            if (Σ_8_11.refs.L.prevController) {
                Σ_8_11.refs.L.prevController.nextController = Σ_8_11.refs.L.nextController;
            }
            if (this.m_bodyList == Σ_8_11.refs.L) {
                this.m_bodyList = Σ_8_11.refs.L.nextBody;
            }
            if (Σ_8_11.refs.M.m_controllerList == Σ_8_11.refs.L) {
                Σ_8_11.refs.M.m_controllerList = Σ_8_11.refs.L.nextController;
            }
            Σ_8_11.refs.M.m_controllerCount--;
            this.m_bodyCount--;
        }, Σ_8);
        Σ_8.refs.p.prototype.Clear = Σ_8.addFunction(function αT8Yy() {
            var Σ_8_12 = new Σ.Scope(this, αT8Yy, '12', Σ_8, {}, []);
            for (; this.m_bodyList;) {
                this.RemoveBody(this.m_bodyList.body);
            }
        }, Σ_8);
        Σ_8.refs.p.prototype.GetNext = Σ_8.addFunction(function αCe8X() {
            var Σ_8_13 = new Σ.Scope(this, αCe8X, '13', Σ_8, {}, []);
            return this.m_next;
        }, Σ_8);
        Σ_8.refs.p.prototype.GetWorld = Σ_8.addFunction(function αZlUd() {
            var Σ_8_14 = new Σ.Scope(this, αZlUd, '14', Σ_8, {}, []);
            return this.m_world;
        }, Σ_8);
        Σ_8.refs.p.prototype.GetBodyList = Σ_8.addFunction(function αjRM6() {
            var Σ_8_15 = new Σ.Scope(this, αjRM6, '15', Σ_8, {}, []);
            return this.m_bodyList;
        }, Σ_8);
        Σ_8.refs.B.b2ControllerEdge = Σ_8.addFunction(function α2inj() {
            var Σ_8_16 = new Σ.Scope(this, α2inj, '16', Σ_8, {}, []);
        }, Σ_8);
        Σ.refs.Box2D.inherit(Σ_8.refs.Q, Σ.refs.Box2D.Dynamics.Controllers.b2Controller);
        Σ_8.refs.Q.prototype.__super = Σ.refs.Box2D.Dynamics.Controllers.b2Controller.prototype;
        Σ_8.refs.Q.b2GravityController = Σ_8.addFunction(function αkZzi() {
            var Σ_8_17 = new Σ.Scope(this, αkZzi, '17', Σ_8, {}, []);
            Σ.refs.Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
            this.G = 1;
            this.invSqr = true;
        }, Σ_8);
        Σ_8.refs.Q.prototype.Step = Σ_8.addFunction(function αSQFc() {
            var Σ_8_18 = new Σ.Scope(this, αSQFc, '18', Σ_8, {}, []);
            Σ_8_18.refs.M = null, Σ_8_18.refs.L = null, Σ_8_18.refs.I = null, Σ_8_18.refs.W = 0, Σ_8_18.refs.Y = null, Σ_8_18.refs.k = null, Σ_8_18.refs.z = null, Σ_8_18.refs.u = 0, Σ_8_18.refs.D = 0, Σ_8_18.refs.H = 0;
            Σ_8_18.refs.u = null;
            if (this.invSqr) {
                for (Σ_8_18.refs.M = this.m_bodyList; Σ_8_18.refs.M; Σ_8_18.refs.M = Σ_8_18.refs.M.nextBody) {
                    Σ_8_18.refs.L = Σ_8_18.refs.M.body;
                    Σ_8_18.refs.I = Σ_8_18.refs.L.GetWorldCenter();
                    Σ_8_18.refs.W = Σ_8_18.refs.L.GetMass();
                    for (Σ_8_18.refs.Y = this.m_bodyList; Σ_8_18.refs.Y != Σ_8_18.refs.M; Σ_8_18.refs.Y = Σ_8_18.refs.Y.nextBody) {
                        Σ_8_18.refs.k = Σ_8_18.refs.Y.body;
                        Σ_8_18.refs.z = Σ_8_18.refs.k.GetWorldCenter();
                        Σ_8_18.refs.u = Σ_8_18.refs.z.x - Σ_8_18.refs.I.x;
                        Σ_8_18.refs.D = Σ_8_18.refs.z.y - Σ_8_18.refs.I.y;
                        Σ_8_18.refs.H = Σ_8_18.refs.u * Σ_8_18.refs.u + Σ_8_18.refs.D * Σ_8_18.refs.D;
                        if (!(Σ_8_18.refs.H < Number.MIN_VALUE)) {
                            Σ_8_18.refs.u = new Σ_8.refs.K(Σ_8_18.refs.u, Σ_8_18.refs.D);
                            Σ_8_18.refs.u.Multiply(this.G / Σ_8_18.refs.H / Math.sqrt(Σ_8_18.refs.H) * Σ_8_18.refs.W * Σ_8_18.refs.k.GetMass());
                            Σ_8_18.refs.L.IsAwake() && Σ_8_18.refs.L.ApplyForce(Σ_8_18.refs.u, Σ_8_18.refs.I);
                            Σ_8_18.refs.u.Multiply(-1);
                            Σ_8_18.refs.k.IsAwake() && Σ_8_18.refs.k.ApplyForce(Σ_8_18.refs.u, Σ_8_18.refs.z);
                        }
                    }
                }
            } else {
                for (Σ_8_18.refs.M = this.m_bodyList; Σ_8_18.refs.M; Σ_8_18.refs.M = Σ_8_18.refs.M.nextBody) {
                    Σ_8_18.refs.L = Σ_8_18.refs.M.body;
                    Σ_8_18.refs.I = Σ_8_18.refs.L.GetWorldCenter();
                    Σ_8_18.refs.W = Σ_8_18.refs.L.GetMass();
                    for (Σ_8_18.refs.Y = this.m_bodyList; Σ_8_18.refs.Y != Σ_8_18.refs.M; Σ_8_18.refs.Y = Σ_8_18.refs.Y.nextBody) {
                        Σ_8_18.refs.k = Σ_8_18.refs.Y.body;
                        Σ_8_18.refs.z = Σ_8_18.refs.k.GetWorldCenter();
                        Σ_8_18.refs.u = Σ_8_18.refs.z.x - Σ_8_18.refs.I.x;
                        Σ_8_18.refs.D = Σ_8_18.refs.z.y - Σ_8_18.refs.I.y;
                        Σ_8_18.refs.H = Σ_8_18.refs.u * Σ_8_18.refs.u + Σ_8_18.refs.D * Σ_8_18.refs.D;
                        if (!(Σ_8_18.refs.H < Number.MIN_VALUE)) {
                            Σ_8_18.refs.u = new Σ_8.refs.K(Σ_8_18.refs.u, Σ_8_18.refs.D);
                            Σ_8_18.refs.u.Multiply(this.G / Σ_8_18.refs.H * Σ_8_18.refs.W * Σ_8_18.refs.k.GetMass());
                            Σ_8_18.refs.L.IsAwake() && Σ_8_18.refs.L.ApplyForce(Σ_8_18.refs.u, Σ_8_18.refs.I);
                            Σ_8_18.refs.u.Multiply(-1);
                            Σ_8_18.refs.k.IsAwake() && Σ_8_18.refs.k.ApplyForce(Σ_8_18.refs.u, Σ_8_18.refs.z);
                        }
                    }
                }
            }
        }, Σ_8);
        Σ.refs.Box2D.inherit(Σ_8.refs.V, Σ.refs.Box2D.Dynamics.Controllers.b2Controller);
        Σ_8.refs.V.prototype.__super = Σ.refs.Box2D.Dynamics.Controllers.b2Controller.prototype;
        Σ_8.refs.V.b2TensorDampingController = Σ_8.addFunction(function αIbtb() {
            var Σ_8_19 = new Σ.Scope(this, αIbtb, '19', Σ_8, {}, []);
            Σ.refs.Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
            this.T = new Σ_8.refs.F();
            this.maxTimestep = 0;
        }, Σ_8);
        Σ_8.refs.V.prototype.SetAxisAligned = Σ_8.addFunction(function αfDVC(M, L) {
            var Σ_8_20 = new Σ.Scope(this, αfDVC, '20', Σ_8, {
                M: M,
                L: L
            }, []);
            if (Σ_8_20.refs.M === undefined) {
                Σ_8_20.refs.M = 0;
            }
            if (Σ_8_20.refs.L === undefined) {
                Σ_8_20.refs.L = 0;
            }
            this.T.col1.x = -Σ_8_20.refs.M;
            this.T.col1.y = 0;
            this.T.col2.x = 0;
            this.T.col2.y = -Σ_8_20.refs.L;
            this.maxTimestep = Σ_8_20.refs.M > 0 || Σ_8_20.refs.L > 0 ? 1 / Math.max(Σ_8_20.refs.M, Σ_8_20.refs.L) : 0;
        }, Σ_8);
        Σ_8.refs.V.prototype.Step = Σ_8.addFunction(function αLy1O(M) {
            var Σ_8_21 = new Σ.Scope(this, αLy1O, '21', Σ_8, {
                M: M
            }, []);
            Σ_8_21.refs.M = Σ_8_21.refs.M.dt;
            if (!(Σ_8_21.refs.M <= Number.MIN_VALUE)) {
                if (Σ_8_21.refs.M > this.maxTimestep && this.maxTimestep > 0) {
                    Σ_8_21.refs.M = this.maxTimestep;
                }
                for (Σ_8_21.refs.L = this.m_bodyList; Σ_8_21.refs.L; Σ_8_21.refs.L = Σ_8_21.refs.L.nextBody) {
                    Σ_8_21.refs.I = Σ_8_21.refs.L.body;
                    if (Σ_8_21.refs.I.IsAwake()) {
                        Σ_8_21.refs.W = Σ_8_21.refs.I.GetWorldVector(Σ_8.refs.G.MulMV(this.T, Σ_8_21.refs.I.GetLocalVector(Σ_8_21.refs.I.GetLinearVelocity())));
                        Σ_8_21.refs.I.SetLinearVelocity(new Σ_8.refs.K(Σ_8_21.refs.I.GetLinearVelocity().x + Σ_8_21.refs.W.x * Σ_8_21.refs.M, Σ_8_21.refs.I.GetLinearVelocity().y + Σ_8_21.refs.W.y * Σ_8_21.refs.M));
                    }
                }
            }
        }, Σ_8);
    }());
    (function αxJgi() {
        var Σ_9 = new Σ.Scope(this, αxJgi, '9', Σ, {}, []);
        Σ_9.refs.F = Σ.refs.Box2D.Common.b2Settings, Σ_9.refs.G = Σ.refs.Box2D.Common.Math.b2Mat22, Σ_9.refs.K = Σ.refs.Box2D.Common.Math.b2Mat33, Σ_9.refs.y = Σ.refs.Box2D.Common.Math.b2Math, Σ_9.refs.w = Σ.refs.Box2D.Common.Math.b2Vec2, Σ_9.refs.A = Σ.refs.Box2D.Common.Math.b2Vec3, Σ_9.refs.U = Σ.refs.Box2D.Dynamics.Joints.b2DistanceJoint, Σ_9.refs.p = Σ.refs.Box2D.Dynamics.Joints.b2DistanceJointDef, Σ_9.refs.B = Σ.refs.Box2D.Dynamics.Joints.b2FrictionJoint, Σ_9.refs.Q = Σ.refs.Box2D.Dynamics.Joints.b2FrictionJointDef, Σ_9.refs.V = Σ.refs.Box2D.Dynamics.Joints.b2GearJoint, Σ_9.refs.M = Σ.refs.Box2D.Dynamics.Joints.b2GearJointDef, Σ_9.refs.L = Σ.refs.Box2D.Dynamics.Joints.b2Jacobian, Σ_9.refs.I = Σ.refs.Box2D.Dynamics.Joints.b2Joint, Σ_9.refs.W = Σ.refs.Box2D.Dynamics.Joints.b2JointDef, Σ_9.refs.Y = Σ.refs.Box2D.Dynamics.Joints.b2JointEdge, Σ_9.refs.k = Σ.refs.Box2D.Dynamics.Joints.b2LineJoint, Σ_9.refs.z = Σ.refs.Box2D.Dynamics.Joints.b2LineJointDef, Σ_9.refs.u = Σ.refs.Box2D.Dynamics.Joints.b2MouseJoint, Σ_9.refs.D = Σ.refs.Box2D.Dynamics.Joints.b2MouseJointDef, Σ_9.refs.H = Σ.refs.Box2D.Dynamics.Joints.b2PrismaticJoint, Σ_9.refs.O = Σ.refs.Box2D.Dynamics.Joints.b2PrismaticJointDef, Σ_9.refs.E = Σ.refs.Box2D.Dynamics.Joints.b2PulleyJoint, Σ_9.refs.R = Σ.refs.Box2D.Dynamics.Joints.b2PulleyJointDef, Σ_9.refs.N = Σ.refs.Box2D.Dynamics.Joints.b2RevoluteJoint, Σ_9.refs.S = Σ.refs.Box2D.Dynamics.Joints.b2RevoluteJointDef, Σ_9.refs.aa = Σ.refs.Box2D.Dynamics.Joints.b2WeldJoint, Σ_9.refs.Z = Σ.refs.Box2D.Dynamics.Joints.b2WeldJointDef;
        Σ.refs.Box2D.inherit(Σ_9.refs.U, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.U.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.U.b2DistanceJoint = Σ_9.addFunction(function αc750() {
            var Σ_9_0 = new Σ.Scope(this, αc750, '0', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.m_localAnchor1 = new Σ_9.refs.w();
            this.m_localAnchor2 = new Σ_9.refs.w();
            this.m_u = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.U.prototype.GetAnchorA = Σ_9.addFunction(function αGhyV() {
            var Σ_9_1 = new Σ.Scope(this, αGhyV, '1', Σ_9, {}, []);
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
        }, Σ_9);
        Σ_9.refs.U.prototype.GetAnchorB = Σ_9.addFunction(function αaVcm() {
            var Σ_9_2 = new Σ.Scope(this, αaVcm, '2', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
        }, Σ_9);
        Σ_9.refs.U.prototype.GetReactionForce = Σ_9.addFunction(function α2MLv(d) {
            var Σ_9_3 = new Σ.Scope(this, α2MLv, '3', Σ_9, {
                d: d
            }, []);
            if (Σ_9_3.refs.d === undefined) {
                Σ_9_3.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_3.refs.d * this.m_impulse * this.m_u.x, Σ_9_3.refs.d * this.m_impulse * this.m_u.y);
        }, Σ_9);
        Σ_9.refs.U.prototype.GetReactionTorque = Σ_9.addFunction(function αcoBD() {
            var Σ_9_4 = new Σ.Scope(this, αcoBD, '4', Σ_9, {}, []);
            return 0;
        }, Σ_9);
        Σ_9.refs.U.prototype.GetLength = Σ_9.addFunction(function αYhJU() {
            var Σ_9_5 = new Σ.Scope(this, αYhJU, '5', Σ_9, {}, []);
            return this.m_length;
        }, Σ_9);
        Σ_9.refs.U.prototype.SetLength = Σ_9.addFunction(function α6NH7(d) {
            var Σ_9_6 = new Σ.Scope(this, α6NH7, '6', Σ_9, {
                d: d
            }, []);
            if (Σ_9_6.refs.d === undefined) {
                Σ_9_6.refs.d = 0;
            }
            this.m_length = Σ_9_6.refs.d;
        }, Σ_9);
        Σ_9.refs.U.prototype.GetFrequency = Σ_9.addFunction(function αH29Q() {
            var Σ_9_7 = new Σ.Scope(this, αH29Q, '7', Σ_9, {}, []);
            return this.m_frequencyHz;
        }, Σ_9);
        Σ_9.refs.U.prototype.SetFrequency = Σ_9.addFunction(function α67Oh(d) {
            var Σ_9_8 = new Σ.Scope(this, α67Oh, '8', Σ_9, {
                d: d
            }, []);
            if (Σ_9_8.refs.d === undefined) {
                Σ_9_8.refs.d = 0;
            }
            this.m_frequencyHz = Σ_9_8.refs.d;
        }, Σ_9);
        Σ_9.refs.U.prototype.GetDampingRatio = Σ_9.addFunction(function αliRL() {
            var Σ_9_9 = new Σ.Scope(this, αliRL, '9', Σ_9, {}, []);
            return this.m_dampingRatio;
        }, Σ_9);
        Σ_9.refs.U.prototype.SetDampingRatio = Σ_9.addFunction(function αNNna(d) {
            var Σ_9_10 = new Σ.Scope(this, αNNna, '10', Σ_9, {
                d: d
            }, []);
            if (Σ_9_10.refs.d === undefined) {
                Σ_9_10.refs.d = 0;
            }
            this.m_dampingRatio = Σ_9_10.refs.d;
        }, Σ_9);
        Σ_9.refs.U.prototype.b2DistanceJoint = Σ_9.addFunction(function α2cs1(d) {
            var Σ_9_11 = new Σ.Scope(this, α2cs1, '11', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_11.refs.d);
            this.m_localAnchor1.SetV(Σ_9_11.refs.d.localAnchorA);
            this.m_localAnchor2.SetV(Σ_9_11.refs.d.localAnchorB);
            this.m_length = Σ_9_11.refs.d.length;
            this.m_frequencyHz = Σ_9_11.refs.d.frequencyHz;
            this.m_dampingRatio = Σ_9_11.refs.d.dampingRatio;
            this.m_bias = this.m_gamma = this.m_impulse = 0;
        }, Σ_9);
        Σ_9.refs.U.prototype.InitVelocityConstraints = Σ_9.addFunction(function αRWBN(d) {
            var Σ_9_12 = new Σ.Scope(this, αRWBN, '12', Σ_9, {
                d: d
            }, []);
            Σ_9_12.refs.h = undefined, Σ_9_12.refs.l = 0, Σ_9_12.refs.j = this.m_bodyA, Σ_9_12.refs.o = this.m_bodyB;
            Σ_9_12.refs.h = Σ_9_12.refs.j.m_xf.R;
            Σ_9_12.refs.q = this.m_localAnchor1.x - Σ_9_12.refs.j.m_sweep.localCenter.x, Σ_9_12.refs.n = this.m_localAnchor1.y - Σ_9_12.refs.j.m_sweep.localCenter.y;
            Σ_9_12.refs.l = Σ_9_12.refs.h.col1.x * Σ_9_12.refs.q + Σ_9_12.refs.h.col2.x * Σ_9_12.refs.n;
            Σ_9_12.refs.n = Σ_9_12.refs.h.col1.y * Σ_9_12.refs.q + Σ_9_12.refs.h.col2.y * Σ_9_12.refs.n;
            Σ_9_12.refs.q = Σ_9_12.refs.l;
            Σ_9_12.refs.h = Σ_9_12.refs.o.m_xf.R;
            Σ_9_12.refs.a = this.m_localAnchor2.x - Σ_9_12.refs.o.m_sweep.localCenter.x, Σ_9_12.refs.c = this.m_localAnchor2.y - Σ_9_12.refs.o.m_sweep.localCenter.y;
            Σ_9_12.refs.l = Σ_9_12.refs.h.col1.x * Σ_9_12.refs.a + Σ_9_12.refs.h.col2.x * Σ_9_12.refs.c;
            Σ_9_12.refs.c = Σ_9_12.refs.h.col1.y * Σ_9_12.refs.a + Σ_9_12.refs.h.col2.y * Σ_9_12.refs.c;
            Σ_9_12.refs.a = Σ_9_12.refs.l;
            this.m_u.x = Σ_9_12.refs.o.m_sweep.c.x + Σ_9_12.refs.a - Σ_9_12.refs.j.m_sweep.c.x - Σ_9_12.refs.q;
            this.m_u.y = Σ_9_12.refs.o.m_sweep.c.y + Σ_9_12.refs.c - Σ_9_12.refs.j.m_sweep.c.y - Σ_9_12.refs.n;
            Σ_9_12.refs.l = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
            Σ_9_12.refs.l > Σ_9.refs.F.b2_linearSlop ? this.m_u.Multiply(1 / Σ_9_12.refs.l) : this.m_u.SetZero();
            Σ_9_12.refs.h = Σ_9_12.refs.q * this.m_u.y - Σ_9_12.refs.n * this.m_u.x;
            Σ_9_12.refs.g = Σ_9_12.refs.a * this.m_u.y - Σ_9_12.refs.c * this.m_u.x;
            Σ_9_12.refs.h = Σ_9_12.refs.j.m_invMass + Σ_9_12.refs.j.m_invI * Σ_9_12.refs.h * Σ_9_12.refs.h + Σ_9_12.refs.o.m_invMass + Σ_9_12.refs.o.m_invI * Σ_9_12.refs.g * Σ_9_12.refs.g;
            this.m_mass = Σ_9_12.refs.h != 0 ? 1 / Σ_9_12.refs.h : 0;
            if (this.m_frequencyHz > 0) {
                Σ_9_12.refs.l = Σ_9_12.refs.l - this.m_length;
                Σ_9_12.refs.g = 2 * Math.PI * this.m_frequencyHz;
                Σ_9_12.refs.b = this.m_mass * Σ_9_12.refs.g * Σ_9_12.refs.g;
                this.m_gamma = Σ_9_12.refs.d.dt * (2 * this.m_mass * this.m_dampingRatio * Σ_9_12.refs.g + Σ_9_12.refs.d.dt * Σ_9_12.refs.b);
                this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
                this.m_bias = Σ_9_12.refs.l * Σ_9_12.refs.d.dt * Σ_9_12.refs.b * this.m_gamma;
                this.m_mass = Σ_9_12.refs.h + this.m_gamma;
                this.m_mass = this.m_mass != 0 ? 1 / this.m_mass : 0;
            }
            if (Σ_9_12.refs.d.warmStarting) {
                this.m_impulse *= Σ_9_12.refs.d.dtRatio;
                Σ_9_12.refs.d = this.m_impulse * this.m_u.x;
                Σ_9_12.refs.h = this.m_impulse * this.m_u.y;
                Σ_9_12.refs.j.m_linearVelocity.x -= Σ_9_12.refs.j.m_invMass * Σ_9_12.refs.d;
                Σ_9_12.refs.j.m_linearVelocity.y -= Σ_9_12.refs.j.m_invMass * Σ_9_12.refs.h;
                Σ_9_12.refs.j.m_angularVelocity -= Σ_9_12.refs.j.m_invI * (Σ_9_12.refs.q * Σ_9_12.refs.h - Σ_9_12.refs.n * Σ_9_12.refs.d);
                Σ_9_12.refs.o.m_linearVelocity.x += Σ_9_12.refs.o.m_invMass * Σ_9_12.refs.d;
                Σ_9_12.refs.o.m_linearVelocity.y += Σ_9_12.refs.o.m_invMass * Σ_9_12.refs.h;
                Σ_9_12.refs.o.m_angularVelocity += Σ_9_12.refs.o.m_invI * (Σ_9_12.refs.a * Σ_9_12.refs.h - Σ_9_12.refs.c * Σ_9_12.refs.d);
            } else {
                this.m_impulse = 0;
            }
        }, Σ_9);
        Σ_9.refs.U.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αIv0h() {
            var Σ_9_13 = new Σ.Scope(this, αIv0h, '13', Σ_9, {}, []);
            Σ_9_13.refs.d = undefined, Σ_9_13.refs.h = this.m_bodyA, Σ_9_13.refs.l = this.m_bodyB;
            Σ_9_13.refs.d = Σ_9_13.refs.h.m_xf.R;
            Σ_9_13.refs.j = this.m_localAnchor1.x - Σ_9_13.refs.h.m_sweep.localCenter.x, Σ_9_13.refs.o = this.m_localAnchor1.y - Σ_9_13.refs.h.m_sweep.localCenter.y, Σ_9_13.refs.q = Σ_9_13.refs.d.col1.x * Σ_9_13.refs.j + Σ_9_13.refs.d.col2.x * Σ_9_13.refs.o;
            Σ_9_13.refs.o = Σ_9_13.refs.d.col1.y * Σ_9_13.refs.j + Σ_9_13.refs.d.col2.y * Σ_9_13.refs.o;
            Σ_9_13.refs.j = Σ_9_13.refs.q;
            Σ_9_13.refs.d = Σ_9_13.refs.l.m_xf.R;
            Σ_9_13.refs.n = this.m_localAnchor2.x - Σ_9_13.refs.l.m_sweep.localCenter.x, Σ_9_13.refs.a = this.m_localAnchor2.y - Σ_9_13.refs.l.m_sweep.localCenter.y;
            Σ_9_13.refs.q = Σ_9_13.refs.d.col1.x * Σ_9_13.refs.n + Σ_9_13.refs.d.col2.x * Σ_9_13.refs.a;
            Σ_9_13.refs.a = Σ_9_13.refs.d.col1.y * Σ_9_13.refs.n + Σ_9_13.refs.d.col2.y * Σ_9_13.refs.a;
            Σ_9_13.refs.n = Σ_9_13.refs.q;
            Σ_9_13.refs.q = -this.m_mass * (this.m_u.x * (Σ_9_13.refs.l.m_linearVelocity.x + -Σ_9_13.refs.l.m_angularVelocity * Σ_9_13.refs.a - (Σ_9_13.refs.h.m_linearVelocity.x + -Σ_9_13.refs.h.m_angularVelocity * Σ_9_13.refs.o)) + this.m_u.y * (Σ_9_13.refs.l.m_linearVelocity.y + Σ_9_13.refs.l.m_angularVelocity * Σ_9_13.refs.n - (Σ_9_13.refs.h.m_linearVelocity.y + Σ_9_13.refs.h.m_angularVelocity * Σ_9_13.refs.j)) + this.m_bias + this.m_gamma * this.m_impulse);
            this.m_impulse += Σ_9_13.refs.q;
            Σ_9_13.refs.d = Σ_9_13.refs.q * this.m_u.x;
            Σ_9_13.refs.q = Σ_9_13.refs.q * this.m_u.y;
            Σ_9_13.refs.h.m_linearVelocity.x -= Σ_9_13.refs.h.m_invMass * Σ_9_13.refs.d;
            Σ_9_13.refs.h.m_linearVelocity.y -= Σ_9_13.refs.h.m_invMass * Σ_9_13.refs.q;
            Σ_9_13.refs.h.m_angularVelocity -= Σ_9_13.refs.h.m_invI * (Σ_9_13.refs.j * Σ_9_13.refs.q - Σ_9_13.refs.o * Σ_9_13.refs.d);
            Σ_9_13.refs.l.m_linearVelocity.x += Σ_9_13.refs.l.m_invMass * Σ_9_13.refs.d;
            Σ_9_13.refs.l.m_linearVelocity.y += Σ_9_13.refs.l.m_invMass * Σ_9_13.refs.q;
            Σ_9_13.refs.l.m_angularVelocity += Σ_9_13.refs.l.m_invI * (Σ_9_13.refs.n * Σ_9_13.refs.q - Σ_9_13.refs.a * Σ_9_13.refs.d);
        }, Σ_9);
        Σ_9.refs.U.prototype.SolvePositionConstraints = Σ_9.addFunction(function αg4OA() {
            var Σ_9_14 = new Σ.Scope(this, αg4OA, '14', Σ_9, {}, []);
            Σ_9_14.refs.d = undefined;
            if (this.m_frequencyHz > 0) {
                return true;
            }
            Σ_9_14.refs.h = this.m_bodyA, Σ_9_14.refs.l = this.m_bodyB;
            Σ_9_14.refs.d = Σ_9_14.refs.h.m_xf.R;
            Σ_9_14.refs.j = this.m_localAnchor1.x - Σ_9_14.refs.h.m_sweep.localCenter.x, Σ_9_14.refs.o = this.m_localAnchor1.y - Σ_9_14.refs.h.m_sweep.localCenter.y, Σ_9_14.refs.q = Σ_9_14.refs.d.col1.x * Σ_9_14.refs.j + Σ_9_14.refs.d.col2.x * Σ_9_14.refs.o;
            Σ_9_14.refs.o = Σ_9_14.refs.d.col1.y * Σ_9_14.refs.j + Σ_9_14.refs.d.col2.y * Σ_9_14.refs.o;
            Σ_9_14.refs.j = Σ_9_14.refs.q;
            Σ_9_14.refs.d = Σ_9_14.refs.l.m_xf.R;
            Σ_9_14.refs.n = this.m_localAnchor2.x - Σ_9_14.refs.l.m_sweep.localCenter.x, Σ_9_14.refs.a = this.m_localAnchor2.y - Σ_9_14.refs.l.m_sweep.localCenter.y;
            Σ_9_14.refs.q = Σ_9_14.refs.d.col1.x * Σ_9_14.refs.n + Σ_9_14.refs.d.col2.x * Σ_9_14.refs.a;
            Σ_9_14.refs.a = Σ_9_14.refs.d.col1.y * Σ_9_14.refs.n + Σ_9_14.refs.d.col2.y * Σ_9_14.refs.a;
            Σ_9_14.refs.n = Σ_9_14.refs.q;
            Σ_9_14.refs.q = Σ_9_14.refs.l.m_sweep.c.x + Σ_9_14.refs.n - Σ_9_14.refs.h.m_sweep.c.x - Σ_9_14.refs.j;
            Σ_9_14.refs.c = Σ_9_14.refs.l.m_sweep.c.y + Σ_9_14.refs.a - Σ_9_14.refs.h.m_sweep.c.y - Σ_9_14.refs.o;
            Σ_9_14.refs.d = Math.sqrt(Σ_9_14.refs.q * Σ_9_14.refs.q + Σ_9_14.refs.c * Σ_9_14.refs.c);
            Σ_9_14.refs.q /= Σ_9_14.refs.d;
            Σ_9_14.refs.c /= Σ_9_14.refs.d;
            Σ_9_14.refs.d = Σ_9_14.refs.d - this.m_length;
            Σ_9_14.refs.d = Σ_9.refs.y.Clamp(Σ_9_14.refs.d, -Σ_9.refs.F.b2_maxLinearCorrection, Σ_9.refs.F.b2_maxLinearCorrection);
            Σ_9_14.refs.g = -this.m_mass * Σ_9_14.refs.d;
            this.m_u.Set(Σ_9_14.refs.q, Σ_9_14.refs.c);
            Σ_9_14.refs.q = Σ_9_14.refs.g * this.m_u.x;
            Σ_9_14.refs.c = Σ_9_14.refs.g * this.m_u.y;
            Σ_9_14.refs.h.m_sweep.c.x -= Σ_9_14.refs.h.m_invMass * Σ_9_14.refs.q;
            Σ_9_14.refs.h.m_sweep.c.y -= Σ_9_14.refs.h.m_invMass * Σ_9_14.refs.c;
            Σ_9_14.refs.h.m_sweep.a -= Σ_9_14.refs.h.m_invI * (Σ_9_14.refs.j * Σ_9_14.refs.c - Σ_9_14.refs.o * Σ_9_14.refs.q);
            Σ_9_14.refs.l.m_sweep.c.x += Σ_9_14.refs.l.m_invMass * Σ_9_14.refs.q;
            Σ_9_14.refs.l.m_sweep.c.y += Σ_9_14.refs.l.m_invMass * Σ_9_14.refs.c;
            Σ_9_14.refs.l.m_sweep.a += Σ_9_14.refs.l.m_invI * (Σ_9_14.refs.n * Σ_9_14.refs.c - Σ_9_14.refs.a * Σ_9_14.refs.q);
            Σ_9_14.refs.h.SynchronizeTransform();
            Σ_9_14.refs.l.SynchronizeTransform();
            return Σ_9.refs.y.Abs(Σ_9_14.refs.d) < Σ_9.refs.F.b2_linearSlop;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.p, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.p.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.p.b2DistanceJointDef = Σ_9.addFunction(function αKBdu() {
            var Σ_9_15 = new Σ.Scope(this, αKBdu, '15', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
            this.localAnchorA = new Σ_9.refs.w();
            this.localAnchorB = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.p.prototype.b2DistanceJointDef = Σ_9.addFunction(function αkrk0() {
            var Σ_9_16 = new Σ.Scope(this, αkrk0, '16', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_distanceJoint;
            this.length = 1;
            this.dampingRatio = this.frequencyHz = 0;
        }, Σ_9);
        Σ_9.refs.p.prototype.Initialize = Σ_9.addFunction(function αiwI1(d, h, l, j) {
            var Σ_9_17 = new Σ.Scope(this, αiwI1, '17', Σ_9, {
                d: d,
                h: h,
                l: l,
                j: j
            }, []);
            this.bodyA = Σ_9_17.refs.d;
            this.bodyB = Σ_9_17.refs.h;
            this.localAnchorA.SetV(this.bodyA.GetLocalPoint(Σ_9_17.refs.l));
            this.localAnchorB.SetV(this.bodyB.GetLocalPoint(Σ_9_17.refs.j));
            Σ_9_17.refs.d = Σ_9_17.refs.j.x - Σ_9_17.refs.l.x;
            Σ_9_17.refs.l = Σ_9_17.refs.j.y - Σ_9_17.refs.l.y;
            this.length = Math.sqrt(Σ_9_17.refs.d * Σ_9_17.refs.d + Σ_9_17.refs.l * Σ_9_17.refs.l);
            this.dampingRatio = this.frequencyHz = 0;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.B, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.B.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.B.b2FrictionJoint = Σ_9.addFunction(function αnIoE() {
            var Σ_9_18 = new Σ.Scope(this, αnIoE, '18', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.m_localAnchorA = new Σ_9.refs.w();
            this.m_localAnchorB = new Σ_9.refs.w();
            this.m_linearMass = new Σ_9.refs.G();
            this.m_linearImpulse = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.B.prototype.GetAnchorA = Σ_9.addFunction(function αp5U7() {
            var Σ_9_19 = new Σ.Scope(this, αp5U7, '19', Σ_9, {}, []);
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
        }, Σ_9);
        Σ_9.refs.B.prototype.GetAnchorB = Σ_9.addFunction(function αG3Dw() {
            var Σ_9_20 = new Σ.Scope(this, αG3Dw, '20', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
        }, Σ_9);
        Σ_9.refs.B.prototype.GetReactionForce = Σ_9.addFunction(function αDym5(d) {
            var Σ_9_21 = new Σ.Scope(this, αDym5, '21', Σ_9, {
                d: d
            }, []);
            if (Σ_9_21.refs.d === undefined) {
                Σ_9_21.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_21.refs.d * this.m_linearImpulse.x, Σ_9_21.refs.d * this.m_linearImpulse.y);
        }, Σ_9);
        Σ_9.refs.B.prototype.GetReactionTorque = Σ_9.addFunction(function α2ij1(d) {
            var Σ_9_22 = new Σ.Scope(this, α2ij1, '22', Σ_9, {
                d: d
            }, []);
            if (Σ_9_22.refs.d === undefined) {
                Σ_9_22.refs.d = 0;
            }
            return Σ_9_22.refs.d * this.m_angularImpulse;
        }, Σ_9);
        Σ_9.refs.B.prototype.SetMaxForce = Σ_9.addFunction(function α3qr2(d) {
            var Σ_9_23 = new Σ.Scope(this, α3qr2, '23', Σ_9, {
                d: d
            }, []);
            if (Σ_9_23.refs.d === undefined) {
                Σ_9_23.refs.d = 0;
            }
            this.m_maxForce = Σ_9_23.refs.d;
        }, Σ_9);
        Σ_9.refs.B.prototype.GetMaxForce = Σ_9.addFunction(function αfo6O() {
            var Σ_9_24 = new Σ.Scope(this, αfo6O, '24', Σ_9, {}, []);
            return this.m_maxForce;
        }, Σ_9);
        Σ_9.refs.B.prototype.SetMaxTorque = Σ_9.addFunction(function αjQqo(d) {
            var Σ_9_25 = new Σ.Scope(this, αjQqo, '25', Σ_9, {
                d: d
            }, []);
            if (Σ_9_25.refs.d === undefined) {
                Σ_9_25.refs.d = 0;
            }
            this.m_maxTorque = Σ_9_25.refs.d;
        }, Σ_9);
        Σ_9.refs.B.prototype.GetMaxTorque = Σ_9.addFunction(function α5qCr() {
            var Σ_9_26 = new Σ.Scope(this, α5qCr, '26', Σ_9, {}, []);
            return this.m_maxTorque;
        }, Σ_9);
        Σ_9.refs.B.prototype.b2FrictionJoint = Σ_9.addFunction(function αhKWX(d) {
            var Σ_9_27 = new Σ.Scope(this, αhKWX, '27', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_27.refs.d);
            this.m_localAnchorA.SetV(Σ_9_27.refs.d.localAnchorA);
            this.m_localAnchorB.SetV(Σ_9_27.refs.d.localAnchorB);
            this.m_linearMass.SetZero();
            this.m_angularMass = 0;
            this.m_linearImpulse.SetZero();
            this.m_angularImpulse = 0;
            this.m_maxForce = Σ_9_27.refs.d.maxForce;
            this.m_maxTorque = Σ_9_27.refs.d.maxTorque;
        }, Σ_9);
        Σ_9.refs.B.prototype.InitVelocityConstraints = Σ_9.addFunction(function αLP4W(d) {
            var Σ_9_28 = new Σ.Scope(this, αLP4W, '28', Σ_9, {
                d: d
            }, []);
            Σ_9_28.refs.h = undefined, Σ_9_28.refs.l = 0, Σ_9_28.refs.j = this.m_bodyA, Σ_9_28.refs.o = this.m_bodyB;
            Σ_9_28.refs.h = Σ_9_28.refs.j.m_xf.R;
            Σ_9_28.refs.q = this.m_localAnchorA.x - Σ_9_28.refs.j.m_sweep.localCenter.x, Σ_9_28.refs.n = this.m_localAnchorA.y - Σ_9_28.refs.j.m_sweep.localCenter.y;
            Σ_9_28.refs.l = Σ_9_28.refs.h.col1.x * Σ_9_28.refs.q + Σ_9_28.refs.h.col2.x * Σ_9_28.refs.n;
            Σ_9_28.refs.n = Σ_9_28.refs.h.col1.y * Σ_9_28.refs.q + Σ_9_28.refs.h.col2.y * Σ_9_28.refs.n;
            Σ_9_28.refs.q = Σ_9_28.refs.l;
            Σ_9_28.refs.h = Σ_9_28.refs.o.m_xf.R;
            Σ_9_28.refs.a = this.m_localAnchorB.x - Σ_9_28.refs.o.m_sweep.localCenter.x, Σ_9_28.refs.c = this.m_localAnchorB.y - Σ_9_28.refs.o.m_sweep.localCenter.y;
            Σ_9_28.refs.l = Σ_9_28.refs.h.col1.x * Σ_9_28.refs.a + Σ_9_28.refs.h.col2.x * Σ_9_28.refs.c;
            Σ_9_28.refs.c = Σ_9_28.refs.h.col1.y * Σ_9_28.refs.a + Σ_9_28.refs.h.col2.y * Σ_9_28.refs.c;
            Σ_9_28.refs.a = Σ_9_28.refs.l;
            Σ_9_28.refs.h = Σ_9_28.refs.j.m_invMass;
            Σ_9_28.refs.l = Σ_9_28.refs.o.m_invMass;
            Σ_9_28.refs.g = Σ_9_28.refs.j.m_invI, Σ_9_28.refs.b = Σ_9_28.refs.o.m_invI, Σ_9_28.refs.e = new Σ_9.refs.G();
            Σ_9_28.refs.e.col1.x = Σ_9_28.refs.h + Σ_9_28.refs.l;
            Σ_9_28.refs.e.col2.x = 0;
            Σ_9_28.refs.e.col1.y = 0;
            Σ_9_28.refs.e.col2.y = Σ_9_28.refs.h + Σ_9_28.refs.l;
            Σ_9_28.refs.e.col1.x += Σ_9_28.refs.g * Σ_9_28.refs.n * Σ_9_28.refs.n;
            Σ_9_28.refs.e.col2.x += -Σ_9_28.refs.g * Σ_9_28.refs.q * Σ_9_28.refs.n;
            Σ_9_28.refs.e.col1.y += -Σ_9_28.refs.g * Σ_9_28.refs.q * Σ_9_28.refs.n;
            Σ_9_28.refs.e.col2.y += Σ_9_28.refs.g * Σ_9_28.refs.q * Σ_9_28.refs.q;
            Σ_9_28.refs.e.col1.x += Σ_9_28.refs.b * Σ_9_28.refs.c * Σ_9_28.refs.c;
            Σ_9_28.refs.e.col2.x += -Σ_9_28.refs.b * Σ_9_28.refs.a * Σ_9_28.refs.c;
            Σ_9_28.refs.e.col1.y += -Σ_9_28.refs.b * Σ_9_28.refs.a * Σ_9_28.refs.c;
            Σ_9_28.refs.e.col2.y += Σ_9_28.refs.b * Σ_9_28.refs.a * Σ_9_28.refs.a;
            Σ_9_28.refs.e.GetInverse(this.m_linearMass);
            this.m_angularMass = Σ_9_28.refs.g + Σ_9_28.refs.b;
            if (this.m_angularMass > 0) {
                this.m_angularMass = 1 / this.m_angularMass;
            }
            if (Σ_9_28.refs.d.warmStarting) {
                this.m_linearImpulse.x *= Σ_9_28.refs.d.dtRatio;
                this.m_linearImpulse.y *= Σ_9_28.refs.d.dtRatio;
                this.m_angularImpulse *= Σ_9_28.refs.d.dtRatio;
                Σ_9_28.refs.d = this.m_linearImpulse;
                Σ_9_28.refs.j.m_linearVelocity.x -= Σ_9_28.refs.h * Σ_9_28.refs.d.x;
                Σ_9_28.refs.j.m_linearVelocity.y -= Σ_9_28.refs.h * Σ_9_28.refs.d.y;
                Σ_9_28.refs.j.m_angularVelocity -= Σ_9_28.refs.g * (Σ_9_28.refs.q * Σ_9_28.refs.d.y - Σ_9_28.refs.n * Σ_9_28.refs.d.x + this.m_angularImpulse);
                Σ_9_28.refs.o.m_linearVelocity.x += Σ_9_28.refs.l * Σ_9_28.refs.d.x;
                Σ_9_28.refs.o.m_linearVelocity.y += Σ_9_28.refs.l * Σ_9_28.refs.d.y;
                Σ_9_28.refs.o.m_angularVelocity += Σ_9_28.refs.b * (Σ_9_28.refs.a * Σ_9_28.refs.d.y - Σ_9_28.refs.c * Σ_9_28.refs.d.x + this.m_angularImpulse);
            } else {
                this.m_linearImpulse.SetZero();
                this.m_angularImpulse = 0;
            }
        }, Σ_9);
        Σ_9.refs.B.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αbvuI(d) {
            var Σ_9_29 = new Σ.Scope(this, αbvuI, '29', Σ_9, {
                d: d
            }, []);
            Σ_9_29.refs.h = undefined, Σ_9_29.refs.l = 0, Σ_9_29.refs.j = this.m_bodyA, Σ_9_29.refs.o = this.m_bodyB, Σ_9_29.refs.q = Σ_9_29.refs.j.m_linearVelocity, Σ_9_29.refs.n = Σ_9_29.refs.j.m_angularVelocity, Σ_9_29.refs.a = Σ_9_29.refs.o.m_linearVelocity, Σ_9_29.refs.c = Σ_9_29.refs.o.m_angularVelocity, Σ_9_29.refs.g = Σ_9_29.refs.j.m_invMass, Σ_9_29.refs.b = Σ_9_29.refs.o.m_invMass, Σ_9_29.refs.e = Σ_9_29.refs.j.m_invI, Σ_9_29.refs.f = Σ_9_29.refs.o.m_invI;
            Σ_9_29.refs.h = Σ_9_29.refs.j.m_xf.R;
            Σ_9_29.refs.m = this.m_localAnchorA.x - Σ_9_29.refs.j.m_sweep.localCenter.x, Σ_9_29.refs.r = this.m_localAnchorA.y - Σ_9_29.refs.j.m_sweep.localCenter.y;
            Σ_9_29.refs.l = Σ_9_29.refs.h.col1.x * Σ_9_29.refs.m + Σ_9_29.refs.h.col2.x * Σ_9_29.refs.r;
            Σ_9_29.refs.r = Σ_9_29.refs.h.col1.y * Σ_9_29.refs.m + Σ_9_29.refs.h.col2.y * Σ_9_29.refs.r;
            Σ_9_29.refs.m = Σ_9_29.refs.l;
            Σ_9_29.refs.h = Σ_9_29.refs.o.m_xf.R;
            Σ_9_29.refs.s = this.m_localAnchorB.x - Σ_9_29.refs.o.m_sweep.localCenter.x, Σ_9_29.refs.v = this.m_localAnchorB.y - Σ_9_29.refs.o.m_sweep.localCenter.y;
            Σ_9_29.refs.l = Σ_9_29.refs.h.col1.x * Σ_9_29.refs.s + Σ_9_29.refs.h.col2.x * Σ_9_29.refs.v;
            Σ_9_29.refs.v = Σ_9_29.refs.h.col1.y * Σ_9_29.refs.s + Σ_9_29.refs.h.col2.y * Σ_9_29.refs.v;
            Σ_9_29.refs.s = Σ_9_29.refs.l;
            Σ_9_29.refs.h = 0;
            Σ_9_29.refs.l = -this.m_angularMass * (Σ_9_29.refs.c - Σ_9_29.refs.n);
            Σ_9_29.refs.t = this.m_angularImpulse;
            Σ_9_29.refs.h = Σ_9_29.refs.d.dt * this.m_maxTorque;
            this.m_angularImpulse = Σ_9.refs.y.Clamp(this.m_angularImpulse + Σ_9_29.refs.l, -Σ_9_29.refs.h, Σ_9_29.refs.h);
            Σ_9_29.refs.l = this.m_angularImpulse - Σ_9_29.refs.t;
            Σ_9_29.refs.n -= Σ_9_29.refs.e * Σ_9_29.refs.l;
            Σ_9_29.refs.c += Σ_9_29.refs.f * Σ_9_29.refs.l;
            Σ_9_29.refs.h = Σ_9.refs.y.MulMV(this.m_linearMass, new Σ_9.refs.w(-(Σ_9_29.refs.a.x - Σ_9_29.refs.c * Σ_9_29.refs.v - Σ_9_29.refs.q.x + Σ_9_29.refs.n * Σ_9_29.refs.r), -(Σ_9_29.refs.a.y + Σ_9_29.refs.c * Σ_9_29.refs.s - Σ_9_29.refs.q.y - Σ_9_29.refs.n * Σ_9_29.refs.m)));
            Σ_9_29.refs.l = this.m_linearImpulse.Copy();
            this.m_linearImpulse.Add(Σ_9_29.refs.h);
            Σ_9_29.refs.h = Σ_9_29.refs.d.dt * this.m_maxForce;
            if (this.m_linearImpulse.LengthSquared() > Σ_9_29.refs.h * Σ_9_29.refs.h) {
                this.m_linearImpulse.Normalize();
                this.m_linearImpulse.Multiply(Σ_9_29.refs.h);
            }
            Σ_9_29.refs.h = Σ_9.refs.y.SubtractVV(this.m_linearImpulse, Σ_9_29.refs.l);
            Σ_9_29.refs.q.x -= Σ_9_29.refs.g * Σ_9_29.refs.h.x;
            Σ_9_29.refs.q.y -= Σ_9_29.refs.g * Σ_9_29.refs.h.y;
            Σ_9_29.refs.n -= Σ_9_29.refs.e * (Σ_9_29.refs.m * Σ_9_29.refs.h.y - Σ_9_29.refs.r * Σ_9_29.refs.h.x);
            Σ_9_29.refs.a.x += Σ_9_29.refs.b * Σ_9_29.refs.h.x;
            Σ_9_29.refs.a.y += Σ_9_29.refs.b * Σ_9_29.refs.h.y;
            Σ_9_29.refs.c += Σ_9_29.refs.f * (Σ_9_29.refs.s * Σ_9_29.refs.h.y - Σ_9_29.refs.v * Σ_9_29.refs.h.x);
            Σ_9_29.refs.j.m_angularVelocity = Σ_9_29.refs.n;
            Σ_9_29.refs.o.m_angularVelocity = Σ_9_29.refs.c;
        }, Σ_9);
        Σ_9.refs.B.prototype.SolvePositionConstraints = Σ_9.addFunction(function αG9Jc() {
            var Σ_9_30 = new Σ.Scope(this, αG9Jc, '30', Σ_9, {}, []);
            return true;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.Q, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.Q.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.Q.b2FrictionJointDef = Σ_9.addFunction(function αTm9h() {
            var Σ_9_31 = new Σ.Scope(this, αTm9h, '31', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
            this.localAnchorA = new Σ_9.refs.w();
            this.localAnchorB = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.Q.prototype.b2FrictionJointDef = Σ_9.addFunction(function αgVXo() {
            var Σ_9_32 = new Σ.Scope(this, αgVXo, '32', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_frictionJoint;
            this.maxTorque = this.maxForce = 0;
        }, Σ_9);
        Σ_9.refs.Q.prototype.Initialize = Σ_9.addFunction(function αEsBn(d, h, l) {
            var Σ_9_33 = new Σ.Scope(this, αEsBn, '33', Σ_9, {
                d: d,
                h: h,
                l: l
            }, []);
            this.bodyA = Σ_9_33.refs.d;
            this.bodyB = Σ_9_33.refs.h;
            this.localAnchorA.SetV(this.bodyA.GetLocalPoint(Σ_9_33.refs.l));
            this.localAnchorB.SetV(this.bodyB.GetLocalPoint(Σ_9_33.refs.l));
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.V, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.V.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.V.b2GearJoint = Σ_9.addFunction(function αlFgz() {
            var Σ_9_34 = new Σ.Scope(this, αlFgz, '34', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.m_groundAnchor1 = new Σ_9.refs.w();
            this.m_groundAnchor2 = new Σ_9.refs.w();
            this.m_localAnchor1 = new Σ_9.refs.w();
            this.m_localAnchor2 = new Σ_9.refs.w();
            this.m_J = new Σ_9.refs.L();
        }, Σ_9);
        Σ_9.refs.V.prototype.GetAnchorA = Σ_9.addFunction(function αE5rN() {
            var Σ_9_35 = new Σ.Scope(this, αE5rN, '35', Σ_9, {}, []);
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
        }, Σ_9);
        Σ_9.refs.V.prototype.GetAnchorB = Σ_9.addFunction(function αqZzO() {
            var Σ_9_36 = new Σ.Scope(this, αqZzO, '36', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
        }, Σ_9);
        Σ_9.refs.V.prototype.GetReactionForce = Σ_9.addFunction(function αW2fx(d) {
            var Σ_9_37 = new Σ.Scope(this, αW2fx, '37', Σ_9, {
                d: d
            }, []);
            if (Σ_9_37.refs.d === undefined) {
                Σ_9_37.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_37.refs.d * this.m_impulse * this.m_J.linearB.x, Σ_9_37.refs.d * this.m_impulse * this.m_J.linearB.y);
        }, Σ_9);
        Σ_9.refs.V.prototype.GetReactionTorque = Σ_9.addFunction(function αHy1U(d) {
            var Σ_9_38 = new Σ.Scope(this, αHy1U, '38', Σ_9, {
                d: d
            }, []);
            if (Σ_9_38.refs.d === undefined) {
                Σ_9_38.refs.d = 0;
            }
            Σ_9_38.refs.h = this.m_bodyB.m_xf.R, Σ_9_38.refs.l = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x, Σ_9_38.refs.j = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y, Σ_9_38.refs.o = Σ_9_38.refs.h.col1.x * Σ_9_38.refs.l + Σ_9_38.refs.h.col2.x * Σ_9_38.refs.j;
            Σ_9_38.refs.j = Σ_9_38.refs.h.col1.y * Σ_9_38.refs.l + Σ_9_38.refs.h.col2.y * Σ_9_38.refs.j;
            Σ_9_38.refs.l = Σ_9_38.refs.o;
            return Σ_9_38.refs.d * (this.m_impulse * this.m_J.angularB - Σ_9_38.refs.l * this.m_impulse * this.m_J.linearB.y + Σ_9_38.refs.j * this.m_impulse * this.m_J.linearB.x);
        }, Σ_9);
        Σ_9.refs.V.prototype.GetRatio = Σ_9.addFunction(function α2SOp() {
            var Σ_9_39 = new Σ.Scope(this, α2SOp, '39', Σ_9, {}, []);
            return this.m_ratio;
        }, Σ_9);
        Σ_9.refs.V.prototype.SetRatio = Σ_9.addFunction(function αRyu3(d) {
            var Σ_9_40 = new Σ.Scope(this, αRyu3, '40', Σ_9, {
                d: d
            }, []);
            if (Σ_9_40.refs.d === undefined) {
                Σ_9_40.refs.d = 0;
            }
            this.m_ratio = Σ_9_40.refs.d;
        }, Σ_9);
        Σ_9.refs.V.prototype.b2GearJoint = Σ_9.addFunction(function αB4pZ(d) {
            var Σ_9_41 = new Σ.Scope(this, αB4pZ, '41', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_41.refs.d);
            Σ_9_41.refs.h = parseInt(Σ_9_41.refs.d.joint1.m_type), Σ_9_41.refs.l = parseInt(Σ_9_41.refs.d.joint2.m_type);
            this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
            Σ_9_41.refs.j = 0, Σ_9_41.refs.o = 0;
            this.m_ground1 = Σ_9_41.refs.d.joint1.GetBodyA();
            this.m_bodyA = Σ_9_41.refs.d.joint1.GetBodyB();
            if (Σ_9_41.refs.h == Σ_9.refs.I.e_revoluteJoint) {
                this.m_revolute1 = Σ_9_41.refs.d.joint1 instanceof Σ_9.refs.N ? Σ_9_41.refs.d.joint1 : null;
                this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
                this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
                Σ_9_41.refs.j = this.m_revolute1.GetJointAngle();
            } else {
                this.m_prismatic1 = Σ_9_41.refs.d.joint1 instanceof Σ_9.refs.H ? Σ_9_41.refs.d.joint1 : null;
                this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
                this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
                Σ_9_41.refs.j = this.m_prismatic1.GetJointTranslation();
            }
            this.m_ground2 = Σ_9_41.refs.d.joint2.GetBodyA();
            this.m_bodyB = Σ_9_41.refs.d.joint2.GetBodyB();
            if (Σ_9_41.refs.l == Σ_9.refs.I.e_revoluteJoint) {
                this.m_revolute2 = Σ_9_41.refs.d.joint2 instanceof Σ_9.refs.N ? Σ_9_41.refs.d.joint2 : null;
                this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
                this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
                Σ_9_41.refs.o = this.m_revolute2.GetJointAngle();
            } else {
                this.m_prismatic2 = Σ_9_41.refs.d.joint2 instanceof Σ_9.refs.H ? Σ_9_41.refs.d.joint2 : null;
                this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
                this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
                Σ_9_41.refs.o = this.m_prismatic2.GetJointTranslation();
            }
            this.m_ratio = Σ_9_41.refs.d.ratio;
            this.m_constant = Σ_9_41.refs.j + this.m_ratio * Σ_9_41.refs.o;
            this.m_impulse = 0;
        }, Σ_9);
        Σ_9.refs.V.prototype.InitVelocityConstraints = Σ_9.addFunction(function αd58N(d) {
            var Σ_9_42 = new Σ.Scope(this, αd58N, '42', Σ_9, {
                d: d
            }, []);
            Σ_9_42.refs.h = this.m_ground1, Σ_9_42.refs.l = this.m_ground2, Σ_9_42.refs.j = this.m_bodyA, Σ_9_42.refs.o = this.m_bodyB, Σ_9_42.refs.q = 0, Σ_9_42.refs.n = 0, Σ_9_42.refs.a = 0, Σ_9_42.refs.c = 0, Σ_9_42.refs.g = Σ_9_42.refs.a = 0, Σ_9_42.refs.b = 0;
            this.m_J.SetZero();
            if (this.m_revolute1) {
                this.m_J.angularA = -1;
                Σ_9_42.refs.b += Σ_9_42.refs.j.m_invI;
            } else {
                Σ_9_42.refs.h = Σ_9_42.refs.h.m_xf.R;
                Σ_9_42.refs.n = this.m_prismatic1.m_localXAxis1;
                Σ_9_42.refs.q = Σ_9_42.refs.h.col1.x * Σ_9_42.refs.n.x + Σ_9_42.refs.h.col2.x * Σ_9_42.refs.n.y;
                Σ_9_42.refs.n = Σ_9_42.refs.h.col1.y * Σ_9_42.refs.n.x + Σ_9_42.refs.h.col2.y * Σ_9_42.refs.n.y;
                Σ_9_42.refs.h = Σ_9_42.refs.j.m_xf.R;
                Σ_9_42.refs.a = this.m_localAnchor1.x - Σ_9_42.refs.j.m_sweep.localCenter.x;
                Σ_9_42.refs.c = this.m_localAnchor1.y - Σ_9_42.refs.j.m_sweep.localCenter.y;
                Σ_9_42.refs.g = Σ_9_42.refs.h.col1.x * Σ_9_42.refs.a + Σ_9_42.refs.h.col2.x * Σ_9_42.refs.c;
                Σ_9_42.refs.c = Σ_9_42.refs.h.col1.y * Σ_9_42.refs.a + Σ_9_42.refs.h.col2.y * Σ_9_42.refs.c;
                Σ_9_42.refs.a = Σ_9_42.refs.g;
                Σ_9_42.refs.a = Σ_9_42.refs.a * Σ_9_42.refs.n - Σ_9_42.refs.c * Σ_9_42.refs.q;
                this.m_J.linearA.Set(-Σ_9_42.refs.q, -Σ_9_42.refs.n);
                this.m_J.angularA = -Σ_9_42.refs.a;
                Σ_9_42.refs.b += Σ_9_42.refs.j.m_invMass + Σ_9_42.refs.j.m_invI * Σ_9_42.refs.a * Σ_9_42.refs.a;
            }
            if (this.m_revolute2) {
                this.m_J.angularB = -this.m_ratio;
                Σ_9_42.refs.b += this.m_ratio * this.m_ratio * Σ_9_42.refs.o.m_invI;
            } else {
                Σ_9_42.refs.h = Σ_9_42.refs.l.m_xf.R;
                Σ_9_42.refs.n = this.m_prismatic2.m_localXAxis1;
                Σ_9_42.refs.q = Σ_9_42.refs.h.col1.x * Σ_9_42.refs.n.x + Σ_9_42.refs.h.col2.x * Σ_9_42.refs.n.y;
                Σ_9_42.refs.n = Σ_9_42.refs.h.col1.y * Σ_9_42.refs.n.x + Σ_9_42.refs.h.col2.y * Σ_9_42.refs.n.y;
                Σ_9_42.refs.h = Σ_9_42.refs.o.m_xf.R;
                Σ_9_42.refs.a = this.m_localAnchor2.x - Σ_9_42.refs.o.m_sweep.localCenter.x;
                Σ_9_42.refs.c = this.m_localAnchor2.y - Σ_9_42.refs.o.m_sweep.localCenter.y;
                Σ_9_42.refs.g = Σ_9_42.refs.h.col1.x * Σ_9_42.refs.a + Σ_9_42.refs.h.col2.x * Σ_9_42.refs.c;
                Σ_9_42.refs.c = Σ_9_42.refs.h.col1.y * Σ_9_42.refs.a + Σ_9_42.refs.h.col2.y * Σ_9_42.refs.c;
                Σ_9_42.refs.a = Σ_9_42.refs.g;
                Σ_9_42.refs.a = Σ_9_42.refs.a * Σ_9_42.refs.n - Σ_9_42.refs.c * Σ_9_42.refs.q;
                this.m_J.linearB.Set(-this.m_ratio * Σ_9_42.refs.q, -this.m_ratio * Σ_9_42.refs.n);
                this.m_J.angularB = -this.m_ratio * Σ_9_42.refs.a;
                Σ_9_42.refs.b += this.m_ratio * this.m_ratio * (Σ_9_42.refs.o.m_invMass + Σ_9_42.refs.o.m_invI * Σ_9_42.refs.a * Σ_9_42.refs.a);
            }
            this.m_mass = Σ_9_42.refs.b > 0 ? 1 / Σ_9_42.refs.b : 0;
            if (Σ_9_42.refs.d.warmStarting) {
                Σ_9_42.refs.j.m_linearVelocity.x += Σ_9_42.refs.j.m_invMass * this.m_impulse * this.m_J.linearA.x;
                Σ_9_42.refs.j.m_linearVelocity.y += Σ_9_42.refs.j.m_invMass * this.m_impulse * this.m_J.linearA.y;
                Σ_9_42.refs.j.m_angularVelocity += Σ_9_42.refs.j.m_invI * this.m_impulse * this.m_J.angularA;
                Σ_9_42.refs.o.m_linearVelocity.x += Σ_9_42.refs.o.m_invMass * this.m_impulse * this.m_J.linearB.x;
                Σ_9_42.refs.o.m_linearVelocity.y += Σ_9_42.refs.o.m_invMass * this.m_impulse * this.m_J.linearB.y;
                Σ_9_42.refs.o.m_angularVelocity += Σ_9_42.refs.o.m_invI * this.m_impulse * this.m_J.angularB;
            } else {
                this.m_impulse = 0;
            }
        }, Σ_9);
        Σ_9.refs.V.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αawxE() {
            var Σ_9_43 = new Σ.Scope(this, αawxE, '43', Σ_9, {}, []);
            Σ_9_43.refs.d = this.m_bodyA, Σ_9_43.refs.h = this.m_bodyB, Σ_9_43.refs.l = -this.m_mass * this.m_J.Compute(Σ_9_43.refs.d.m_linearVelocity, Σ_9_43.refs.d.m_angularVelocity, Σ_9_43.refs.h.m_linearVelocity, Σ_9_43.refs.h.m_angularVelocity);
            this.m_impulse += Σ_9_43.refs.l;
            Σ_9_43.refs.d.m_linearVelocity.x += Σ_9_43.refs.d.m_invMass * Σ_9_43.refs.l * this.m_J.linearA.x;
            Σ_9_43.refs.d.m_linearVelocity.y += Σ_9_43.refs.d.m_invMass * Σ_9_43.refs.l * this.m_J.linearA.y;
            Σ_9_43.refs.d.m_angularVelocity += Σ_9_43.refs.d.m_invI * Σ_9_43.refs.l * this.m_J.angularA;
            Σ_9_43.refs.h.m_linearVelocity.x += Σ_9_43.refs.h.m_invMass * Σ_9_43.refs.l * this.m_J.linearB.x;
            Σ_9_43.refs.h.m_linearVelocity.y += Σ_9_43.refs.h.m_invMass * Σ_9_43.refs.l * this.m_J.linearB.y;
            Σ_9_43.refs.h.m_angularVelocity += Σ_9_43.refs.h.m_invI * Σ_9_43.refs.l * this.m_J.angularB;
        }, Σ_9);
        Σ_9.refs.V.prototype.SolvePositionConstraints = Σ_9.addFunction(function αelz3() {
            var Σ_9_44 = new Σ.Scope(this, αelz3, '44', Σ_9, {}, []);
            Σ_9_44.refs.d = this.m_bodyA, Σ_9_44.refs.h = this.m_bodyB, Σ_9_44.refs.l = 0, Σ_9_44.refs.j = 0;
            Σ_9_44.refs.l = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation();
            Σ_9_44.refs.j = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation();
            Σ_9_44.refs.l = -this.m_mass * (this.m_constant - (Σ_9_44.refs.l + this.m_ratio * Σ_9_44.refs.j));
            Σ_9_44.refs.d.m_sweep.c.x += Σ_9_44.refs.d.m_invMass * Σ_9_44.refs.l * this.m_J.linearA.x;
            Σ_9_44.refs.d.m_sweep.c.y += Σ_9_44.refs.d.m_invMass * Σ_9_44.refs.l * this.m_J.linearA.y;
            Σ_9_44.refs.d.m_sweep.a += Σ_9_44.refs.d.m_invI * Σ_9_44.refs.l * this.m_J.angularA;
            Σ_9_44.refs.h.m_sweep.c.x += Σ_9_44.refs.h.m_invMass * Σ_9_44.refs.l * this.m_J.linearB.x;
            Σ_9_44.refs.h.m_sweep.c.y += Σ_9_44.refs.h.m_invMass * Σ_9_44.refs.l * this.m_J.linearB.y;
            Σ_9_44.refs.h.m_sweep.a += Σ_9_44.refs.h.m_invI * Σ_9_44.refs.l * this.m_J.angularB;
            Σ_9_44.refs.d.SynchronizeTransform();
            Σ_9_44.refs.h.SynchronizeTransform();
            return 0 < Σ_9.refs.F.b2_linearSlop;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.M, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.M.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.M.b2GearJointDef = Σ_9.addFunction(function α3M6h() {
            var Σ_9_45 = new Σ.Scope(this, α3M6h, '45', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        }, Σ_9);
        Σ_9.refs.M.prototype.b2GearJointDef = Σ_9.addFunction(function α5v0A() {
            var Σ_9_46 = new Σ.Scope(this, α5v0A, '46', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_gearJoint;
            this.joint2 = this.joint1 = null;
            this.ratio = 1;
        }, Σ_9);
        Σ_9.refs.L.b2Jacobian = Σ_9.addFunction(function αinRb() {
            var Σ_9_47 = new Σ.Scope(this, αinRb, '47', Σ_9, {}, []);
            this.linearA = new Σ_9.refs.w();
            this.linearB = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.L.prototype.SetZero = Σ_9.addFunction(function αf9DV() {
            var Σ_9_48 = new Σ.Scope(this, αf9DV, '48', Σ_9, {}, []);
            this.linearA.SetZero();
            this.angularA = 0;
            this.linearB.SetZero();
            this.angularB = 0;
        }, Σ_9);
        Σ_9.refs.L.prototype.Set = Σ_9.addFunction(function αjhil(d, h, l, j) {
            var Σ_9_49 = new Σ.Scope(this, αjhil, '49', Σ_9, {
                d: d,
                h: h,
                l: l,
                j: j
            }, []);
            if (Σ_9_49.refs.h === undefined) {
                Σ_9_49.refs.h = 0;
            }
            if (Σ_9_49.refs.j === undefined) {
                Σ_9_49.refs.j = 0;
            }
            this.linearA.SetV(Σ_9_49.refs.d);
            this.angularA = Σ_9_49.refs.h;
            this.linearB.SetV(Σ_9_49.refs.l);
            this.angularB = Σ_9_49.refs.j;
        }, Σ_9);
        Σ_9.refs.L.prototype.Compute = Σ_9.addFunction(function αBybA(d, h, l, j) {
            var Σ_9_50 = new Σ.Scope(this, αBybA, '50', Σ_9, {
                d: d,
                h: h,
                l: l,
                j: j
            }, []);
            if (Σ_9_50.refs.h === undefined) {
                Σ_9_50.refs.h = 0;
            }
            if (Σ_9_50.refs.j === undefined) {
                Σ_9_50.refs.j = 0;
            }
            return this.linearA.x * Σ_9_50.refs.d.x + this.linearA.y * Σ_9_50.refs.d.y + this.angularA * Σ_9_50.refs.h + (this.linearB.x * Σ_9_50.refs.l.x + this.linearB.y * Σ_9_50.refs.l.y) + this.angularB * Σ_9_50.refs.j;
        }, Σ_9);
        Σ_9.refs.I.b2Joint = Σ_9.addFunction(function αa1To() {
            var Σ_9_51 = new Σ.Scope(this, αa1To, '51', Σ_9, {}, []);
            this.m_edgeA = new Σ_9.refs.Y();
            this.m_edgeB = new Σ_9.refs.Y();
            this.m_localCenterA = new Σ_9.refs.w();
            this.m_localCenterB = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.I.prototype.GetType = Σ_9.addFunction(function αfVs2() {
            var Σ_9_52 = new Σ.Scope(this, αfVs2, '52', Σ_9, {}, []);
            return this.m_type;
        }, Σ_9);
        Σ_9.refs.I.prototype.GetAnchorA = Σ_9.addFunction(function αCKcQ() {
            var Σ_9_53 = new Σ.Scope(this, αCKcQ, '53', Σ_9, {}, []);
            return null;
        }, Σ_9);
        Σ_9.refs.I.prototype.GetAnchorB = Σ_9.addFunction(function αt7GQ() {
            var Σ_9_54 = new Σ.Scope(this, αt7GQ, '54', Σ_9, {}, []);
            return null;
        }, Σ_9);
        Σ_9.refs.I.prototype.GetReactionForce = Σ_9.addFunction(function αWyzI() {
            var Σ_9_55 = new Σ.Scope(this, αWyzI, '55', Σ_9, {}, []);
            return null;
        }, Σ_9);
        Σ_9.refs.I.prototype.GetReactionTorque = Σ_9.addFunction(function αDt0P() {
            var Σ_9_56 = new Σ.Scope(this, αDt0P, '56', Σ_9, {}, []);
            return 0;
        }, Σ_9);
        Σ_9.refs.I.prototype.GetBodyA = Σ_9.addFunction(function αRsdu() {
            var Σ_9_57 = new Σ.Scope(this, αRsdu, '57', Σ_9, {}, []);
            return this.m_bodyA;
        }, Σ_9);
        Σ_9.refs.I.prototype.GetBodyB = Σ_9.addFunction(function αdrnh() {
            var Σ_9_58 = new Σ.Scope(this, αdrnh, '58', Σ_9, {}, []);
            return this.m_bodyB;
        }, Σ_9);
        Σ_9.refs.I.prototype.GetNext = Σ_9.addFunction(function α8kE9() {
            var Σ_9_59 = new Σ.Scope(this, α8kE9, '59', Σ_9, {}, []);
            return this.m_next;
        }, Σ_9);
        Σ_9.refs.I.prototype.GetUserData = Σ_9.addFunction(function αaWZN() {
            var Σ_9_60 = new Σ.Scope(this, αaWZN, '60', Σ_9, {}, []);
            return this.m_userData;
        }, Σ_9);
        Σ_9.refs.I.prototype.SetUserData = Σ_9.addFunction(function αkbKC(d) {
            var Σ_9_61 = new Σ.Scope(this, αkbKC, '61', Σ_9, {
                d: d
            }, []);
            this.m_userData = Σ_9_61.refs.d;
        }, Σ_9);
        Σ_9.refs.I.prototype.IsActive = Σ_9.addFunction(function αbIRW() {
            var Σ_9_62 = new Σ.Scope(this, αbIRW, '62', Σ_9, {}, []);
            return this.m_bodyA.IsActive() && this.m_bodyB.IsActive();
        }, Σ_9);
        Σ_9.refs.I.Create = Σ_9.addFunction(function αJ4LP(d) {
            var Σ_9_63 = new Σ.Scope(this, αJ4LP, '63', Σ_9, {
                d: d
            }, []);
            Σ_9_63.refs.h = null;
            switch (d.type) {
                case I.e_distanceJoint:
                    h = new U(d instanceof p ? d : null);
                    break;
                case I.e_mouseJoint:
                    h = new u(d instanceof D ? d : null);
                    break;
                case I.e_prismaticJoint:
                    h = new H(d instanceof O ? d : null);
                    break;
                case I.e_revoluteJoint:
                    h = new N(d instanceof S ? d : null);
                    break;
                case I.e_pulleyJoint:
                    h = new E(d instanceof R ? d : null);
                    break;
                case I.e_gearJoint:
                    h = new V(d instanceof M ? d : null);
                    break;
                case I.e_lineJoint:
                    h = new k(d instanceof z ? d : null);
                    break;
                case I.e_weldJoint:
                    h = new aa(d instanceof Z ? d : null);
                    break;
                case I.e_frictionJoint:
                    h = new B(d instanceof Q ? d : null);
            }
            return Σ_9_63.refs.h;
        }, Σ_9);
        Σ_9.refs.I.Destroy = Σ_9.addFunction(function αErlO() {
            var Σ_9_64 = new Σ.Scope(this, αErlO, '64', Σ_9, {}, []);
        }, Σ_9);
        Σ_9.refs.I.prototype.b2Joint = Σ_9.addFunction(function αLqcn(d) {
            var Σ_9_65 = new Σ.Scope(this, αLqcn, '65', Σ_9, {
                d: d
            }, []);
            Σ_9.refs.F.b2Assert(Σ_9_65.refs.d.bodyA != Σ_9_65.refs.d.bodyB);
            this.m_type = Σ_9_65.refs.d.type;
            this.m_next = this.m_prev = null;
            this.m_bodyA = Σ_9_65.refs.d.bodyA;
            this.m_bodyB = Σ_9_65.refs.d.bodyB;
            this.m_collideConnected = Σ_9_65.refs.d.collideConnected;
            this.m_islandFlag = false;
            this.m_userData = Σ_9_65.refs.d.userData;
        }, Σ_9);
        Σ_9.refs.I.prototype.InitVelocityConstraints = Σ_9.addFunction(function αyzYF() {
            var Σ_9_66 = new Σ.Scope(this, αyzYF, '66', Σ_9, {}, []);
        }, Σ_9);
        Σ_9.refs.I.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αHQHh() {
            var Σ_9_67 = new Σ.Scope(this, αHQHh, '67', Σ_9, {}, []);
        }, Σ_9);
        Σ_9.refs.I.prototype.FinalizeVelocityConstraints = Σ_9.addFunction(function αUj9b() {
            var Σ_9_68 = new Σ.Scope(this, αUj9b, '68', Σ_9, {}, []);
        }, Σ_9);
        Σ_9.refs.I.prototype.SolvePositionConstraints = Σ_9.addFunction(function αFTzY() {
            var Σ_9_69 = new Σ.Scope(this, αFTzY, '69', Σ_9, {}, []);
            return false;
        }, Σ_9);
        Σ.refs.Box2D.postDefs.push(Σ_9.addFunction(function αsO7F() {
            var Σ_9_70 = new Σ.Scope(this, αsO7F, '70', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3;
        }, Σ_9));
        Σ_9.refs.W.b2JointDef = Σ_9.addFunction(function αwowC() {
            var Σ_9_71 = new Σ.Scope(this, αwowC, '71', Σ_9, {}, []);
        }, Σ_9);
        Σ_9.refs.W.prototype.b2JointDef = Σ_9.addFunction(function α2QcR() {
            var Σ_9_72 = new Σ.Scope(this, α2QcR, '72', Σ_9, {}, []);
            this.type = Σ_9.refs.I.e_unknownJoint;
            this.bodyB = this.bodyA = this.userData = null;
            this.collideConnected = false;
        }, Σ_9);
        Σ_9.refs.Y.b2JointEdge = Σ_9.addFunction(function αCO5W() {
            var Σ_9_73 = new Σ.Scope(this, αCO5W, '73', Σ_9, {}, []);
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.k, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.k.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.k.b2LineJoint = Σ_9.addFunction(function αlp1H() {
            var Σ_9_74 = new Σ.Scope(this, αlp1H, '74', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.m_localAnchor1 = new Σ_9.refs.w();
            this.m_localAnchor2 = new Σ_9.refs.w();
            this.m_localXAxis1 = new Σ_9.refs.w();
            this.m_localYAxis1 = new Σ_9.refs.w();
            this.m_axis = new Σ_9.refs.w();
            this.m_perp = new Σ_9.refs.w();
            this.m_K = new Σ_9.refs.G();
            this.m_impulse = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.k.prototype.GetAnchorA = Σ_9.addFunction(function αQKQN() {
            var Σ_9_75 = new Σ.Scope(this, αQKQN, '75', Σ_9, {}, []);
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
        }, Σ_9);
        Σ_9.refs.k.prototype.GetAnchorB = Σ_9.addFunction(function αmkYt() {
            var Σ_9_76 = new Σ.Scope(this, αmkYt, '76', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
        }, Σ_9);
        Σ_9.refs.k.prototype.GetReactionForce = Σ_9.addFunction(function αQAHL(d) {
            var Σ_9_77 = new Σ.Scope(this, αQAHL, '77', Σ_9, {
                d: d
            }, []);
            if (Σ_9_77.refs.d === undefined) {
                Σ_9_77.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_77.refs.d * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), Σ_9_77.refs.d * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y));
        }, Σ_9);
        Σ_9.refs.k.prototype.GetReactionTorque = Σ_9.addFunction(function αQPeC(d) {
            var Σ_9_78 = new Σ.Scope(this, αQPeC, '78', Σ_9, {
                d: d
            }, []);
            if (Σ_9_78.refs.d === undefined) {
                Σ_9_78.refs.d = 0;
            }
            return Σ_9_78.refs.d * this.m_impulse.y;
        }, Σ_9);
        Σ_9.refs.k.prototype.GetJointTranslation = Σ_9.addFunction(function αeZam() {
            var Σ_9_79 = new Σ.Scope(this, αeZam, '79', Σ_9, {}, []);
            Σ_9_79.refs.d = this.m_bodyA, Σ_9_79.refs.h = this.m_bodyB, Σ_9_79.refs.l = Σ_9_79.refs.d.GetWorldPoint(this.m_localAnchor1), Σ_9_79.refs.j = Σ_9_79.refs.h.GetWorldPoint(this.m_localAnchor2);
            Σ_9_79.refs.h = Σ_9_79.refs.j.x - Σ_9_79.refs.l.x;
            Σ_9_79.refs.l = Σ_9_79.refs.j.y - Σ_9_79.refs.l.y;
            Σ_9_79.refs.d = Σ_9_79.refs.d.GetWorldVector(this.m_localXAxis1);
            return Σ_9_79.refs.d.x * Σ_9_79.refs.h + Σ_9_79.refs.d.y * Σ_9_79.refs.l;
        }, Σ_9);
        Σ_9.refs.k.prototype.GetJointSpeed = Σ_9.addFunction(function αO9zy() {
            var Σ_9_80 = new Σ.Scope(this, αO9zy, '80', Σ_9, {}, []);
            Σ_9_80.refs.d = this.m_bodyA, Σ_9_80.refs.h = this.m_bodyB, Σ_9_80.refs.l = undefined;
            Σ_9_80.refs.l = Σ_9_80.refs.d.m_xf.R;
            Σ_9_80.refs.j = this.m_localAnchor1.x - Σ_9_80.refs.d.m_sweep.localCenter.x, Σ_9_80.refs.o = this.m_localAnchor1.y - Σ_9_80.refs.d.m_sweep.localCenter.y, Σ_9_80.refs.q = Σ_9_80.refs.l.col1.x * Σ_9_80.refs.j + Σ_9_80.refs.l.col2.x * Σ_9_80.refs.o;
            Σ_9_80.refs.o = Σ_9_80.refs.l.col1.y * Σ_9_80.refs.j + Σ_9_80.refs.l.col2.y * Σ_9_80.refs.o;
            Σ_9_80.refs.j = Σ_9_80.refs.q;
            Σ_9_80.refs.l = Σ_9_80.refs.h.m_xf.R;
            Σ_9_80.refs.n = this.m_localAnchor2.x - Σ_9_80.refs.h.m_sweep.localCenter.x, Σ_9_80.refs.a = this.m_localAnchor2.y - Σ_9_80.refs.h.m_sweep.localCenter.y;
            Σ_9_80.refs.q = Σ_9_80.refs.l.col1.x * Σ_9_80.refs.n + Σ_9_80.refs.l.col2.x * Σ_9_80.refs.a;
            Σ_9_80.refs.a = Σ_9_80.refs.l.col1.y * Σ_9_80.refs.n + Σ_9_80.refs.l.col2.y * Σ_9_80.refs.a;
            Σ_9_80.refs.n = Σ_9_80.refs.q;
            Σ_9_80.refs.l = Σ_9_80.refs.h.m_sweep.c.x + Σ_9_80.refs.n - (Σ_9_80.refs.d.m_sweep.c.x + Σ_9_80.refs.j);
            Σ_9_80.refs.q = Σ_9_80.refs.h.m_sweep.c.y + Σ_9_80.refs.a - (Σ_9_80.refs.d.m_sweep.c.y + Σ_9_80.refs.o);
            Σ_9_80.refs.c = Σ_9_80.refs.d.GetWorldVector(this.m_localXAxis1), Σ_9_80.refs.g = Σ_9_80.refs.d.m_linearVelocity, Σ_9_80.refs.b = Σ_9_80.refs.h.m_linearVelocity;
            Σ_9_80.refs.d = Σ_9_80.refs.d.m_angularVelocity;
            Σ_9_80.refs.h = Σ_9_80.refs.h.m_angularVelocity;
            return Σ_9_80.refs.l * -Σ_9_80.refs.d * Σ_9_80.refs.c.y + Σ_9_80.refs.q * Σ_9_80.refs.d * Σ_9_80.refs.c.x + (Σ_9_80.refs.c.x * (Σ_9_80.refs.b.x + -Σ_9_80.refs.h * Σ_9_80.refs.a - Σ_9_80.refs.g.x - -Σ_9_80.refs.d * Σ_9_80.refs.o) + Σ_9_80.refs.c.y * (Σ_9_80.refs.b.y + Σ_9_80.refs.h * Σ_9_80.refs.n - Σ_9_80.refs.g.y - Σ_9_80.refs.d * Σ_9_80.refs.j));
        }, Σ_9);
        Σ_9.refs.k.prototype.IsLimitEnabled = Σ_9.addFunction(function αRvVV() {
            var Σ_9_81 = new Σ.Scope(this, αRvVV, '81', Σ_9, {}, []);
            return this.m_enableLimit;
        }, Σ_9);
        Σ_9.refs.k.prototype.EnableLimit = Σ_9.addFunction(function αJr5h(d) {
            var Σ_9_82 = new Σ.Scope(this, αJr5h, '82', Σ_9, {
                d: d
            }, []);
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableLimit = Σ_9_82.refs.d;
        }, Σ_9);
        Σ_9.refs.k.prototype.GetLowerLimit = Σ_9.addFunction(function αoiKb() {
            var Σ_9_83 = new Σ.Scope(this, αoiKb, '83', Σ_9, {}, []);
            return this.m_lowerTranslation;
        }, Σ_9);
        Σ_9.refs.k.prototype.GetUpperLimit = Σ_9.addFunction(function αHB3m() {
            var Σ_9_84 = new Σ.Scope(this, αHB3m, '84', Σ_9, {}, []);
            return this.m_upperTranslation;
        }, Σ_9);
        Σ_9.refs.k.prototype.SetLimits = Σ_9.addFunction(function αMJIo(d, h) {
            var Σ_9_85 = new Σ.Scope(this, αMJIo, '85', Σ_9, {
                d: d,
                h: h
            }, []);
            if (Σ_9_85.refs.d === undefined) {
                Σ_9_85.refs.d = 0;
            }
            if (Σ_9_85.refs.h === undefined) {
                Σ_9_85.refs.h = 0;
            }
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_lowerTranslation = Σ_9_85.refs.d;
            this.m_upperTranslation = Σ_9_85.refs.h;
        }, Σ_9);
        Σ_9.refs.k.prototype.IsMotorEnabled = Σ_9.addFunction(function α1qhS() {
            var Σ_9_86 = new Σ.Scope(this, α1qhS, '86', Σ_9, {}, []);
            return this.m_enableMotor;
        }, Σ_9);
        Σ_9.refs.k.prototype.EnableMotor = Σ_9.addFunction(function αOdz1(d) {
            var Σ_9_87 = new Σ.Scope(this, αOdz1, '87', Σ_9, {
                d: d
            }, []);
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableMotor = Σ_9_87.refs.d;
        }, Σ_9);
        Σ_9.refs.k.prototype.SetMotorSpeed = Σ_9.addFunction(function αYphb(d) {
            var Σ_9_88 = new Σ.Scope(this, αYphb, '88', Σ_9, {
                d: d
            }, []);
            if (Σ_9_88.refs.d === undefined) {
                Σ_9_88.refs.d = 0;
            }
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_motorSpeed = Σ_9_88.refs.d;
        }, Σ_9);
        Σ_9.refs.k.prototype.GetMotorSpeed = Σ_9.addFunction(function αGi92() {
            var Σ_9_89 = new Σ.Scope(this, αGi92, '89', Σ_9, {}, []);
            return this.m_motorSpeed;
        }, Σ_9);
        Σ_9.refs.k.prototype.SetMaxMotorForce = Σ_9.addFunction(function αIa7h(d) {
            var Σ_9_90 = new Σ.Scope(this, αIa7h, '90', Σ_9, {
                d: d
            }, []);
            if (Σ_9_90.refs.d === undefined) {
                Σ_9_90.refs.d = 0;
            }
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_maxMotorForce = Σ_9_90.refs.d;
        }, Σ_9);
        Σ_9.refs.k.prototype.GetMaxMotorForce = Σ_9.addFunction(function αzJjW() {
            var Σ_9_91 = new Σ.Scope(this, αzJjW, '91', Σ_9, {}, []);
            return this.m_maxMotorForce;
        }, Σ_9);
        Σ_9.refs.k.prototype.GetMotorForce = Σ_9.addFunction(function αPkFZ() {
            var Σ_9_92 = new Σ.Scope(this, αPkFZ, '92', Σ_9, {}, []);
            return this.m_motorImpulse;
        }, Σ_9);
        Σ_9.refs.k.prototype.b2LineJoint = Σ_9.addFunction(function αwndf(d) {
            var Σ_9_93 = new Σ.Scope(this, αwndf, '93', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_93.refs.d);
            this.m_localAnchor1.SetV(Σ_9_93.refs.d.localAnchorA);
            this.m_localAnchor2.SetV(Σ_9_93.refs.d.localAnchorB);
            this.m_localXAxis1.SetV(Σ_9_93.refs.d.localAxisA);
            this.m_localYAxis1.x = -this.m_localXAxis1.y;
            this.m_localYAxis1.y = this.m_localXAxis1.x;
            this.m_impulse.SetZero();
            this.m_motorImpulse = this.m_motorMass = 0;
            this.m_lowerTranslation = Σ_9_93.refs.d.lowerTranslation;
            this.m_upperTranslation = Σ_9_93.refs.d.upperTranslation;
            this.m_maxMotorForce = Σ_9_93.refs.d.maxMotorForce;
            this.m_motorSpeed = Σ_9_93.refs.d.motorSpeed;
            this.m_enableLimit = Σ_9_93.refs.d.enableLimit;
            this.m_enableMotor = Σ_9_93.refs.d.enableMotor;
            this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
            this.m_axis.SetZero();
            this.m_perp.SetZero();
        }, Σ_9);
        Σ_9.refs.k.prototype.InitVelocityConstraints = Σ_9.addFunction(function αFNuV(d) {
            var Σ_9_94 = new Σ.Scope(this, αFNuV, '94', Σ_9, {
                d: d
            }, []);
            Σ_9_94.refs.h = this.m_bodyA, Σ_9_94.refs.l = this.m_bodyB, Σ_9_94.refs.j = undefined, Σ_9_94.refs.o = 0;
            this.m_localCenterA.SetV(Σ_9_94.refs.h.GetLocalCenter());
            this.m_localCenterB.SetV(Σ_9_94.refs.l.GetLocalCenter());
            Σ_9_94.refs.q = Σ_9_94.refs.h.GetTransform();
            Σ_9_94.refs.l.GetTransform();
            Σ_9_94.refs.j = Σ_9_94.refs.h.m_xf.R;
            Σ_9_94.refs.n = this.m_localAnchor1.x - this.m_localCenterA.x, Σ_9_94.refs.a = this.m_localAnchor1.y - this.m_localCenterA.y;
            Σ_9_94.refs.o = Σ_9_94.refs.j.col1.x * Σ_9_94.refs.n + Σ_9_94.refs.j.col2.x * Σ_9_94.refs.a;
            Σ_9_94.refs.a = Σ_9_94.refs.j.col1.y * Σ_9_94.refs.n + Σ_9_94.refs.j.col2.y * Σ_9_94.refs.a;
            Σ_9_94.refs.n = Σ_9_94.refs.o;
            Σ_9_94.refs.j = Σ_9_94.refs.l.m_xf.R;
            Σ_9_94.refs.c = this.m_localAnchor2.x - this.m_localCenterB.x, Σ_9_94.refs.g = this.m_localAnchor2.y - this.m_localCenterB.y;
            Σ_9_94.refs.o = Σ_9_94.refs.j.col1.x * Σ_9_94.refs.c + Σ_9_94.refs.j.col2.x * Σ_9_94.refs.g;
            Σ_9_94.refs.g = Σ_9_94.refs.j.col1.y * Σ_9_94.refs.c + Σ_9_94.refs.j.col2.y * Σ_9_94.refs.g;
            Σ_9_94.refs.c = Σ_9_94.refs.o;
            Σ_9_94.refs.j = Σ_9_94.refs.l.m_sweep.c.x + Σ_9_94.refs.c - Σ_9_94.refs.h.m_sweep.c.x - Σ_9_94.refs.n;
            Σ_9_94.refs.o = Σ_9_94.refs.l.m_sweep.c.y + Σ_9_94.refs.g - Σ_9_94.refs.h.m_sweep.c.y - Σ_9_94.refs.a;
            this.m_invMassA = Σ_9_94.refs.h.m_invMass;
            this.m_invMassB = Σ_9_94.refs.l.m_invMass;
            this.m_invIA = Σ_9_94.refs.h.m_invI;
            this.m_invIB = Σ_9_94.refs.l.m_invI;
            this.m_axis.SetV(Σ_9.refs.y.MulMV(Σ_9_94.refs.q.R, this.m_localXAxis1));
            this.m_a1 = (Σ_9_94.refs.j + Σ_9_94.refs.n) * this.m_axis.y - (Σ_9_94.refs.o + Σ_9_94.refs.a) * this.m_axis.x;
            this.m_a2 = Σ_9_94.refs.c * this.m_axis.y - Σ_9_94.refs.g * this.m_axis.x;
            this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
            this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
            this.m_perp.SetV(Σ_9.refs.y.MulMV(Σ_9_94.refs.q.R, this.m_localYAxis1));
            this.m_s1 = (Σ_9_94.refs.j + Σ_9_94.refs.n) * this.m_perp.y - (Σ_9_94.refs.o + Σ_9_94.refs.a) * this.m_perp.x;
            this.m_s2 = Σ_9_94.refs.c * this.m_perp.y - Σ_9_94.refs.g * this.m_perp.x;
            Σ_9_94.refs.q = this.m_invMassA;
            Σ_9_94.refs.n = this.m_invMassB;
            Σ_9_94.refs.a = this.m_invIA;
            Σ_9_94.refs.c = this.m_invIB;
            this.m_K.col1.x = Σ_9_94.refs.q + Σ_9_94.refs.n + Σ_9_94.refs.a * this.m_s1 * this.m_s1 + Σ_9_94.refs.c * this.m_s2 * this.m_s2;
            this.m_K.col1.y = Σ_9_94.refs.a * this.m_s1 * this.m_a1 + Σ_9_94.refs.c * this.m_s2 * this.m_a2;
            this.m_K.col2.x = this.m_K.col1.y;
            this.m_K.col2.y = Σ_9_94.refs.q + Σ_9_94.refs.n + Σ_9_94.refs.a * this.m_a1 * this.m_a1 + Σ_9_94.refs.c * this.m_a2 * this.m_a2;
            if (this.m_enableLimit) {
                Σ_9_94.refs.j = this.m_axis.x * Σ_9_94.refs.j + this.m_axis.y * Σ_9_94.refs.o;
                if (Σ_9.refs.y.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * Σ_9.refs.F.b2_linearSlop) {
                    this.m_limitState = Σ_9.refs.I.e_equalLimits;
                } else if (Σ_9_94.refs.j <= this.m_lowerTranslation) {
                    if (this.m_limitState != Σ_9.refs.I.e_atLowerLimit) {
                        this.m_limitState = Σ_9.refs.I.e_atLowerLimit;
                        this.m_impulse.y = 0;
                    }
                } else if (Σ_9_94.refs.j >= this.m_upperTranslation) {
                    if (this.m_limitState != Σ_9.refs.I.e_atUpperLimit) {
                        this.m_limitState = Σ_9.refs.I.e_atUpperLimit;
                        this.m_impulse.y = 0;
                    }
                } else {
                    this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
                    this.m_impulse.y = 0;
                }
            } else {
                this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
            }
            if (this.m_enableMotor == false) {
                this.m_motorImpulse = 0;
            }
            if (Σ_9_94.refs.d.warmStarting) {
                this.m_impulse.x *= Σ_9_94.refs.d.dtRatio;
                this.m_impulse.y *= Σ_9_94.refs.d.dtRatio;
                this.m_motorImpulse *= Σ_9_94.refs.d.dtRatio;
                Σ_9_94.refs.d = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
                Σ_9_94.refs.j = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
                Σ_9_94.refs.o = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
                Σ_9_94.refs.q = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
                Σ_9_94.refs.h.m_linearVelocity.x -= this.m_invMassA * Σ_9_94.refs.d;
                Σ_9_94.refs.h.m_linearVelocity.y -= this.m_invMassA * Σ_9_94.refs.j;
                Σ_9_94.refs.h.m_angularVelocity -= this.m_invIA * Σ_9_94.refs.o;
                Σ_9_94.refs.l.m_linearVelocity.x += this.m_invMassB * Σ_9_94.refs.d;
                Σ_9_94.refs.l.m_linearVelocity.y += this.m_invMassB * Σ_9_94.refs.j;
                Σ_9_94.refs.l.m_angularVelocity += this.m_invIB * Σ_9_94.refs.q;
            } else {
                this.m_impulse.SetZero();
                this.m_motorImpulse = 0;
            }
        }, Σ_9);
        Σ_9.refs.k.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αsE6D(d) {
            var Σ_9_95 = new Σ.Scope(this, αsE6D, '95', Σ_9, {
                d: d
            }, []);
            Σ_9_95.refs.h = this.m_bodyA, Σ_9_95.refs.l = this.m_bodyB, Σ_9_95.refs.j = Σ_9_95.refs.h.m_linearVelocity, Σ_9_95.refs.o = Σ_9_95.refs.h.m_angularVelocity, Σ_9_95.refs.q = Σ_9_95.refs.l.m_linearVelocity, Σ_9_95.refs.n = Σ_9_95.refs.l.m_angularVelocity, Σ_9_95.refs.a = 0, Σ_9_95.refs.c = 0, Σ_9_95.refs.g = 0, Σ_9_95.refs.b = 0;
            if (this.m_enableMotor && this.m_limitState != Σ_9.refs.I.e_equalLimits) {
                Σ_9_95.refs.b = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (Σ_9_95.refs.q.x - Σ_9_95.refs.j.x) + this.m_axis.y * (Σ_9_95.refs.q.y - Σ_9_95.refs.j.y) + this.m_a2 * Σ_9_95.refs.n - this.m_a1 * Σ_9_95.refs.o));
                Σ_9_95.refs.a = this.m_motorImpulse;
                Σ_9_95.refs.c = Σ_9_95.refs.d.dt * this.m_maxMotorForce;
                this.m_motorImpulse = Σ_9.refs.y.Clamp(this.m_motorImpulse + Σ_9_95.refs.b, -Σ_9_95.refs.c, Σ_9_95.refs.c);
                Σ_9_95.refs.b = this.m_motorImpulse - Σ_9_95.refs.a;
                Σ_9_95.refs.a = Σ_9_95.refs.b * this.m_axis.x;
                Σ_9_95.refs.c = Σ_9_95.refs.b * this.m_axis.y;
                Σ_9_95.refs.g = Σ_9_95.refs.b * this.m_a1;
                Σ_9_95.refs.b = Σ_9_95.refs.b * this.m_a2;
                Σ_9_95.refs.j.x -= this.m_invMassA * Σ_9_95.refs.a;
                Σ_9_95.refs.j.y -= this.m_invMassA * Σ_9_95.refs.c;
                Σ_9_95.refs.o -= this.m_invIA * Σ_9_95.refs.g;
                Σ_9_95.refs.q.x += this.m_invMassB * Σ_9_95.refs.a;
                Σ_9_95.refs.q.y += this.m_invMassB * Σ_9_95.refs.c;
                Σ_9_95.refs.n += this.m_invIB * Σ_9_95.refs.b;
            }
            Σ_9_95.refs.c = this.m_perp.x * (Σ_9_95.refs.q.x - Σ_9_95.refs.j.x) + this.m_perp.y * (Σ_9_95.refs.q.y - Σ_9_95.refs.j.y) + this.m_s2 * Σ_9_95.refs.n - this.m_s1 * Σ_9_95.refs.o;
            if (this.m_enableLimit && this.m_limitState != Σ_9.refs.I.e_inactiveLimit) {
                Σ_9_95.refs.g = this.m_axis.x * (Σ_9_95.refs.q.x - Σ_9_95.refs.j.x) + this.m_axis.y * (Σ_9_95.refs.q.y - Σ_9_95.refs.j.y) + this.m_a2 * Σ_9_95.refs.n - this.m_a1 * Σ_9_95.refs.o;
                Σ_9_95.refs.a = this.m_impulse.Copy();
                Σ_9_95.refs.d = this.m_K.Solve(new Σ_9.refs.w(), -Σ_9_95.refs.c, -Σ_9_95.refs.g);
                this.m_impulse.Add(Σ_9_95.refs.d);
                if (this.m_limitState == Σ_9.refs.I.e_atLowerLimit) {
                    this.m_impulse.y = Σ_9.refs.y.Max(this.m_impulse.y, 0);
                } else if (this.m_limitState == Σ_9.refs.I.e_atUpperLimit) {
                    this.m_impulse.y = Σ_9.refs.y.Min(this.m_impulse.y, 0);
                }
                Σ_9_95.refs.c = -Σ_9_95.refs.c - (this.m_impulse.y - Σ_9_95.refs.a.y) * this.m_K.col2.x;
                Σ_9_95.refs.g = 0;
                Σ_9_95.refs.g = this.m_K.col1.x != 0 ? Σ_9_95.refs.c / this.m_K.col1.x + Σ_9_95.refs.a.x : Σ_9_95.refs.a.x;
                this.m_impulse.x = Σ_9_95.refs.g;
                Σ_9_95.refs.d.x = this.m_impulse.x - Σ_9_95.refs.a.x;
                Σ_9_95.refs.d.y = this.m_impulse.y - Σ_9_95.refs.a.y;
                Σ_9_95.refs.a = Σ_9_95.refs.d.x * this.m_perp.x + Σ_9_95.refs.d.y * this.m_axis.x;
                Σ_9_95.refs.c = Σ_9_95.refs.d.x * this.m_perp.y + Σ_9_95.refs.d.y * this.m_axis.y;
                Σ_9_95.refs.g = Σ_9_95.refs.d.x * this.m_s1 + Σ_9_95.refs.d.y * this.m_a1;
                Σ_9_95.refs.b = Σ_9_95.refs.d.x * this.m_s2 + Σ_9_95.refs.d.y * this.m_a2;
            } else {
                Σ_9_95.refs.d = 0;
                Σ_9_95.refs.d = this.m_K.col1.x != 0 ? -Σ_9_95.refs.c / this.m_K.col1.x : 0;
                this.m_impulse.x += Σ_9_95.refs.d;
                Σ_9_95.refs.a = Σ_9_95.refs.d * this.m_perp.x;
                Σ_9_95.refs.c = Σ_9_95.refs.d * this.m_perp.y;
                Σ_9_95.refs.g = Σ_9_95.refs.d * this.m_s1;
                Σ_9_95.refs.b = Σ_9_95.refs.d * this.m_s2;
            }
            Σ_9_95.refs.j.x -= this.m_invMassA * Σ_9_95.refs.a;
            Σ_9_95.refs.j.y -= this.m_invMassA * Σ_9_95.refs.c;
            Σ_9_95.refs.o -= this.m_invIA * Σ_9_95.refs.g;
            Σ_9_95.refs.q.x += this.m_invMassB * Σ_9_95.refs.a;
            Σ_9_95.refs.q.y += this.m_invMassB * Σ_9_95.refs.c;
            Σ_9_95.refs.n += this.m_invIB * Σ_9_95.refs.b;
            Σ_9_95.refs.h.m_linearVelocity.SetV(Σ_9_95.refs.j);
            Σ_9_95.refs.h.m_angularVelocity = Σ_9_95.refs.o;
            Σ_9_95.refs.l.m_linearVelocity.SetV(Σ_9_95.refs.q);
            Σ_9_95.refs.l.m_angularVelocity = Σ_9_95.refs.n;
        }, Σ_9);
        Σ_9.refs.k.prototype.SolvePositionConstraints = Σ_9.addFunction(function αPVHT() {
            var Σ_9_96 = new Σ.Scope(this, αPVHT, '96', Σ_9, {}, []);
            Σ_9_96.refs.d = this.m_bodyA, Σ_9_96.refs.h = this.m_bodyB, Σ_9_96.refs.l = Σ_9_96.refs.d.m_sweep.c, Σ_9_96.refs.j = Σ_9_96.refs.d.m_sweep.a, Σ_9_96.refs.o = Σ_9_96.refs.h.m_sweep.c, Σ_9_96.refs.q = Σ_9_96.refs.h.m_sweep.a, Σ_9_96.refs.n = undefined, Σ_9_96.refs.a = 0, Σ_9_96.refs.c = 0, Σ_9_96.refs.g = 0, Σ_9_96.refs.b = 0, Σ_9_96.refs.e = Σ_9_96.refs.n = 0, Σ_9_96.refs.f = 0;
            Σ_9_96.refs.c = false;
            Σ_9_96.refs.m = 0, Σ_9_96.refs.r = Σ_9.refs.G.FromAngle(Σ_9_96.refs.j);
            Σ_9_96.refs.g = Σ_9.refs.G.FromAngle(Σ_9_96.refs.q);
            Σ_9_96.refs.n = Σ_9_96.refs.r;
            Σ_9_96.refs.f = this.m_localAnchor1.x - this.m_localCenterA.x;
            Σ_9_96.refs.s = this.m_localAnchor1.y - this.m_localCenterA.y;
            Σ_9_96.refs.a = Σ_9_96.refs.n.col1.x * Σ_9_96.refs.f + Σ_9_96.refs.n.col2.x * Σ_9_96.refs.s;
            Σ_9_96.refs.s = Σ_9_96.refs.n.col1.y * Σ_9_96.refs.f + Σ_9_96.refs.n.col2.y * Σ_9_96.refs.s;
            Σ_9_96.refs.f = Σ_9_96.refs.a;
            Σ_9_96.refs.n = Σ_9_96.refs.g;
            Σ_9_96.refs.g = this.m_localAnchor2.x - this.m_localCenterB.x;
            Σ_9_96.refs.b = this.m_localAnchor2.y - this.m_localCenterB.y;
            Σ_9_96.refs.a = Σ_9_96.refs.n.col1.x * Σ_9_96.refs.g + Σ_9_96.refs.n.col2.x * Σ_9_96.refs.b;
            Σ_9_96.refs.b = Σ_9_96.refs.n.col1.y * Σ_9_96.refs.g + Σ_9_96.refs.n.col2.y * Σ_9_96.refs.b;
            Σ_9_96.refs.g = Σ_9_96.refs.a;
            Σ_9_96.refs.n = Σ_9_96.refs.o.x + Σ_9_96.refs.g - Σ_9_96.refs.l.x - Σ_9_96.refs.f;
            Σ_9_96.refs.a = Σ_9_96.refs.o.y + Σ_9_96.refs.b - Σ_9_96.refs.l.y - Σ_9_96.refs.s;
            if (this.m_enableLimit) {
                this.m_axis = Σ_9.refs.y.MulMV(Σ_9_96.refs.r, this.m_localXAxis1);
                this.m_a1 = (Σ_9_96.refs.n + Σ_9_96.refs.f) * this.m_axis.y - (Σ_9_96.refs.a + Σ_9_96.refs.s) * this.m_axis.x;
                this.m_a2 = Σ_9_96.refs.g * this.m_axis.y - Σ_9_96.refs.b * this.m_axis.x;
                Σ_9_96.refs.v = this.m_axis.x * Σ_9_96.refs.n + this.m_axis.y * Σ_9_96.refs.a;
                if (Σ_9.refs.y.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * Σ_9.refs.F.b2_linearSlop) {
                    Σ_9_96.refs.m = Σ_9.refs.y.Clamp(Σ_9_96.refs.v, -Σ_9.refs.F.b2_maxLinearCorrection, Σ_9.refs.F.b2_maxLinearCorrection);
                    Σ_9_96.refs.e = Σ_9.refs.y.Abs(Σ_9_96.refs.v);
                    Σ_9_96.refs.c = true;
                } else if (Σ_9_96.refs.v <= this.m_lowerTranslation) {
                    Σ_9_96.refs.m = Σ_9.refs.y.Clamp(Σ_9_96.refs.v - this.m_lowerTranslation + Σ_9.refs.F.b2_linearSlop, -Σ_9.refs.F.b2_maxLinearCorrection, 0);
                    Σ_9_96.refs.e = this.m_lowerTranslation - Σ_9_96.refs.v;
                    Σ_9_96.refs.c = true;
                } else if (Σ_9_96.refs.v >= this.m_upperTranslation) {
                    Σ_9_96.refs.m = Σ_9.refs.y.Clamp(Σ_9_96.refs.v - this.m_upperTranslation + Σ_9.refs.F.b2_linearSlop, 0, Σ_9.refs.F.b2_maxLinearCorrection);
                    Σ_9_96.refs.e = Σ_9_96.refs.v - this.m_upperTranslation;
                    Σ_9_96.refs.c = true;
                }
            }
            this.m_perp = Σ_9.refs.y.MulMV(Σ_9_96.refs.r, this.m_localYAxis1);
            this.m_s1 = (Σ_9_96.refs.n + Σ_9_96.refs.f) * this.m_perp.y - (Σ_9_96.refs.a + Σ_9_96.refs.s) * this.m_perp.x;
            this.m_s2 = Σ_9_96.refs.g * this.m_perp.y - Σ_9_96.refs.b * this.m_perp.x;
            Σ_9_96.refs.r = new Σ_9.refs.w();
            Σ_9_96.refs.s = this.m_perp.x * Σ_9_96.refs.n + this.m_perp.y * Σ_9_96.refs.a;
            Σ_9_96.refs.e = Σ_9.refs.y.Max(Σ_9_96.refs.e, Σ_9.refs.y.Abs(Σ_9_96.refs.s));
            Σ_9_96.refs.f = 0;
            if (Σ_9_96.refs.c) {
                Σ_9_96.refs.c = this.m_invMassA;
                Σ_9_96.refs.g = this.m_invMassB;
                Σ_9_96.refs.b = this.m_invIA;
                Σ_9_96.refs.n = this.m_invIB;
                this.m_K.col1.x = Σ_9_96.refs.c + Σ_9_96.refs.g + Σ_9_96.refs.b * this.m_s1 * this.m_s1 + Σ_9_96.refs.n * this.m_s2 * this.m_s2;
                this.m_K.col1.y = Σ_9_96.refs.b * this.m_s1 * this.m_a1 + Σ_9_96.refs.n * this.m_s2 * this.m_a2;
                this.m_K.col2.x = this.m_K.col1.y;
                this.m_K.col2.y = Σ_9_96.refs.c + Σ_9_96.refs.g + Σ_9_96.refs.b * this.m_a1 * this.m_a1 + Σ_9_96.refs.n * this.m_a2 * this.m_a2;
                this.m_K.Solve(Σ_9_96.refs.r, -Σ_9_96.refs.s, -Σ_9_96.refs.m);
            } else {
                Σ_9_96.refs.c = this.m_invMassA;
                Σ_9_96.refs.g = this.m_invMassB;
                Σ_9_96.refs.b = this.m_invIA;
                Σ_9_96.refs.n = this.m_invIB;
                Σ_9_96.refs.m = Σ_9_96.refs.c + Σ_9_96.refs.g + Σ_9_96.refs.b * this.m_s1 * this.m_s1 + Σ_9_96.refs.n * this.m_s2 * this.m_s2;
                Σ_9_96.refs.c = 0;
                Σ_9_96.refs.c = Σ_9_96.refs.m != 0 ? -Σ_9_96.refs.s / Σ_9_96.refs.m : 0;
                Σ_9_96.refs.r.x = Σ_9_96.refs.c;
                Σ_9_96.refs.r.y = 0;
            }
            Σ_9_96.refs.m = Σ_9_96.refs.r.x * this.m_perp.x + Σ_9_96.refs.r.y * this.m_axis.x;
            Σ_9_96.refs.c = Σ_9_96.refs.r.x * this.m_perp.y + Σ_9_96.refs.r.y * this.m_axis.y;
            Σ_9_96.refs.s = Σ_9_96.refs.r.x * this.m_s1 + Σ_9_96.refs.r.y * this.m_a1;
            Σ_9_96.refs.r = Σ_9_96.refs.r.x * this.m_s2 + Σ_9_96.refs.r.y * this.m_a2;
            Σ_9_96.refs.l.x -= this.m_invMassA * Σ_9_96.refs.m;
            Σ_9_96.refs.l.y -= this.m_invMassA * Σ_9_96.refs.c;
            Σ_9_96.refs.j -= this.m_invIA * Σ_9_96.refs.s;
            Σ_9_96.refs.o.x += this.m_invMassB * Σ_9_96.refs.m;
            Σ_9_96.refs.o.y += this.m_invMassB * Σ_9_96.refs.c;
            Σ_9_96.refs.q += this.m_invIB * Σ_9_96.refs.r;
            Σ_9_96.refs.d.m_sweep.a = Σ_9_96.refs.j;
            Σ_9_96.refs.h.m_sweep.a = Σ_9_96.refs.q;
            Σ_9_96.refs.d.SynchronizeTransform();
            Σ_9_96.refs.h.SynchronizeTransform();
            return Σ_9_96.refs.e <= Σ_9.refs.F.b2_linearSlop && Σ_9_96.refs.f <= Σ_9.refs.F.b2_angularSlop;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.z, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.z.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.z.b2LineJointDef = Σ_9.addFunction(function αC8sa() {
            var Σ_9_97 = new Σ.Scope(this, αC8sa, '97', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
            this.localAnchorA = new Σ_9.refs.w();
            this.localAnchorB = new Σ_9.refs.w();
            this.localAxisA = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.z.prototype.b2LineJointDef = Σ_9.addFunction(function αlMcs() {
            var Σ_9_98 = new Σ.Scope(this, αlMcs, '98', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_lineJoint;
            this.localAxisA.Set(1, 0);
            this.enableLimit = false;
            this.upperTranslation = this.lowerTranslation = 0;
            this.enableMotor = false;
            this.motorSpeed = this.maxMotorForce = 0;
        }, Σ_9);
        Σ_9.refs.z.prototype.Initialize = Σ_9.addFunction(function αhzZi(d, h, l, j) {
            var Σ_9_99 = new Σ.Scope(this, αhzZi, '99', Σ_9, {
                d: d,
                h: h,
                l: l,
                j: j
            }, []);
            this.bodyA = Σ_9_99.refs.d;
            this.bodyB = Σ_9_99.refs.h;
            this.localAnchorA = this.bodyA.GetLocalPoint(Σ_9_99.refs.l);
            this.localAnchorB = this.bodyB.GetLocalPoint(Σ_9_99.refs.l);
            this.localAxisA = this.bodyA.GetLocalVector(Σ_9_99.refs.j);
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.u, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.u.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.u.b2MouseJoint = Σ_9.addFunction(function αMvNm() {
            var Σ_9_100 = new Σ.Scope(this, αMvNm, '100', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.K = new Σ_9.refs.G();
            this.K1 = new Σ_9.refs.G();
            this.K2 = new Σ_9.refs.G();
            this.m_localAnchor = new Σ_9.refs.w();
            this.m_target = new Σ_9.refs.w();
            this.m_impulse = new Σ_9.refs.w();
            this.m_mass = new Σ_9.refs.G();
            this.m_C = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.u.prototype.GetAnchorA = Σ_9.addFunction(function αWPva() {
            var Σ_9_101 = new Σ.Scope(this, αWPva, '101', Σ_9, {}, []);
            return this.m_target;
        }, Σ_9);
        Σ_9.refs.u.prototype.GetAnchorB = Σ_9.addFunction(function αnIuC() {
            var Σ_9_102 = new Σ.Scope(this, αnIuC, '102', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor);
        }, Σ_9);
        Σ_9.refs.u.prototype.GetReactionForce = Σ_9.addFunction(function αcEhd(d) {
            var Σ_9_103 = new Σ.Scope(this, αcEhd, '103', Σ_9, {
                d: d
            }, []);
            if (Σ_9_103.refs.d === undefined) {
                Σ_9_103.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_103.refs.d * this.m_impulse.x, Σ_9_103.refs.d * this.m_impulse.y);
        }, Σ_9);
        Σ_9.refs.u.prototype.GetReactionTorque = Σ_9.addFunction(function αpxmZ() {
            var Σ_9_104 = new Σ.Scope(this, αpxmZ, '104', Σ_9, {}, []);
            return 0;
        }, Σ_9);
        Σ_9.refs.u.prototype.GetTarget = Σ_9.addFunction(function α0Q6W() {
            var Σ_9_105 = new Σ.Scope(this, α0Q6W, '105', Σ_9, {}, []);
            return this.m_target;
        }, Σ_9);
        Σ_9.refs.u.prototype.SetTarget = Σ_9.addFunction(function αOTSv(d) {
            var Σ_9_106 = new Σ.Scope(this, αOTSv, '106', Σ_9, {
                d: d
            }, []);
            this.m_bodyB.IsAwake() == false && this.m_bodyB.SetAwake(true);
            this.m_target = Σ_9_106.refs.d;
        }, Σ_9);
        Σ_9.refs.u.prototype.GetMaxForce = Σ_9.addFunction(function α1gQI() {
            var Σ_9_107 = new Σ.Scope(this, α1gQI, '107', Σ_9, {}, []);
            return this.m_maxForce;
        }, Σ_9);
        Σ_9.refs.u.prototype.SetMaxForce = Σ_9.addFunction(function αv7Ga(d) {
            var Σ_9_108 = new Σ.Scope(this, αv7Ga, '108', Σ_9, {
                d: d
            }, []);
            if (Σ_9_108.refs.d === undefined) {
                Σ_9_108.refs.d = 0;
            }
            this.m_maxForce = Σ_9_108.refs.d;
        }, Σ_9);
        Σ_9.refs.u.prototype.GetFrequency = Σ_9.addFunction(function αD7H2() {
            var Σ_9_109 = new Σ.Scope(this, αD7H2, '109', Σ_9, {}, []);
            return this.m_frequencyHz;
        }, Σ_9);
        Σ_9.refs.u.prototype.SetFrequency = Σ_9.addFunction(function αeiHd(d) {
            var Σ_9_110 = new Σ.Scope(this, αeiHd, '110', Σ_9, {
                d: d
            }, []);
            if (Σ_9_110.refs.d === undefined) {
                Σ_9_110.refs.d = 0;
            }
            this.m_frequencyHz = Σ_9_110.refs.d;
        }, Σ_9);
        Σ_9.refs.u.prototype.GetDampingRatio = Σ_9.addFunction(function αBIlt() {
            var Σ_9_111 = new Σ.Scope(this, αBIlt, '111', Σ_9, {}, []);
            return this.m_dampingRatio;
        }, Σ_9);
        Σ_9.refs.u.prototype.SetDampingRatio = Σ_9.addFunction(function αmxqP(d) {
            var Σ_9_112 = new Σ.Scope(this, αmxqP, '112', Σ_9, {
                d: d
            }, []);
            if (Σ_9_112.refs.d === undefined) {
                Σ_9_112.refs.d = 0;
            }
            this.m_dampingRatio = Σ_9_112.refs.d;
        }, Σ_9);
        Σ_9.refs.u.prototype.b2MouseJoint = Σ_9.addFunction(function αs7LT(d) {
            var Σ_9_113 = new Σ.Scope(this, αs7LT, '113', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_113.refs.d);
            this.m_target.SetV(Σ_9_113.refs.d.target);
            Σ_9_113.refs.h = this.m_target.x - this.m_bodyB.m_xf.position.x, Σ_9_113.refs.l = this.m_target.y - this.m_bodyB.m_xf.position.y, Σ_9_113.refs.j = this.m_bodyB.m_xf.R;
            this.m_localAnchor.x = Σ_9_113.refs.h * Σ_9_113.refs.j.col1.x + Σ_9_113.refs.l * Σ_9_113.refs.j.col1.y;
            this.m_localAnchor.y = Σ_9_113.refs.h * Σ_9_113.refs.j.col2.x + Σ_9_113.refs.l * Σ_9_113.refs.j.col2.y;
            this.m_maxForce = Σ_9_113.refs.d.maxForce;
            this.m_impulse.SetZero();
            this.m_frequencyHz = Σ_9_113.refs.d.frequencyHz;
            this.m_dampingRatio = Σ_9_113.refs.d.dampingRatio;
            this.m_gamma = this.m_beta = 0;
        }, Σ_9);
        Σ_9.refs.u.prototype.InitVelocityConstraints = Σ_9.addFunction(function αyDCO(d) {
            var Σ_9_114 = new Σ.Scope(this, αyDCO, '114', Σ_9, {
                d: d
            }, []);
            Σ_9_114.refs.h = this.m_bodyB, Σ_9_114.refs.l = Σ_9_114.refs.h.GetMass(), Σ_9_114.refs.j = 2 * Math.PI * this.m_frequencyHz, Σ_9_114.refs.o = Σ_9_114.refs.l * Σ_9_114.refs.j * Σ_9_114.refs.j;
            this.m_gamma = Σ_9_114.refs.d.dt * (2 * Σ_9_114.refs.l * this.m_dampingRatio * Σ_9_114.refs.j + Σ_9_114.refs.d.dt * Σ_9_114.refs.o);
            this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0;
            this.m_beta = Σ_9_114.refs.d.dt * Σ_9_114.refs.o * this.m_gamma;
            Σ_9_114.refs.o = Σ_9_114.refs.h.m_xf.R;
            Σ_9_114.refs.l = this.m_localAnchor.x - Σ_9_114.refs.h.m_sweep.localCenter.x;
            Σ_9_114.refs.j = this.m_localAnchor.y - Σ_9_114.refs.h.m_sweep.localCenter.y;
            Σ_9_114.refs.q = Σ_9_114.refs.o.col1.x * Σ_9_114.refs.l + Σ_9_114.refs.o.col2.x * Σ_9_114.refs.j;
            Σ_9_114.refs.j = Σ_9_114.refs.o.col1.y * Σ_9_114.refs.l + Σ_9_114.refs.o.col2.y * Σ_9_114.refs.j;
            Σ_9_114.refs.l = Σ_9_114.refs.q;
            Σ_9_114.refs.o = Σ_9_114.refs.h.m_invMass;
            Σ_9_114.refs.q = Σ_9_114.refs.h.m_invI;
            this.K1.col1.x = Σ_9_114.refs.o;
            this.K1.col2.x = 0;
            this.K1.col1.y = 0;
            this.K1.col2.y = Σ_9_114.refs.o;
            this.K2.col1.x = Σ_9_114.refs.q * Σ_9_114.refs.j * Σ_9_114.refs.j;
            this.K2.col2.x = -Σ_9_114.refs.q * Σ_9_114.refs.l * Σ_9_114.refs.j;
            this.K2.col1.y = -Σ_9_114.refs.q * Σ_9_114.refs.l * Σ_9_114.refs.j;
            this.K2.col2.y = Σ_9_114.refs.q * Σ_9_114.refs.l * Σ_9_114.refs.l;
            this.K.SetM(this.K1);
            this.K.AddM(this.K2);
            this.K.col1.x += this.m_gamma;
            this.K.col2.y += this.m_gamma;
            this.K.GetInverse(this.m_mass);
            this.m_C.x = Σ_9_114.refs.h.m_sweep.c.x + Σ_9_114.refs.l - this.m_target.x;
            this.m_C.y = Σ_9_114.refs.h.m_sweep.c.y + Σ_9_114.refs.j - this.m_target.y;
            Σ_9_114.refs.h.m_angularVelocity *= 0.98;
            this.m_impulse.x *= Σ_9_114.refs.d.dtRatio;
            this.m_impulse.y *= Σ_9_114.refs.d.dtRatio;
            Σ_9_114.refs.h.m_linearVelocity.x += Σ_9_114.refs.o * this.m_impulse.x;
            Σ_9_114.refs.h.m_linearVelocity.y += Σ_9_114.refs.o * this.m_impulse.y;
            Σ_9_114.refs.h.m_angularVelocity += Σ_9_114.refs.q * (Σ_9_114.refs.l * this.m_impulse.y - Σ_9_114.refs.j * this.m_impulse.x);
        }, Σ_9);
        Σ_9.refs.u.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αDfcg(d) {
            var Σ_9_115 = new Σ.Scope(this, αDfcg, '115', Σ_9, {
                d: d
            }, []);
            Σ_9_115.refs.h = this.m_bodyB, Σ_9_115.refs.l = undefined, Σ_9_115.refs.j = 0, Σ_9_115.refs.o = 0;
            Σ_9_115.refs.l = Σ_9_115.refs.h.m_xf.R;
            Σ_9_115.refs.q = this.m_localAnchor.x - Σ_9_115.refs.h.m_sweep.localCenter.x, Σ_9_115.refs.n = this.m_localAnchor.y - Σ_9_115.refs.h.m_sweep.localCenter.y;
            Σ_9_115.refs.j = Σ_9_115.refs.l.col1.x * Σ_9_115.refs.q + Σ_9_115.refs.l.col2.x * Σ_9_115.refs.n;
            Σ_9_115.refs.n = Σ_9_115.refs.l.col1.y * Σ_9_115.refs.q + Σ_9_115.refs.l.col2.y * Σ_9_115.refs.n;
            Σ_9_115.refs.q = Σ_9_115.refs.j;
            Σ_9_115.refs.j = Σ_9_115.refs.h.m_linearVelocity.x + -Σ_9_115.refs.h.m_angularVelocity * Σ_9_115.refs.n;
            Σ_9_115.refs.a = Σ_9_115.refs.h.m_linearVelocity.y + Σ_9_115.refs.h.m_angularVelocity * Σ_9_115.refs.q;
            Σ_9_115.refs.l = this.m_mass;
            Σ_9_115.refs.j = Σ_9_115.refs.j + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
            Σ_9_115.refs.o = Σ_9_115.refs.a + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
            Σ_9_115.refs.a = -(Σ_9_115.refs.l.col1.x * Σ_9_115.refs.j + Σ_9_115.refs.l.col2.x * Σ_9_115.refs.o);
            Σ_9_115.refs.o = -(Σ_9_115.refs.l.col1.y * Σ_9_115.refs.j + Σ_9_115.refs.l.col2.y * Σ_9_115.refs.o);
            Σ_9_115.refs.l = this.m_impulse.x;
            Σ_9_115.refs.j = this.m_impulse.y;
            this.m_impulse.x += Σ_9_115.refs.a;
            this.m_impulse.y += Σ_9_115.refs.o;
            Σ_9_115.refs.d = Σ_9_115.refs.d.dt * this.m_maxForce;
            this.m_impulse.LengthSquared() > Σ_9_115.refs.d * Σ_9_115.refs.d && this.m_impulse.Multiply(Σ_9_115.refs.d / this.m_impulse.Length());
            Σ_9_115.refs.a = this.m_impulse.x - Σ_9_115.refs.l;
            Σ_9_115.refs.o = this.m_impulse.y - Σ_9_115.refs.j;
            Σ_9_115.refs.h.m_linearVelocity.x += Σ_9_115.refs.h.m_invMass * Σ_9_115.refs.a;
            Σ_9_115.refs.h.m_linearVelocity.y += Σ_9_115.refs.h.m_invMass * Σ_9_115.refs.o;
            Σ_9_115.refs.h.m_angularVelocity += Σ_9_115.refs.h.m_invI * (Σ_9_115.refs.q * Σ_9_115.refs.o - Σ_9_115.refs.n * Σ_9_115.refs.a);
        }, Σ_9);
        Σ_9.refs.u.prototype.SolvePositionConstraints = Σ_9.addFunction(function α4sNZ() {
            var Σ_9_116 = new Σ.Scope(this, α4sNZ, '116', Σ_9, {}, []);
            return true;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.D, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.D.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.D.b2MouseJointDef = Σ_9.addFunction(function αUDcF() {
            var Σ_9_117 = new Σ.Scope(this, αUDcF, '117', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
            this.target = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.D.prototype.b2MouseJointDef = Σ_9.addFunction(function αt9uW() {
            var Σ_9_118 = new Σ.Scope(this, αt9uW, '118', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_mouseJoint;
            this.maxForce = 0;
            this.frequencyHz = 5;
            this.dampingRatio = 0.7;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.H, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.H.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.H.b2PrismaticJoint = Σ_9.addFunction(function αHCW3() {
            var Σ_9_119 = new Σ.Scope(this, αHCW3, '119', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.m_localAnchor1 = new Σ_9.refs.w();
            this.m_localAnchor2 = new Σ_9.refs.w();
            this.m_localXAxis1 = new Σ_9.refs.w();
            this.m_localYAxis1 = new Σ_9.refs.w();
            this.m_axis = new Σ_9.refs.w();
            this.m_perp = new Σ_9.refs.w();
            this.m_K = new Σ_9.refs.K();
            this.m_impulse = new Σ_9.refs.A();
        }, Σ_9);
        Σ_9.refs.H.prototype.GetAnchorA = Σ_9.addFunction(function αqxAN() {
            var Σ_9_120 = new Σ.Scope(this, αqxAN, '120', Σ_9, {}, []);
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
        }, Σ_9);
        Σ_9.refs.H.prototype.GetAnchorB = Σ_9.addFunction(function αBL56() {
            var Σ_9_121 = new Σ.Scope(this, αBL56, '121', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
        }, Σ_9);
        Σ_9.refs.H.prototype.GetReactionForce = Σ_9.addFunction(function αeR5G(d) {
            var Σ_9_122 = new Σ.Scope(this, αeR5G, '122', Σ_9, {
                d: d
            }, []);
            if (Σ_9_122.refs.d === undefined) {
                Σ_9_122.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_122.refs.d * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), Σ_9_122.refs.d * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y));
        }, Σ_9);
        Σ_9.refs.H.prototype.GetReactionTorque = Σ_9.addFunction(function αKIP2(d) {
            var Σ_9_123 = new Σ.Scope(this, αKIP2, '123', Σ_9, {
                d: d
            }, []);
            if (Σ_9_123.refs.d === undefined) {
                Σ_9_123.refs.d = 0;
            }
            return Σ_9_123.refs.d * this.m_impulse.y;
        }, Σ_9);
        Σ_9.refs.H.prototype.GetJointTranslation = Σ_9.addFunction(function αl7D2() {
            var Σ_9_124 = new Σ.Scope(this, αl7D2, '124', Σ_9, {}, []);
            Σ_9_124.refs.d = this.m_bodyA, Σ_9_124.refs.h = this.m_bodyB, Σ_9_124.refs.l = Σ_9_124.refs.d.GetWorldPoint(this.m_localAnchor1), Σ_9_124.refs.j = Σ_9_124.refs.h.GetWorldPoint(this.m_localAnchor2);
            Σ_9_124.refs.h = Σ_9_124.refs.j.x - Σ_9_124.refs.l.x;
            Σ_9_124.refs.l = Σ_9_124.refs.j.y - Σ_9_124.refs.l.y;
            Σ_9_124.refs.d = Σ_9_124.refs.d.GetWorldVector(this.m_localXAxis1);
            return Σ_9_124.refs.d.x * Σ_9_124.refs.h + Σ_9_124.refs.d.y * Σ_9_124.refs.l;
        }, Σ_9);
        Σ_9.refs.H.prototype.GetJointSpeed = Σ_9.addFunction(function αgLiV() {
            var Σ_9_125 = new Σ.Scope(this, αgLiV, '125', Σ_9, {}, []);
            Σ_9_125.refs.d = this.m_bodyA, Σ_9_125.refs.h = this.m_bodyB, Σ_9_125.refs.l = undefined;
            Σ_9_125.refs.l = Σ_9_125.refs.d.m_xf.R;
            Σ_9_125.refs.j = this.m_localAnchor1.x - Σ_9_125.refs.d.m_sweep.localCenter.x, Σ_9_125.refs.o = this.m_localAnchor1.y - Σ_9_125.refs.d.m_sweep.localCenter.y, Σ_9_125.refs.q = Σ_9_125.refs.l.col1.x * Σ_9_125.refs.j + Σ_9_125.refs.l.col2.x * Σ_9_125.refs.o;
            Σ_9_125.refs.o = Σ_9_125.refs.l.col1.y * Σ_9_125.refs.j + Σ_9_125.refs.l.col2.y * Σ_9_125.refs.o;
            Σ_9_125.refs.j = Σ_9_125.refs.q;
            Σ_9_125.refs.l = Σ_9_125.refs.h.m_xf.R;
            Σ_9_125.refs.n = this.m_localAnchor2.x - Σ_9_125.refs.h.m_sweep.localCenter.x, Σ_9_125.refs.a = this.m_localAnchor2.y - Σ_9_125.refs.h.m_sweep.localCenter.y;
            Σ_9_125.refs.q = Σ_9_125.refs.l.col1.x * Σ_9_125.refs.n + Σ_9_125.refs.l.col2.x * Σ_9_125.refs.a;
            Σ_9_125.refs.a = Σ_9_125.refs.l.col1.y * Σ_9_125.refs.n + Σ_9_125.refs.l.col2.y * Σ_9_125.refs.a;
            Σ_9_125.refs.n = Σ_9_125.refs.q;
            Σ_9_125.refs.l = Σ_9_125.refs.h.m_sweep.c.x + Σ_9_125.refs.n - (Σ_9_125.refs.d.m_sweep.c.x + Σ_9_125.refs.j);
            Σ_9_125.refs.q = Σ_9_125.refs.h.m_sweep.c.y + Σ_9_125.refs.a - (Σ_9_125.refs.d.m_sweep.c.y + Σ_9_125.refs.o);
            Σ_9_125.refs.c = Σ_9_125.refs.d.GetWorldVector(this.m_localXAxis1), Σ_9_125.refs.g = Σ_9_125.refs.d.m_linearVelocity, Σ_9_125.refs.b = Σ_9_125.refs.h.m_linearVelocity;
            Σ_9_125.refs.d = Σ_9_125.refs.d.m_angularVelocity;
            Σ_9_125.refs.h = Σ_9_125.refs.h.m_angularVelocity;
            return Σ_9_125.refs.l * -Σ_9_125.refs.d * Σ_9_125.refs.c.y + Σ_9_125.refs.q * Σ_9_125.refs.d * Σ_9_125.refs.c.x + (Σ_9_125.refs.c.x * (Σ_9_125.refs.b.x + -Σ_9_125.refs.h * Σ_9_125.refs.a - Σ_9_125.refs.g.x - -Σ_9_125.refs.d * Σ_9_125.refs.o) + Σ_9_125.refs.c.y * (Σ_9_125.refs.b.y + Σ_9_125.refs.h * Σ_9_125.refs.n - Σ_9_125.refs.g.y - Σ_9_125.refs.d * Σ_9_125.refs.j));
        }, Σ_9);
        Σ_9.refs.H.prototype.IsLimitEnabled = Σ_9.addFunction(function αLcwU() {
            var Σ_9_126 = new Σ.Scope(this, αLcwU, '126', Σ_9, {}, []);
            return this.m_enableLimit;
        }, Σ_9);
        Σ_9.refs.H.prototype.EnableLimit = Σ_9.addFunction(function α1cZK(d) {
            var Σ_9_127 = new Σ.Scope(this, α1cZK, '127', Σ_9, {
                d: d
            }, []);
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableLimit = Σ_9_127.refs.d;
        }, Σ_9);
        Σ_9.refs.H.prototype.GetLowerLimit = Σ_9.addFunction(function αtLu9() {
            var Σ_9_128 = new Σ.Scope(this, αtLu9, '128', Σ_9, {}, []);
            return this.m_lowerTranslation;
        }, Σ_9);
        Σ_9.refs.H.prototype.GetUpperLimit = Σ_9.addFunction(function α2SZX() {
            var Σ_9_129 = new Σ.Scope(this, α2SZX, '129', Σ_9, {}, []);
            return this.m_upperTranslation;
        }, Σ_9);
        Σ_9.refs.H.prototype.SetLimits = Σ_9.addFunction(function αZu8e(d, h) {
            var Σ_9_130 = new Σ.Scope(this, αZu8e, '130', Σ_9, {
                d: d,
                h: h
            }, []);
            if (Σ_9_130.refs.d === undefined) {
                Σ_9_130.refs.d = 0;
            }
            if (Σ_9_130.refs.h === undefined) {
                Σ_9_130.refs.h = 0;
            }
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_lowerTranslation = Σ_9_130.refs.d;
            this.m_upperTranslation = Σ_9_130.refs.h;
        }, Σ_9);
        Σ_9.refs.H.prototype.IsMotorEnabled = Σ_9.addFunction(function α4d5u() {
            var Σ_9_131 = new Σ.Scope(this, α4d5u, '131', Σ_9, {}, []);
            return this.m_enableMotor;
        }, Σ_9);
        Σ_9.refs.H.prototype.EnableMotor = Σ_9.addFunction(function αwXh0(d) {
            var Σ_9_132 = new Σ.Scope(this, αwXh0, '132', Σ_9, {
                d: d
            }, []);
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_enableMotor = Σ_9_132.refs.d;
        }, Σ_9);
        Σ_9.refs.H.prototype.SetMotorSpeed = Σ_9.addFunction(function αQMuA(d) {
            var Σ_9_133 = new Σ.Scope(this, αQMuA, '133', Σ_9, {
                d: d
            }, []);
            if (Σ_9_133.refs.d === undefined) {
                Σ_9_133.refs.d = 0;
            }
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_motorSpeed = Σ_9_133.refs.d;
        }, Σ_9);
        Σ_9.refs.H.prototype.GetMotorSpeed = Σ_9.addFunction(function α0km5() {
            var Σ_9_134 = new Σ.Scope(this, α0km5, '134', Σ_9, {}, []);
            return this.m_motorSpeed;
        }, Σ_9);
        Σ_9.refs.H.prototype.SetMaxMotorForce = Σ_9.addFunction(function α6p7C(d) {
            var Σ_9_135 = new Σ.Scope(this, α6p7C, '135', Σ_9, {
                d: d
            }, []);
            if (Σ_9_135.refs.d === undefined) {
                Σ_9_135.refs.d = 0;
            }
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_maxMotorForce = Σ_9_135.refs.d;
        }, Σ_9);
        Σ_9.refs.H.prototype.GetMotorForce = Σ_9.addFunction(function α4koi() {
            var Σ_9_136 = new Σ.Scope(this, α4koi, '136', Σ_9, {}, []);
            return this.m_motorImpulse;
        }, Σ_9);
        Σ_9.refs.H.prototype.b2PrismaticJoint = Σ_9.addFunction(function α9oKN(d) {
            var Σ_9_137 = new Σ.Scope(this, α9oKN, '137', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_137.refs.d);
            this.m_localAnchor1.SetV(Σ_9_137.refs.d.localAnchorA);
            this.m_localAnchor2.SetV(Σ_9_137.refs.d.localAnchorB);
            this.m_localXAxis1.SetV(Σ_9_137.refs.d.localAxisA);
            this.m_localYAxis1.x = -this.m_localXAxis1.y;
            this.m_localYAxis1.y = this.m_localXAxis1.x;
            this.m_refAngle = Σ_9_137.refs.d.referenceAngle;
            this.m_impulse.SetZero();
            this.m_motorImpulse = this.m_motorMass = 0;
            this.m_lowerTranslation = Σ_9_137.refs.d.lowerTranslation;
            this.m_upperTranslation = Σ_9_137.refs.d.upperTranslation;
            this.m_maxMotorForce = Σ_9_137.refs.d.maxMotorForce;
            this.m_motorSpeed = Σ_9_137.refs.d.motorSpeed;
            this.m_enableLimit = Σ_9_137.refs.d.enableLimit;
            this.m_enableMotor = Σ_9_137.refs.d.enableMotor;
            this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
            this.m_axis.SetZero();
            this.m_perp.SetZero();
        }, Σ_9);
        Σ_9.refs.H.prototype.InitVelocityConstraints = Σ_9.addFunction(function αN9Tx(d) {
            var Σ_9_138 = new Σ.Scope(this, αN9Tx, '138', Σ_9, {
                d: d
            }, []);
            Σ_9_138.refs.h = this.m_bodyA, Σ_9_138.refs.l = this.m_bodyB, Σ_9_138.refs.j = undefined, Σ_9_138.refs.o = 0;
            this.m_localCenterA.SetV(Σ_9_138.refs.h.GetLocalCenter());
            this.m_localCenterB.SetV(Σ_9_138.refs.l.GetLocalCenter());
            Σ_9_138.refs.q = Σ_9_138.refs.h.GetTransform();
            Σ_9_138.refs.l.GetTransform();
            Σ_9_138.refs.j = Σ_9_138.refs.h.m_xf.R;
            Σ_9_138.refs.n = this.m_localAnchor1.x - this.m_localCenterA.x, Σ_9_138.refs.a = this.m_localAnchor1.y - this.m_localCenterA.y;
            Σ_9_138.refs.o = Σ_9_138.refs.j.col1.x * Σ_9_138.refs.n + Σ_9_138.refs.j.col2.x * Σ_9_138.refs.a;
            Σ_9_138.refs.a = Σ_9_138.refs.j.col1.y * Σ_9_138.refs.n + Σ_9_138.refs.j.col2.y * Σ_9_138.refs.a;
            Σ_9_138.refs.n = Σ_9_138.refs.o;
            Σ_9_138.refs.j = Σ_9_138.refs.l.m_xf.R;
            Σ_9_138.refs.c = this.m_localAnchor2.x - this.m_localCenterB.x, Σ_9_138.refs.g = this.m_localAnchor2.y - this.m_localCenterB.y;
            Σ_9_138.refs.o = Σ_9_138.refs.j.col1.x * Σ_9_138.refs.c + Σ_9_138.refs.j.col2.x * Σ_9_138.refs.g;
            Σ_9_138.refs.g = Σ_9_138.refs.j.col1.y * Σ_9_138.refs.c + Σ_9_138.refs.j.col2.y * Σ_9_138.refs.g;
            Σ_9_138.refs.c = Σ_9_138.refs.o;
            Σ_9_138.refs.j = Σ_9_138.refs.l.m_sweep.c.x + Σ_9_138.refs.c - Σ_9_138.refs.h.m_sweep.c.x - Σ_9_138.refs.n;
            Σ_9_138.refs.o = Σ_9_138.refs.l.m_sweep.c.y + Σ_9_138.refs.g - Σ_9_138.refs.h.m_sweep.c.y - Σ_9_138.refs.a;
            this.m_invMassA = Σ_9_138.refs.h.m_invMass;
            this.m_invMassB = Σ_9_138.refs.l.m_invMass;
            this.m_invIA = Σ_9_138.refs.h.m_invI;
            this.m_invIB = Σ_9_138.refs.l.m_invI;
            this.m_axis.SetV(Σ_9.refs.y.MulMV(Σ_9_138.refs.q.R, this.m_localXAxis1));
            this.m_a1 = (Σ_9_138.refs.j + Σ_9_138.refs.n) * this.m_axis.y - (Σ_9_138.refs.o + Σ_9_138.refs.a) * this.m_axis.x;
            this.m_a2 = Σ_9_138.refs.c * this.m_axis.y - Σ_9_138.refs.g * this.m_axis.x;
            this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
            if (this.m_motorMass > Number.MIN_VALUE) {
                this.m_motorMass = 1 / this.m_motorMass;
            }
            this.m_perp.SetV(Σ_9.refs.y.MulMV(Σ_9_138.refs.q.R, this.m_localYAxis1));
            this.m_s1 = (Σ_9_138.refs.j + Σ_9_138.refs.n) * this.m_perp.y - (Σ_9_138.refs.o + Σ_9_138.refs.a) * this.m_perp.x;
            this.m_s2 = Σ_9_138.refs.c * this.m_perp.y - Σ_9_138.refs.g * this.m_perp.x;
            Σ_9_138.refs.q = this.m_invMassA;
            Σ_9_138.refs.n = this.m_invMassB;
            Σ_9_138.refs.a = this.m_invIA;
            Σ_9_138.refs.c = this.m_invIB;
            this.m_K.col1.x = Σ_9_138.refs.q + Σ_9_138.refs.n + Σ_9_138.refs.a * this.m_s1 * this.m_s1 + Σ_9_138.refs.c * this.m_s2 * this.m_s2;
            this.m_K.col1.y = Σ_9_138.refs.a * this.m_s1 + Σ_9_138.refs.c * this.m_s2;
            this.m_K.col1.z = Σ_9_138.refs.a * this.m_s1 * this.m_a1 + Σ_9_138.refs.c * this.m_s2 * this.m_a2;
            this.m_K.col2.x = this.m_K.col1.y;
            this.m_K.col2.y = Σ_9_138.refs.a + Σ_9_138.refs.c;
            this.m_K.col2.z = Σ_9_138.refs.a * this.m_a1 + Σ_9_138.refs.c * this.m_a2;
            this.m_K.col3.x = this.m_K.col1.z;
            this.m_K.col3.y = this.m_K.col2.z;
            this.m_K.col3.z = Σ_9_138.refs.q + Σ_9_138.refs.n + Σ_9_138.refs.a * this.m_a1 * this.m_a1 + Σ_9_138.refs.c * this.m_a2 * this.m_a2;
            if (this.m_enableLimit) {
                Σ_9_138.refs.j = this.m_axis.x * Σ_9_138.refs.j + this.m_axis.y * Σ_9_138.refs.o;
                if (Σ_9.refs.y.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * Σ_9.refs.F.b2_linearSlop) {
                    this.m_limitState = Σ_9.refs.I.e_equalLimits;
                } else if (Σ_9_138.refs.j <= this.m_lowerTranslation) {
                    if (this.m_limitState != Σ_9.refs.I.e_atLowerLimit) {
                        this.m_limitState = Σ_9.refs.I.e_atLowerLimit;
                        this.m_impulse.z = 0;
                    }
                } else if (Σ_9_138.refs.j >= this.m_upperTranslation) {
                    if (this.m_limitState != Σ_9.refs.I.e_atUpperLimit) {
                        this.m_limitState = Σ_9.refs.I.e_atUpperLimit;
                        this.m_impulse.z = 0;
                    }
                } else {
                    this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
                    this.m_impulse.z = 0;
                }
            } else {
                this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
            }
            if (this.m_enableMotor == false) {
                this.m_motorImpulse = 0;
            }
            if (Σ_9_138.refs.d.warmStarting) {
                this.m_impulse.x *= Σ_9_138.refs.d.dtRatio;
                this.m_impulse.y *= Σ_9_138.refs.d.dtRatio;
                this.m_motorImpulse *= Σ_9_138.refs.d.dtRatio;
                Σ_9_138.refs.d = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
                Σ_9_138.refs.j = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
                Σ_9_138.refs.o = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
                Σ_9_138.refs.q = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
                Σ_9_138.refs.h.m_linearVelocity.x -= this.m_invMassA * Σ_9_138.refs.d;
                Σ_9_138.refs.h.m_linearVelocity.y -= this.m_invMassA * Σ_9_138.refs.j;
                Σ_9_138.refs.h.m_angularVelocity -= this.m_invIA * Σ_9_138.refs.o;
                Σ_9_138.refs.l.m_linearVelocity.x += this.m_invMassB * Σ_9_138.refs.d;
                Σ_9_138.refs.l.m_linearVelocity.y += this.m_invMassB * Σ_9_138.refs.j;
                Σ_9_138.refs.l.m_angularVelocity += this.m_invIB * Σ_9_138.refs.q;
            } else {
                this.m_impulse.SetZero();
                this.m_motorImpulse = 0;
            }
        }, Σ_9);
        Σ_9.refs.H.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αg0ux(d) {
            var Σ_9_139 = new Σ.Scope(this, αg0ux, '139', Σ_9, {
                d: d
            }, []);
            Σ_9_139.refs.h = this.m_bodyA, Σ_9_139.refs.l = this.m_bodyB, Σ_9_139.refs.j = Σ_9_139.refs.h.m_linearVelocity, Σ_9_139.refs.o = Σ_9_139.refs.h.m_angularVelocity, Σ_9_139.refs.q = Σ_9_139.refs.l.m_linearVelocity, Σ_9_139.refs.n = Σ_9_139.refs.l.m_angularVelocity, Σ_9_139.refs.a = 0, Σ_9_139.refs.c = 0, Σ_9_139.refs.g = 0, Σ_9_139.refs.b = 0;
            if (this.m_enableMotor && this.m_limitState != Σ_9.refs.I.e_equalLimits) {
                Σ_9_139.refs.b = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (Σ_9_139.refs.q.x - Σ_9_139.refs.j.x) + this.m_axis.y * (Σ_9_139.refs.q.y - Σ_9_139.refs.j.y) + this.m_a2 * Σ_9_139.refs.n - this.m_a1 * Σ_9_139.refs.o));
                Σ_9_139.refs.a = this.m_motorImpulse;
                Σ_9_139.refs.d = Σ_9_139.refs.d.dt * this.m_maxMotorForce;
                this.m_motorImpulse = Σ_9.refs.y.Clamp(this.m_motorImpulse + Σ_9_139.refs.b, -Σ_9_139.refs.d, Σ_9_139.refs.d);
                Σ_9_139.refs.b = this.m_motorImpulse - Σ_9_139.refs.a;
                Σ_9_139.refs.a = Σ_9_139.refs.b * this.m_axis.x;
                Σ_9_139.refs.c = Σ_9_139.refs.b * this.m_axis.y;
                Σ_9_139.refs.g = Σ_9_139.refs.b * this.m_a1;
                Σ_9_139.refs.b = Σ_9_139.refs.b * this.m_a2;
                Σ_9_139.refs.j.x -= this.m_invMassA * Σ_9_139.refs.a;
                Σ_9_139.refs.j.y -= this.m_invMassA * Σ_9_139.refs.c;
                Σ_9_139.refs.o -= this.m_invIA * Σ_9_139.refs.g;
                Σ_9_139.refs.q.x += this.m_invMassB * Σ_9_139.refs.a;
                Σ_9_139.refs.q.y += this.m_invMassB * Σ_9_139.refs.c;
                Σ_9_139.refs.n += this.m_invIB * Σ_9_139.refs.b;
            }
            Σ_9_139.refs.g = this.m_perp.x * (Σ_9_139.refs.q.x - Σ_9_139.refs.j.x) + this.m_perp.y * (Σ_9_139.refs.q.y - Σ_9_139.refs.j.y) + this.m_s2 * Σ_9_139.refs.n - this.m_s1 * Σ_9_139.refs.o;
            Σ_9_139.refs.c = Σ_9_139.refs.n - Σ_9_139.refs.o;
            if (this.m_enableLimit && this.m_limitState != Σ_9.refs.I.e_inactiveLimit) {
                Σ_9_139.refs.d = this.m_axis.x * (Σ_9_139.refs.q.x - Σ_9_139.refs.j.x) + this.m_axis.y * (Σ_9_139.refs.q.y - Σ_9_139.refs.j.y) + this.m_a2 * Σ_9_139.refs.n - this.m_a1 * Σ_9_139.refs.o;
                Σ_9_139.refs.a = this.m_impulse.Copy();
                Σ_9_139.refs.d = this.m_K.Solve33(new Σ_9.refs.A(), -Σ_9_139.refs.g, -Σ_9_139.refs.c, -Σ_9_139.refs.d);
                this.m_impulse.Add(Σ_9_139.refs.d);
                if (this.m_limitState == Σ_9.refs.I.e_atLowerLimit) {
                    this.m_impulse.z = Σ_9.refs.y.Max(this.m_impulse.z, 0);
                } else if (this.m_limitState == Σ_9.refs.I.e_atUpperLimit) {
                    this.m_impulse.z = Σ_9.refs.y.Min(this.m_impulse.z, 0);
                }
                Σ_9_139.refs.g = -Σ_9_139.refs.g - (this.m_impulse.z - Σ_9_139.refs.a.z) * this.m_K.col3.x;
                Σ_9_139.refs.c = -Σ_9_139.refs.c - (this.m_impulse.z - Σ_9_139.refs.a.z) * this.m_K.col3.y;
                Σ_9_139.refs.c = this.m_K.Solve22(new Σ_9.refs.w(), Σ_9_139.refs.g, Σ_9_139.refs.c);
                Σ_9_139.refs.c.x += Σ_9_139.refs.a.x;
                Σ_9_139.refs.c.y += Σ_9_139.refs.a.y;
                this.m_impulse.x = Σ_9_139.refs.c.x;
                this.m_impulse.y = Σ_9_139.refs.c.y;
                Σ_9_139.refs.d.x = this.m_impulse.x - Σ_9_139.refs.a.x;
                Σ_9_139.refs.d.y = this.m_impulse.y - Σ_9_139.refs.a.y;
                Σ_9_139.refs.d.z = this.m_impulse.z - Σ_9_139.refs.a.z;
                Σ_9_139.refs.a = Σ_9_139.refs.d.x * this.m_perp.x + Σ_9_139.refs.d.z * this.m_axis.x;
                Σ_9_139.refs.c = Σ_9_139.refs.d.x * this.m_perp.y + Σ_9_139.refs.d.z * this.m_axis.y;
                Σ_9_139.refs.g = Σ_9_139.refs.d.x * this.m_s1 + Σ_9_139.refs.d.y + Σ_9_139.refs.d.z * this.m_a1;
                Σ_9_139.refs.b = Σ_9_139.refs.d.x * this.m_s2 + Σ_9_139.refs.d.y + Σ_9_139.refs.d.z * this.m_a2;
            } else {
                Σ_9_139.refs.d = this.m_K.Solve22(new Σ_9.refs.w(), -Σ_9_139.refs.g, -Σ_9_139.refs.c);
                this.m_impulse.x += Σ_9_139.refs.d.x;
                this.m_impulse.y += Σ_9_139.refs.d.y;
                Σ_9_139.refs.a = Σ_9_139.refs.d.x * this.m_perp.x;
                Σ_9_139.refs.c = Σ_9_139.refs.d.x * this.m_perp.y;
                Σ_9_139.refs.g = Σ_9_139.refs.d.x * this.m_s1 + Σ_9_139.refs.d.y;
                Σ_9_139.refs.b = Σ_9_139.refs.d.x * this.m_s2 + Σ_9_139.refs.d.y;
            }
            Σ_9_139.refs.j.x -= this.m_invMassA * Σ_9_139.refs.a;
            Σ_9_139.refs.j.y -= this.m_invMassA * Σ_9_139.refs.c;
            Σ_9_139.refs.o -= this.m_invIA * Σ_9_139.refs.g;
            Σ_9_139.refs.q.x += this.m_invMassB * Σ_9_139.refs.a;
            Σ_9_139.refs.q.y += this.m_invMassB * Σ_9_139.refs.c;
            Σ_9_139.refs.n += this.m_invIB * Σ_9_139.refs.b;
            Σ_9_139.refs.h.m_linearVelocity.SetV(Σ_9_139.refs.j);
            Σ_9_139.refs.h.m_angularVelocity = Σ_9_139.refs.o;
            Σ_9_139.refs.l.m_linearVelocity.SetV(Σ_9_139.refs.q);
            Σ_9_139.refs.l.m_angularVelocity = Σ_9_139.refs.n;
        }, Σ_9);
        Σ_9.refs.H.prototype.SolvePositionConstraints = Σ_9.addFunction(function αmX1J() {
            var Σ_9_140 = new Σ.Scope(this, αmX1J, '140', Σ_9, {}, []);
            Σ_9_140.refs.d = this.m_bodyA, Σ_9_140.refs.h = this.m_bodyB, Σ_9_140.refs.l = Σ_9_140.refs.d.m_sweep.c, Σ_9_140.refs.j = Σ_9_140.refs.d.m_sweep.a, Σ_9_140.refs.o = Σ_9_140.refs.h.m_sweep.c, Σ_9_140.refs.q = Σ_9_140.refs.h.m_sweep.a, Σ_9_140.refs.n = undefined, Σ_9_140.refs.a = 0, Σ_9_140.refs.c = 0, Σ_9_140.refs.g = 0, Σ_9_140.refs.b = Σ_9_140.refs.a = Σ_9_140.refs.n = 0, Σ_9_140.refs.e = 0;
            Σ_9_140.refs.c = false;
            Σ_9_140.refs.f = 0, Σ_9_140.refs.m = Σ_9.refs.G.FromAngle(Σ_9_140.refs.j), Σ_9_140.refs.r = Σ_9.refs.G.FromAngle(Σ_9_140.refs.q);
            Σ_9_140.refs.n = Σ_9_140.refs.m;
            Σ_9_140.refs.e = this.m_localAnchor1.x - this.m_localCenterA.x;
            Σ_9_140.refs.s = this.m_localAnchor1.y - this.m_localCenterA.y;
            Σ_9_140.refs.a = Σ_9_140.refs.n.col1.x * Σ_9_140.refs.e + Σ_9_140.refs.n.col2.x * Σ_9_140.refs.s;
            Σ_9_140.refs.s = Σ_9_140.refs.n.col1.y * Σ_9_140.refs.e + Σ_9_140.refs.n.col2.y * Σ_9_140.refs.s;
            Σ_9_140.refs.e = Σ_9_140.refs.a;
            Σ_9_140.refs.n = Σ_9_140.refs.r;
            Σ_9_140.refs.r = this.m_localAnchor2.x - this.m_localCenterB.x;
            Σ_9_140.refs.g = this.m_localAnchor2.y - this.m_localCenterB.y;
            Σ_9_140.refs.a = Σ_9_140.refs.n.col1.x * Σ_9_140.refs.r + Σ_9_140.refs.n.col2.x * Σ_9_140.refs.g;
            Σ_9_140.refs.g = Σ_9_140.refs.n.col1.y * Σ_9_140.refs.r + Σ_9_140.refs.n.col2.y * Σ_9_140.refs.g;
            Σ_9_140.refs.r = Σ_9_140.refs.a;
            Σ_9_140.refs.n = Σ_9_140.refs.o.x + Σ_9_140.refs.r - Σ_9_140.refs.l.x - Σ_9_140.refs.e;
            Σ_9_140.refs.a = Σ_9_140.refs.o.y + Σ_9_140.refs.g - Σ_9_140.refs.l.y - Σ_9_140.refs.s;
            if (this.m_enableLimit) {
                this.m_axis = Σ_9.refs.y.MulMV(Σ_9_140.refs.m, this.m_localXAxis1);
                this.m_a1 = (Σ_9_140.refs.n + Σ_9_140.refs.e) * this.m_axis.y - (Σ_9_140.refs.a + Σ_9_140.refs.s) * this.m_axis.x;
                this.m_a2 = Σ_9_140.refs.r * this.m_axis.y - Σ_9_140.refs.g * this.m_axis.x;
                Σ_9_140.refs.v = this.m_axis.x * Σ_9_140.refs.n + this.m_axis.y * Σ_9_140.refs.a;
                if (Σ_9.refs.y.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * Σ_9.refs.F.b2_linearSlop) {
                    Σ_9_140.refs.f = Σ_9.refs.y.Clamp(Σ_9_140.refs.v, -Σ_9.refs.F.b2_maxLinearCorrection, Σ_9.refs.F.b2_maxLinearCorrection);
                    Σ_9_140.refs.b = Σ_9.refs.y.Abs(Σ_9_140.refs.v);
                    Σ_9_140.refs.c = true;
                } else if (Σ_9_140.refs.v <= this.m_lowerTranslation) {
                    Σ_9_140.refs.f = Σ_9.refs.y.Clamp(Σ_9_140.refs.v - this.m_lowerTranslation + Σ_9.refs.F.b2_linearSlop, -Σ_9.refs.F.b2_maxLinearCorrection, 0);
                    Σ_9_140.refs.b = this.m_lowerTranslation - Σ_9_140.refs.v;
                    Σ_9_140.refs.c = true;
                } else if (Σ_9_140.refs.v >= this.m_upperTranslation) {
                    Σ_9_140.refs.f = Σ_9.refs.y.Clamp(Σ_9_140.refs.v - this.m_upperTranslation + Σ_9.refs.F.b2_linearSlop, 0, Σ_9.refs.F.b2_maxLinearCorrection);
                    Σ_9_140.refs.b = Σ_9_140.refs.v - this.m_upperTranslation;
                    Σ_9_140.refs.c = true;
                }
            }
            this.m_perp = Σ_9.refs.y.MulMV(Σ_9_140.refs.m, this.m_localYAxis1);
            this.m_s1 = (Σ_9_140.refs.n + Σ_9_140.refs.e) * this.m_perp.y - (Σ_9_140.refs.a + Σ_9_140.refs.s) * this.m_perp.x;
            this.m_s2 = Σ_9_140.refs.r * this.m_perp.y - Σ_9_140.refs.g * this.m_perp.x;
            Σ_9_140.refs.m = new Σ_9.refs.A();
            Σ_9_140.refs.s = this.m_perp.x * Σ_9_140.refs.n + this.m_perp.y * Σ_9_140.refs.a;
            Σ_9_140.refs.r = Σ_9_140.refs.q - Σ_9_140.refs.j - this.m_refAngle;
            Σ_9_140.refs.b = Σ_9.refs.y.Max(Σ_9_140.refs.b, Σ_9.refs.y.Abs(Σ_9_140.refs.s));
            Σ_9_140.refs.e = Σ_9.refs.y.Abs(Σ_9_140.refs.r);
            if (Σ_9_140.refs.c) {
                Σ_9_140.refs.c = this.m_invMassA;
                Σ_9_140.refs.g = this.m_invMassB;
                Σ_9_140.refs.n = this.m_invIA;
                Σ_9_140.refs.a = this.m_invIB;
                this.m_K.col1.x = Σ_9_140.refs.c + Σ_9_140.refs.g + Σ_9_140.refs.n * this.m_s1 * this.m_s1 + Σ_9_140.refs.a * this.m_s2 * this.m_s2;
                this.m_K.col1.y = Σ_9_140.refs.n * this.m_s1 + Σ_9_140.refs.a * this.m_s2;
                this.m_K.col1.z = Σ_9_140.refs.n * this.m_s1 * this.m_a1 + Σ_9_140.refs.a * this.m_s2 * this.m_a2;
                this.m_K.col2.x = this.m_K.col1.y;
                this.m_K.col2.y = Σ_9_140.refs.n + Σ_9_140.refs.a;
                this.m_K.col2.z = Σ_9_140.refs.n * this.m_a1 + Σ_9_140.refs.a * this.m_a2;
                this.m_K.col3.x = this.m_K.col1.z;
                this.m_K.col3.y = this.m_K.col2.z;
                this.m_K.col3.z = Σ_9_140.refs.c + Σ_9_140.refs.g + Σ_9_140.refs.n * this.m_a1 * this.m_a1 + Σ_9_140.refs.a * this.m_a2 * this.m_a2;
                this.m_K.Solve33(Σ_9_140.refs.m, -Σ_9_140.refs.s, -Σ_9_140.refs.r, -Σ_9_140.refs.f);
            } else {
                Σ_9_140.refs.c = this.m_invMassA;
                Σ_9_140.refs.g = this.m_invMassB;
                Σ_9_140.refs.n = this.m_invIA;
                Σ_9_140.refs.a = this.m_invIB;
                Σ_9_140.refs.f = Σ_9_140.refs.n * this.m_s1 + Σ_9_140.refs.a * this.m_s2;
                Σ_9_140.refs.v = Σ_9_140.refs.n + Σ_9_140.refs.a;
                this.m_K.col1.Set(Σ_9_140.refs.c + Σ_9_140.refs.g + Σ_9_140.refs.n * this.m_s1 * this.m_s1 + Σ_9_140.refs.a * this.m_s2 * this.m_s2, Σ_9_140.refs.f, 0);
                this.m_K.col2.Set(Σ_9_140.refs.f, Σ_9_140.refs.v, 0);
                Σ_9_140.refs.f = this.m_K.Solve22(new Σ_9.refs.w(), -Σ_9_140.refs.s, -Σ_9_140.refs.r);
                Σ_9_140.refs.m.x = Σ_9_140.refs.f.x;
                Σ_9_140.refs.m.y = Σ_9_140.refs.f.y;
                Σ_9_140.refs.m.z = 0;
            }
            Σ_9_140.refs.f = Σ_9_140.refs.m.x * this.m_perp.x + Σ_9_140.refs.m.z * this.m_axis.x;
            Σ_9_140.refs.c = Σ_9_140.refs.m.x * this.m_perp.y + Σ_9_140.refs.m.z * this.m_axis.y;
            Σ_9_140.refs.s = Σ_9_140.refs.m.x * this.m_s1 + Σ_9_140.refs.m.y + Σ_9_140.refs.m.z * this.m_a1;
            Σ_9_140.refs.m = Σ_9_140.refs.m.x * this.m_s2 + Σ_9_140.refs.m.y + Σ_9_140.refs.m.z * this.m_a2;
            Σ_9_140.refs.l.x -= this.m_invMassA * Σ_9_140.refs.f;
            Σ_9_140.refs.l.y -= this.m_invMassA * Σ_9_140.refs.c;
            Σ_9_140.refs.j -= this.m_invIA * Σ_9_140.refs.s;
            Σ_9_140.refs.o.x += this.m_invMassB * Σ_9_140.refs.f;
            Σ_9_140.refs.o.y += this.m_invMassB * Σ_9_140.refs.c;
            Σ_9_140.refs.q += this.m_invIB * Σ_9_140.refs.m;
            Σ_9_140.refs.d.m_sweep.a = Σ_9_140.refs.j;
            Σ_9_140.refs.h.m_sweep.a = Σ_9_140.refs.q;
            Σ_9_140.refs.d.SynchronizeTransform();
            Σ_9_140.refs.h.SynchronizeTransform();
            return Σ_9_140.refs.b <= Σ_9.refs.F.b2_linearSlop && Σ_9_140.refs.e <= Σ_9.refs.F.b2_angularSlop;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.O, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.O.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.O.b2PrismaticJointDef = Σ_9.addFunction(function αrGgf() {
            var Σ_9_141 = new Σ.Scope(this, αrGgf, '141', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
            this.localAnchorA = new Σ_9.refs.w();
            this.localAnchorB = new Σ_9.refs.w();
            this.localAxisA = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.O.prototype.b2PrismaticJointDef = Σ_9.addFunction(function αVibg() {
            var Σ_9_142 = new Σ.Scope(this, αVibg, '142', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_prismaticJoint;
            this.localAxisA.Set(1, 0);
            this.referenceAngle = 0;
            this.enableLimit = false;
            this.upperTranslation = this.lowerTranslation = 0;
            this.enableMotor = false;
            this.motorSpeed = this.maxMotorForce = 0;
        }, Σ_9);
        Σ_9.refs.O.prototype.Initialize = Σ_9.addFunction(function αr6Tu(d, h, l, j) {
            var Σ_9_143 = new Σ.Scope(this, αr6Tu, '143', Σ_9, {
                d: d,
                h: h,
                l: l,
                j: j
            }, []);
            this.bodyA = Σ_9_143.refs.d;
            this.bodyB = Σ_9_143.refs.h;
            this.localAnchorA = this.bodyA.GetLocalPoint(Σ_9_143.refs.l);
            this.localAnchorB = this.bodyB.GetLocalPoint(Σ_9_143.refs.l);
            this.localAxisA = this.bodyA.GetLocalVector(Σ_9_143.refs.j);
            this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.E, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.E.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.E.b2PulleyJoint = Σ_9.addFunction(function αnvPs() {
            var Σ_9_144 = new Σ.Scope(this, αnvPs, '144', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.m_groundAnchor1 = new Σ_9.refs.w();
            this.m_groundAnchor2 = new Σ_9.refs.w();
            this.m_localAnchor1 = new Σ_9.refs.w();
            this.m_localAnchor2 = new Σ_9.refs.w();
            this.m_u1 = new Σ_9.refs.w();
            this.m_u2 = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.E.prototype.GetAnchorA = Σ_9.addFunction(function α5Ydm() {
            var Σ_9_145 = new Σ.Scope(this, α5Ydm, '145', Σ_9, {}, []);
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
        }, Σ_9);
        Σ_9.refs.E.prototype.GetAnchorB = Σ_9.addFunction(function αks3T() {
            var Σ_9_146 = new Σ.Scope(this, αks3T, '146', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
        }, Σ_9);
        Σ_9.refs.E.prototype.GetReactionForce = Σ_9.addFunction(function α7Abr(d) {
            var Σ_9_147 = new Σ.Scope(this, α7Abr, '147', Σ_9, {
                d: d
            }, []);
            if (Σ_9_147.refs.d === undefined) {
                Σ_9_147.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_147.refs.d * this.m_impulse * this.m_u2.x, Σ_9_147.refs.d * this.m_impulse * this.m_u2.y);
        }, Σ_9);
        Σ_9.refs.E.prototype.GetReactionTorque = Σ_9.addFunction(function αtOxS() {
            var Σ_9_148 = new Σ.Scope(this, αtOxS, '148', Σ_9, {}, []);
            return 0;
        }, Σ_9);
        Σ_9.refs.E.prototype.GetGroundAnchorA = Σ_9.addFunction(function αe1sW() {
            var Σ_9_149 = new Σ.Scope(this, αe1sW, '149', Σ_9, {}, []);
            Σ_9_149.refs.d = this.m_ground.m_xf.position.Copy();
            Σ_9_149.refs.d.Add(this.m_groundAnchor1);
            return Σ_9_149.refs.d;
        }, Σ_9);
        Σ_9.refs.E.prototype.GetGroundAnchorB = Σ_9.addFunction(function αPPUQ() {
            var Σ_9_150 = new Σ.Scope(this, αPPUQ, '150', Σ_9, {}, []);
            Σ_9_150.refs.d = this.m_ground.m_xf.position.Copy();
            Σ_9_150.refs.d.Add(this.m_groundAnchor2);
            return Σ_9_150.refs.d;
        }, Σ_9);
        Σ_9.refs.E.prototype.GetLength1 = Σ_9.addFunction(function αRibW() {
            var Σ_9_151 = new Σ.Scope(this, αRibW, '151', Σ_9, {}, []);
            Σ_9_151.refs.d = this.m_bodyA.GetWorldPoint(this.m_localAnchor1), Σ_9_151.refs.h = Σ_9_151.refs.d.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x);
            Σ_9_151.refs.d = Σ_9_151.refs.d.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y);
            return Math.sqrt(Σ_9_151.refs.h * Σ_9_151.refs.h + Σ_9_151.refs.d * Σ_9_151.refs.d);
        }, Σ_9);
        Σ_9.refs.E.prototype.GetLength2 = Σ_9.addFunction(function αAIUi() {
            var Σ_9_152 = new Σ.Scope(this, αAIUi, '152', Σ_9, {}, []);
            Σ_9_152.refs.d = this.m_bodyB.GetWorldPoint(this.m_localAnchor2), Σ_9_152.refs.h = Σ_9_152.refs.d.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor2.x);
            Σ_9_152.refs.d = Σ_9_152.refs.d.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor2.y);
            return Math.sqrt(Σ_9_152.refs.h * Σ_9_152.refs.h + Σ_9_152.refs.d * Σ_9_152.refs.d);
        }, Σ_9);
        Σ_9.refs.E.prototype.GetRatio = Σ_9.addFunction(function αcnIC() {
            var Σ_9_153 = new Σ.Scope(this, αcnIC, '153', Σ_9, {}, []);
            return this.m_ratio;
        }, Σ_9);
        Σ_9.refs.E.prototype.b2PulleyJoint = Σ_9.addFunction(function αLKZe(d) {
            var Σ_9_154 = new Σ.Scope(this, αLKZe, '154', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_154.refs.d);
            this.m_ground = this.m_bodyA.m_world.m_groundBody;
            this.m_groundAnchor1.x = Σ_9_154.refs.d.groundAnchorA.x - this.m_ground.m_xf.position.x;
            this.m_groundAnchor1.y = Σ_9_154.refs.d.groundAnchorA.y - this.m_ground.m_xf.position.y;
            this.m_groundAnchor2.x = Σ_9_154.refs.d.groundAnchorB.x - this.m_ground.m_xf.position.x;
            this.m_groundAnchor2.y = Σ_9_154.refs.d.groundAnchorB.y - this.m_ground.m_xf.position.y;
            this.m_localAnchor1.SetV(Σ_9_154.refs.d.localAnchorA);
            this.m_localAnchor2.SetV(Σ_9_154.refs.d.localAnchorB);
            this.m_ratio = Σ_9_154.refs.d.ratio;
            this.m_constant = Σ_9_154.refs.d.lengthA + this.m_ratio * Σ_9_154.refs.d.lengthB;
            this.m_maxLength1 = Σ_9.refs.y.Min(Σ_9_154.refs.d.maxLengthA, this.m_constant - this.m_ratio * Σ_9.refs.E.b2_minPulleyLength);
            this.m_maxLength2 = Σ_9.refs.y.Min(Σ_9_154.refs.d.maxLengthB, (this.m_constant - Σ_9.refs.E.b2_minPulleyLength) / this.m_ratio);
            this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0;
        }, Σ_9);
        Σ_9.refs.E.prototype.InitVelocityConstraints = Σ_9.addFunction(function αnlFa(d) {
            var Σ_9_155 = new Σ.Scope(this, αnlFa, '155', Σ_9, {
                d: d
            }, []);
            Σ_9_155.refs.h = this.m_bodyA, Σ_9_155.refs.l = this.m_bodyB, Σ_9_155.refs.j = undefined;
            Σ_9_155.refs.j = Σ_9_155.refs.h.m_xf.R;
            Σ_9_155.refs.o = this.m_localAnchor1.x - Σ_9_155.refs.h.m_sweep.localCenter.x, Σ_9_155.refs.q = this.m_localAnchor1.y - Σ_9_155.refs.h.m_sweep.localCenter.y, Σ_9_155.refs.n = Σ_9_155.refs.j.col1.x * Σ_9_155.refs.o + Σ_9_155.refs.j.col2.x * Σ_9_155.refs.q;
            Σ_9_155.refs.q = Σ_9_155.refs.j.col1.y * Σ_9_155.refs.o + Σ_9_155.refs.j.col2.y * Σ_9_155.refs.q;
            Σ_9_155.refs.o = Σ_9_155.refs.n;
            Σ_9_155.refs.j = Σ_9_155.refs.l.m_xf.R;
            Σ_9_155.refs.a = this.m_localAnchor2.x - Σ_9_155.refs.l.m_sweep.localCenter.x, Σ_9_155.refs.c = this.m_localAnchor2.y - Σ_9_155.refs.l.m_sweep.localCenter.y;
            Σ_9_155.refs.n = Σ_9_155.refs.j.col1.x * Σ_9_155.refs.a + Σ_9_155.refs.j.col2.x * Σ_9_155.refs.c;
            Σ_9_155.refs.c = Σ_9_155.refs.j.col1.y * Σ_9_155.refs.a + Σ_9_155.refs.j.col2.y * Σ_9_155.refs.c;
            Σ_9_155.refs.a = Σ_9_155.refs.n;
            Σ_9_155.refs.j = Σ_9_155.refs.l.m_sweep.c.x + Σ_9_155.refs.a;
            Σ_9_155.refs.n = Σ_9_155.refs.l.m_sweep.c.y + Σ_9_155.refs.c;
            Σ_9_155.refs.g = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x, Σ_9_155.refs.b = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
            this.m_u1.Set(Σ_9_155.refs.h.m_sweep.c.x + Σ_9_155.refs.o - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), Σ_9_155.refs.h.m_sweep.c.y + Σ_9_155.refs.q - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y));
            this.m_u2.Set(Σ_9_155.refs.j - Σ_9_155.refs.g, Σ_9_155.refs.n - Σ_9_155.refs.b);
            Σ_9_155.refs.j = this.m_u1.Length();
            Σ_9_155.refs.n = this.m_u2.Length();
            Σ_9_155.refs.j > Σ_9.refs.F.b2_linearSlop ? this.m_u1.Multiply(1 / Σ_9_155.refs.j) : this.m_u1.SetZero();
            Σ_9_155.refs.n > Σ_9.refs.F.b2_linearSlop ? this.m_u2.Multiply(1 / Σ_9_155.refs.n) : this.m_u2.SetZero();
            if (this.m_constant - Σ_9_155.refs.j - this.m_ratio * Σ_9_155.refs.n > 0) {
                this.m_state = Σ_9.refs.I.e_inactiveLimit;
                this.m_impulse = 0;
            } else {
                this.m_state = Σ_9.refs.I.e_atUpperLimit;
            }
            if (Σ_9_155.refs.j < this.m_maxLength1) {
                this.m_limitState1 = Σ_9.refs.I.e_inactiveLimit;
                this.m_limitImpulse1 = 0;
            } else {
                this.m_limitState1 = Σ_9.refs.I.e_atUpperLimit;
            }
            if (Σ_9_155.refs.n < this.m_maxLength2) {
                this.m_limitState2 = Σ_9.refs.I.e_inactiveLimit;
                this.m_limitImpulse2 = 0;
            } else {
                this.m_limitState2 = Σ_9.refs.I.e_atUpperLimit;
            }
            Σ_9_155.refs.j = Σ_9_155.refs.o * this.m_u1.y - Σ_9_155.refs.q * this.m_u1.x;
            Σ_9_155.refs.n = Σ_9_155.refs.a * this.m_u2.y - Σ_9_155.refs.c * this.m_u2.x;
            this.m_limitMass1 = Σ_9_155.refs.h.m_invMass + Σ_9_155.refs.h.m_invI * Σ_9_155.refs.j * Σ_9_155.refs.j;
            this.m_limitMass2 = Σ_9_155.refs.l.m_invMass + Σ_9_155.refs.l.m_invI * Σ_9_155.refs.n * Σ_9_155.refs.n;
            this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
            this.m_limitMass1 = 1 / this.m_limitMass1;
            this.m_limitMass2 = 1 / this.m_limitMass2;
            this.m_pulleyMass = 1 / this.m_pulleyMass;
            if (Σ_9_155.refs.d.warmStarting) {
                this.m_impulse *= Σ_9_155.refs.d.dtRatio;
                this.m_limitImpulse1 *= Σ_9_155.refs.d.dtRatio;
                this.m_limitImpulse2 *= Σ_9_155.refs.d.dtRatio;
                Σ_9_155.refs.d = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x;
                Σ_9_155.refs.j = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y;
                Σ_9_155.refs.n = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x;
                Σ_9_155.refs.g = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y;
                Σ_9_155.refs.h.m_linearVelocity.x += Σ_9_155.refs.h.m_invMass * Σ_9_155.refs.d;
                Σ_9_155.refs.h.m_linearVelocity.y += Σ_9_155.refs.h.m_invMass * Σ_9_155.refs.j;
                Σ_9_155.refs.h.m_angularVelocity += Σ_9_155.refs.h.m_invI * (Σ_9_155.refs.o * Σ_9_155.refs.j - Σ_9_155.refs.q * Σ_9_155.refs.d);
                Σ_9_155.refs.l.m_linearVelocity.x += Σ_9_155.refs.l.m_invMass * Σ_9_155.refs.n;
                Σ_9_155.refs.l.m_linearVelocity.y += Σ_9_155.refs.l.m_invMass * Σ_9_155.refs.g;
                Σ_9_155.refs.l.m_angularVelocity += Σ_9_155.refs.l.m_invI * (Σ_9_155.refs.a * Σ_9_155.refs.g - Σ_9_155.refs.c * Σ_9_155.refs.n);
            } else {
                this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0;
            }
        }, Σ_9);
        Σ_9.refs.E.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αajLC() {
            var Σ_9_156 = new Σ.Scope(this, αajLC, '156', Σ_9, {}, []);
            Σ_9_156.refs.d = this.m_bodyA, Σ_9_156.refs.h = this.m_bodyB, Σ_9_156.refs.l = undefined;
            Σ_9_156.refs.l = Σ_9_156.refs.d.m_xf.R;
            Σ_9_156.refs.j = this.m_localAnchor1.x - Σ_9_156.refs.d.m_sweep.localCenter.x, Σ_9_156.refs.o = this.m_localAnchor1.y - Σ_9_156.refs.d.m_sweep.localCenter.y, Σ_9_156.refs.q = Σ_9_156.refs.l.col1.x * Σ_9_156.refs.j + Σ_9_156.refs.l.col2.x * Σ_9_156.refs.o;
            Σ_9_156.refs.o = Σ_9_156.refs.l.col1.y * Σ_9_156.refs.j + Σ_9_156.refs.l.col2.y * Σ_9_156.refs.o;
            Σ_9_156.refs.j = Σ_9_156.refs.q;
            Σ_9_156.refs.l = Σ_9_156.refs.h.m_xf.R;
            Σ_9_156.refs.n = this.m_localAnchor2.x - Σ_9_156.refs.h.m_sweep.localCenter.x, Σ_9_156.refs.a = this.m_localAnchor2.y - Σ_9_156.refs.h.m_sweep.localCenter.y;
            Σ_9_156.refs.q = Σ_9_156.refs.l.col1.x * Σ_9_156.refs.n + Σ_9_156.refs.l.col2.x * Σ_9_156.refs.a;
            Σ_9_156.refs.a = Σ_9_156.refs.l.col1.y * Σ_9_156.refs.n + Σ_9_156.refs.l.col2.y * Σ_9_156.refs.a;
            Σ_9_156.refs.n = Σ_9_156.refs.q;
            Σ_9_156.refs.c = Σ_9_156.refs.q = Σ_9_156.refs.l = 0, Σ_9_156.refs.g = 0;
            Σ_9_156.refs.l = Σ_9_156.refs.g = Σ_9_156.refs.l = Σ_9_156.refs.g = Σ_9_156.refs.c = Σ_9_156.refs.q = Σ_9_156.refs.l = 0;
            if (this.m_state == Σ_9.refs.I.e_atUpperLimit) {
                Σ_9_156.refs.l = Σ_9_156.refs.d.m_linearVelocity.x + -Σ_9_156.refs.d.m_angularVelocity * Σ_9_156.refs.o;
                Σ_9_156.refs.q = Σ_9_156.refs.d.m_linearVelocity.y + Σ_9_156.refs.d.m_angularVelocity * Σ_9_156.refs.j;
                Σ_9_156.refs.c = Σ_9_156.refs.h.m_linearVelocity.x + -Σ_9_156.refs.h.m_angularVelocity * Σ_9_156.refs.a;
                Σ_9_156.refs.g = Σ_9_156.refs.h.m_linearVelocity.y + Σ_9_156.refs.h.m_angularVelocity * Σ_9_156.refs.n;
                Σ_9_156.refs.l = -(this.m_u1.x * Σ_9_156.refs.l + this.m_u1.y * Σ_9_156.refs.q) - this.m_ratio * (this.m_u2.x * Σ_9_156.refs.c + this.m_u2.y * Σ_9_156.refs.g);
                Σ_9_156.refs.g = this.m_pulleyMass * -Σ_9_156.refs.l;
                Σ_9_156.refs.l = this.m_impulse;
                this.m_impulse = Σ_9.refs.y.Max(0, this.m_impulse + Σ_9_156.refs.g);
                Σ_9_156.refs.g = this.m_impulse - Σ_9_156.refs.l;
                Σ_9_156.refs.l = -Σ_9_156.refs.g * this.m_u1.x;
                Σ_9_156.refs.q = -Σ_9_156.refs.g * this.m_u1.y;
                Σ_9_156.refs.c = -this.m_ratio * Σ_9_156.refs.g * this.m_u2.x;
                Σ_9_156.refs.g = -this.m_ratio * Σ_9_156.refs.g * this.m_u2.y;
                Σ_9_156.refs.d.m_linearVelocity.x += Σ_9_156.refs.d.m_invMass * Σ_9_156.refs.l;
                Σ_9_156.refs.d.m_linearVelocity.y += Σ_9_156.refs.d.m_invMass * Σ_9_156.refs.q;
                Σ_9_156.refs.d.m_angularVelocity += Σ_9_156.refs.d.m_invI * (Σ_9_156.refs.j * Σ_9_156.refs.q - Σ_9_156.refs.o * Σ_9_156.refs.l);
                Σ_9_156.refs.h.m_linearVelocity.x += Σ_9_156.refs.h.m_invMass * Σ_9_156.refs.c;
                Σ_9_156.refs.h.m_linearVelocity.y += Σ_9_156.refs.h.m_invMass * Σ_9_156.refs.g;
                Σ_9_156.refs.h.m_angularVelocity += Σ_9_156.refs.h.m_invI * (Σ_9_156.refs.n * Σ_9_156.refs.g - Σ_9_156.refs.a * Σ_9_156.refs.c);
            }
            if (this.m_limitState1 == Σ_9.refs.I.e_atUpperLimit) {
                Σ_9_156.refs.l = Σ_9_156.refs.d.m_linearVelocity.x + -Σ_9_156.refs.d.m_angularVelocity * Σ_9_156.refs.o;
                Σ_9_156.refs.q = Σ_9_156.refs.d.m_linearVelocity.y + Σ_9_156.refs.d.m_angularVelocity * Σ_9_156.refs.j;
                Σ_9_156.refs.l = -(this.m_u1.x * Σ_9_156.refs.l + this.m_u1.y * Σ_9_156.refs.q);
                Σ_9_156.refs.g = -this.m_limitMass1 * Σ_9_156.refs.l;
                Σ_9_156.refs.l = this.m_limitImpulse1;
                this.m_limitImpulse1 = Σ_9.refs.y.Max(0, this.m_limitImpulse1 + Σ_9_156.refs.g);
                Σ_9_156.refs.g = this.m_limitImpulse1 - Σ_9_156.refs.l;
                Σ_9_156.refs.l = -Σ_9_156.refs.g * this.m_u1.x;
                Σ_9_156.refs.q = -Σ_9_156.refs.g * this.m_u1.y;
                Σ_9_156.refs.d.m_linearVelocity.x += Σ_9_156.refs.d.m_invMass * Σ_9_156.refs.l;
                Σ_9_156.refs.d.m_linearVelocity.y += Σ_9_156.refs.d.m_invMass * Σ_9_156.refs.q;
                Σ_9_156.refs.d.m_angularVelocity += Σ_9_156.refs.d.m_invI * (Σ_9_156.refs.j * Σ_9_156.refs.q - Σ_9_156.refs.o * Σ_9_156.refs.l);
            }
            if (this.m_limitState2 == Σ_9.refs.I.e_atUpperLimit) {
                Σ_9_156.refs.c = Σ_9_156.refs.h.m_linearVelocity.x + -Σ_9_156.refs.h.m_angularVelocity * Σ_9_156.refs.a;
                Σ_9_156.refs.g = Σ_9_156.refs.h.m_linearVelocity.y + Σ_9_156.refs.h.m_angularVelocity * Σ_9_156.refs.n;
                Σ_9_156.refs.l = -(this.m_u2.x * Σ_9_156.refs.c + this.m_u2.y * Σ_9_156.refs.g);
                Σ_9_156.refs.g = -this.m_limitMass2 * Σ_9_156.refs.l;
                Σ_9_156.refs.l = this.m_limitImpulse2;
                this.m_limitImpulse2 = Σ_9.refs.y.Max(0, this.m_limitImpulse2 + Σ_9_156.refs.g);
                Σ_9_156.refs.g = this.m_limitImpulse2 - Σ_9_156.refs.l;
                Σ_9_156.refs.c = -Σ_9_156.refs.g * this.m_u2.x;
                Σ_9_156.refs.g = -Σ_9_156.refs.g * this.m_u2.y;
                Σ_9_156.refs.h.m_linearVelocity.x += Σ_9_156.refs.h.m_invMass * Σ_9_156.refs.c;
                Σ_9_156.refs.h.m_linearVelocity.y += Σ_9_156.refs.h.m_invMass * Σ_9_156.refs.g;
                Σ_9_156.refs.h.m_angularVelocity += Σ_9_156.refs.h.m_invI * (Σ_9_156.refs.n * Σ_9_156.refs.g - Σ_9_156.refs.a * Σ_9_156.refs.c);
            }
        }, Σ_9);
        Σ_9.refs.E.prototype.SolvePositionConstraints = Σ_9.addFunction(function αwUto() {
            var Σ_9_157 = new Σ.Scope(this, αwUto, '157', Σ_9, {}, []);
            Σ_9_157.refs.d = this.m_bodyA, Σ_9_157.refs.h = this.m_bodyB, Σ_9_157.refs.l = undefined, Σ_9_157.refs.j = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x, Σ_9_157.refs.o = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y, Σ_9_157.refs.q = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x, Σ_9_157.refs.n = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y, Σ_9_157.refs.a = 0, Σ_9_157.refs.c = 0, Σ_9_157.refs.g = 0, Σ_9_157.refs.b = 0, Σ_9_157.refs.e = Σ_9_157.refs.l = 0, Σ_9_157.refs.f = 0, Σ_9_157.refs.m = 0, Σ_9_157.refs.r = Σ_9_157.refs.e = Σ_9_157.refs.m = Σ_9_157.refs.l = Σ_9_157.refs.e = Σ_9_157.refs.l = 0;
            if (this.m_state == Σ_9.refs.I.e_atUpperLimit) {
                Σ_9_157.refs.l = Σ_9_157.refs.d.m_xf.R;
                Σ_9_157.refs.a = this.m_localAnchor1.x - Σ_9_157.refs.d.m_sweep.localCenter.x;
                Σ_9_157.refs.c = this.m_localAnchor1.y - Σ_9_157.refs.d.m_sweep.localCenter.y;
                Σ_9_157.refs.e = Σ_9_157.refs.l.col1.x * Σ_9_157.refs.a + Σ_9_157.refs.l.col2.x * Σ_9_157.refs.c;
                Σ_9_157.refs.c = Σ_9_157.refs.l.col1.y * Σ_9_157.refs.a + Σ_9_157.refs.l.col2.y * Σ_9_157.refs.c;
                Σ_9_157.refs.a = Σ_9_157.refs.e;
                Σ_9_157.refs.l = Σ_9_157.refs.h.m_xf.R;
                Σ_9_157.refs.g = this.m_localAnchor2.x - Σ_9_157.refs.h.m_sweep.localCenter.x;
                Σ_9_157.refs.b = this.m_localAnchor2.y - Σ_9_157.refs.h.m_sweep.localCenter.y;
                Σ_9_157.refs.e = Σ_9_157.refs.l.col1.x * Σ_9_157.refs.g + Σ_9_157.refs.l.col2.x * Σ_9_157.refs.b;
                Σ_9_157.refs.b = Σ_9_157.refs.l.col1.y * Σ_9_157.refs.g + Σ_9_157.refs.l.col2.y * Σ_9_157.refs.b;
                Σ_9_157.refs.g = Σ_9_157.refs.e;
                Σ_9_157.refs.l = Σ_9_157.refs.d.m_sweep.c.x + Σ_9_157.refs.a;
                Σ_9_157.refs.e = Σ_9_157.refs.d.m_sweep.c.y + Σ_9_157.refs.c;
                Σ_9_157.refs.f = Σ_9_157.refs.h.m_sweep.c.x + Σ_9_157.refs.g;
                Σ_9_157.refs.m = Σ_9_157.refs.h.m_sweep.c.y + Σ_9_157.refs.b;
                this.m_u1.Set(Σ_9_157.refs.l - Σ_9_157.refs.j, Σ_9_157.refs.e - Σ_9_157.refs.o);
                this.m_u2.Set(Σ_9_157.refs.f - Σ_9_157.refs.q, Σ_9_157.refs.m - Σ_9_157.refs.n);
                Σ_9_157.refs.l = this.m_u1.Length();
                Σ_9_157.refs.e = this.m_u2.Length();
                Σ_9_157.refs.l > Σ_9.refs.F.b2_linearSlop ? this.m_u1.Multiply(1 / Σ_9_157.refs.l) : this.m_u1.SetZero();
                Σ_9_157.refs.e > Σ_9.refs.F.b2_linearSlop ? this.m_u2.Multiply(1 / Σ_9_157.refs.e) : this.m_u2.SetZero();
                Σ_9_157.refs.l = this.m_constant - Σ_9_157.refs.l - this.m_ratio * Σ_9_157.refs.e;
                Σ_9_157.refs.r = Σ_9.refs.y.Max(Σ_9_157.refs.r, -Σ_9_157.refs.l);
                Σ_9_157.refs.l = Σ_9.refs.y.Clamp(Σ_9_157.refs.l + Σ_9.refs.F.b2_linearSlop, -Σ_9.refs.F.b2_maxLinearCorrection, 0);
                Σ_9_157.refs.m = -this.m_pulleyMass * Σ_9_157.refs.l;
                Σ_9_157.refs.l = -Σ_9_157.refs.m * this.m_u1.x;
                Σ_9_157.refs.e = -Σ_9_157.refs.m * this.m_u1.y;
                Σ_9_157.refs.f = -this.m_ratio * Σ_9_157.refs.m * this.m_u2.x;
                Σ_9_157.refs.m = -this.m_ratio * Σ_9_157.refs.m * this.m_u2.y;
                Σ_9_157.refs.d.m_sweep.c.x += Σ_9_157.refs.d.m_invMass * Σ_9_157.refs.l;
                Σ_9_157.refs.d.m_sweep.c.y += Σ_9_157.refs.d.m_invMass * Σ_9_157.refs.e;
                Σ_9_157.refs.d.m_sweep.a += Σ_9_157.refs.d.m_invI * (Σ_9_157.refs.a * Σ_9_157.refs.e - Σ_9_157.refs.c * Σ_9_157.refs.l);
                Σ_9_157.refs.h.m_sweep.c.x += Σ_9_157.refs.h.m_invMass * Σ_9_157.refs.f;
                Σ_9_157.refs.h.m_sweep.c.y += Σ_9_157.refs.h.m_invMass * Σ_9_157.refs.m;
                Σ_9_157.refs.h.m_sweep.a += Σ_9_157.refs.h.m_invI * (Σ_9_157.refs.g * Σ_9_157.refs.m - Σ_9_157.refs.b * Σ_9_157.refs.f);
                Σ_9_157.refs.d.SynchronizeTransform();
                Σ_9_157.refs.h.SynchronizeTransform();
            }
            if (this.m_limitState1 == Σ_9.refs.I.e_atUpperLimit) {
                Σ_9_157.refs.l = Σ_9_157.refs.d.m_xf.R;
                Σ_9_157.refs.a = this.m_localAnchor1.x - Σ_9_157.refs.d.m_sweep.localCenter.x;
                Σ_9_157.refs.c = this.m_localAnchor1.y - Σ_9_157.refs.d.m_sweep.localCenter.y;
                Σ_9_157.refs.e = Σ_9_157.refs.l.col1.x * Σ_9_157.refs.a + Σ_9_157.refs.l.col2.x * Σ_9_157.refs.c;
                Σ_9_157.refs.c = Σ_9_157.refs.l.col1.y * Σ_9_157.refs.a + Σ_9_157.refs.l.col2.y * Σ_9_157.refs.c;
                Σ_9_157.refs.a = Σ_9_157.refs.e;
                Σ_9_157.refs.l = Σ_9_157.refs.d.m_sweep.c.x + Σ_9_157.refs.a;
                Σ_9_157.refs.e = Σ_9_157.refs.d.m_sweep.c.y + Σ_9_157.refs.c;
                this.m_u1.Set(Σ_9_157.refs.l - Σ_9_157.refs.j, Σ_9_157.refs.e - Σ_9_157.refs.o);
                Σ_9_157.refs.l = this.m_u1.Length();
                if (Σ_9_157.refs.l > Σ_9.refs.F.b2_linearSlop) {
                    this.m_u1.x *= 1 / Σ_9_157.refs.l;
                    this.m_u1.y *= 1 / Σ_9_157.refs.l;
                } else {
                    this.m_u1.SetZero();
                }
                Σ_9_157.refs.l = this.m_maxLength1 - Σ_9_157.refs.l;
                Σ_9_157.refs.r = Σ_9.refs.y.Max(Σ_9_157.refs.r, -Σ_9_157.refs.l);
                Σ_9_157.refs.l = Σ_9.refs.y.Clamp(Σ_9_157.refs.l + Σ_9.refs.F.b2_linearSlop, -Σ_9.refs.F.b2_maxLinearCorrection, 0);
                Σ_9_157.refs.m = -this.m_limitMass1 * Σ_9_157.refs.l;
                Σ_9_157.refs.l = -Σ_9_157.refs.m * this.m_u1.x;
                Σ_9_157.refs.e = -Σ_9_157.refs.m * this.m_u1.y;
                Σ_9_157.refs.d.m_sweep.c.x += Σ_9_157.refs.d.m_invMass * Σ_9_157.refs.l;
                Σ_9_157.refs.d.m_sweep.c.y += Σ_9_157.refs.d.m_invMass * Σ_9_157.refs.e;
                Σ_9_157.refs.d.m_sweep.a += Σ_9_157.refs.d.m_invI * (Σ_9_157.refs.a * Σ_9_157.refs.e - Σ_9_157.refs.c * Σ_9_157.refs.l);
                Σ_9_157.refs.d.SynchronizeTransform();
            }
            if (this.m_limitState2 == Σ_9.refs.I.e_atUpperLimit) {
                Σ_9_157.refs.l = Σ_9_157.refs.h.m_xf.R;
                Σ_9_157.refs.g = this.m_localAnchor2.x - Σ_9_157.refs.h.m_sweep.localCenter.x;
                Σ_9_157.refs.b = this.m_localAnchor2.y - Σ_9_157.refs.h.m_sweep.localCenter.y;
                Σ_9_157.refs.e = Σ_9_157.refs.l.col1.x * Σ_9_157.refs.g + Σ_9_157.refs.l.col2.x * Σ_9_157.refs.b;
                Σ_9_157.refs.b = Σ_9_157.refs.l.col1.y * Σ_9_157.refs.g + Σ_9_157.refs.l.col2.y * Σ_9_157.refs.b;
                Σ_9_157.refs.g = Σ_9_157.refs.e;
                Σ_9_157.refs.f = Σ_9_157.refs.h.m_sweep.c.x + Σ_9_157.refs.g;
                Σ_9_157.refs.m = Σ_9_157.refs.h.m_sweep.c.y + Σ_9_157.refs.b;
                this.m_u2.Set(Σ_9_157.refs.f - Σ_9_157.refs.q, Σ_9_157.refs.m - Σ_9_157.refs.n);
                Σ_9_157.refs.e = this.m_u2.Length();
                if (Σ_9_157.refs.e > Σ_9.refs.F.b2_linearSlop) {
                    this.m_u2.x *= 1 / Σ_9_157.refs.e;
                    this.m_u2.y *= 1 / Σ_9_157.refs.e;
                } else {
                    this.m_u2.SetZero();
                }
                Σ_9_157.refs.l = this.m_maxLength2 - Σ_9_157.refs.e;
                Σ_9_157.refs.r = Σ_9.refs.y.Max(Σ_9_157.refs.r, -Σ_9_157.refs.l);
                Σ_9_157.refs.l = Σ_9.refs.y.Clamp(Σ_9_157.refs.l + Σ_9.refs.F.b2_linearSlop, -Σ_9.refs.F.b2_maxLinearCorrection, 0);
                Σ_9_157.refs.m = -this.m_limitMass2 * Σ_9_157.refs.l;
                Σ_9_157.refs.f = -Σ_9_157.refs.m * this.m_u2.x;
                Σ_9_157.refs.m = -Σ_9_157.refs.m * this.m_u2.y;
                Σ_9_157.refs.h.m_sweep.c.x += Σ_9_157.refs.h.m_invMass * Σ_9_157.refs.f;
                Σ_9_157.refs.h.m_sweep.c.y += Σ_9_157.refs.h.m_invMass * Σ_9_157.refs.m;
                Σ_9_157.refs.h.m_sweep.a += Σ_9_157.refs.h.m_invI * (Σ_9_157.refs.g * Σ_9_157.refs.m - Σ_9_157.refs.b * Σ_9_157.refs.f);
                Σ_9_157.refs.h.SynchronizeTransform();
            }
            return Σ_9_157.refs.r < Σ_9.refs.F.b2_linearSlop;
        }, Σ_9);
        Σ.refs.Box2D.postDefs.push(Σ_9.addFunction(function αtLCP() {
            var Σ_9_158 = new Σ.Scope(this, αtLCP, '158', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2;
        }, Σ_9));
        Σ.refs.Box2D.inherit(Σ_9.refs.R, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.R.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.R.b2PulleyJointDef = Σ_9.addFunction(function αduBH() {
            var Σ_9_159 = new Σ.Scope(this, αduBH, '159', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
            this.groundAnchorA = new Σ_9.refs.w();
            this.groundAnchorB = new Σ_9.refs.w();
            this.localAnchorA = new Σ_9.refs.w();
            this.localAnchorB = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.R.prototype.b2PulleyJointDef = Σ_9.addFunction(function αp1vA() {
            var Σ_9_160 = new Σ.Scope(this, αp1vA, '160', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_pulleyJoint;
            this.groundAnchorA.Set(-1, 1);
            this.groundAnchorB.Set(1, 1);
            this.localAnchorA.Set(-1, 0);
            this.localAnchorB.Set(1, 0);
            this.maxLengthB = this.lengthB = this.maxLengthA = this.lengthA = 0;
            this.ratio = 1;
            this.collideConnected = true;
        }, Σ_9);
        Σ_9.refs.R.prototype.Initialize = Σ_9.addFunction(function αqkuV(d, h, l, j, o, q, n) {
            var Σ_9_161 = new Σ.Scope(this, αqkuV, '161', Σ_9, {
                d: d,
                h: h,
                l: l,
                j: j,
                o: o,
                q: q,
                n: n
            }, []);
            if (Σ_9_161.refs.n === undefined) {
                Σ_9_161.refs.n = 0;
            }
            this.bodyA = Σ_9_161.refs.d;
            this.bodyB = Σ_9_161.refs.h;
            this.groundAnchorA.SetV(Σ_9_161.refs.l);
            this.groundAnchorB.SetV(Σ_9_161.refs.j);
            this.localAnchorA = this.bodyA.GetLocalPoint(Σ_9_161.refs.o);
            this.localAnchorB = this.bodyB.GetLocalPoint(Σ_9_161.refs.q);
            Σ_9_161.refs.d = Σ_9_161.refs.o.x - Σ_9_161.refs.l.x;
            Σ_9_161.refs.l = Σ_9_161.refs.o.y - Σ_9_161.refs.l.y;
            this.lengthA = Math.sqrt(Σ_9_161.refs.d * Σ_9_161.refs.d + Σ_9_161.refs.l * Σ_9_161.refs.l);
            Σ_9_161.refs.l = Σ_9_161.refs.q.x - Σ_9_161.refs.j.x;
            Σ_9_161.refs.j = Σ_9_161.refs.q.y - Σ_9_161.refs.j.y;
            this.lengthB = Math.sqrt(Σ_9_161.refs.l * Σ_9_161.refs.l + Σ_9_161.refs.j * Σ_9_161.refs.j);
            this.ratio = Σ_9_161.refs.n;
            Σ_9_161.refs.n = this.lengthA + this.ratio * this.lengthB;
            this.maxLengthA = Σ_9_161.refs.n - this.ratio * Σ_9.refs.E.b2_minPulleyLength;
            this.maxLengthB = (Σ_9_161.refs.n - Σ_9.refs.E.b2_minPulleyLength) / this.ratio;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.N, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.N.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.N.b2RevoluteJoint = Σ_9.addFunction(function αxDrn() {
            var Σ_9_162 = new Σ.Scope(this, αxDrn, '162', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.K = new Σ_9.refs.G();
            this.K1 = new Σ_9.refs.G();
            this.K2 = new Σ_9.refs.G();
            this.K3 = new Σ_9.refs.G();
            this.impulse3 = new Σ_9.refs.A();
            this.impulse2 = new Σ_9.refs.w();
            this.reduced = new Σ_9.refs.w();
            this.m_localAnchor1 = new Σ_9.refs.w();
            this.m_localAnchor2 = new Σ_9.refs.w();
            this.m_impulse = new Σ_9.refs.A();
            this.m_mass = new Σ_9.refs.K();
        }, Σ_9);
        Σ_9.refs.N.prototype.GetAnchorA = Σ_9.addFunction(function αkBfp() {
            var Σ_9_163 = new Σ.Scope(this, αkBfp, '163', Σ_9, {}, []);
            return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
        }, Σ_9);
        Σ_9.refs.N.prototype.GetAnchorB = Σ_9.addFunction(function αrmsu() {
            var Σ_9_164 = new Σ.Scope(this, αrmsu, '164', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
        }, Σ_9);
        Σ_9.refs.N.prototype.GetReactionForce = Σ_9.addFunction(function αtkrg(d) {
            var Σ_9_165 = new Σ.Scope(this, αtkrg, '165', Σ_9, {
                d: d
            }, []);
            if (Σ_9_165.refs.d === undefined) {
                Σ_9_165.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_165.refs.d * this.m_impulse.x, Σ_9_165.refs.d * this.m_impulse.y);
        }, Σ_9);
        Σ_9.refs.N.prototype.GetReactionTorque = Σ_9.addFunction(function αvDjX(d) {
            var Σ_9_166 = new Σ.Scope(this, αvDjX, '166', Σ_9, {
                d: d
            }, []);
            if (Σ_9_166.refs.d === undefined) {
                Σ_9_166.refs.d = 0;
            }
            return Σ_9_166.refs.d * this.m_impulse.z;
        }, Σ_9);
        Σ_9.refs.N.prototype.GetJointAngle = Σ_9.addFunction(function αwGTS() {
            var Σ_9_167 = new Σ.Scope(this, αwGTS, '167', Σ_9, {}, []);
            return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
        }, Σ_9);
        Σ_9.refs.N.prototype.GetJointSpeed = Σ_9.addFunction(function αiJ4e() {
            var Σ_9_168 = new Σ.Scope(this, αiJ4e, '168', Σ_9, {}, []);
            return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
        }, Σ_9);
        Σ_9.refs.N.prototype.IsLimitEnabled = Σ_9.addFunction(function α3qSP() {
            var Σ_9_169 = new Σ.Scope(this, α3qSP, '169', Σ_9, {}, []);
            return this.m_enableLimit;
        }, Σ_9);
        Σ_9.refs.N.prototype.EnableLimit = Σ_9.addFunction(function αGDd8(d) {
            var Σ_9_170 = new Σ.Scope(this, αGDd8, '170', Σ_9, {
                d: d
            }, []);
            this.m_enableLimit = Σ_9_170.refs.d;
        }, Σ_9);
        Σ_9.refs.N.prototype.GetLowerLimit = Σ_9.addFunction(function α6rR5() {
            var Σ_9_171 = new Σ.Scope(this, α6rR5, '171', Σ_9, {}, []);
            return this.m_lowerAngle;
        }, Σ_9);
        Σ_9.refs.N.prototype.GetUpperLimit = Σ_9.addFunction(function αJdbO() {
            var Σ_9_172 = new Σ.Scope(this, αJdbO, '172', Σ_9, {}, []);
            return this.m_upperAngle;
        }, Σ_9);
        Σ_9.refs.N.prototype.SetLimits = Σ_9.addFunction(function αlggT(d, h) {
            var Σ_9_173 = new Σ.Scope(this, αlggT, '173', Σ_9, {
                d: d,
                h: h
            }, []);
            if (Σ_9_173.refs.d === undefined) {
                Σ_9_173.refs.d = 0;
            }
            if (Σ_9_173.refs.h === undefined) {
                Σ_9_173.refs.h = 0;
            }
            this.m_lowerAngle = Σ_9_173.refs.d;
            this.m_upperAngle = Σ_9_173.refs.h;
        }, Σ_9);
        Σ_9.refs.N.prototype.IsMotorEnabled = Σ_9.addFunction(function αGij5() {
            var Σ_9_174 = new Σ.Scope(this, αGij5, '174', Σ_9, {}, []);
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            return this.m_enableMotor;
        }, Σ_9);
        Σ_9.refs.N.prototype.EnableMotor = Σ_9.addFunction(function αwyeJ(d) {
            var Σ_9_175 = new Σ.Scope(this, αwyeJ, '175', Σ_9, {
                d: d
            }, []);
            this.m_enableMotor = Σ_9_175.refs.d;
        }, Σ_9);
        Σ_9.refs.N.prototype.SetMotorSpeed = Σ_9.addFunction(function α25id(d) {
            var Σ_9_176 = new Σ.Scope(this, α25id, '176', Σ_9, {
                d: d
            }, []);
            if (Σ_9_176.refs.d === undefined) {
                Σ_9_176.refs.d = 0;
            }
            this.m_bodyA.SetAwake(true);
            this.m_bodyB.SetAwake(true);
            this.m_motorSpeed = Σ_9_176.refs.d;
        }, Σ_9);
        Σ_9.refs.N.prototype.GetMotorSpeed = Σ_9.addFunction(function αiUnw() {
            var Σ_9_177 = new Σ.Scope(this, αiUnw, '177', Σ_9, {}, []);
            return this.m_motorSpeed;
        }, Σ_9);
        Σ_9.refs.N.prototype.SetMaxMotorTorque = Σ_9.addFunction(function αKkIh(d) {
            var Σ_9_178 = new Σ.Scope(this, αKkIh, '178', Σ_9, {
                d: d
            }, []);
            if (Σ_9_178.refs.d === undefined) {
                Σ_9_178.refs.d = 0;
            }
            this.m_maxMotorTorque = Σ_9_178.refs.d;
        }, Σ_9);
        Σ_9.refs.N.prototype.GetMotorTorque = Σ_9.addFunction(function αE61c() {
            var Σ_9_179 = new Σ.Scope(this, αE61c, '179', Σ_9, {}, []);
            return this.m_maxMotorTorque;
        }, Σ_9);
        Σ_9.refs.N.prototype.b2RevoluteJoint = Σ_9.addFunction(function α1qcJ(d) {
            var Σ_9_180 = new Σ.Scope(this, α1qcJ, '180', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_180.refs.d);
            this.m_localAnchor1.SetV(Σ_9_180.refs.d.localAnchorA);
            this.m_localAnchor2.SetV(Σ_9_180.refs.d.localAnchorB);
            this.m_referenceAngle = Σ_9_180.refs.d.referenceAngle;
            this.m_impulse.SetZero();
            this.m_motorImpulse = 0;
            this.m_lowerAngle = Σ_9_180.refs.d.lowerAngle;
            this.m_upperAngle = Σ_9_180.refs.d.upperAngle;
            this.m_maxMotorTorque = Σ_9_180.refs.d.maxMotorTorque;
            this.m_motorSpeed = Σ_9_180.refs.d.motorSpeed;
            this.m_enableLimit = Σ_9_180.refs.d.enableLimit;
            this.m_enableMotor = Σ_9_180.refs.d.enableMotor;
            this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
        }, Σ_9);
        Σ_9.refs.N.prototype.InitVelocityConstraints = Σ_9.addFunction(function αandZ(d) {
            var Σ_9_181 = new Σ.Scope(this, αandZ, '181', Σ_9, {
                d: d
            }, []);
            Σ_9_181.refs.h = this.m_bodyA, Σ_9_181.refs.l = this.m_bodyB, Σ_9_181.refs.j = undefined, Σ_9_181.refs.o = 0;
            Σ_9_181.refs.j = Σ_9_181.refs.h.m_xf.R;
            Σ_9_181.refs.q = this.m_localAnchor1.x - Σ_9_181.refs.h.m_sweep.localCenter.x, Σ_9_181.refs.n = this.m_localAnchor1.y - Σ_9_181.refs.h.m_sweep.localCenter.y;
            Σ_9_181.refs.o = Σ_9_181.refs.j.col1.x * Σ_9_181.refs.q + Σ_9_181.refs.j.col2.x * Σ_9_181.refs.n;
            Σ_9_181.refs.n = Σ_9_181.refs.j.col1.y * Σ_9_181.refs.q + Σ_9_181.refs.j.col2.y * Σ_9_181.refs.n;
            Σ_9_181.refs.q = Σ_9_181.refs.o;
            Σ_9_181.refs.j = Σ_9_181.refs.l.m_xf.R;
            Σ_9_181.refs.a = this.m_localAnchor2.x - Σ_9_181.refs.l.m_sweep.localCenter.x, Σ_9_181.refs.c = this.m_localAnchor2.y - Σ_9_181.refs.l.m_sweep.localCenter.y;
            Σ_9_181.refs.o = Σ_9_181.refs.j.col1.x * Σ_9_181.refs.a + Σ_9_181.refs.j.col2.x * Σ_9_181.refs.c;
            Σ_9_181.refs.c = Σ_9_181.refs.j.col1.y * Σ_9_181.refs.a + Σ_9_181.refs.j.col2.y * Σ_9_181.refs.c;
            Σ_9_181.refs.a = Σ_9_181.refs.o;
            Σ_9_181.refs.j = Σ_9_181.refs.h.m_invMass;
            Σ_9_181.refs.o = Σ_9_181.refs.l.m_invMass;
            Σ_9_181.refs.g = Σ_9_181.refs.h.m_invI, Σ_9_181.refs.b = Σ_9_181.refs.l.m_invI;
            this.m_mass.col1.x = Σ_9_181.refs.j + Σ_9_181.refs.o + Σ_9_181.refs.n * Σ_9_181.refs.n * Σ_9_181.refs.g + Σ_9_181.refs.c * Σ_9_181.refs.c * Σ_9_181.refs.b;
            this.m_mass.col2.x = -Σ_9_181.refs.n * Σ_9_181.refs.q * Σ_9_181.refs.g - Σ_9_181.refs.c * Σ_9_181.refs.a * Σ_9_181.refs.b;
            this.m_mass.col3.x = -Σ_9_181.refs.n * Σ_9_181.refs.g - Σ_9_181.refs.c * Σ_9_181.refs.b;
            this.m_mass.col1.y = this.m_mass.col2.x;
            this.m_mass.col2.y = Σ_9_181.refs.j + Σ_9_181.refs.o + Σ_9_181.refs.q * Σ_9_181.refs.q * Σ_9_181.refs.g + Σ_9_181.refs.a * Σ_9_181.refs.a * Σ_9_181.refs.b;
            this.m_mass.col3.y = Σ_9_181.refs.q * Σ_9_181.refs.g + Σ_9_181.refs.a * Σ_9_181.refs.b;
            this.m_mass.col1.z = this.m_mass.col3.x;
            this.m_mass.col2.z = this.m_mass.col3.y;
            this.m_mass.col3.z = Σ_9_181.refs.g + Σ_9_181.refs.b;
            this.m_motorMass = 1 / (Σ_9_181.refs.g + Σ_9_181.refs.b);
            if (this.m_enableMotor == false) {
                this.m_motorImpulse = 0;
            }
            if (this.m_enableLimit) {
                Σ_9_181.refs.e = Σ_9_181.refs.l.m_sweep.a - Σ_9_181.refs.h.m_sweep.a - this.m_referenceAngle;
                if (Σ_9.refs.y.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * Σ_9.refs.F.b2_angularSlop) {
                    this.m_limitState = Σ_9.refs.I.e_equalLimits;
                } else if (Σ_9_181.refs.e <= this.m_lowerAngle) {
                    if (this.m_limitState != Σ_9.refs.I.e_atLowerLimit) {
                        this.m_impulse.z = 0;
                    }
                    this.m_limitState = Σ_9.refs.I.e_atLowerLimit;
                } else if (Σ_9_181.refs.e >= this.m_upperAngle) {
                    if (this.m_limitState != Σ_9.refs.I.e_atUpperLimit) {
                        this.m_impulse.z = 0;
                    }
                    this.m_limitState = Σ_9.refs.I.e_atUpperLimit;
                } else {
                    this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
                    this.m_impulse.z = 0;
                }
            } else {
                this.m_limitState = Σ_9.refs.I.e_inactiveLimit;
            }
            if (Σ_9_181.refs.d.warmStarting) {
                this.m_impulse.x *= Σ_9_181.refs.d.dtRatio;
                this.m_impulse.y *= Σ_9_181.refs.d.dtRatio;
                this.m_motorImpulse *= Σ_9_181.refs.d.dtRatio;
                Σ_9_181.refs.d = this.m_impulse.x;
                Σ_9_181.refs.e = this.m_impulse.y;
                Σ_9_181.refs.h.m_linearVelocity.x -= Σ_9_181.refs.j * Σ_9_181.refs.d;
                Σ_9_181.refs.h.m_linearVelocity.y -= Σ_9_181.refs.j * Σ_9_181.refs.e;
                Σ_9_181.refs.h.m_angularVelocity -= Σ_9_181.refs.g * (Σ_9_181.refs.q * Σ_9_181.refs.e - Σ_9_181.refs.n * Σ_9_181.refs.d + this.m_motorImpulse + this.m_impulse.z);
                Σ_9_181.refs.l.m_linearVelocity.x += Σ_9_181.refs.o * Σ_9_181.refs.d;
                Σ_9_181.refs.l.m_linearVelocity.y += Σ_9_181.refs.o * Σ_9_181.refs.e;
                Σ_9_181.refs.l.m_angularVelocity += Σ_9_181.refs.b * (Σ_9_181.refs.a * Σ_9_181.refs.e - Σ_9_181.refs.c * Σ_9_181.refs.d + this.m_motorImpulse + this.m_impulse.z);
            } else {
                this.m_impulse.SetZero();
                this.m_motorImpulse = 0;
            }
        }, Σ_9);
        Σ_9.refs.N.prototype.SolveVelocityConstraints = Σ_9.addFunction(function αj04Y(d) {
            var Σ_9_182 = new Σ.Scope(this, αj04Y, '182', Σ_9, {
                d: d
            }, []);
            Σ_9_182.refs.h = this.m_bodyA, Σ_9_182.refs.l = this.m_bodyB, Σ_9_182.refs.j = 0, Σ_9_182.refs.o = Σ_9_182.refs.j = 0, Σ_9_182.refs.q = 0, Σ_9_182.refs.n = 0, Σ_9_182.refs.a = 0, Σ_9_182.refs.c = Σ_9_182.refs.h.m_linearVelocity, Σ_9_182.refs.g = Σ_9_182.refs.h.m_angularVelocity, Σ_9_182.refs.b = Σ_9_182.refs.l.m_linearVelocity, Σ_9_182.refs.e = Σ_9_182.refs.l.m_angularVelocity, Σ_9_182.refs.f = Σ_9_182.refs.h.m_invMass, Σ_9_182.refs.m = Σ_9_182.refs.l.m_invMass, Σ_9_182.refs.r = Σ_9_182.refs.h.m_invI, Σ_9_182.refs.s = Σ_9_182.refs.l.m_invI;
            if (this.m_enableMotor && this.m_limitState != Σ_9.refs.I.e_equalLimits) {
                Σ_9_182.refs.o = this.m_motorMass * -(Σ_9_182.refs.e - Σ_9_182.refs.g - this.m_motorSpeed);
                Σ_9_182.refs.q = this.m_motorImpulse;
                Σ_9_182.refs.n = Σ_9_182.refs.d.dt * this.m_maxMotorTorque;
                this.m_motorImpulse = Σ_9.refs.y.Clamp(this.m_motorImpulse + Σ_9_182.refs.o, -Σ_9_182.refs.n, Σ_9_182.refs.n);
                Σ_9_182.refs.o = this.m_motorImpulse - Σ_9_182.refs.q;
                Σ_9_182.refs.g -= Σ_9_182.refs.r * Σ_9_182.refs.o;
                Σ_9_182.refs.e += Σ_9_182.refs.s * Σ_9_182.refs.o;
            }
            if (this.m_enableLimit && this.m_limitState != Σ_9.refs.I.e_inactiveLimit) {
                Σ_9_182.refs.d = Σ_9_182.refs.h.m_xf.R;
                Σ_9_182.refs.o = this.m_localAnchor1.x - Σ_9_182.refs.h.m_sweep.localCenter.x;
                Σ_9_182.refs.q = this.m_localAnchor1.y - Σ_9_182.refs.h.m_sweep.localCenter.y;
                Σ_9_182.refs.j = Σ_9_182.refs.d.col1.x * Σ_9_182.refs.o + Σ_9_182.refs.d.col2.x * Σ_9_182.refs.q;
                Σ_9_182.refs.q = Σ_9_182.refs.d.col1.y * Σ_9_182.refs.o + Σ_9_182.refs.d.col2.y * Σ_9_182.refs.q;
                Σ_9_182.refs.o = Σ_9_182.refs.j;
                Σ_9_182.refs.d = Σ_9_182.refs.l.m_xf.R;
                Σ_9_182.refs.n = this.m_localAnchor2.x - Σ_9_182.refs.l.m_sweep.localCenter.x;
                Σ_9_182.refs.a = this.m_localAnchor2.y - Σ_9_182.refs.l.m_sweep.localCenter.y;
                Σ_9_182.refs.j = Σ_9_182.refs.d.col1.x * Σ_9_182.refs.n + Σ_9_182.refs.d.col2.x * Σ_9_182.refs.a;
                Σ_9_182.refs.a = Σ_9_182.refs.d.col1.y * Σ_9_182.refs.n + Σ_9_182.refs.d.col2.y * Σ_9_182.refs.a;
                Σ_9_182.refs.n = Σ_9_182.refs.j;
                Σ_9_182.refs.d = Σ_9_182.refs.b.x + -Σ_9_182.refs.e * Σ_9_182.refs.a - Σ_9_182.refs.c.x - -Σ_9_182.refs.g * Σ_9_182.refs.q;
                Σ_9_182.refs.v = Σ_9_182.refs.b.y + Σ_9_182.refs.e * Σ_9_182.refs.n - Σ_9_182.refs.c.y - Σ_9_182.refs.g * Σ_9_182.refs.o;
                this.m_mass.Solve33(this.impulse3, -Σ_9_182.refs.d, -Σ_9_182.refs.v, -(Σ_9_182.refs.e - Σ_9_182.refs.g));
                if (this.m_limitState == Σ_9.refs.I.e_equalLimits) {
                    this.m_impulse.Add(this.impulse3);
                } else if (this.m_limitState == Σ_9.refs.I.e_atLowerLimit) {
                    Σ_9_182.refs.j = this.m_impulse.z + this.impulse3.z;
                    if (Σ_9_182.refs.j < 0) {
                        this.m_mass.Solve22(this.reduced, -Σ_9_182.refs.d, -Σ_9_182.refs.v);
                        this.impulse3.x = this.reduced.x;
                        this.impulse3.y = this.reduced.y;
                        this.impulse3.z = -this.m_impulse.z;
                        this.m_impulse.x += this.reduced.x;
                        this.m_impulse.y += this.reduced.y;
                        this.m_impulse.z = 0;
                    }
                } else if (this.m_limitState == Σ_9.refs.I.e_atUpperLimit) {
                    Σ_9_182.refs.j = this.m_impulse.z + this.impulse3.z;
                    if (Σ_9_182.refs.j > 0) {
                        this.m_mass.Solve22(this.reduced, -Σ_9_182.refs.d, -Σ_9_182.refs.v);
                        this.impulse3.x = this.reduced.x;
                        this.impulse3.y = this.reduced.y;
                        this.impulse3.z = -this.m_impulse.z;
                        this.m_impulse.x += this.reduced.x;
                        this.m_impulse.y += this.reduced.y;
                        this.m_impulse.z = 0;
                    }
                }
                Σ_9_182.refs.c.x -= Σ_9_182.refs.f * this.impulse3.x;
                Σ_9_182.refs.c.y -= Σ_9_182.refs.f * this.impulse3.y;
                Σ_9_182.refs.g -= Σ_9_182.refs.r * (Σ_9_182.refs.o * this.impulse3.y - Σ_9_182.refs.q * this.impulse3.x + this.impulse3.z);
                Σ_9_182.refs.b.x += Σ_9_182.refs.m * this.impulse3.x;
                Σ_9_182.refs.b.y += Σ_9_182.refs.m * this.impulse3.y;
                Σ_9_182.refs.e += Σ_9_182.refs.s * (Σ_9_182.refs.n * this.impulse3.y - Σ_9_182.refs.a * this.impulse3.x + this.impulse3.z);
            } else {
                Σ_9_182.refs.d = Σ_9_182.refs.h.m_xf.R;
                Σ_9_182.refs.o = this.m_localAnchor1.x - Σ_9_182.refs.h.m_sweep.localCenter.x;
                Σ_9_182.refs.q = this.m_localAnchor1.y - Σ_9_182.refs.h.m_sweep.localCenter.y;
                Σ_9_182.refs.j = Σ_9_182.refs.d.col1.x * Σ_9_182.refs.o + Σ_9_182.refs.d.col2.x * Σ_9_182.refs.q;
                Σ_9_182.refs.q = Σ_9_182.refs.d.col1.y * Σ_9_182.refs.o + Σ_9_182.refs.d.col2.y * Σ_9_182.refs.q;
                Σ_9_182.refs.o = Σ_9_182.refs.j;
                Σ_9_182.refs.d = Σ_9_182.refs.l.m_xf.R;
                Σ_9_182.refs.n = this.m_localAnchor2.x - Σ_9_182.refs.l.m_sweep.localCenter.x;
                Σ_9_182.refs.a = this.m_localAnchor2.y - Σ_9_182.refs.l.m_sweep.localCenter.y;
                Σ_9_182.refs.j = Σ_9_182.refs.d.col1.x * Σ_9_182.refs.n + Σ_9_182.refs.d.col2.x * Σ_9_182.refs.a;
                Σ_9_182.refs.a = Σ_9_182.refs.d.col1.y * Σ_9_182.refs.n + Σ_9_182.refs.d.col2.y * Σ_9_182.refs.a;
                Σ_9_182.refs.n = Σ_9_182.refs.j;
                this.m_mass.Solve22(this.impulse2, -(Σ_9_182.refs.b.x + -Σ_9_182.refs.e * Σ_9_182.refs.a - Σ_9_182.refs.c.x - -Σ_9_182.refs.g * Σ_9_182.refs.q), -(Σ_9_182.refs.b.y + Σ_9_182.refs.e * Σ_9_182.refs.n - Σ_9_182.refs.c.y - Σ_9_182.refs.g * Σ_9_182.refs.o));
                this.m_impulse.x += this.impulse2.x;
                this.m_impulse.y += this.impulse2.y;
                Σ_9_182.refs.c.x -= Σ_9_182.refs.f * this.impulse2.x;
                Σ_9_182.refs.c.y -= Σ_9_182.refs.f * this.impulse2.y;
                Σ_9_182.refs.g -= Σ_9_182.refs.r * (Σ_9_182.refs.o * this.impulse2.y - Σ_9_182.refs.q * this.impulse2.x);
                Σ_9_182.refs.b.x += Σ_9_182.refs.m * this.impulse2.x;
                Σ_9_182.refs.b.y += Σ_9_182.refs.m * this.impulse2.y;
                Σ_9_182.refs.e += Σ_9_182.refs.s * (Σ_9_182.refs.n * this.impulse2.y - Σ_9_182.refs.a * this.impulse2.x);
            }
            Σ_9_182.refs.h.m_linearVelocity.SetV(Σ_9_182.refs.c);
            Σ_9_182.refs.h.m_angularVelocity = Σ_9_182.refs.g;
            Σ_9_182.refs.l.m_linearVelocity.SetV(Σ_9_182.refs.b);
            Σ_9_182.refs.l.m_angularVelocity = Σ_9_182.refs.e;
        }, Σ_9);
        Σ_9.refs.N.prototype.SolvePositionConstraints = Σ_9.addFunction(function αOSJV() {
            var Σ_9_183 = new Σ.Scope(this, αOSJV, '183', Σ_9, {}, []);
            Σ_9_183.refs.d = 0, Σ_9_183.refs.h = undefined, Σ_9_183.refs.l = this.m_bodyA, Σ_9_183.refs.j = this.m_bodyB, Σ_9_183.refs.o = 0, Σ_9_183.refs.q = Σ_9_183.refs.h = 0, Σ_9_183.refs.n = 0, Σ_9_183.refs.a = 0;
            if (this.m_enableLimit && this.m_limitState != Σ_9.refs.I.e_inactiveLimit) {
                Σ_9_183.refs.d = Σ_9_183.refs.j.m_sweep.a - Σ_9_183.refs.l.m_sweep.a - this.m_referenceAngle;
                Σ_9_183.refs.c = 0;
                if (this.m_limitState == Σ_9.refs.I.e_equalLimits) {
                    Σ_9_183.refs.d = Σ_9.refs.y.Clamp(Σ_9_183.refs.d - this.m_lowerAngle, -Σ_9.refs.F.b2_maxAngularCorrection, Σ_9.refs.F.b2_maxAngularCorrection);
                    Σ_9_183.refs.c = -this.m_motorMass * Σ_9_183.refs.d;
                    Σ_9_183.refs.o = Σ_9.refs.y.Abs(Σ_9_183.refs.d);
                } else if (this.m_limitState == Σ_9.refs.I.e_atLowerLimit) {
                    Σ_9_183.refs.d = Σ_9_183.refs.d - this.m_lowerAngle;
                    Σ_9_183.refs.o = -Σ_9_183.refs.d;
                    Σ_9_183.refs.d = Σ_9.refs.y.Clamp(Σ_9_183.refs.d + Σ_9.refs.F.b2_angularSlop, -Σ_9.refs.F.b2_maxAngularCorrection, 0);
                    Σ_9_183.refs.c = -this.m_motorMass * Σ_9_183.refs.d;
                } else if (this.m_limitState == Σ_9.refs.I.e_atUpperLimit) {
                    Σ_9_183.refs.o = Σ_9_183.refs.d = Σ_9_183.refs.d - this.m_upperAngle;
                    Σ_9_183.refs.d = Σ_9.refs.y.Clamp(Σ_9_183.refs.d - Σ_9.refs.F.b2_angularSlop, 0, Σ_9.refs.F.b2_maxAngularCorrection);
                    Σ_9_183.refs.c = -this.m_motorMass * Σ_9_183.refs.d;
                }
                Σ_9_183.refs.l.m_sweep.a -= Σ_9_183.refs.l.m_invI * Σ_9_183.refs.c;
                Σ_9_183.refs.j.m_sweep.a += Σ_9_183.refs.j.m_invI * Σ_9_183.refs.c;
                Σ_9_183.refs.l.SynchronizeTransform();
                Σ_9_183.refs.j.SynchronizeTransform();
            }
            Σ_9_183.refs.h = Σ_9_183.refs.l.m_xf.R;
            Σ_9_183.refs.c = this.m_localAnchor1.x - Σ_9_183.refs.l.m_sweep.localCenter.x;
            Σ_9_183.refs.d = this.m_localAnchor1.y - Σ_9_183.refs.l.m_sweep.localCenter.y;
            Σ_9_183.refs.q = Σ_9_183.refs.h.col1.x * Σ_9_183.refs.c + Σ_9_183.refs.h.col2.x * Σ_9_183.refs.d;
            Σ_9_183.refs.d = Σ_9_183.refs.h.col1.y * Σ_9_183.refs.c + Σ_9_183.refs.h.col2.y * Σ_9_183.refs.d;
            Σ_9_183.refs.c = Σ_9_183.refs.q;
            Σ_9_183.refs.h = Σ_9_183.refs.j.m_xf.R;
            Σ_9_183.refs.g = this.m_localAnchor2.x - Σ_9_183.refs.j.m_sweep.localCenter.x, Σ_9_183.refs.b = this.m_localAnchor2.y - Σ_9_183.refs.j.m_sweep.localCenter.y;
            Σ_9_183.refs.q = Σ_9_183.refs.h.col1.x * Σ_9_183.refs.g + Σ_9_183.refs.h.col2.x * Σ_9_183.refs.b;
            Σ_9_183.refs.b = Σ_9_183.refs.h.col1.y * Σ_9_183.refs.g + Σ_9_183.refs.h.col2.y * Σ_9_183.refs.b;
            Σ_9_183.refs.g = Σ_9_183.refs.q;
            Σ_9_183.refs.n = Σ_9_183.refs.j.m_sweep.c.x + Σ_9_183.refs.g - Σ_9_183.refs.l.m_sweep.c.x - Σ_9_183.refs.c;
            Σ_9_183.refs.a = Σ_9_183.refs.j.m_sweep.c.y + Σ_9_183.refs.b - Σ_9_183.refs.l.m_sweep.c.y - Σ_9_183.refs.d;
            Σ_9_183.refs.e = Σ_9_183.refs.n * Σ_9_183.refs.n + Σ_9_183.refs.a * Σ_9_183.refs.a;
            Σ_9_183.refs.h = Math.sqrt(Σ_9_183.refs.e);
            Σ_9_183.refs.q = Σ_9_183.refs.l.m_invMass;
            Σ_9_183.refs.f = Σ_9_183.refs.j.m_invMass, Σ_9_183.refs.m = Σ_9_183.refs.l.m_invI, Σ_9_183.refs.r = Σ_9_183.refs.j.m_invI, Σ_9_183.refs.s = 10 * Σ_9.refs.F.b2_linearSlop;
            if (Σ_9_183.refs.e > Σ_9_183.refs.s * Σ_9_183.refs.s) {
                Σ_9_183.refs.e = 1 / (Σ_9_183.refs.q + Σ_9_183.refs.f);
                Σ_9_183.refs.n = Σ_9_183.refs.e * -Σ_9_183.refs.n;
                Σ_9_183.refs.a = Σ_9_183.refs.e * -Σ_9_183.refs.a;
                Σ_9_183.refs.l.m_sweep.c.x -= 0.5 * Σ_9_183.refs.q * Σ_9_183.refs.n;
                Σ_9_183.refs.l.m_sweep.c.y -= 0.5 * Σ_9_183.refs.q * Σ_9_183.refs.a;
                Σ_9_183.refs.j.m_sweep.c.x += 0.5 * Σ_9_183.refs.f * Σ_9_183.refs.n;
                Σ_9_183.refs.j.m_sweep.c.y += 0.5 * Σ_9_183.refs.f * Σ_9_183.refs.a;
                Σ_9_183.refs.n = Σ_9_183.refs.j.m_sweep.c.x + Σ_9_183.refs.g - Σ_9_183.refs.l.m_sweep.c.x - Σ_9_183.refs.c;
                Σ_9_183.refs.a = Σ_9_183.refs.j.m_sweep.c.y + Σ_9_183.refs.b - Σ_9_183.refs.l.m_sweep.c.y - Σ_9_183.refs.d;
            }
            this.K1.col1.x = Σ_9_183.refs.q + Σ_9_183.refs.f;
            this.K1.col2.x = 0;
            this.K1.col1.y = 0;
            this.K1.col2.y = Σ_9_183.refs.q + Σ_9_183.refs.f;
            this.K2.col1.x = Σ_9_183.refs.m * Σ_9_183.refs.d * Σ_9_183.refs.d;
            this.K2.col2.x = -Σ_9_183.refs.m * Σ_9_183.refs.c * Σ_9_183.refs.d;
            this.K2.col1.y = -Σ_9_183.refs.m * Σ_9_183.refs.c * Σ_9_183.refs.d;
            this.K2.col2.y = Σ_9_183.refs.m * Σ_9_183.refs.c * Σ_9_183.refs.c;
            this.K3.col1.x = Σ_9_183.refs.r * Σ_9_183.refs.b * Σ_9_183.refs.b;
            this.K3.col2.x = -Σ_9_183.refs.r * Σ_9_183.refs.g * Σ_9_183.refs.b;
            this.K3.col1.y = -Σ_9_183.refs.r * Σ_9_183.refs.g * Σ_9_183.refs.b;
            this.K3.col2.y = Σ_9_183.refs.r * Σ_9_183.refs.g * Σ_9_183.refs.g;
            this.K.SetM(this.K1);
            this.K.AddM(this.K2);
            this.K.AddM(this.K3);
            this.K.Solve(Σ_9.refs.N.tImpulse, -Σ_9_183.refs.n, -Σ_9_183.refs.a);
            Σ_9_183.refs.n = Σ_9.refs.N.tImpulse.x;
            Σ_9_183.refs.a = Σ_9.refs.N.tImpulse.y;
            Σ_9_183.refs.l.m_sweep.c.x -= Σ_9_183.refs.l.m_invMass * Σ_9_183.refs.n;
            Σ_9_183.refs.l.m_sweep.c.y -= Σ_9_183.refs.l.m_invMass * Σ_9_183.refs.a;
            Σ_9_183.refs.l.m_sweep.a -= Σ_9_183.refs.l.m_invI * (Σ_9_183.refs.c * Σ_9_183.refs.a - Σ_9_183.refs.d * Σ_9_183.refs.n);
            Σ_9_183.refs.j.m_sweep.c.x += Σ_9_183.refs.j.m_invMass * Σ_9_183.refs.n;
            Σ_9_183.refs.j.m_sweep.c.y += Σ_9_183.refs.j.m_invMass * Σ_9_183.refs.a;
            Σ_9_183.refs.j.m_sweep.a += Σ_9_183.refs.j.m_invI * (Σ_9_183.refs.g * Σ_9_183.refs.a - Σ_9_183.refs.b * Σ_9_183.refs.n);
            Σ_9_183.refs.l.SynchronizeTransform();
            Σ_9_183.refs.j.SynchronizeTransform();
            return Σ_9_183.refs.h <= Σ_9.refs.F.b2_linearSlop && Σ_9_183.refs.o <= Σ_9.refs.F.b2_angularSlop;
        }, Σ_9);
        Σ.refs.Box2D.postDefs.push(Σ_9.addFunction(function αdhcN() {
            var Σ_9_184 = new Σ.Scope(this, αdhcN, '184', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new Σ_9.refs.w();
        }, Σ_9));
        Σ.refs.Box2D.inherit(Σ_9.refs.S, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.S.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.S.b2RevoluteJointDef = Σ_9.addFunction(function αD3ir() {
            var Σ_9_185 = new Σ.Scope(this, αD3ir, '185', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
            this.localAnchorA = new Σ_9.refs.w();
            this.localAnchorB = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.S.prototype.b2RevoluteJointDef = Σ_9.addFunction(function αU5FB() {
            var Σ_9_186 = new Σ.Scope(this, αU5FB, '186', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_revoluteJoint;
            this.localAnchorA.Set(0, 0);
            this.localAnchorB.Set(0, 0);
            this.motorSpeed = this.maxMotorTorque = this.upperAngle = this.lowerAngle = this.referenceAngle = 0;
            this.enableMotor = this.enableLimit = false;
        }, Σ_9);
        Σ_9.refs.S.prototype.Initialize = Σ_9.addFunction(function αgZIt(d, h, l) {
            var Σ_9_187 = new Σ.Scope(this, αgZIt, '187', Σ_9, {
                d: d,
                h: h,
                l: l
            }, []);
            this.bodyA = Σ_9_187.refs.d;
            this.bodyB = Σ_9_187.refs.h;
            this.localAnchorA = this.bodyA.GetLocalPoint(Σ_9_187.refs.l);
            this.localAnchorB = this.bodyB.GetLocalPoint(Σ_9_187.refs.l);
            this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.aa, Σ.refs.Box2D.Dynamics.Joints.b2Joint);
        Σ_9.refs.aa.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2Joint.prototype;
        Σ_9.refs.aa.b2WeldJoint = Σ_9.addFunction(function αR63S() {
            var Σ_9_188 = new Σ.Scope(this, αR63S, '188', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
            this.m_localAnchorA = new Σ_9.refs.w();
            this.m_localAnchorB = new Σ_9.refs.w();
            this.m_impulse = new Σ_9.refs.A();
            this.m_mass = new Σ_9.refs.K();
        }, Σ_9);
        Σ_9.refs.aa.prototype.GetAnchorA = Σ_9.addFunction(function α1XpC() {
            var Σ_9_189 = new Σ.Scope(this, α1XpC, '189', Σ_9, {}, []);
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
        }, Σ_9);
        Σ_9.refs.aa.prototype.GetAnchorB = Σ_9.addFunction(function αX6zp() {
            var Σ_9_190 = new Σ.Scope(this, αX6zp, '190', Σ_9, {}, []);
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
        }, Σ_9);
        Σ_9.refs.aa.prototype.GetReactionForce = Σ_9.addFunction(function αMO2f(d) {
            var Σ_9_191 = new Σ.Scope(this, αMO2f, '191', Σ_9, {
                d: d
            }, []);
            if (Σ_9_191.refs.d === undefined) {
                Σ_9_191.refs.d = 0;
            }
            return new Σ_9.refs.w(Σ_9_191.refs.d * this.m_impulse.x, Σ_9_191.refs.d * this.m_impulse.y);
        }, Σ_9);
        Σ_9.refs.aa.prototype.GetReactionTorque = Σ_9.addFunction(function αhgGc(d) {
            var Σ_9_192 = new Σ.Scope(this, αhgGc, '192', Σ_9, {
                d: d
            }, []);
            if (Σ_9_192.refs.d === undefined) {
                Σ_9_192.refs.d = 0;
            }
            return Σ_9_192.refs.d * this.m_impulse.z;
        }, Σ_9);
        Σ_9.refs.aa.prototype.b2WeldJoint = Σ_9.addFunction(function αGIfT(d) {
            var Σ_9_193 = new Σ.Scope(this, αGIfT, '193', Σ_9, {
                d: d
            }, []);
            this.__super.b2Joint.call(this, Σ_9_193.refs.d);
            this.m_localAnchorA.SetV(Σ_9_193.refs.d.localAnchorA);
            this.m_localAnchorB.SetV(Σ_9_193.refs.d.localAnchorB);
            this.m_referenceAngle = Σ_9_193.refs.d.referenceAngle;
            this.m_impulse.SetZero();
            this.m_mass = new Σ_9.refs.K();
        }, Σ_9);
        Σ_9.refs.aa.prototype.InitVelocityConstraints = Σ_9.addFunction(function αeapu(d) {
            var Σ_9_194 = new Σ.Scope(this, αeapu, '194', Σ_9, {
                d: d
            }, []);
            Σ_9_194.refs.h = undefined, Σ_9_194.refs.l = 0, Σ_9_194.refs.j = this.m_bodyA, Σ_9_194.refs.o = this.m_bodyB;
            Σ_9_194.refs.h = Σ_9_194.refs.j.m_xf.R;
            Σ_9_194.refs.q = this.m_localAnchorA.x - Σ_9_194.refs.j.m_sweep.localCenter.x, Σ_9_194.refs.n = this.m_localAnchorA.y - Σ_9_194.refs.j.m_sweep.localCenter.y;
            Σ_9_194.refs.l = Σ_9_194.refs.h.col1.x * Σ_9_194.refs.q + Σ_9_194.refs.h.col2.x * Σ_9_194.refs.n;
            Σ_9_194.refs.n = Σ_9_194.refs.h.col1.y * Σ_9_194.refs.q + Σ_9_194.refs.h.col2.y * Σ_9_194.refs.n;
            Σ_9_194.refs.q = Σ_9_194.refs.l;
            Σ_9_194.refs.h = Σ_9_194.refs.o.m_xf.R;
            Σ_9_194.refs.a = this.m_localAnchorB.x - Σ_9_194.refs.o.m_sweep.localCenter.x, Σ_9_194.refs.c = this.m_localAnchorB.y - Σ_9_194.refs.o.m_sweep.localCenter.y;
            Σ_9_194.refs.l = Σ_9_194.refs.h.col1.x * Σ_9_194.refs.a + Σ_9_194.refs.h.col2.x * Σ_9_194.refs.c;
            Σ_9_194.refs.c = Σ_9_194.refs.h.col1.y * Σ_9_194.refs.a + Σ_9_194.refs.h.col2.y * Σ_9_194.refs.c;
            Σ_9_194.refs.a = Σ_9_194.refs.l;
            Σ_9_194.refs.h = Σ_9_194.refs.j.m_invMass;
            Σ_9_194.refs.l = Σ_9_194.refs.o.m_invMass;
            Σ_9_194.refs.g = Σ_9_194.refs.j.m_invI, Σ_9_194.refs.b = Σ_9_194.refs.o.m_invI;
            this.m_mass.col1.x = Σ_9_194.refs.h + Σ_9_194.refs.l + Σ_9_194.refs.n * Σ_9_194.refs.n * Σ_9_194.refs.g + Σ_9_194.refs.c * Σ_9_194.refs.c * Σ_9_194.refs.b;
            this.m_mass.col2.x = -Σ_9_194.refs.n * Σ_9_194.refs.q * Σ_9_194.refs.g - Σ_9_194.refs.c * Σ_9_194.refs.a * Σ_9_194.refs.b;
            this.m_mass.col3.x = -Σ_9_194.refs.n * Σ_9_194.refs.g - Σ_9_194.refs.c * Σ_9_194.refs.b;
            this.m_mass.col1.y = this.m_mass.col2.x;
            this.m_mass.col2.y = Σ_9_194.refs.h + Σ_9_194.refs.l + Σ_9_194.refs.q * Σ_9_194.refs.q * Σ_9_194.refs.g + Σ_9_194.refs.a * Σ_9_194.refs.a * Σ_9_194.refs.b;
            this.m_mass.col3.y = Σ_9_194.refs.q * Σ_9_194.refs.g + Σ_9_194.refs.a * Σ_9_194.refs.b;
            this.m_mass.col1.z = this.m_mass.col3.x;
            this.m_mass.col2.z = this.m_mass.col3.y;
            this.m_mass.col3.z = Σ_9_194.refs.g + Σ_9_194.refs.b;
            if (Σ_9_194.refs.d.warmStarting) {
                this.m_impulse.x *= Σ_9_194.refs.d.dtRatio;
                this.m_impulse.y *= Σ_9_194.refs.d.dtRatio;
                this.m_impulse.z *= Σ_9_194.refs.d.dtRatio;
                Σ_9_194.refs.j.m_linearVelocity.x -= Σ_9_194.refs.h * this.m_impulse.x;
                Σ_9_194.refs.j.m_linearVelocity.y -= Σ_9_194.refs.h * this.m_impulse.y;
                Σ_9_194.refs.j.m_angularVelocity -= Σ_9_194.refs.g * (Σ_9_194.refs.q * this.m_impulse.y - Σ_9_194.refs.n * this.m_impulse.x + this.m_impulse.z);
                Σ_9_194.refs.o.m_linearVelocity.x += Σ_9_194.refs.l * this.m_impulse.x;
                Σ_9_194.refs.o.m_linearVelocity.y += Σ_9_194.refs.l * this.m_impulse.y;
                Σ_9_194.refs.o.m_angularVelocity += Σ_9_194.refs.b * (Σ_9_194.refs.a * this.m_impulse.y - Σ_9_194.refs.c * this.m_impulse.x + this.m_impulse.z);
            } else {
                this.m_impulse.SetZero();
            }
        }, Σ_9);
        Σ_9.refs.aa.prototype.SolveVelocityConstraints = Σ_9.addFunction(function α8OVY() {
            var Σ_9_195 = new Σ.Scope(this, α8OVY, '195', Σ_9, {}, []);
            Σ_9_195.refs.d = undefined, Σ_9_195.refs.h = 0, Σ_9_195.refs.l = this.m_bodyA, Σ_9_195.refs.j = this.m_bodyB, Σ_9_195.refs.o = Σ_9_195.refs.l.m_linearVelocity, Σ_9_195.refs.q = Σ_9_195.refs.l.m_angularVelocity, Σ_9_195.refs.n = Σ_9_195.refs.j.m_linearVelocity, Σ_9_195.refs.a = Σ_9_195.refs.j.m_angularVelocity, Σ_9_195.refs.c = Σ_9_195.refs.l.m_invMass, Σ_9_195.refs.g = Σ_9_195.refs.j.m_invMass, Σ_9_195.refs.b = Σ_9_195.refs.l.m_invI, Σ_9_195.refs.e = Σ_9_195.refs.j.m_invI;
            Σ_9_195.refs.d = Σ_9_195.refs.l.m_xf.R;
            Σ_9_195.refs.f = this.m_localAnchorA.x - Σ_9_195.refs.l.m_sweep.localCenter.x, Σ_9_195.refs.m = this.m_localAnchorA.y - Σ_9_195.refs.l.m_sweep.localCenter.y;
            Σ_9_195.refs.h = Σ_9_195.refs.d.col1.x * Σ_9_195.refs.f + Σ_9_195.refs.d.col2.x * Σ_9_195.refs.m;
            Σ_9_195.refs.m = Σ_9_195.refs.d.col1.y * Σ_9_195.refs.f + Σ_9_195.refs.d.col2.y * Σ_9_195.refs.m;
            Σ_9_195.refs.f = Σ_9_195.refs.h;
            Σ_9_195.refs.d = Σ_9_195.refs.j.m_xf.R;
            Σ_9_195.refs.r = this.m_localAnchorB.x - Σ_9_195.refs.j.m_sweep.localCenter.x, Σ_9_195.refs.s = this.m_localAnchorB.y - Σ_9_195.refs.j.m_sweep.localCenter.y;
            Σ_9_195.refs.h = Σ_9_195.refs.d.col1.x * Σ_9_195.refs.r + Σ_9_195.refs.d.col2.x * Σ_9_195.refs.s;
            Σ_9_195.refs.s = Σ_9_195.refs.d.col1.y * Σ_9_195.refs.r + Σ_9_195.refs.d.col2.y * Σ_9_195.refs.s;
            Σ_9_195.refs.r = Σ_9_195.refs.h;
            Σ_9_195.refs.d = Σ_9_195.refs.n.x - Σ_9_195.refs.a * Σ_9_195.refs.s - Σ_9_195.refs.o.x + Σ_9_195.refs.q * Σ_9_195.refs.m;
            Σ_9_195.refs.h = Σ_9_195.refs.n.y + Σ_9_195.refs.a * Σ_9_195.refs.r - Σ_9_195.refs.o.y - Σ_9_195.refs.q * Σ_9_195.refs.f;
            Σ_9_195.refs.v = Σ_9_195.refs.a - Σ_9_195.refs.q, Σ_9_195.refs.t = new Σ_9.refs.A();
            this.m_mass.Solve33(Σ_9_195.refs.t, -Σ_9_195.refs.d, -Σ_9_195.refs.h, -Σ_9_195.refs.v);
            this.m_impulse.Add(Σ_9_195.refs.t);
            Σ_9_195.refs.o.x -= Σ_9_195.refs.c * Σ_9_195.refs.t.x;
            Σ_9_195.refs.o.y -= Σ_9_195.refs.c * Σ_9_195.refs.t.y;
            Σ_9_195.refs.q -= Σ_9_195.refs.b * (Σ_9_195.refs.f * Σ_9_195.refs.t.y - Σ_9_195.refs.m * Σ_9_195.refs.t.x + Σ_9_195.refs.t.z);
            Σ_9_195.refs.n.x += Σ_9_195.refs.g * Σ_9_195.refs.t.x;
            Σ_9_195.refs.n.y += Σ_9_195.refs.g * Σ_9_195.refs.t.y;
            Σ_9_195.refs.a += Σ_9_195.refs.e * (Σ_9_195.refs.r * Σ_9_195.refs.t.y - Σ_9_195.refs.s * Σ_9_195.refs.t.x + Σ_9_195.refs.t.z);
            Σ_9_195.refs.l.m_angularVelocity = Σ_9_195.refs.q;
            Σ_9_195.refs.j.m_angularVelocity = Σ_9_195.refs.a;
        }, Σ_9);
        Σ_9.refs.aa.prototype.SolvePositionConstraints = Σ_9.addFunction(function αA8TW() {
            var Σ_9_196 = new Σ.Scope(this, αA8TW, '196', Σ_9, {}, []);
            Σ_9_196.refs.d = undefined, Σ_9_196.refs.h = 0, Σ_9_196.refs.l = this.m_bodyA, Σ_9_196.refs.j = this.m_bodyB;
            Σ_9_196.refs.d = Σ_9_196.refs.l.m_xf.R;
            Σ_9_196.refs.o = this.m_localAnchorA.x - Σ_9_196.refs.l.m_sweep.localCenter.x, Σ_9_196.refs.q = this.m_localAnchorA.y - Σ_9_196.refs.l.m_sweep.localCenter.y;
            Σ_9_196.refs.h = Σ_9_196.refs.d.col1.x * Σ_9_196.refs.o + Σ_9_196.refs.d.col2.x * Σ_9_196.refs.q;
            Σ_9_196.refs.q = Σ_9_196.refs.d.col1.y * Σ_9_196.refs.o + Σ_9_196.refs.d.col2.y * Σ_9_196.refs.q;
            Σ_9_196.refs.o = Σ_9_196.refs.h;
            Σ_9_196.refs.d = Σ_9_196.refs.j.m_xf.R;
            Σ_9_196.refs.n = this.m_localAnchorB.x - Σ_9_196.refs.j.m_sweep.localCenter.x, Σ_9_196.refs.a = this.m_localAnchorB.y - Σ_9_196.refs.j.m_sweep.localCenter.y;
            Σ_9_196.refs.h = Σ_9_196.refs.d.col1.x * Σ_9_196.refs.n + Σ_9_196.refs.d.col2.x * Σ_9_196.refs.a;
            Σ_9_196.refs.a = Σ_9_196.refs.d.col1.y * Σ_9_196.refs.n + Σ_9_196.refs.d.col2.y * Σ_9_196.refs.a;
            Σ_9_196.refs.n = Σ_9_196.refs.h;
            Σ_9_196.refs.d = Σ_9_196.refs.l.m_invMass;
            Σ_9_196.refs.h = Σ_9_196.refs.j.m_invMass;
            Σ_9_196.refs.c = Σ_9_196.refs.l.m_invI, Σ_9_196.refs.g = Σ_9_196.refs.j.m_invI, Σ_9_196.refs.b = Σ_9_196.refs.j.m_sweep.c.x + Σ_9_196.refs.n - Σ_9_196.refs.l.m_sweep.c.x - Σ_9_196.refs.o, Σ_9_196.refs.e = Σ_9_196.refs.j.m_sweep.c.y + Σ_9_196.refs.a - Σ_9_196.refs.l.m_sweep.c.y - Σ_9_196.refs.q, Σ_9_196.refs.f = Σ_9_196.refs.j.m_sweep.a - Σ_9_196.refs.l.m_sweep.a - this.m_referenceAngle, Σ_9_196.refs.m = 10 * Σ_9.refs.F.b2_linearSlop, Σ_9_196.refs.r = Math.sqrt(Σ_9_196.refs.b * Σ_9_196.refs.b + Σ_9_196.refs.e * Σ_9_196.refs.e), Σ_9_196.refs.s = Σ_9.refs.y.Abs(Σ_9_196.refs.f);
            if (Σ_9_196.refs.r > Σ_9_196.refs.m) {
                Σ_9_196.refs.c *= 1;
                Σ_9_196.refs.g *= 1;
            }
            this.m_mass.col1.x = Σ_9_196.refs.d + Σ_9_196.refs.h + Σ_9_196.refs.q * Σ_9_196.refs.q * Σ_9_196.refs.c + Σ_9_196.refs.a * Σ_9_196.refs.a * Σ_9_196.refs.g;
            this.m_mass.col2.x = -Σ_9_196.refs.q * Σ_9_196.refs.o * Σ_9_196.refs.c - Σ_9_196.refs.a * Σ_9_196.refs.n * Σ_9_196.refs.g;
            this.m_mass.col3.x = -Σ_9_196.refs.q * Σ_9_196.refs.c - Σ_9_196.refs.a * Σ_9_196.refs.g;
            this.m_mass.col1.y = this.m_mass.col2.x;
            this.m_mass.col2.y = Σ_9_196.refs.d + Σ_9_196.refs.h + Σ_9_196.refs.o * Σ_9_196.refs.o * Σ_9_196.refs.c + Σ_9_196.refs.n * Σ_9_196.refs.n * Σ_9_196.refs.g;
            this.m_mass.col3.y = Σ_9_196.refs.o * Σ_9_196.refs.c + Σ_9_196.refs.n * Σ_9_196.refs.g;
            this.m_mass.col1.z = this.m_mass.col3.x;
            this.m_mass.col2.z = this.m_mass.col3.y;
            this.m_mass.col3.z = Σ_9_196.refs.c + Σ_9_196.refs.g;
            Σ_9_196.refs.m = new Σ_9.refs.A();
            this.m_mass.Solve33(Σ_9_196.refs.m, -Σ_9_196.refs.b, -Σ_9_196.refs.e, -Σ_9_196.refs.f);
            Σ_9_196.refs.l.m_sweep.c.x -= Σ_9_196.refs.d * Σ_9_196.refs.m.x;
            Σ_9_196.refs.l.m_sweep.c.y -= Σ_9_196.refs.d * Σ_9_196.refs.m.y;
            Σ_9_196.refs.l.m_sweep.a -= Σ_9_196.refs.c * (Σ_9_196.refs.o * Σ_9_196.refs.m.y - Σ_9_196.refs.q * Σ_9_196.refs.m.x + Σ_9_196.refs.m.z);
            Σ_9_196.refs.j.m_sweep.c.x += Σ_9_196.refs.h * Σ_9_196.refs.m.x;
            Σ_9_196.refs.j.m_sweep.c.y += Σ_9_196.refs.h * Σ_9_196.refs.m.y;
            Σ_9_196.refs.j.m_sweep.a += Σ_9_196.refs.g * (Σ_9_196.refs.n * Σ_9_196.refs.m.y - Σ_9_196.refs.a * Σ_9_196.refs.m.x + Σ_9_196.refs.m.z);
            Σ_9_196.refs.l.SynchronizeTransform();
            Σ_9_196.refs.j.SynchronizeTransform();
            return Σ_9_196.refs.r <= Σ_9.refs.F.b2_linearSlop && Σ_9_196.refs.s <= Σ_9.refs.F.b2_angularSlop;
        }, Σ_9);
        Σ.refs.Box2D.inherit(Σ_9.refs.Z, Σ.refs.Box2D.Dynamics.Joints.b2JointDef);
        Σ_9.refs.Z.prototype.__super = Σ.refs.Box2D.Dynamics.Joints.b2JointDef.prototype;
        Σ_9.refs.Z.b2WeldJointDef = Σ_9.addFunction(function αQn5U() {
            var Σ_9_197 = new Σ.Scope(this, αQn5U, '197', Σ_9, {}, []);
            Σ.refs.Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
            this.localAnchorA = new Σ_9.refs.w();
            this.localAnchorB = new Σ_9.refs.w();
        }, Σ_9);
        Σ_9.refs.Z.prototype.b2WeldJointDef = Σ_9.addFunction(function αP64R() {
            var Σ_9_198 = new Σ.Scope(this, αP64R, '198', Σ_9, {}, []);
            this.__super.b2JointDef.call(this);
            this.type = Σ_9.refs.I.e_weldJoint;
            this.referenceAngle = 0;
        }, Σ_9);
        Σ_9.refs.Z.prototype.Initialize = Σ_9.addFunction(function αgoSH(d, h, l) {
            var Σ_9_199 = new Σ.Scope(this, αgoSH, '199', Σ_9, {
                d: d,
                h: h,
                l: l
            }, []);
            this.bodyA = Σ_9_199.refs.d;
            this.bodyB = Σ_9_199.refs.h;
            this.localAnchorA.SetV(this.bodyA.GetLocalPoint(Σ_9_199.refs.l));
            this.localAnchorB.SetV(this.bodyB.GetLocalPoint(Σ_9_199.refs.l));
            this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
        }, Σ_9);
    }());
    (function αoUZD() {
        var Σ_10 = new Σ.Scope(this, αoUZD, '10', Σ, {}, []);
        Σ_10.refs.F = Σ.refs.Box2D.Dynamics.b2DebugDraw;
        Σ_10.refs.F.b2DebugDraw = Σ_10.addFunction(function αamyZ() {
            var Σ_10_0 = new Σ.Scope(this, αamyZ, '0', Σ_10, {}, []);
            this.m_xformScale = this.m_fillAlpha = this.m_alpha = this.m_lineThickness = this.m_drawScale = 1;
            Σ_10_0.refs.G = this;
            this.m_sprite = {
                graphics: {
                    clear: Σ_10_0.addFunction(function αHyFW() {
                        var Σ_10_0_0 = new Σ.Scope(this, αHyFW, '0', Σ_10_0, {}, []);
                        Σ_10_0.refs.G.m_ctx.clearRect(0, 0, Σ_10_0.refs.G.m_ctx.canvas.width, Σ_10_0.refs.G.m_ctx.canvas.height);
                    }, Σ_10_0)
                }
            };
        }, Σ_10);
        Σ_10.refs.F.prototype._color = Σ_10.addFunction(function αex8v(G, K) {
            var Σ_10_1 = new Σ.Scope(this, αex8v, '1', Σ_10, {
                G: G,
                K: K
            }, []);
            return 'rgba(' + ((Σ_10_1.refs.G & 16711680) >> 16) + ',' + ((Σ_10_1.refs.G & 65280) >> 8) + ',' + (Σ_10_1.refs.G & 255) + ',' + Σ_10_1.refs.K + ')';
        }, Σ_10);
        Σ_10.refs.F.prototype.b2DebugDraw = Σ_10.addFunction(function αbQFx() {
            var Σ_10_2 = new Σ.Scope(this, αbQFx, '2', Σ_10, {}, []);
            this.m_drawFlags = 0;
        }, Σ_10);
        Σ_10.refs.F.prototype.SetFlags = Σ_10.addFunction(function αseGG(G) {
            var Σ_10_3 = new Σ.Scope(this, αseGG, '3', Σ_10, {
                G: G
            }, []);
            if (Σ_10_3.refs.G === undefined) {
                Σ_10_3.refs.G = 0;
            }
            this.m_drawFlags = Σ_10_3.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.GetFlags = Σ_10.addFunction(function αtBc8() {
            var Σ_10_4 = new Σ.Scope(this, αtBc8, '4', Σ_10, {}, []);
            return this.m_drawFlags;
        }, Σ_10);
        Σ_10.refs.F.prototype.AppendFlags = Σ_10.addFunction(function α1jpH(G) {
            var Σ_10_5 = new Σ.Scope(this, α1jpH, '5', Σ_10, {
                G: G
            }, []);
            if (Σ_10_5.refs.G === undefined) {
                Σ_10_5.refs.G = 0;
            }
            this.m_drawFlags |= Σ_10_5.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.ClearFlags = Σ_10.addFunction(function αinGu(G) {
            var Σ_10_6 = new Σ.Scope(this, αinGu, '6', Σ_10, {
                G: G
            }, []);
            if (Σ_10_6.refs.G === undefined) {
                Σ_10_6.refs.G = 0;
            }
            this.m_drawFlags &= ~Σ_10_6.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.SetSprite = Σ_10.addFunction(function αgLZr(G) {
            var Σ_10_7 = new Σ.Scope(this, αgLZr, '7', Σ_10, {
                G: G
            }, []);
            this.m_ctx = Σ_10_7.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.GetSprite = Σ_10.addFunction(function αevHa() {
            var Σ_10_8 = new Σ.Scope(this, αevHa, '8', Σ_10, {}, []);
            return this.m_ctx;
        }, Σ_10);
        Σ_10.refs.F.prototype.SetDrawScale = Σ_10.addFunction(function αutsY(G) {
            var Σ_10_9 = new Σ.Scope(this, αutsY, '9', Σ_10, {
                G: G
            }, []);
            if (Σ_10_9.refs.G === undefined) {
                Σ_10_9.refs.G = 0;
            }
            this.m_drawScale = Σ_10_9.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.GetDrawScale = Σ_10.addFunction(function αu5Ue() {
            var Σ_10_10 = new Σ.Scope(this, αu5Ue, '10', Σ_10, {}, []);
            return this.m_drawScale;
        }, Σ_10);
        Σ_10.refs.F.prototype.SetLineThickness = Σ_10.addFunction(function αWDVV(G) {
            var Σ_10_11 = new Σ.Scope(this, αWDVV, '11', Σ_10, {
                G: G
            }, []);
            if (Σ_10_11.refs.G === undefined) {
                Σ_10_11.refs.G = 0;
            }
            this.m_lineThickness = Σ_10_11.refs.G;
            this.m_ctx.strokeWidth = Σ_10_11.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.GetLineThickness = Σ_10.addFunction(function αtaVV() {
            var Σ_10_12 = new Σ.Scope(this, αtaVV, '12', Σ_10, {}, []);
            return this.m_lineThickness;
        }, Σ_10);
        Σ_10.refs.F.prototype.SetAlpha = Σ_10.addFunction(function αXOWR(G) {
            var Σ_10_13 = new Σ.Scope(this, αXOWR, '13', Σ_10, {
                G: G
            }, []);
            if (Σ_10_13.refs.G === undefined) {
                Σ_10_13.refs.G = 0;
            }
            this.m_alpha = Σ_10_13.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.GetAlpha = Σ_10.addFunction(function α8F2i() {
            var Σ_10_14 = new Σ.Scope(this, α8F2i, '14', Σ_10, {}, []);
            return this.m_alpha;
        }, Σ_10);
        Σ_10.refs.F.prototype.SetFillAlpha = Σ_10.addFunction(function αpbGo(G) {
            var Σ_10_15 = new Σ.Scope(this, αpbGo, '15', Σ_10, {
                G: G
            }, []);
            if (Σ_10_15.refs.G === undefined) {
                Σ_10_15.refs.G = 0;
            }
            this.m_fillAlpha = Σ_10_15.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.GetFillAlpha = Σ_10.addFunction(function α68I0() {
            var Σ_10_16 = new Σ.Scope(this, α68I0, '16', Σ_10, {}, []);
            return this.m_fillAlpha;
        }, Σ_10);
        Σ_10.refs.F.prototype.SetXFormScale = Σ_10.addFunction(function αHH1s(G) {
            var Σ_10_17 = new Σ.Scope(this, αHH1s, '17', Σ_10, {
                G: G
            }, []);
            if (Σ_10_17.refs.G === undefined) {
                Σ_10_17.refs.G = 0;
            }
            this.m_xformScale = Σ_10_17.refs.G;
        }, Σ_10);
        Σ_10.refs.F.prototype.GetXFormScale = Σ_10.addFunction(function αrNfn() {
            var Σ_10_18 = new Σ.Scope(this, αrNfn, '18', Σ_10, {}, []);
            return this.m_xformScale;
        }, Σ_10);
        Σ_10.refs.F.prototype.DrawPolygon = Σ_10.addFunction(function αoIBB(G, K, y) {
            var Σ_10_19 = new Σ.Scope(this, αoIBB, '19', Σ_10, {
                G: G,
                K: K,
                y: y
            }, []);
            if (Σ_10_19.refs.K) {
                Σ_10_19.refs.w = this.m_ctx, Σ_10_19.refs.A = this.m_drawScale;
                Σ_10_19.refs.w.beginPath();
                Σ_10_19.refs.w.strokeStyle = this._color(Σ_10_19.refs.y.color, this.m_alpha);
                Σ_10_19.refs.w.moveTo(Σ_10_19.refs.G[0].x * Σ_10_19.refs.A, Σ_10_19.refs.G[0].y * Σ_10_19.refs.A);
                for (Σ_10_19.refs.y = 1; Σ_10_19.refs.y < Σ_10_19.refs.K; Σ_10_19.refs.y++) {
                    Σ_10_19.refs.w.lineTo(Σ_10_19.refs.G[Σ_10_19.refs.y].x * Σ_10_19.refs.A, Σ_10_19.refs.G[Σ_10_19.refs.y].y * Σ_10_19.refs.A);
                }
                Σ_10_19.refs.w.lineTo(Σ_10_19.refs.G[0].x * Σ_10_19.refs.A, Σ_10_19.refs.G[0].y * Σ_10_19.refs.A);
                Σ_10_19.refs.w.closePath();
                Σ_10_19.refs.w.stroke();
            }
        }, Σ_10);
        Σ_10.refs.F.prototype.DrawSolidPolygon = Σ_10.addFunction(function αuLTK(G, K, y) {
            var Σ_10_20 = new Σ.Scope(this, αuLTK, '20', Σ_10, {
                G: G,
                K: K,
                y: y
            }, []);
            if (Σ_10_20.refs.K) {
                Σ_10_20.refs.w = this.m_ctx, Σ_10_20.refs.A = this.m_drawScale;
                Σ_10_20.refs.w.beginPath();
                Σ_10_20.refs.w.strokeStyle = this._color(Σ_10_20.refs.y.color, this.m_alpha);
                Σ_10_20.refs.w.fillStyle = this._color(Σ_10_20.refs.y.color, this.m_fillAlpha);
                Σ_10_20.refs.w.moveTo(Σ_10_20.refs.G[0].x * Σ_10_20.refs.A, Σ_10_20.refs.G[0].y * Σ_10_20.refs.A);
                for (Σ_10_20.refs.y = 1; Σ_10_20.refs.y < Σ_10_20.refs.K; Σ_10_20.refs.y++) {
                    Σ_10_20.refs.w.lineTo(Σ_10_20.refs.G[Σ_10_20.refs.y].x * Σ_10_20.refs.A, Σ_10_20.refs.G[Σ_10_20.refs.y].y * Σ_10_20.refs.A);
                }
                Σ_10_20.refs.w.lineTo(Σ_10_20.refs.G[0].x * Σ_10_20.refs.A, Σ_10_20.refs.G[0].y * Σ_10_20.refs.A);
                Σ_10_20.refs.w.closePath();
                Σ_10_20.refs.w.fill();
                Σ_10_20.refs.w.stroke();
            }
        }, Σ_10);
        Σ_10.refs.F.prototype.DrawCircle = Σ_10.addFunction(function αeZmc(G, K, y) {
            var Σ_10_21 = new Σ.Scope(this, αeZmc, '21', Σ_10, {
                G: G,
                K: K,
                y: y
            }, []);
            if (Σ_10_21.refs.K) {
                Σ_10_21.refs.w = this.m_ctx, Σ_10_21.refs.A = this.m_drawScale;
                Σ_10_21.refs.w.beginPath();
                Σ_10_21.refs.w.strokeStyle = this._color(Σ_10_21.refs.y.color, this.m_alpha);
                Σ_10_21.refs.w.arc(Σ_10_21.refs.G.x * Σ_10_21.refs.A, Σ_10_21.refs.G.y * Σ_10_21.refs.A, Σ_10_21.refs.K * Σ_10_21.refs.A, 0, Math.PI * 2, true);
                Σ_10_21.refs.w.closePath();
                Σ_10_21.refs.w.stroke();
            }
        }, Σ_10);
        Σ_10.refs.F.prototype.DrawSolidCircle = Σ_10.addFunction(function αYuOj(G, K, y, w) {
            var Σ_10_22 = new Σ.Scope(this, αYuOj, '22', Σ_10, {
                G: G,
                K: K,
                y: y,
                w: w
            }, []);
            if (Σ_10_22.refs.K) {
                Σ_10_22.refs.A = this.m_ctx, Σ_10_22.refs.U = this.m_drawScale, Σ_10_22.refs.p = Σ_10_22.refs.G.x * Σ_10_22.refs.U, Σ_10_22.refs.B = Σ_10_22.refs.G.y * Σ_10_22.refs.U;
                Σ_10_22.refs.A.moveTo(0, 0);
                Σ_10_22.refs.A.beginPath();
                Σ_10_22.refs.A.strokeStyle = this._color(Σ_10_22.refs.w.color, this.m_alpha);
                Σ_10_22.refs.A.fillStyle = this._color(Σ_10_22.refs.w.color, this.m_fillAlpha);
                Σ_10_22.refs.A.arc(Σ_10_22.refs.p, Σ_10_22.refs.B, Σ_10_22.refs.K * Σ_10_22.refs.U, 0, Math.PI * 2, true);
                Σ_10_22.refs.A.moveTo(Σ_10_22.refs.p, Σ_10_22.refs.B);
                Σ_10_22.refs.A.lineTo((Σ_10_22.refs.G.x + Σ_10_22.refs.y.x * Σ_10_22.refs.K) * Σ_10_22.refs.U, (Σ_10_22.refs.G.y + Σ_10_22.refs.y.y * Σ_10_22.refs.K) * Σ_10_22.refs.U);
                Σ_10_22.refs.A.closePath();
                Σ_10_22.refs.A.fill();
                Σ_10_22.refs.A.stroke();
            }
        }, Σ_10);
        Σ_10.refs.F.prototype.DrawSegment = Σ_10.addFunction(function αWjvw(G, K, y) {
            var Σ_10_23 = new Σ.Scope(this, αWjvw, '23', Σ_10, {
                G: G,
                K: K,
                y: y
            }, []);
            Σ_10_23.refs.w = this.m_ctx, Σ_10_23.refs.A = this.m_drawScale;
            Σ_10_23.refs.w.strokeStyle = this._color(Σ_10_23.refs.y.color, this.m_alpha);
            Σ_10_23.refs.w.beginPath();
            Σ_10_23.refs.w.moveTo(Σ_10_23.refs.G.x * Σ_10_23.refs.A, Σ_10_23.refs.G.y * Σ_10_23.refs.A);
            Σ_10_23.refs.w.lineTo(Σ_10_23.refs.K.x * Σ_10_23.refs.A, Σ_10_23.refs.K.y * Σ_10_23.refs.A);
            Σ_10_23.refs.w.closePath();
            Σ_10_23.refs.w.stroke();
        }, Σ_10);
        Σ_10.refs.F.prototype.DrawTransform = Σ_10.addFunction(function αR7vq(G) {
            var Σ_10_24 = new Σ.Scope(this, αR7vq, '24', Σ_10, {
                G: G
            }, []);
            Σ_10_24.refs.K = this.m_ctx, Σ_10_24.refs.y = this.m_drawScale;
            Σ_10_24.refs.K.beginPath();
            Σ_10_24.refs.K.strokeStyle = this._color(16711680, this.m_alpha);
            Σ_10_24.refs.K.moveTo(Σ_10_24.refs.G.position.x * Σ_10_24.refs.y, Σ_10_24.refs.G.position.y * Σ_10_24.refs.y);
            Σ_10_24.refs.K.lineTo((Σ_10_24.refs.G.position.x + this.m_xformScale * Σ_10_24.refs.G.R.col1.x) * Σ_10_24.refs.y, (Σ_10_24.refs.G.position.y + this.m_xformScale * Σ_10_24.refs.G.R.col1.y) * Σ_10_24.refs.y);
            Σ_10_24.refs.K.strokeStyle = this._color(65280, this.m_alpha);
            Σ_10_24.refs.K.moveTo(Σ_10_24.refs.G.position.x * Σ_10_24.refs.y, Σ_10_24.refs.G.position.y * Σ_10_24.refs.y);
            Σ_10_24.refs.K.lineTo((Σ_10_24.refs.G.position.x + this.m_xformScale * Σ_10_24.refs.G.R.col2.x) * Σ_10_24.refs.y, (Σ_10_24.refs.G.position.y + this.m_xformScale * Σ_10_24.refs.G.R.col2.y) * Σ_10_24.refs.y);
            Σ_10_24.refs.K.closePath();
            Σ_10_24.refs.K.stroke();
        }, Σ_10);
    }());
    Σ.refs.i = undefined;
    for (Σ.refs.i = 0; Σ.refs.i < Σ.refs.Box2D.postDefs.length; ++Σ.refs.i) {
        Σ.refs.Box2D.postDefs[Σ.refs.i]();
    }
    delete Σ.refs.Box2D.postDefs;

    function MakeNewWorld() {
        var Σ_11 = new Σ.Scope(this, MakeNewWorld, '11', Σ, {}, []);
        Σ_11.refs.Vec2 = Σ.refs.Box2D.Common.Math.b2Vec2, Σ_11.refs.BodyDef = Σ.refs.Box2D.Dynamics.b2BodyDef, Σ_11.refs.Body = Σ.refs.Box2D.Dynamics.b2Body, Σ_11.refs.FixtureDef = Σ.refs.Box2D.Dynamics.b2FixtureDef, Σ_11.refs.Fixture = Σ.refs.Box2D.Dynamics.b2Fixture, Σ_11.refs.World = Σ.refs.Box2D.Dynamics.b2World, Σ_11.refs.MassData = Σ.refs.Box2D.Collision.Shapes.b2MassData, Σ_11.refs.PolygonShape = Σ.refs.Box2D.Collision.Shapes.b2PolygonShape, Σ_11.refs.CircleShape = Σ.refs.Box2D.Collision.Shapes.b2CircleShape;
        Σ_11.refs.gravity = new Σ_11.refs.Vec2(0, -10);
        Σ_11.refs.world = new Σ_11.refs.World(Σ_11.refs.gravity, true);
        Σ_11.refs.shape = new Σ_11.refs.PolygonShape();
        Σ_11.refs.shape.SetAsEdge(new Σ_11.refs.Vec2(-40, 0), new Σ_11.refs.Vec2(40, 0));
        Σ_11.refs.fd = new Σ_11.refs.FixtureDef();
        Σ_11.refs.fd.density = 0;
        Σ_11.refs.fd.shape = Σ_11.refs.shape;
        Σ_11.refs.bd = new Σ_11.refs.BodyDef();
        Σ_11.refs.ground = Σ_11.refs.world.CreateBody(Σ_11.refs.bd);
        Σ_11.refs.ground.CreateFixture(Σ_11.refs.fd);
        Σ_11.refs.a = 0.5;
        Σ_11.refs.shape = new Σ_11.refs.PolygonShape();
        Σ_11.refs.shape.SetAsBox(Σ_11.refs.a, Σ_11.refs.a);
        Σ_11.refs.x = new Σ_11.refs.Vec2(-7, 0.75);
        Σ_11.refs.y = new Σ_11.refs.Vec2();
        Σ_11.refs.deltaX = new Σ_11.refs.Vec2(0.5625, 1);
        Σ_11.refs.deltaY = new Σ_11.refs.Vec2(1.125, 0);
        for (Σ_11.refs.i = 0; Σ_11.refs.i < 10; ++Σ_11.refs.i) {
            Σ_11.refs.y.Set(Σ_11.refs.x.x, Σ_11.refs.x.y);
            for (Σ_11.refs.j = 0; Σ_11.refs.j < 5; ++Σ_11.refs.j) {
                Σ_11.refs.fd = new Σ_11.refs.FixtureDef();
                Σ_11.refs.fd.density = 5;
                Σ_11.refs.fd.shape = Σ_11.refs.shape;
                Σ_11.refs.bd = new Σ_11.refs.BodyDef();
                Σ_11.refs.bd.type = Σ_11.refs.Body.b2_dynamicBody;
                Σ_11.refs.bd.position.Set(Σ_11.refs.y.x, Σ_11.refs.y.y);
                Σ_11.refs.body = Σ_11.refs.world.CreateBody(Σ_11.refs.bd);
                Σ_11.refs.body.CreateFixture(Σ_11.refs.fd);
                Σ_11.refs.y.Add(Σ_11.refs.deltaY);
            }
            Σ_11.refs.x.Add(Σ_11.refs.deltaX);
        }
        return Σ_11.refs.world;
    }
    Σ.refs.world = null;

    function runBox2D() {
        var Σ_12 = new Σ.Scope(this, runBox2D, '12', Σ, {}, []);
        Σ_12.refs.world = Σ.refs.MakeNewWorld();
        for (Σ_12.refs.i = 0; Σ_12.refs.i < 20; Σ_12.refs.i++) {
            Σ_12.refs.world.Step(1 / 60, 10, 3);
        }
    }

    function setupBox2D() {
        var Σ_13 = new Σ.Scope(this, setupBox2D, '13', Σ, {}, []);
    }

    function tearDownBox2D() {
        var Σ_14 = new Σ.Scope(this, tearDownBox2D, '14', Σ, {}, []);
        Σ.refs.world = null;
        Σ.refs.Box2D = null;
    }
    Σ.refs.performance = {};
    Σ.refs.performance.now = Σ.addFunction(function αbCXB() {
        var Σ_15 = new Σ.Scope(this, αbCXB, '15', Σ, {}, []);
        return Date.now();
    }, Σ);
    Σ.refs.BM_RunFunc = Σ.refs.runBox2D;
    Σ.refs.BM_SetupFunc = Σ.refs.setupBox2D;
    Σ.refs.BM_TearDownFunc = Σ.refs.tearDownBox2D;
    Σ.refs.BM_Iterations = 60;
    Σ.refs.BM_Min_Iterations = 16;
    Σ.refs.BM_Results = [];

    function BM_Start() {
        var Σ_16 = new Σ.Scope(this, BM_Start, '16', Σ, {}, [
            [
                doRun,
                Σ_16
            ]
        ]);
        Σ_16.refs.data = {
            runs: 0,
            elapsed: 0
        };
        Σ_16.refs.elapsed = 0;
        Σ_16.refs.start = Date.now();
        Σ_16.refs.midpoint = null;
        Σ_16.refs.end = null;
        Σ_16.refs.i = 0;

        function doRun() {
            var Σ_16_0 = new Σ.Scope(this, doRun, '0', Σ_16, {}, []);
            Σ.refs.BM_SetupFunc();
            Σ.log('Iteration : ' + Σ_16.refs.i);
            if (Σ_16.refs.i === Σ.refs.BM_Iterations / 2) {
                Σ_16.refs.midpoint = Date.now();
            }
            Σ.refs.BM_RunFunc();
            Σ_16.refs.elapsed = Date.now() - Σ_16.refs.start;
            Σ.refs.BM_TearDownFunc();
            Σ_16.refs.i++;
            if (Σ_16.refs.i < Σ.refs.BM_Iterations) {
                Σ.setImmediate(Σ_16.refs.doRun);
            } else {
                if (Σ_16.refs.data != null) {
                    Σ_16.refs.data.runs += Σ_16.refs.i;
                    Σ_16.refs.data.elapsed += Σ_16.refs.elapsed;
                }
                Σ.log('Runs: ' + Σ_16.refs.data.runs + '\t|\tElapsed: ' + Σ_16.refs.data.elapsed);
                Σ_16.refs.end = Date.now();
                Σ.log('Total time : ' + (Σ_16.refs.end - Σ_16.refs.start) + ' ms');
                Σ_16_0.refs.usec = Σ_16.refs.data.elapsed * 1000 / Σ_16.refs.data.runs;
                Σ_16_0.refs.rms = 0;
                Σ.refs.BM_Results.push({
                    time: Σ_16_0.refs.usec,
                    latency: Σ_16_0.refs.rms
                });
            }
        }
        Σ.setImmediate(Σ_16.refs.doRun);
    }
    Σ.refs.BM_Start();
}(require('things-js').bootstrap('mqtt://localhost', 'box2d.js')));