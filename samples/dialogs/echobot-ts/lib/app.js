"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const botbuilder_1 = require("botbuilder");
const botbuilder_dialogs_1 = require("botbuilder-dialogs");
const restify = require("restify");
// Create server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log(`${server.name} listening to ${server.url}`);
});
// Create adapter
const adapter = new botbuilder_1.BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const conversationState = new botbuilder_1.ConversationState(new botbuilder_1.MemoryStorage());
adapter.use(conversationState);
// Create empty dialog set
const dialogs = new botbuilder_dialogs_1.DialogSet();
// Listen for incoming requests 
server.post('/api/messages', (req, res) => {
    // Route received request to adapter for processing
    adapter.processRequest(req, res, (context) => __awaiter(this, void 0, void 0, function* () {
        if (context.request.type === 'message') {
            const state = conversationState.get(context);
            if (!state.dialogStack) {
                state.dialogStack = [];
            }
            // Create dialog context and continue executing the "current" dialog, if any.
            const dc = dialogs.createContext(context, state.dialogStack);
            yield dc.continue();
            // Check to see if anyone replied. If not then start echo dialog
            if (!context.responded) {
                yield dc.begin('echo');
            }
        }
        else {
            yield context.sendActivity(`[${context.request.type} event detected]`);
        }
    }));
});
// Add dialogs
dialogs.add('echo', [
    function (dc) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = conversationState.get(dc.context);
            const count = state.count === undefined ? state.count = 0 : ++state.count;
            yield dc.context.sendActivity(`${count}: You said "${dc.context.request.text}"`);
            yield dc.end();
        });
    }
]);
