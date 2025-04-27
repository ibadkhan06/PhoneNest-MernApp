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

## Troubleshooting "ssh: no key found" error

If you continue to see the error "ssh.ParsePrivateKey: ssh: no key found", try these specific steps:

1. **Verify your key locally** before adding it to GitHub:
   ```bash
   # Save your key to a temporary file
   echo "YOUR-ENTIRE-KEY-HERE" > test_key.pem
   chmod 600 test_key.pem
   
   # Verify the key is valid
   ssh-keygen -y -f test_key.pem
   ```
   If this command displays the public key, your private key is valid.

2. **Ensure proper formatting**:
   - The key must start with `-----BEGIN RSA PRIVATE KEY-----` (or similar BEGIN line)
   - The key must end with `-----END RSA PRIVATE KEY-----` (or similar END line)
   - There should be no spaces before or after these lines
   - Line breaks must be preserved exactly as they are in the original file

3. **Convert older key formats**:
   ```bash
   # Convert to PEM format
   ssh-keygen -p -f your-key.pem -m pem -P "" -N ""
   ```

4. **Generate a new key pair** if all else fails:
   ```bash
   # Generate new key
   ssh-keygen -t rsa -b 4096 -f new_ec2_key -m PEM
   
   # Add public key to EC2 authorized_keys
   cat new_ec2_key.pub >> ~/.ssh/authorized_keys
   
   # Use the private key (new_ec2_key) content as your GitHub secret
   ```

If you continue to have issues, you can try:
- Regenerating a new key pair for your EC2 instance
- Using the `ssh-keygen -y -f your-key.pem` command to validate that your key is readable 