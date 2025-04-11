from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todo.views import TaskViewSet, secure_hello, CustomObtainAuthToken  # 👈 Include CustomObtainAuthToken

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),                      # API routes for tasks
    path('api-token-auth/', CustomObtainAuthToken.as_view()),  # 👈 Custom JSON-friendly token auth
    path('secure-hello/', secure_hello),                     # Protected test endpoint
]
