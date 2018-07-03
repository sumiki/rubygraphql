class Mutations::UpdateUserMutation < Mutations::BaseMutation
  null true
  
  argument :id, String, required: true
  argument :name, String, required: true
  argument :email, String, required: true

  field :user, Types::UserType, null: true
  field :errors, [String], null: false

  def resolve(id:, name:, email:)
    user = User.find(id)
    user.name = name
    user.save
    {
        user: user,
        errors: []
    }
  end
  
end
