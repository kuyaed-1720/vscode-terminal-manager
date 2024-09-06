// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('vscode-terminal-manager by kuyaed-1720 is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const startAll = vscode.commands.registerCommand('vscode-terminal-manager.startAllServices', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const phpTerminal = vscode.window.createTerminal('PHP Server');
		phpTerminal.sendText('php -S localhost:8000');
		phpTerminal.show();

		const nodeTerminal = vscode.window.createTerminal('Node Server');
		nodeTerminal.sendText('\"C:\\Program Files\\nodejs\\node.exe\"');
		nodeTerminal.show();

		const nginxTerminal = vscode.window.createTerminal('Nginx Server');
		nginxTerminal.sendText('C:\\Users\\kuyae\\nginx.exe');
		nginxTerminal.show();

		context.subscriptions.push(phpTerminal, nodeTerminal, nginxTerminal);
	});

	let stopAll = vscode.commands.registerCommand('vscode-terminal-manager.stopAllServices', () => {
		vscode.window.terminals.forEach(terminal => {
			if (terminal.name === 'PHP Server' || terminal.name === 'Node Server' || terminal.name === 'Nginx Server') {
				terminal.sendText('exit');
				terminal.dispose();
			}
		});
	});

	context.subscriptions.push(startAll, stopAll);
}

// This method is called when your extension is deactivated
export function deactivate() {}
