import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";

actor {
  public type Message = {
    id : Nat;
    author : Text;
    text : Text;
    timestamp : Int;
  };

  var messageId = 0;
  let messages = Map.empty<Nat, Message>();

  public shared ({ caller }) func sendUserMessage(text : Text) : async Message {
    let userMessage : Message = {
      id = messageId;
      author = "user";
      text;
      timestamp = 0;
    };

    messages.add(messageId, userMessage);
    messageId += 1;

    let botResponse = generateBotResponse(text);

    messages.add(messageId, botResponse);
    messageId += 1;

    botResponse;
  };

  public query ({ caller }) func getConversation() : async [Message] {
    let sortedMessages = messages.toArray().sort(
      func(a, b) { Nat.compare(a.0, b.0) }
    );
    sortedMessages.map(func((_, msg)) { msg });
  };

  func generateBotResponse(userInput : Text) : Message {
    let lowercaseInput = userInput.toLower();

    let greetingPatterns : [(Text, Text)] = [
      ("hi", "Hello! How can I assist you today?"),
      ("hello", "Hi there! What can I do for you?"),
      ("hey", "Hey! How can I help?"),
    ];

    let questionPatterns : [(Text, Text)] = [
      ("services", "We offer website and mobile app development, AI integration, e-commerce solutions, and automation services."),
      ("pricing", "Pricing depends on project complexity. Simple websites start at $2000, while advanced solutions may cost more."),
      ("process", "Our process involves consultation, design, development, and ongoing support to ensure your satisfaction."),
    ];

    let responseText = switch (findPatternMatch(lowercaseInput, greetingPatterns)) {
      case (?greeting) { greeting };
      case (null) {
        switch (findPatternMatch(lowercaseInput, questionPatterns)) {
          case (?answer) { answer };
          case (null) {"I'm here to help! Ask me about our services, pricing, or how we can assist your business."};
        };
      };
    };

    {
      id = messageId;
      author = "bot";
      text = responseText;
      timestamp = 0;
    };
  };

  func findPatternMatch(input : Text, patterns : [(Text, Text)]) : ?Text {
    let iter = patterns.values();
    let found = iter.find(
      func((pattern, _)) {
        input.contains(#text pattern);
      }
    );
    switch (found) {
      case (?(_, response)) { ?response };
      case (null) { null };
    };
  };
};
