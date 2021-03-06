package auth

import (
	"context"
	"firebase.google.com/go/v4/auth"
)

type FirebaseAuthenticator struct {
	client auth.Client
}

/*
 * Firebase client verifies the token, ensures JWT is signed and valid for
 * our Firebase project. Returns the UID in of the user
 */
func (a *FirebaseAuthenticator) VerifyToken(ctx context.Context, token string) (string, bool) {
	result, err := a.client.VerifyIDToken(ctx, token)
	if err != nil {
		return "", false
	}
	return result.UID, true
}
