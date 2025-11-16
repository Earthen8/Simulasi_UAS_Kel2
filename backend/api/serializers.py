from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Cart, CartItem, Order, OrderItem
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'image']

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True) 

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'quantity', 'price']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'created_at', 'total_price', 'items',
            'full_name', 'phone', 'address', 'city', 'postal_code',
            'payment_method', 'shipping_option', 'shipping_cost'
        ]

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), source='product', write_only=True
    )

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True) 
    user = serializers.StringRelatedField(read_only=True) 

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'items']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Email ini sudah terdaftar.")]
    )
    
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Username ini sudah terdaftar.")]
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'password'] 

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token

    def validate(self, attrs):
        credential = attrs.get('username', '')
        password = attrs.get('password', '')

        if '@' in credential:
            try:
                user = User.objects.get(email=credential)
                attrs['username'] = user.username
            except User.DoesNotExist:
                raise serializers.ValidationError({'detail': 'Email atau password salah.'})
            except User.MultipleObjectsReturned:
                raise serializers.ValidationError({'detail': 'Multiple users with this email. Contact admin.'})

        return super().validate(attrs)