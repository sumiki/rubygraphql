class Types::QueryType < Types::BaseObject
  # Add root-level fields here.
  # They will be entry points for queries on your schema.

  # TODO: remove me
  field :testfield, String, null: false,
    description: "An example field added by the generator"
  def testfield
    "Hello World!"
  end

  field :user, UserType, null: true do
    description "Find a post by ID"
    argument :id, ID, required: true
  end

  def user(id:)
    User.where(id: id).first
  end
  
  field :node, field: GraphQL::Relay::Node.field
end
