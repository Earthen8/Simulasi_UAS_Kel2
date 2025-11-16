from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenViewBase
from .views import (
    ProductViewSet,
    CartViewSet,
    CartItemViewSet,
    UserRegistrationView,
    CheckoutView,
    OrderViewSet,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'cart-items', CartItemViewSet, basename='cartitem')
router.register(r'orders', OrderViewSet, basename='order')

class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
]