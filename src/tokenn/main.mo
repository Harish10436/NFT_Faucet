import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

actor tokenn{

  var owner : Principal = Principal.fromText("nszna-4sihw-scorq-kksew-akk5b-6jpqd-u3kv5-iixee-h47jc-eb7cn-uae");
  var totalSupply : Nat = 1000000000;
  var symbol = "DANK";

  stable var balanceEntries: [(Principal,Nat)] = [];


  //The below is made private so that the balances array can be accessed from only within this motoko
  //file
  private var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
  // balances.put(owner,totalSupply);

  if(balances.size() < 1){
      //This means that the balances is empty initially so we add 1 bil to our supply
      balances.put(owner,totalSupply);
  };

  public query func balanceOf(who : Principal) : async Nat{
    
    let balance : Nat = switch(balances.get(who)){
      case null 0;
      case (?result) result;
    };


    return balance;
  };

  public query func getSymbol() : async Text{
    return symbol;
  };

  public shared(msg) func payOut() : async Text{
    // Debug.print(debug_show(msg.caller));
    //msg.caller will contain the principal id of frontend
    if(balances.get(msg.caller) == null){
      let amount = 10000;
      let result = await transfer(msg.caller,amount);
      balances.put(msg.caller,amount);
      return result;
    }
    else{
      return "Already Claimed";
    }
  };

  public shared(msg) func transfer(to : Principal, amount : Nat) : async Text{
    //The transfer from is going to be the message caller - prinxipal id of canister
    let fromBalance = await balanceOf(msg.caller);

    if (fromBalance >= amount){
      let newFromBalance : Nat = fromBalance - amount;
      balances.put(msg.caller,newFromBalance);

      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to,newToBalance);

      return "Success";
    }
    else{
      return "Insufficient Funds";
    }
  };

  system func preupgrade(){
    balanceEntries := Iter.toArray(balances.entries());
  };

  system func postupgrade(){
    balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);
    if(balances.size() < 1){
      //This means that the balances is empty initially so we add 1 bil to our supply
      balances.put(owner,totalSupply);
    }
  };
}
