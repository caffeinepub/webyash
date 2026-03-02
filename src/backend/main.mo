import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  // Types
  type Package = {
    name : Text;
    description : Text;
    price : Nat;
    features : [Text];
    isPopular : Bool;
  };

  type Testimonial = {
    clientName : Text;
    company : Text;
    message : Text;
    rating : Nat;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : ?Text;
    message : Text;
    timestamp : Int;
  };

  // Storage
  let packages = Map.empty<Text, Package>();
  let testimonials = List.empty<Testimonial>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();

  var nextSubmissionId = 1;

  // Initialize data on canister deployment
  public shared ({ caller }) func initialize() : async () {
    if (caller != Principal.fromText("2vxsx-fae")) {
      Runtime.trap("Only anonymous principal can initialize");
    };

    // Initialize packages
    let basicPackage : Package = {
      name = "Basic";
      description = "Single landing page website";
      price = 299;
      features = ["Responsive design", "SEO optimized", "Fast loading"];
      isPopular = false;
    };

    let businessPackage : Package = {
      name = "Business";
      description = "Multi-page business website";
      price = 799;
      features = ["Up to 10 pages", "Contact forms", "Blog integration"];
      isPopular = true;
    };

    let premiumPackage : Package = {
      name = "Premium";
      description = "E-commerce and custom solutions";
      price = 1999;
      features = ["Online store", "Custom integrations", "Advanced analytics"];
      isPopular = false;
    };

    packages.add(basicPackage.name, basicPackage);
    packages.add(businessPackage.name, businessPackage);
    packages.add(premiumPackage.name, premiumPackage);

    // Initialize testimonials
    let testimonial1 : Testimonial = {
      clientName = "Alice";
      company = "Alice's Bakery";
      message = "WebYash built an amazing website for my bakery. Great communication and fast delivery!";
      rating = 5;
    };

    let testimonial2 : Testimonial = {
      clientName = "Bob";
      company = "Bob's Consulting";
      message = "Very professional service. Our new site has already increased leads.";
      rating = 4;
    };

    let testimonial3 : Testimonial = {
      clientName = "Charlie";
      company = "TechStartup";
      message = "Impressed with the quality and attention to detail. Highly recommend!";
      rating = 5;
    };

    testimonials.add(testimonial1);
    testimonials.add(testimonial2);
    testimonials.add(testimonial3);
  };

  // Contact submissions
  public shared ({ caller }) func submitContact(name : Text, email : Text, phone : ?Text, message : Text) : async () {
    if (name == "" or email == "" or message == "") {
      Runtime.trap("Name, email, and message are required");
    };

    let submission : ContactSubmission = {
      id = nextSubmissionId;
      name;
      email;
      phone;
      message;
      timestamp = 0;
    };

    contactSubmissions.add(nextSubmissionId, submission);
    nextSubmissionId += 1;
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  // Package operations
  public query ({ caller }) func getAllPackages() : async [Package] {
    packages.values().toArray();
  };

  public query ({ caller }) func getPackage(packageName : Text) : async ?Package {
    packages.get(packageName);
  };

  public query ({ caller }) func getPopularPackages() : async [Package] {
    packages.values().toArray().filter(
      func(pkg) {
        pkg.isPopular;
      }
    );
  };

  public shared ({ caller }) func addPackage(name : Text, description : Text, price : Nat, features : [Text], isPopular : Bool) : async () {
    let newPackage : Package = {
      name;
      description;
      price;
      features;
      isPopular;
    };
    packages.add(name, newPackage);
  };

  // Testimonial operations
  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public shared ({ caller }) func addTestimonial(clientName : Text, company : Text, message : Text, rating : Nat) : async () {
    if (clientName == "" or message == "") {
      Runtime.trap("Name and message are required");
    };
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let newTestimonial : Testimonial = {
      clientName;
      company;
      message;
      rating;
    };
    testimonials.add(newTestimonial);
  };
};
