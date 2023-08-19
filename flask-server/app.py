from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
db = SQLAlchemy(app)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    food_name = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(500), nullable=False)
    instructions = db.Column(db.Text, nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'food_name': self.food_name,
            'ingredients': self.ingredients,
            'instructions': self.instructions
        }

@app.route('/recipes', methods=['GET', 'POST'])
def manage_recipes():
    if request.method == 'GET':
        recipes = Recipe.query.all()
        return jsonify([recipe.serialize() for recipe in recipes])
    elif request.method == 'POST':
        data = request.json
        new_recipe = Recipe(food_name=data['foodName'], ingredients=data['ingredients'], instructions=data['instructions'])
        db.session.add(new_recipe)
        db.session.commit()
        return jsonify({'message': 'Recipe added successfully'})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
