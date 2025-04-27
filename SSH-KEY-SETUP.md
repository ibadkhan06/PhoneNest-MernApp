# Setting up EC2 SSH Key for GitHub Actions

When setting up the EC2_SSH_KEY secret for GitHub Actions, it's crucial to format it correctly to avoid the error `ssh.ParsePrivatekey: ssh: no key found`.

## Steps to prepare your SSH key for GitHub Actions

1. **Locate your private key file** (typically a `.pem` file you downloaded when creating the EC2 instance)

2. **Convert the key to the right format** if needed (if you're using a .pem file):
   ```bash
   ssh-keygen -p -f your-key.pem -m pem -P "" -N ""
   ```

3. **Copy the entire content of the private key file** including the begin and end lines:
   ```
   -----BEGIN RSA PRIVATE KEY-----
   MIIEpAIBAAKCAQEA...
   ...many lines of key data...
   ...
   -----END RSA PRIVATE KEY-----
   ```

4. **Add the key to GitHub secrets**:
   - Go to your GitHub repository
   - Navigate to Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `EC2_SSH_KEY`
   - Value: Paste the ENTIRE key content copied in step 3
   - Click "Add secret"

## Important notes

- Make sure the key includes both the BEGIN and END lines
- Ensure there are no extra spaces, newlines, or other characters added at the beginning or end
- If your private key is passphrase protected, you'll need to remove the passphrase
- The key must match the authorized keys on your EC2 instance

If you continue to have issues, you can try:
- Regenerating a new key pair for your EC2 instance
- Using the `ssh-keygen -y -f your-key.pem` command to validate that your key is readable 