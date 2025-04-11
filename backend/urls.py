from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from todo.views import TaskViewSet, secure_hello  # 👈 Import your views

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),                      # API routes for tasks
    path('api-token-auth/', obtain_auth_token),              # Token authentication
    path('secure-hello/', secure_hello),                     # Your protected hello endpoint
]
