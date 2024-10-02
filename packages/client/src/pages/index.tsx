import { Route, Switch } from "react-router-dom";
import { routes, AuthGuard, ErrorBoundary } from "../service";
import { SingIn } from "./SignIn";
import { SingUp } from "./SignUp";
import { LeaderBoard } from "./LeaderBoard";
import { ErrorPage } from "./ErrorPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { OAuthRedirect } from "./OAuthRedirect";

export const Routes = () => {
    return (
        <ErrorBoundary>
            <Switch>
                <Route path={routes.leaderBoard.path} component={LeaderBoard} />
                <Route path={routes.signIn.path} component={SingIn} />
                <Route path={routes.singUp.path} component={SingUp} />
                <Route path={routes.OAuth.path} component={OAuthRedirect} />
                <Route path={routes.error.path} component={ErrorPage} />

                <Route path="/">
                    <AuthGuard>
                        <PrivateRoutes />
                    </AuthGuard>
                </Route>
            </Switch>
        </ErrorBoundary>
    );
};
